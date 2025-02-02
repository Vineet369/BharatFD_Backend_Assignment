import mongoose from "mongoose";
import { expect } from "chai";
import {Faq} from "../src/models/faq.model.js";
import { translateText } from "../src/utils/translation.js";

describe("FAQ Model Tests", () => {
  before(async () => {
    await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("should create a FAQ with translations", async () => {
    const faq = new Faq({
      question: "What is MongoDB?",
      answer: "A NoSQL database",
      translations: new Map(),
    });

    faq.translations.set("es", {
      question: await translateText(faq.question, "es"),
      answer: await translateText(faq.answer, "es"),
    });

    await faq.save();
    expect(faq._id).to.exist;
    expect(faq.translations.has("es")).to.be.true;
  });
});
