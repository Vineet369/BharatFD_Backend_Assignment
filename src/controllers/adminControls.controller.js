import {Faq} from "../models/faq.model.js";
import { deleteCache } from "../utils/redis.js";

const addFaq = async (req, res) => {
  try {
    const { faqText, answerText } = req.body;
    if (!faqText || !answerText) {
      return res.status(400).json({ message: "Faq and answer are required" });
    }

    const newFaq = await Faq.create({
      faqText,
      answerText,
      language,
    });

    await deleteCache("all_faqs");

    res.status(201).json({ message: "Faq added successfully", newFaq });
  } catch (error) {
    res.status(500).json({ error: `${error.message} unauthorised access `});
  }
}


// Update a faq (Admin only)
async function updateFaq(req, res) {
  try {
    const { newFaqText, newAnswerText } = req.body;
    const { faqId } = req.query;

    const updatedFaq = await Faq.findByIdAndUpdate(
      faqId,
      {
        faqText: newFaqText,
        answerText: newAnswerText,
      },
      { new: true }
    );

    if (!updatedFaq) {
      return res.status(404).json({ message: "Faq not found" });
    }
    await deleteCache(); 

    res.status(200).json({ message: "Faq updated successfully", updatedFaq });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a faq (Admin only)
async function deleteFaq(req, res) {
  try {
    const { faqId } = req.query;

    const deletedFaq = await Faq.findByIdAndDelete(faqId);

    if (!deletedFaq) {
      return res.status(404).json({ message: "Faq not found" });
    }

    await deleteCache();  

    res.status(200).json({ message: "Faq deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export { 
  addFaq, 
  updateFaq, 
  deleteFaq 
};
