import axios from "axios";
export const testController = () => {
 console.log('Hello from GeminiController');
  axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
      import.meta.env.VITE_API_KEY
    }`,
    {
      contents: [
        {
          parts: [{ text: "Explain how AI works" }],
        },
      ],
    }
  ).then((res) => {
    console.log(res.data.candidates[0].content.parts[0].text);
  }).catch((err) => {
    console.error(err);
  });
};
