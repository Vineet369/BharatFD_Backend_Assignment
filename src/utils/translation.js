const projectId = process.env.PROJECT_ID || 'x';

import { Translate } from '@google-cloud/translate/build/src/v2/index.js';

const translate = new Translate({projectId});
const translateText = async (text, targetLang) => {
    try {
      const [translation] = await translate.translate(text, targetLang);
      return translation.text;

    } catch (error) {
      console.error(`Translation failed: ${error.message}`);
      throw new Error("Translation service unavailable.");
    }
  };

export { translateText };


