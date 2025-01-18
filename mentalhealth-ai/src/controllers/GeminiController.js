import axios from "axios";
export const testController = async () => {
  console.log("Hello from GeminiController");
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        contents: [
          {
            parts: [
              {
                text: "give me a task list including times of the day in a JSON format so i can easily map it in my react front-end.",
              },
            ],
          },
        ],
      }
    );
    const raw_response = res.data.candidates[0].content.parts[0].text;
    const cleaned_response = raw_response
      .replace("```json", "")
      .replace("```", "")
      .trim();
    const result = JSON.parse(cleaned_response);
    return result;
  } catch (error) {
    console.error(error);
  }
};
