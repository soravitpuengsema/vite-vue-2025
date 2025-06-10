import "./assets/styles/main.css"

import Aura from "@primeuix/themes/aura"
import PrimeVue from "primevue/config"
import { createApp } from "vue"
import App from "./App.vue"
import i18n from "./i18n"

const app = createApp(App)

app
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        cssLayer: {
          name: "primevue",
          order: "theme, base, primevue",
        },
        darkModeSelector: ".my-app-dark",
      },
    },
  })
  .use(i18n)

app.mount("#app")
