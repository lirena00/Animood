// pages/api/generateContent.js

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.API_KEY;

export default async function handler(req, res) {


  try {
    const { mood } = req.query;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      {text: "act as a emotion detector and discern emotion that is being shown and based on that suggest genre and tag of anime user\n can watch . give response in json file and include only 1 tag and 1 genre along with emotion detected\ngenre = [Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Horror, Mahou Shoujo, Mecha, Music, Mystery, Psychological, Romance, Sci-Fi, Slice of Life, Sports, Supernatural, Thriller]\ntags = [    \"Age Regression\",    \"Aliens\",    \"Amnesia\",    \"Angels\",    \"Chuunibyou\",    \"Cosplay\",    \"Delinquents\",    \"Dissociative Identities\",    \"Dragons\",    \"Dullahan\",    \"Elf\",    \"Fairy\",    \"Gods\",    \"Kuudere\",    \"Maids\",    \"Nekomimi\",    \"Ninja\",    \"Nudity\",    \"Orphan\",    \"Pirates\",    \"Robots\",    \"Samurai\",    \"Tsundere\",    \"Vampire\",    \"Werewolf\",    \"Witch\",    \"Yandere\",    \"Zombie\",    \"Josei\",    \"Kids\",    \"Seinen\",    \"Shoujo\",    \"Shounen\",    \"Dystopian\",    \"Historical\",    \"Time Skip\",    \"Post-Apocalyptic\",    \"Space\",    \"Archery\",    \"Martial Arts\",    \"Swordplay\",    \"Parody\",    \"Satire\",    \"Slapstick\",    \"Surreal Comedy\",    \"Coming Of Age\",    \"Conspiracy\",    \"Kingdom Management\",    \"Rehabilitation\",    \"Revenge\",    \"Suicide\",    \"Tragedy\",    \"Alchemy\",    \"Cultivation\",    \"Isekai\",    \"Magic\",    \"Mythology\",    \"Necromancy\",    \"Super Power\",    \"Acrobatics\",    \"American Football\",    \"Athletics\",    \"Badminton\",    \"Baseball\",    \"Basketball\",    \"Boxing\",    \"Cheerleading\",    \"Cycling\",    \"Football\",    \"Swimming\",    \"Volleyball\",    \"Wrestling\",    \"Animals\",    \"Astronomy\",    \"Crime\",    \"Death Game\",    \"Gambling\",    \"Gore\",    \"Lost Civilization\",    \"Medicine\",    \"Pandemic\",    \"Philosophy\",    \"Politics\",    \"Reincarnation\",    \"Religion\",    \"Royal Affairs\",    \"Slavery\",    \"Survival\",    \"Terrorism\",    \"Travel\",    \"War\",    \"Assassins\",    \"Criminal Organization\",    \"Cult\",    \"Firefighters\",    \"Gangs\",    \"Mafia\",    \"Military\",    \"Police\",    \"Yakuza\",    \"Boys' Love\",    \"Female Harem\",    \"Love Triangle\",    \"Male Harem\",    \"Time Loop\",    \"Time Manipulation\",    \"Agriculture\",    \"Cute Boys Doing Cute Things\",    \"Cute Girls Doing Cute Things\",    \"Family Life\",    \"Horticulture\",    \"Iyashikei\",]"},
      {text: "input: on top of the world"},
      {text: "output: {\n  \"emotion\": \"Joy\",\n  \"genre\": \"Slice of Life\",\n  \"tags\": \"Cute Girls Doing Cute Things\"\n}"},
      {text: "input: 😎"},
      {text: "output: {\n  \"emotion\": \"Cool\",\n  \"genre\": \"Action\",\n  \"tags\": \"Swordplay\"\n}"},
      {text: "input: ⚡⚡⚡"},
      {text: "output: {\n  \"emotion\": \"Excitement\",\n  \"genre\": \"Adventure\",\n  \"tags\": \"Fantasy\"\n}"},
      {text: "input: 🥱"},
      {text: "output: {\n  \"emotion\": \"Boredom\",\n  \"genre\": \"Drama\",\n  \"tags\": \"Slice of Life\"\n}"},
      {text: "input: Amazed"},
      {text: "output: {\n  \"emotion\": \"Awe\",\n  \"genre\": \"Mystery\",\n  \"tags\": \"Magic\"\n}"},
      {text: "input: deeply focused"},
      {text: "output: {\n  \"emotion\": \"Concentration\",\n  \"genre\": \"Psychological\",\n  \"tags\": \"Time Manipulation\"\n}"},
      {text: "input: quirky"},
      {text: "output: {\n  \"emotion\": \"Amusement\",\n  \"genre\": \"Comedy\",\n  \"tags\": \"Parody\"\n}"},
      {text: "input: terrified"},
      {text: "output: {\n  \"emotion\": \"Fear\",\n  \"genre\": \"Horror\",\n  \"tags\": \"Gore\"\n}"},
      {text: "input: inspired"},
      {text: "output: {\n  \"emotion\": \"Inspiration\",\n  \"genre\": \"Sci-Fi\",\n  \"tags\": \"Space\"\n}"},
      {text: "input: 🍕"},
      {text: "output: {\n  \"emotion\": \"Contentment\",\n  \"genre\": \"Slice of Life\",\n  \"tags\": \"Cute Boys Doing Cute Things\"\n}"},
      {text: "input: ✨✨"},
      {text: "output: {\n  \"emotion\": \"Wonder\",\n  \"genre\": \"Fantasy\",\n  \"tags\": \"Fairy\"\n}"},
      {text: "input: 🤡"},
      {text: "output: {\n  \"emotion\": \"Silliness\",\n  \"genre\": \"Comedy\",\n  \"tags\": \"Slapstick\"\n}"},
      {text: "input: 🤨"},
      {text: "output: {\n  \"emotion\": \"Confusion\",\n  \"genre\": \"Mystery\",\n  \"tags\": \"Amnesia\"\n}"},
      {text: "input: 😘😘"},
      {text: "output: {\n  \"emotion\": \"Love\",\n  \"genre\": \"Romance\",\n  \"tags\": \"Female Harem\"\n}"},
      {text: "input: 😞😞"},
      {text: "output: {\n  \"emotion\": \"Sadness\",\n  \"genre\": \"Drama\",\n  \"tags\": \"Tragedy\"\n}"},
      {text: "input: 😭😭😭"},
      {text: "output: {\n  \"emotion\": \"Despair\",\n  \"genre\": \"Psychological\",\n  \"tags\": \"Suicide\"\n}"},
      {text: "input: 👏👏"},
      {text: "output: {\n  \"emotion\": \"Appreciation\",\n  \"genre\": \"Drama\",\n  \"tags\": \"Coming Of Age\"\n}"},
      {text: "input: ⚔"},
      {text: "output: {\n  \"emotion\": \"Determination\",\n  \"genre\": \"Action\",\n  \"tags\": \"Martial Arts\"\n}"},
      {text: "input: 🙂🙂"},
      {text: "output: {\n  \"emotion\": \"Happiness\",\n  \"genre\": \"Slice of Life\",\n  \"tags\": \"Cute Girls Doing Cute Things\"\n}"},
      {text: "input: 🤐🤐"},
      {text: "output: {\n  \"emotion\": \"Silence\",\n  \"genre\": \"Mystery\",\n  \"tags\": \"Dissociative Identities\"\n}"},
      {text: "input: " + mood},
      
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = JSON.parse(result.response.text());
    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
