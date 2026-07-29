'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { languages, languageNames, CONTACT, PHONE_URL, waUrl } from '@/lib/data';

interface Props {
  lang: Lang;
}

const TEXTS = {
  en: {
    headline: 'It takes 5 minutes for us to start working on your document',
    q1: 'What language should we translate FROM?',
    q2: 'What language should we translate TO?',
    q3: 'Do you need a notarised document?',
    yes: 'Yes',
    no: 'No',
    next: 'Next',
    selectPlaceholder: 'Select a language...',
    step: (n: number) => `Question ${n} of 3`,
    resultTitle: 'How would you like to proceed?',
    wa: 'Contact us via WhatsApp',
    waSub: 'Hear from us within 5 minutes',
    call: 'Call us directly',
    emailUs: 'Email us',
    callback: 'Let us contact you',
    callbackSub: 'Leave your email or phone number',
    contactPlaceholder: 'Email or phone number',
    send: 'Send',
    sending: 'Sending...',
    thanks: "We'll be in touch shortly. Thank you!",
    quickQuote: 'Quick Quote',
    back: 'Back',
    close: 'Close',
    notarisedLabel: 'notarised',
  },
  pl: {
    headline: 'Rozpoczniemy pracę nad Twoim dokumentem w ciągu 5 minut',
    q1: 'Z jakiego języka mamy tłumaczyć?',
    q2: 'Na jaki język mamy tłumaczyć?',
    q3: 'Czy potrzebujesz poświadczenia notarialnego?',
    yes: 'Tak',
    no: 'Nie',
    next: 'Dalej',
    selectPlaceholder: 'Wybierz język...',
    step: (n: number) => `Pytanie ${n} z 3`,
    resultTitle: 'Jak chcesz kontynuować?',
    wa: 'Napisz do nas na WhatsApp',
    waSub: 'Odpowiadamy w ciągu 5 minut',
    call: 'Zadzwoń do nas',
    emailUs: 'Napisz e-mail',
    callback: 'Oddzwonimy do Ciebie',
    callbackSub: 'Zostaw email lub numer telefonu',
    contactPlaceholder: 'Email lub numer telefonu',
    send: 'Wyślij',
    sending: 'Wysyłanie...',
    thanks: 'Dziękujemy! Wkrótce się odezwiemy.',
    quickQuote: 'Szybka wycena',
    back: 'Wstecz',
    close: 'Zamknij',
    notarisedLabel: 'poświadczone notarialnie',
  },
} as const;

const waMessage = (lang: Lang, from: string, to: string, notarised: boolean) =>
  lang === 'pl'
    ? `Dzień dobry, interesuje mnie tłumaczenie z ${from} na ${to}${notarised ? ', z poświadczeniem notarialnym' : ''}.`
    : `Hello, I am inquiring about a ${from} to ${to} translation${notarised ? ', notarised document' : ''}.`;

// ─── Shared styles ────────────────────────────────────────────────────────────

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '2px solid #e5e7eb',
  fontSize: '14px',
  color: '#1a1a2e',
  outline: 'none',
  marginBottom: '12px',
  background: '#fff',
  cursor: 'pointer',
  appearance: 'auto',
};

const btnStyle = (disabled: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '13px',
  borderRadius: '10px',
  border: 'none',
  background: disabled ? '#e5e7eb' : 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)',
  color: disabled ? '#999' : '#fff',
  fontWeight: 700,
  fontSize: '15px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.2s',
});

const yesNoStyle: React.CSSProperties = {
  flex: 1,
  padding: '14px',
  borderRadius: '10px',
  border: '2px solid #e91e8c',
  background: '#e91e8c',
  color: '#fff',
  fontWeight: 700,
  fontSize: '15px',
  cursor: 'pointer',
  transition: 'transform 0.15s ease',
};

