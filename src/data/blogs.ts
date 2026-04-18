export interface BlogPost {
  slug: string;
  title: string;
  titlePl: string;
  excerpt: string;
  excerptPl: string;
  content: string;
  contentPl: string;
  author: string;
  authorPl: string;
  date: string;
  mainImage: string;
  readingTime: number;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-notary-translation',
    title: 'What Is a Translation House and When Do You Need One?',
    titlePl: 'Czym jest tłumaczenie notarialne i kiedy jest potrzebne?',
    excerpt:
      'A translation house is a certified translation of official documents stamped by a licensed notary. Learn when you need one and how to get it fast.',
    excerptPl:
      'Tłumaczenie notarialne to certyfikowane tłumaczenie oficjalnych dokumentów opatrzone pieczęcią notariusza. Dowiedz się, kiedy jest potrzebne i jak je szybko uzyskać.',
    content: `
<h2>What Is a Translation House?</h2>
<p>A translation house is an official translation of a document that has been certified by a licensed notary public. This process ensures the translation is accurate and legally valid for use in official proceedings.</p>
<h2>When Do You Need One?</h2>
<p>You typically need a translation house for:</p>
<ul>
<li>Immigration and visa applications</li>
<li>Court and legal proceedings</li>
<li>Academic credential recognition abroad</li>
<li>Marriage or birth certificate submissions</li>
<li>Business contract execution in foreign jurisdictions</li>
</ul>
<h2>How to Get One in Tbilisi</h2>
<p>At Translation House, we handle the entire process — from translation to notary stamp — same day. Simply upload your document via our online form or send it on WhatsApp, and we'll have your certified translation ready within hours.</p>
    `.trim(),
    contentPl: `
<h2>Czym jest tłumaczenie notarialne?</h2>
<p>Tłumaczenie notarialne to oficjalne tłumaczenie dokumentu poświadczone przez licencjonowanego notariusza. Zapewnia to dokładność i ważność prawną tłumaczenia do użytku w oficjalnych postępowaniach.</p>
<h2>Kiedy jest potrzebne?</h2>
<p>Tłumaczenia notarialnego potrzebujesz zazwyczaj przy:</p>
<ul>
<li>Wnioskach wizowych i imigracyjnych</li>
<li>Postępowaniach sądowych i prawnych</li>
<li>Uznawaniu kwalifikacji akademickich za granicą</li>
<li>Składaniu aktów małżeństwa lub urodzenia</li>
<li>Wykonaniu umów handlowych w obcych jurysdykcjach</li>
</ul>
<h2>Jak to uzyskać w Tbilisi</h2>
<p>W Translation House zajmujemy się całym procesem — od tłumaczenia po pieczęć notarialną — tego samego dnia. Prześlij dokument przez nasz formularz online lub wyślij go na WhatsApp, a certyfikowane tłumaczenie będzie gotowe w ciągu kilku godzin.</p>
    `.trim(),
    author: 'Translation House Team',
    authorPl: 'Zespół Translation House',
    date: '2024-03-15',
    mainImage: '/blog/notary-translation.jpg',
    readingTime: 4,
    category: 'notary',
  },
  {
    slug: 'top-5-tips-official-document-translation',
    title: 'Top 5 Tips for Getting Your Official Documents Translated Correctly',
    titlePl: '5 wskazówek dotyczących prawidłowego tłumaczenia oficjalnych dokumentów',
    excerpt:
      'Avoid common pitfalls when translating passports, diplomas, and contracts. Here are five expert tips from our certified translators.',
    excerptPl:
      'Unikaj typowych błędów przy tłumaczeniu paszportów, dyplomów i umów. Oto pięć wskazówek od naszych certyfikowanych tłumaczy.',
    content: `
<h2>1. Choose a Certified Translator</h2>
<p>Always use a translator who is certified or sworn in for official documents. This is a legal requirement in many countries and ensures your translation will be accepted by authorities.</p>
<h2>2. Provide the Original Document</h2>
<p>Always provide the original or a high-quality scan. Blurry or incomplete copies lead to errors in translation.</p>
<h2>3. Clarify the Purpose of the Translation</h2>
<p>Tell your translator what the document is for — immigration, court, academic enrollment, etc. This helps them use the correct terminology.</p>
<h2>4. Request Notary Certification if Required</h2>
<p>Many official bodies require a notary stamp. Always ask the receiving institution what level of certification they require before ordering.</p>
<h2>5. Plan Ahead</h2>
<p>While we offer same-day service for most documents, complex or lengthy documents may require more time. Order early to avoid last-minute stress.</p>
    `.trim(),
    contentPl: `
<h2>1. Wybierz certyfikowanego tłumacza</h2>
<p>Zawsze korzystaj z tłumacza, który jest certyfikowany lub przysięgły dla oficjalnych dokumentów. Jest to wymóg prawny w wielu krajach i gwarantuje akceptację tłumaczenia przez urzędy.</p>
<h2>2. Dostarcz oryginalny dokument</h2>
<p>Zawsze dostarczaj oryginał lub skan wysokiej jakości. Rozmyte lub niekompletne kopie powodują błędy w tłumaczeniu.</p>
<h2>3. Wyjaśnij cel tłumaczenia</h2>
<p>Powiedz tłumaczowi, do czego służy dokument — imigracja, sąd, rekrutacja akademicka itp. Pomaga to w użyciu odpowiedniej terminologii.</p>
<h2>4. Poproś o poświadczenie notarialne, jeśli jest wymagane</h2>
<p>Wiele instytucji wymaga pieczęci notarialnej. Zawsze zapytaj instytucję przyjmującą, jaki poziom certyfikacji jest wymagany przed złożeniem zamówienia.</p>
<h2>5. Planuj z wyprzedzeniem</h2>
<p>Choć oferujemy usługę ekspresową dla większości dokumentów, skomplikowane lub obszerne dokumenty mogą wymagać więcej czasu. Zamawiaj z wyprzedzeniem, aby uniknąć stresu w ostatniej chwili.</p>
    `.trim(),
    author: 'Maria K.',
    authorPl: 'Maria K.',
    date: '2024-04-02',
    mainImage: '/blog/document-tips.jpg',
    readingTime: 5,
    category: 'tips',
  },
  {
    slug: 'why-same-day-translation-is-possible',
    title: 'Why Same-Day Translation Is Possible at Translation House',
    titlePl: 'Dlaczego tłumaczenie tego samego dnia jest możliwe w Translation House?',
    excerpt:
      "Many clients are surprised we can deliver certified translations in just a few hours. Here's the secret behind our fast turnaround.",
    excerptPl:
      'Wielu klientów jest zaskoczonych, że dostarczamy certyfikowane tłumaczenia w zaledwie kilka godzin. Oto sekret naszego szybkiego realizowania zamówień.',
    content: `
<h2>A Team of On-Call Translators</h2>
<p>We maintain a team of 50+ certified translators who are available throughout the day. When you submit a document, it's immediately assigned to an available specialist in the relevant language pair.</p>
<h2>In-House Notary</h2>
<p>Unlike agencies that outsource notary certification, we have an in-house notary available every business day. This eliminates the waiting period between translation and certification.</p>
<h2>Digital-First Workflow</h2>
<p>Our digital submission process means we start working on your document the moment you upload it — no waiting for physical delivery. You can also pick up the final certified document in person or have it couriered to you.</p>
<h2>Priority for Urgent Documents</h2>
<p>We offer dedicated express slots for time-sensitive documents. Contact us on WhatsApp or call us directly for truly urgent needs — we regularly complete translations within 90 minutes for short documents.</p>
    `.trim(),
    contentPl: `
<h2>Zespół tłumaczy dostępnych na wezwanie</h2>
<p>Dysponujemy zespołem ponad 50 certyfikowanych tłumaczy, dostępnych przez cały dzień. Gdy przesyłasz dokument, natychmiast jest przydzielany dostępnemu specjaliście w odpowiedniej parze językowej.</p>
<h2>Notariusz na miejscu</h2>
<p>W odróżnieniu od agencji zlecających poświadczenia zewnętrznym notariuszom, nasz notariusz pracuje na miejscu każdego dnia roboczego. Eliminuje to czas oczekiwania między tłumaczeniem a poświadczeniem.</p>
<h2>Cyfrowy przepływ pracy</h2>
<p>Nasz cyfrowy proces przyjmowania dokumentów oznacza, że rozpoczynamy pracę natychmiast po przesłaniu — bez czekania na fizyczną dostawę. Gotowy dokument możesz odebrać osobiście lub zamówić kuriera.</p>
<h2>Priorytet dla pilnych dokumentów</h2>
<p>Oferujemy dedykowane ekspresowe miejsca dla dokumentów pilnych. Skontaktuj się przez WhatsApp lub zadzwoń bezpośrednio — regularnie realizujemy tłumaczenia krótkich dokumentów w ciągu 90 minut.</p>
    `.trim(),
    author: 'Jerzy T.',
    authorPl: 'Jerzy T.',
    date: '2024-05-10',
    mainImage: '/blog/same-day.jpg',
    readingTime: 3,
    category: 'translation',
  },
];
