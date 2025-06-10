import { createI18n } from "vue-i18n"
// import en from "./lang-en"
// import th from "./lang-th"

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  // messages: {
  //   en: en,
  //   th: th,
  // },
})

export default i18n
