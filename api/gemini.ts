const query_ = `{
  "goal": "Generate a personalized learning path for becoming an efficient software engineer.",
  "input": {
    "current_skill_level": "Beginner",
    "specialization": "Software engineer.",
    "time_commitment": "10 hours per week",
    "learning_style": "Hands-on projects with a mix of videos and articles.",
    "resources_available": "YouTube tutorials, and open-source projects.",
    "technical_background": "no technical background",
    "desired_projects": [],
    "specific_challenges": []
  },
  "output_format": {
    "type": "list",
    "structure": [
      {
        "step": 1,
        "title": "Title of the Step",
        "description": "Detailed description of the step."
      }
    ]
  }
}`

export default class GeminiData {
  private readonly URL = process.env.GEMINI_URL;
  private readonly API_KEY = process.env.GEMINI_API_KEY;

  private results: any = {};

  getData(query: string= query_) {
    const url = `${this.URL}?key=${this.API_KEY}`

    // options
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: query }
            ]
          }
        ]
      }),
    };

    const data = fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const rawText = data.candidates[0].content.parts[0].text;
        const cleanedText = rawText.replace(/```json\n/g, '').replace(/```/g, '').trim();
        const parsed_string = JSON.parse(cleanedText);
        return parsed_string.output_format.structure;
      })
      .catch(error => console.log(error));
    return data;
  };
}