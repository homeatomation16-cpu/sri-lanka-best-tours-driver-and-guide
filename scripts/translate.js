import fs from "fs"
import { translate } from "@vitalets/google-translate-api"

const languages = [
  "ar",
  "zh-CN",
  "nl",
  "fr",
  "de",
  "hi",
  "it",
  "pt",
  "ru",
  "es",
  "ta"
]

const base = JSON.parse(
  fs.readFileSync("./locales/en/translation.json", "utf8")
)

async function run() {

  for (const lang of languages) {

    console.log("Translating →", lang)

    const translated = {}

    for (const key of Object.keys(base)) {

      const res = await translate(base[key], { to: lang })

      translated[key] = res.text
    }

    const folder = `./locales/${lang}`

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }

    fs.writeFileSync(
      `${folder}/translation.json`,
      JSON.stringify(translated, null, 2)
    )
  }

  console.log("All translations generated")
}

run()