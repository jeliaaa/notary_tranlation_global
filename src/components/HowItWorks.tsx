import type { Lang } from '@/lib/translations';

interface Props {
  lang: Lang;
}

const data = {
  en: {
    kicker: 'Simple process',
    heading: 'How it works',
    sub: 'Three steps from document to certified translation',
    steps: [
      { n: '01', title: 'Send your document', body: 'WhatsApp, email, or our upload form. We confirm and quote within 5 minutes.' },
      { n: '02', title: 'We translate & certify', body: 'A sworn translator works on your document. A notary stamps and certifies it. Legally accepted in Poland and abroad.' },
      { n: '03', title: 'Delivered same day', body: 'Pick up at our office or get a scanned copy by email. Courier delivery available too.' },
    ],
  },
  pl: {
    kicker: 'Prosty proces',
    heading: 'Jak to działa',
    sub: 'Trzy kroki od dokumentu do tłumaczenia poświadczonego',
    steps: [
      { n: '01', title: 'Wyślij dokument', body: 'WhatsApp, email lub nasz formularz. Potwierdzimy i wycenimy w ciągu 5 minut.' },
      { n: '02', title: 'Tłumaczymy i poświadczamy', body: 'Tłumacz przysięgły wykonuje tłumaczenie. Notariusz je poświadcza — dokument ma pełną moc prawną w Polsce i za granicą.' },
      { n: '03', title: 'Dostawa tego samego dnia', body: 'Odbierz w naszym biurze lub otrzymaj skan na email. Dostępna także dostawa kurierem.' },
    ],
  },
};

export default function HowItWorks({ lang }: Props) {
  const c = data[lang] ?? data.en;

  return (
    <section
      style={{
        borderTop: '1px solid var(--nt-rule)',
        borderBottom: '1px solid var(--nt-rule)',
        background: '#faf7f2',
        padding: '56px 0',
      }}
    >
      <div className="how-it-works-inner">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--nt-pink-700)',
              marginBottom: 10,
            }}
          >
            {c.kicker}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 700,
              color: 'var(--nt-ink)',
              margin: '0 0 10px',
              letterSpacing: '-0.015em',
            }}
          >
            {c.heading}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--nt-muted)', margin: 0 }}>{c.sub}</p>
        </div>
        <div className="how-it-works-grid">
          {c.steps.map((step, i) => (
            <div key={step.n} style={{ position: 'relative' }}>
              {i < c.steps.length - 1 && (
                <div
                  className="how-it-works-connector"
                  style={{
                    position: 'absolute',
                    top: 22,
                    left: 'calc(100% - 16px)',
                    width: 32,
                    height: 1,
                    background: 'var(--nt-rule)',
                    zIndex: 1,
                  }}
                />
              )}
              <div
                style={{
                  background: '#fff',
                  border: '1px solid var(--nt-rule)',
                  borderRadius: 14,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  boxShadow: 'var(--sh-sm)',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--nt-pink)', letterSpacing: '0.1em' }}>
                  {step.n}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 600,
                    margin: 0,
                    color: 'var(--nt-ink)',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--nt-body)', margin: 0 }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
