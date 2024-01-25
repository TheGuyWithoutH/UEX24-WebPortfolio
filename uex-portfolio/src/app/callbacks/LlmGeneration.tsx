import { client } from "@gradio/client";

class LlmGeneration {
  [x: string]: any;

  constructor() {
    this.app = client("TheGuyWithoutH/Mistral-7b-chat", {});
  }

  async generateResponse(text: string) {
    const response = await this.app.predict({
      text: text,
      temperature: 0.9,
      max_new_tokens: 256,
      topp_nucleus_sampling: 0.9,
      repetition_penalty: 1.2,
    });

    return response;
  }
}
