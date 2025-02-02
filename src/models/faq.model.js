import mongoose from "mongoose";
import { translateText } from "../utils/translation.js";
import {SUPPORTED_LANGUAGES} from '../constants.js'

const supportedLanguages = SUPPORTED_LANGUAGES.split(",");

const faqSchema = new mongoose.Schema({
  faqText: { type: String, required: true },  
  answerText: { type: String, required: true },  
  translations: { type: Map, of: Object },  
});

// Pre-save hook: Auto-translate question and answer when a new entry is created
// faqSchema.pre("save", async function (next) {
//   try {
//     if (!this.translations) this.translations = new Map();

//     for (const lang of supportedLanguages) {
//       if (lang !== this.originalLanguage && !this.translations.has(lang)) {
//         this.translations.set(lang, {
//           question: await translateText(this.question, lang),
//           answer: await translateText(this.answer, lang),
//         });
//       }
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

export const Faq = mongoose.model("Faq", faqSchema);

