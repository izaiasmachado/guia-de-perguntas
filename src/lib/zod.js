const zod = require("zod");
const { zodI18nMap } = require("zod-i18n-map");
const i18next = require("i18next");

const translation = require("zod-i18n-map/locales/pt/zod.json");

i18next.init({
  lng: "pt",
  resources: {
    pt: {
      zod: translation,
    },
  },
});

zod.setErrorMap(zodI18nMap);

module.exports = zod;
