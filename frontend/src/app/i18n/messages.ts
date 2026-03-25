import { messages } from './messages.generated';

const DEFAULT_LANGUAGE = 'it' as const;

export type Language = keyof typeof messages;
export type MessageKey = keyof typeof messages.it;

function normalizeLanguage(language: string | null | undefined): Language {
  const candidate = (language ?? '').trim().toLowerCase();
  return candidate.startsWith('en') ? 'en' : DEFAULT_LANGUAGE;
}

function getCurrentLanguage(): Language {
  if (typeof document !== 'undefined' && document.documentElement.lang) {
    return normalizeLanguage(document.documentElement.lang);
  }

  if (typeof navigator !== 'undefined') {
    return normalizeLanguage(navigator.language);
  }

  return DEFAULT_LANGUAGE;
}

export function t(key: MessageKey, language: Language = getCurrentLanguage()): string {
  return messages[language][key] ?? messages[DEFAULT_LANGUAGE][key] ?? key;
}