import { createI18n } from 'vue-i18n'

import viVN from '~/lang/vi-VN'

export type Lang = {
  id: string
  label: string
}

export const DEFAULT_LANG = 'vi-VN'

export const SUPPORT_LANGUAGES: Lang[] = [
  { id: 'en-US', label: 'English (US)' },
  { id: 'vi-VN', label: 'Tiếng Việt' },
]
export const _LOADED_LANGUAGES = [DEFAULT_LANG]
export let _CURRENT_LANGUAGE: Lang = SUPPORT_LANGUAGES[1]

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANG,
  fallbackLocale: DEFAULT_LANG,
  messages: { 'vi-VN': viVN },
})

function setI18nLanguage(language: Lang): void {
  if (i18n.mode === 'legacy') {
    // @ts-ignore
    i18n.global.locale = language.id
  } else {
    // @ts-ignore
    i18n.global.locale.value = language.id
  }
  _CURRENT_LANGUAGE = language
  ;(document.querySelector('html') as HTMLElement).setAttribute(
    'lang',
    language.id
  )
}

export async function loadLanguageAsync(id = DEFAULT_LANG as string) {
  const findLanguage = SUPPORT_LANGUAGES.find((e) => e.id === id)
  if (!findLanguage) return setI18nLanguage(_CURRENT_LANGUAGE)
  // If the same language
  if (_CURRENT_LANGUAGE.id === id || _LOADED_LANGUAGES.includes(id)) {
    return setI18nLanguage(findLanguage)
  }
  const message = await import(`~/lang/${id}.ts`)

  i18n.global.setLocaleMessage(id, message.default)
  _LOADED_LANGUAGES.push(id)
  return setI18nLanguage(findLanguage)
}

export default i18n
