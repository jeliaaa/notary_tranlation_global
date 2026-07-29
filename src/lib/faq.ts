import type { Lang } from './translations';

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqSection {
  heading: string;
  subheading: string;
  items: FaqItem[];
}

export const faqData: Record<Lang, FaqSection> = {
  en: {
    heading: 'Frequently Asked Questions',
    subheading: 'Everything you need to know about our translation services',
    items: [
      { q: 'How long does a sworn translation take?', a: 'Standard translations are usually completed within 1–2 business days. Express same-day service is available for urgent documents — contact us for details.' },
      { q: 'What documents can you translate?', a: 'We translate all official documents including passports, birth certificates, marriage certificates, diplomas, contracts, medical records, court documents, and more.' },
      { q: 'What is the price per page?', a: 'Prices start from 50 zł (12 €) per page for English/Russian translations. Other languages — 99 zł (23 €) per page. Use our price calculator for an exact estimate.' },
      { q: 'Do you provide certified / notarized translations?', a: 'Yes. All our translations can be notarially certified, making them legally valid for official use in Poland and internationally.' },
      { q: 'Can I submit a document online?', a: 'Absolutely. Upload your document through our online form or send it via WhatsApp. We will review it and send you a price quote within 5 minutes.' },
      { q: 'Do you translate to languages other than Polish?', a: 'Yes — we translate between 20+ language pairs including English, Russian, German, French, Turkish, Armenian, Arabic, Chinese, and many more.' },
    ],
  },
  pl: {
    heading: 'Często zadawane pytania',
    subheading: 'Wszystko, co musisz wiedzieć o naszych usługach tłumaczeniowych',
    items: [
      { q: 'Jak długo trwa tłumaczenie przysięgłe?', a: 'Standardowe tłumaczenia są zazwyczaj gotowe w ciągu 1–2 dni roboczych. Dostępna jest usługa ekspresowa na ten sam dzień — skontaktuj się z nami w celu uzyskania szczegółów.' },
      { q: 'Jakie dokumenty możecie przetłumaczyć?', a: 'Tłumaczymy wszystkie oficjalne dokumenty, w tym paszporty, akty urodzenia, akty małżeństwa, dyplomy, umowy, dokumentację medyczną, dokumenty sądowe i wiele innych.' },
      { q: 'Jaka jest cena za stronę?', a: 'Ceny zaczynają się od 50 zł (12 €) za stronę dla tłumaczeń angielskiego/rosyjskiego. Inne języki — 99 zł (23 €) za stronę. Użyj naszego kalkulatora cen, aby uzyskać dokładną wycenę.' },
      { q: 'Czy oferujecie certyfikowane tłumaczenia notarialne?', a: 'Tak. Wszystkie nasze tłumaczenia mogą być poświadczone notarialnie, co czyni je prawnie ważnymi do oficjalnego użytku w Polsce i na arenie międzynarodowej.' },
      { q: 'Czy mogę przesłać dokument online?', a: 'Oczywiście. Prześlij swój dokument przez nasz formularz online lub wyślij go przez WhatsApp. Przejrzymy go i wyślemy wycenę w ciągu 5 minut.' },
      { q: 'Czy tłumaczycie na języki inne niż polski?', a: 'Tak — pracujemy z ponad 20 parami językowymi, w tym angielskim, rosyjskim, niemieckim, francuskim, tureckim, ormiańskim, arabskim, chińskim i wieloma innymi.' },
    ],
  },
};
