export const getLocalizedValue = (
  localized: Record<string, string>,
  lang: string,
) =>
  Object.entries(localized).find(
    ([key]) => languageOf(key) === languageOf(lang),
  )?.[1] ?? Object.values(localized)[0]

export const languageOf = (locale: string) => locale.split('-')[0]
