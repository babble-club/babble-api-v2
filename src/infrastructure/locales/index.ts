import en from './en.json';
enum Locale {
  EN = 'en',
}

type LocaleStringKey = keyof typeof en;
const getTranslatedStringValue = (
  locale: Locale,
  key: LocaleStringKey,
  ...args: (string | number)[]
): string => {
  let value: string;
  switch (locale) {
    case Locale.EN:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value = en[key];
      break;
    default:
      value = key;
  }
  if (args.length) {
    for (const [index, arg] of args.entries()) {
      value = value.replace(`$${index + 1}`, `${arg}`);
    }
  }
  return value;
};

export { Locale, getTranslatedStringValue };

export type { LocaleStringKey };