const contactBtnStyle = (bg: string, color: string, isButton = false): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '12px',
  background: bg,
  color,
  fontWeight: 600,
  fontSize: '14px',
  textDecoration: 'none',
  border: isButton ? '2px solid #e5e7eb' : 'none',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  transition: 'opacity 0.2s',
});

// ─── Step indicator ───────────────────────────────────────────────────────────

const StepIndicator = ({ current, label }: { current: number; label: string }) => (
  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', gap: '6px' }}>
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          style={{
            width: n === current ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            background: n === current ? '#e91e8c' : n < current ? '#f9a8d4' : '#e5e7eb',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </div>
    <span style={{ fontSize: '12px', color: '#999' }}>{label}</span>
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 'result' | 'callback' | 'success';

export default function LeadCapturePopup({ lang }: Props) {
  const [visible, setVisible] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [fromLang, setFromLang] = useState('');
  const [toLang, setToLang] = useState('');
  const [notarised, setNotarised] = useState<boolean | null>(null);
  const [contactValue, setContactValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const t = TEXTS[lang] ?? TEXTS.en;
  const langNames = languageNames[lang] ?? languageNames.en;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setAnimIn(false);
    setTimeout(() => setVisible(false), 300);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  const handleNext = () => {
    if (step === 1 && fromLang) setStep(2);
    else if (step === 2 && toLang) setStep(3);
  };

  const handleNotarised = (val: boolean) => {
    setNotarised(val);
    setStep('result');
  };

  const fromName = langNames[fromLang as keyof typeof langNames] || fromLang;
  const toName = langNames[toLang as keyof typeof langNames] || toLang;

  const sendLead = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('contact', contactValue.trim());
      formData.append('fromLanguage', fromName);
      formData.append('toLanguage', toName);
      formData.append('notarised', notarised ? 'Yes' : 'No');
      formData.append('lang', lang);

      await fetch('/api/popup-lead', { method: 'POST', body: formData });
    } catch {
      // best-effort
    } finally {
      setSubmitting(false);
      setStep('success');
    }
  };

  if (!visible) return null;

  const notarisedLabel = notarised ? t.notarisedLabel : '';
  const whatsappUrl = waUrl(lang, waMessage(lang, fromName, toName, !!notarised));
  const summaryLine = [fromName, toName, notarisedLabel].filter(Boolean).join(' → ');

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(2px)',
        padding: '16px',
        transition: 'opacity 0.3s ease',
        opacity: animIn ? 1 : 0,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          transform: animIn ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
          opacity: animIn ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div style={{ background: 'linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)', padding: '20px 24px 16px' }}>
          <button
            onClick={close}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              marginTop: '14px',
              marginRight: '16px',
              background: 'rgba(255,255,255,0.25)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
          <div
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            ⚡ {t.quickQuote}
          </div>
          <p style={{ color: '#fff', fontSize: '16px', fontWeight: 700, margin: 0, lineHeight: 1.35 }}>
            {t.headline}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {/* ── Q1 ── */}
          {step === 1 && (
            <div>
              <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '14px', color: '#1a1a2e' }}>{t.q1}</p>
              <select value={fromLang} onChange={(e) => setFromLang(e.target.value)} style={selectStyle}>
                <option value="">{t.selectPlaceholder}</option>
                {languages.map((l) => (
                  <option key={l} value={l}>{langNames[l]}</option>
                ))}
              </select>
              <button onClick={handleNext} disabled={!fromLang} style={btnStyle(!fromLang)}>
                {t.next} <ChevronRight size={16} style={{ marginLeft: 4 }} />
              </button>
              <StepIndicator current={1} label={t.step(1)} />
            </div>
          )}

          {/* ── Q2 ── */}
          {step === 2 && (
            <div>
              <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '14px', color: '#1a1a2e' }}>{t.q2}</p>
              <select value={toLang} onChange={(e) => setToLang(e.target.value)} style={selectStyle}>
                <option value="">{t.selectPlaceholder}</option>
                {languages.filter((l) => l !== fromLang).map((l) => (
                  <option key={l} value={l}>{langNames[l]}</option>
                ))}
              </select>
              <button onClick={handleNext} disabled={!toLang} style={btnStyle(!toLang)}>
                {t.next} <ChevronRight size={16} style={{ marginLeft: 4 }} />
              </button>
              <StepIndicator current={2} label={t.step(2)} />
            </div>
          )}

          {/* ── Q3 ── */}
          {step === 3 && (
            <div>
              <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px', color: '#1a1a2e' }}>{t.q3}</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => handleNotarised(true)} style={yesNoStyle}>
                  {t.yes}
                </button>
                <button
                  onClick={() => handleNotarised(false)}
                  style={{ ...yesNoStyle, background: '#f5f5f5', color: '#555', borderColor: '#ddd' }}
                >
                  {t.no}
                </button>
              </div>
              <StepIndicator current={3} label={t.step(3)} />
            </div>
          )}

          {/* ── Result / Contact options ── */}
          {step === 'result' && (
            <div>
              {summaryLine && (
                <div
                  style={{
                    background: '#fdf0f6',
                    border: '1px solid #f9c0de',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    marginBottom: '16px',
                    fontSize: '13px',
                    color: '#c2185b',
                    fontWeight: 600,
                  }}
                >
                  {summaryLine}
                </div>
              )}
              <p style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px', color: '#1a1a2e' }}>
                {t.resultTitle}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* WhatsApp */}
                <a
                  id="wa-btn-popup"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  style={contactBtnStyle('#25D366', '#fff')}
                >
                  <MessageCircle size={18} style={{ flexShrink: 0 }} />
                  <span>
                    <span style={{ display: 'block', fontWeight: 700 }}>{t.wa}</span>
                    <span style={{ display: 'block', fontSize: '11px', opacity: 0.85 }}>{t.waSub}</span>
                  </span>
                </a>

                {/* Call */}
                <a href={PHONE_URL} onClick={close} style={contactBtnStyle('#4F46E5', '#fff')}>
                  <Phone size={18} style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 700 }}>{t.call}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '13px', opacity: 0.85 }}>
                    {CONTACT.phone1.display}
                  </span>
                </a>

                {/* Email */}
                <a href={`mailto:${CONTACT.email}`} onClick={close} style={contactBtnStyle('#EA4335', '#fff')}>
                  <Mail size={18} style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 700 }}>{t.emailUs}</span>
                </a>

                {/* Callback */}
                <button onClick={() => setStep('callback')} style={contactBtnStyle('#f5f5f5', '#1a1a2e', true)}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>✉️</span>
                  <span>
                    <span style={{ display: 'block', fontWeight: 700 }}>{t.callback}</span>
                    <span style={{ display: 'block', fontSize: '11px', opacity: 0.65 }}>{t.callbackSub}</span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ── Callback form ── */}
          {step === 'callback' && (
            <div>
              <button
                onClick={() => setStep('result')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#888',
                  fontSize: '13px',
                  marginBottom: '12px',
                  padding: 0,
                }}
              >
                ← {t.back}
              </button>
              <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '14px', color: '#1a1a2e' }}>
                {t.callbackSub}
              </p>
              <input
                type="text"
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                placeholder={t.contactPlaceholder}
                style={selectStyle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && contactValue.trim()) sendLead();
                }}
              />
              <button
                onClick={sendLead}
                disabled={!contactValue.trim() || submitting}
                style={btnStyle(!contactValue.trim() || submitting)}
              >
                {submitting ? t.sending : t.send}
              </button>
            </div>
          )}

          {/* ── Success ── */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
              <p style={{ fontWeight: 700, fontSize: '16px', color: '#1a1a2e', margin: 0 }}>{t.thanks}</p>
              <button onClick={close} style={{ ...btnStyle(false), marginTop: '20px' }}>
                {t.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
