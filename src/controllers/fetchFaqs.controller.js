import {Faq} from "../models/faq.model.js";
import { getCache, setCache } from "../utils/redis.js";
 
async function getFaq(req, res) {
  try {
    const { lang = 'en' } = req.query;
    const cacheKey = `faqs_${lang}`;
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return res.status(200).json(cachedData);  
    }

    const faqs = await Faq.find();
    const requiredFaqs = faqs.map((faq) => ({
      question: faq.translations.get(lang)?.question || faq.question,
      answer: faq.translations.get(lang)?.answer || faq.answer,
    }));

    await setCache(cacheKey, JSON.stringify(requiredFaqs));  

    res.status(200).json(requiredFaqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}


export  { getFaq };
