import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const INBOX = 'info@th.com.ge';
const FROM = 'Translation House <info@th.com.ge>';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error('[popup-lead] RESEND_API_KEY is not set.');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const formData = await req.formData();
    const contact = (formData.get('contact') as string) || 'Not provided';
    const fromLanguage = (formData.get('fromLanguage') as string) || '—';
    const toLanguage = (formData.get('toLanguage') as string) || '—';
    const notarised = (formData.get('notarised') as string) || 'No';
    const lang = (formData.get('lang') as string) || 'en';

    const result = await resend.emails.send({
      from: FROM,
      to: INBOX,
      subject: `New quick-quote lead: ${fromLanguage} → ${toLanguage}`,
      html: `
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>From language:</strong> ${fromLanguage}</p>
        <p><strong>To language:</strong> ${toLanguage}</p>
        <p><strong>Notarised:</strong> ${notarised}</p>
        <p><strong>Site language:</strong> ${lang.toUpperCase()}</p>
      `,
    });

    if (result.error) {
      console.error('[popup-lead] email error:', result.error);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[popup-lead] unexpected error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
