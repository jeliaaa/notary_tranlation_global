import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import { CONTACT } from '@/lib/data';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = { en: 'Privacy Policy - NotaryTranslation', pl: 'Polityka prywatności - NotaryTranslation' };
  return { title: titles[lang] ?? titles.en };
}

const content = {
  en: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: '1. Introduction',
        text: `NotaryTranslation ("we", "us", "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information you provide when using our website and services. We collect the following personal data: name, email address, phone number, and the document files you upload through our online form.`,
      },
      {
        heading: '2. How We Use Your Data',
        text: `We use the information you provide solely to deliver our translation and notary services, to contact you regarding your order, to send you a price quote or follow-up messages, and to improve our services. We do not sell or share your personal data with third parties for marketing purposes.`,
      },
      {
        heading: '3. Third-Party Services',
        text: `We use EmailJS to process and deliver documents and quotes submitted via our online form. EmailJS processes data in accordance with its own privacy policy. We also use Tawk.to for live chat support.`,
      },
      {
        heading: '4. Cookies',
        text: `Our website uses minimal cookies to remember your language preference and improve your browsing experience. No tracking or advertising cookies are used. You can clear cookies at any time through your browser settings.`,
      },
      {
        heading: '5. Contact',
        text: `If you have any questions about this Privacy Policy or your personal data, please contact us at: ${CONTACT.email}`,
      },
    ],
  },
  pl: {
    title: 'Polityka prywatności',
    sections: [
      {
        heading: '1. Wprowadzenie',
        text: `NotaryTranslation ("my", "nas", "nasz") zobowiązuje się do ochrony Twoich danych osobowych. Niniejsza Polityka prywatności wyjaśnia, w jaki sposób zbieramy, używamy i chronimy informacje, które podajesz podczas korzystania z naszej strony i usług. Zbieramy następujące dane osobowe: imię i nazwisko, adres e-mail, numer telefonu oraz pliki dokumentów przesłanych przez formularz online.`,
      },
      {
        heading: '2. Jak używamy Twoich danych',
        text: `Informacje, które podajesz, wykorzystujemy wyłącznie do świadczenia naszych usług tłumaczeniowych i notarialnych, do kontaktu w sprawie Twojego zamówienia, do przesyłania wyceny lub wiadomości uzupełniających oraz do ulepszania naszych usług. Nie sprzedajemy ani nie udostępniamy Twoich danych osobowych stronom trzecim w celach marketingowych.`,
      },
      {
        heading: '3. Usługi stron trzecich',
        text: `Używamy EmailJS do przetwarzania i dostarczania dokumentów i wycen przesyłanych za pośrednictwem naszego formularza online. EmailJS przetwarza dane zgodnie z własną polityką prywatności. Korzystamy również z Tawk.to do obsługi czatu na żywo.`,
      },
      {
        heading: '4. Pliki cookie',
        text: `Nasza strona używa minimalnej liczby plików cookie do zapamiętywania preferencji językowych i poprawy komfortu przeglądania. Nie są używane pliki cookie do śledzenia ani reklamy. Możesz usunąć pliki cookie w dowolnym momencie za pomocą ustawień przeglądarki.`,
      },
      {
        heading: '5. Kontakt',
        text: `Jeśli masz pytania dotyczące niniejszej Polityki prywatności lub swoich danych osobowych, skontaktuj się z nami pod adresem: ${CONTACT.email}`,
      },
    ],
  },
};

export default async function PrivacyPage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;
  const c = content[lang];

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{c.title}</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-10" />
        <div className="space-y-8">
          {c.sections.map(({ heading, text }) => (
            <div key={heading}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{heading}</h2>
              <p className="text-gray-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
