import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import { CONTACT } from '@/lib/data';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = { en: 'Terms of Service - NotaryTranslation', pl: 'Regulamin - NotaryTranslation' };
  return { title: titles[lang] ?? titles.en };
}

const content = {
  en: {
    title: 'Terms of Service',
    sections: [
      {
        heading: '1. Service Description',
        text: `NotaryTranslation provides professional document translation and notary certification services based in Tbilisi, Georgia. We translate documents between Georgian and 20+ languages, including English, Polish, Russian, German, French, and others. All translations are performed by certified translators.`,
      },
      {
        heading: '2. User Obligations',
        text: `By using our services, you agree to provide accurate and complete information, to submit documents to which you have legal rights or authorization, not to submit documents containing unlawful content, and to pay for services as described at the time of ordering.`,
      },
      {
        heading: '3. Payment Terms',
        text: `Prices for our services are as listed on our website and may vary depending on language pair, number of pages, and whether notary certification is required. Payment is due upon delivery or as agreed in advance. We reserve the right to update prices at any time; prices quoted before an order is placed will be honored.`,
      },
      {
        heading: '4. Delivery Times',
        text: `Estimated delivery times are provided as guidance only and are not guaranteed. Standard delivery is 1–2 business days. Express same-day service is available for most documents. For complex or lengthy documents, we will contact you with a custom timeline.`,
      },
      {
        heading: '5. Liability Limitations',
        text: `NotaryTranslation is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the cost of the service provided. We are not responsible for delays caused by incomplete or illegible documents submitted by the client.`,
      },
      {
        heading: '6. Contact',
        text: `For questions about these Terms, please contact us at: ${CONTACT.email}`,
      },
    ],
  },
  pl: {
    title: 'Regulamin',
    sections: [
      {
        heading: '1. Opis usługi',
        text: `NotaryTranslation świadczy profesjonalne usługi tłumaczenia dokumentów i poświadczenia notarialnego z siedzibą w Tbilisi w Gruzji. Tłumaczymy dokumenty między językiem gruzińskim a ponad 20 językami, w tym angielskim, polskim, rosyjskim, niemieckim, francuskim i innymi. Wszystkie tłumaczenia są wykonywane przez certyfikowanych tłumaczy.`,
      },
      {
        heading: '2. Obowiązki użytkownika',
        text: `Korzystając z naszych usług, zgadzasz się podawać dokładne i kompletne informacje, przesyłać dokumenty, do których masz prawa lub upoważnienie, nie przesyłać dokumentów zawierających treści niezgodne z prawem oraz płacić za usługi zgodnie z opisem w momencie składania zamówienia.`,
      },
      {
        heading: '3. Warunki płatności',
        text: `Ceny naszych usług są podane na naszej stronie internetowej i mogą się różnić w zależności od pary językowej, liczby stron i wymagania poświadczenia notarialnego. Płatność jest należna przy dostawie lub zgodnie z ustaleniami.`,
      },
      {
        heading: '4. Czas dostawy',
        text: `Szacowane czasy dostawy podawane są wyłącznie informacyjnie i nie są gwarantowane. Standardowa dostawa trwa 1–2 dni robocze. Usługa ekspresowa na ten sam dzień jest dostępna dla większości dokumentów.`,
      },
      {
        heading: '5. Ograniczenia odpowiedzialności',
        text: `NotaryTranslation nie ponosi odpowiedzialności za pośrednie, przypadkowe ani wynikowe szkody wynikające z korzystania z naszych usług. Nasza odpowiedzialność jest ograniczona do kosztu świadczonej usługi.`,
      },
      {
        heading: '6. Kontakt',
        text: `W przypadku pytań dotyczących niniejszego Regulaminu skontaktuj się z nami pod adresem: ${CONTACT.email}`,
      },
    ],
  },
};

export default async function TermsPage({ params }: Props) {
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
