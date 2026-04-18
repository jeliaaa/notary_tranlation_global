import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const INBOX = 'info@th.com.ge';
const FROM = 'Translation House <noreply@notarytranslation.ge>';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error('[send-quote] RESEND_API_KEY is not set. All env keys:', Object.keys(process.env).filter(k => k.includes('RESEND')));
    return NextResponse.json({ error: 'Server misconfiguration', hint: 'RESEND_API_KEY missing', keys: Object.keys(process.env).filter(k => k.includes('RESEND')) }, { status: 500 });
  }
  const resend = new Resend(apiKey);
  try {
    const formData = await req.formData();
    const email = formData.get('email') as string;
    const phone = (formData.get('phone') as string) || 'Not provided';
    const lang = (formData.get('lang') as string) || 'en';
    const fileEntries = formData.getAll('files') as File[];

    if (!email || !fileEntries.length) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Convert files to Resend attachment format
    const attachments = await Promise.all(
      fileEntries.map(async (file) => {
        const buffer = await file.arrayBuffer();
        return {
          filename: file.name,
          content: Buffer.from(buffer),
        };
      })
    );

    const fileList = fileEntries.map((f) => f.name).join(', ');

    // 1. Forward request + attachments to inbox
    const inboxResult = await resend.emails.send({
      from: FROM,
      to: INBOX,
      replyTo: email,
      subject: `New translation request from ${email}`,
      html: `
        <p><strong>Client email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Files:</strong> ${fileList}</p>
        <p><strong>Language:</strong> ${lang.toUpperCase()}</p>
      `,
      attachments,
    });
    if (inboxResult.error) {
      console.error('[send-quote] inbox email error:', inboxResult.error);
      return NextResponse.json({ error: inboxResult.error.message }, { status: 500 });
    }

    // 2. Send confirmation to the user
    const isPolish = lang === 'pl';
    const confirmResult = await resend.emails.send({
      from: FROM,
      to: email,
      subject: isPolish
        ? 'Otrzymaliśmy Twoje dokumenty – Translation House'
        : 'We received your documents – Translation House',
      html: confirmationTemplate({ email, phone, fileList, isPolish }),
    });
    if (confirmResult.error) {
      console.error('[send-quote] confirmation email error:', confirmResult.error);
      // Inbox email succeeded — don't fail the whole request
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[send-quote] unexpected error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

function confirmationTemplate({
  email,
  phone,
  fileList,
  isPolish,
}: {
  email: string;
  phone: string;
  fileList: string;
  isPolish: boolean;
}) {
  if (isPolish) {
    return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1d4ed8,#7c3aed);padding:32px 40px;text-align:center">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700">Translation House</h1>
            <p style="margin:8px 0 0;color:#bfdbfe;font-size:14px">Profesjonalne tłumaczenia notarialne</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px">
            <h2 style="margin:0 0 16px;color:#111827;font-size:20px">Dziękujemy za przesłanie dokumentów!</h2>
            <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6">
              Otrzymaliśmy Twoje pliki i nasz zespół przygotuje bezpłatną wycenę w ciągu <strong>5 minut</strong>. Skontaktujemy się z Tobą wkrótce.
            </p>
            <!-- Summary box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:24px">
              <tr><td style="padding:20px">
                <p style="margin:0 0 8px;color:#374151;font-size:14px"><strong>Email:</strong> ${email}</p>
                <p style="margin:0 0 8px;color:#374151;font-size:14px"><strong>Telefon:</strong> ${phone}</p>
                <p style="margin:0;color:#374151;font-size:14px"><strong>Przesłane pliki:</strong> ${fileList}</p>
              </td></tr>
            </table>
            <p style="margin:0 0 8px;color:#6b7280;font-size:14px">Potrzebujesz pilnej pomocy? Napisz do nas na WhatsApp:</p>
            <a href="https://wa.me/995591729911" style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#7c3aed);color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">
              Napisz na WhatsApp
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb">
            <p style="margin:0;color:#9ca3af;font-size:12px">Translation House · ul. Cotne Dadiani 7, Tbilisi · info@th.com.ge</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1d4ed8,#7c3aed);padding:32px 40px;text-align:center">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700">Translation House</h1>
            <p style="margin:8px 0 0;color:#bfdbfe;font-size:14px">Professional Notary Translation Services</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px">
            <h2 style="margin:0 0 16px;color:#111827;font-size:20px">We received your documents!</h2>
            <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6">
              Our team will review your files and send you a free price quote within <strong>5 minutes</strong>. We'll be in touch shortly.
            </p>
            <!-- Summary box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:24px">
              <tr><td style="padding:20px">
                <p style="margin:0 0 8px;color:#374151;font-size:14px"><strong>Email:</strong> ${email}</p>
                <p style="margin:0 0 8px;color:#374151;font-size:14px"><strong>Phone:</strong> ${phone}</p>
                <p style="margin:0;color:#374151;font-size:14px"><strong>Files submitted:</strong> ${fileList}</p>
              </td></tr>
            </table>
            <p style="margin:0 0 8px;color:#6b7280;font-size:14px">Need immediate assistance? Message us on WhatsApp:</p>
            <a href="https://wa.me/995591729911" style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#7c3aed);color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">
              Message on WhatsApp
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb">
            <p style="margin:0;color:#9ca3af;font-size:12px">Translation House · 7 Kotne Dadiani St., Tbilisi · info@th.com.ge</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
