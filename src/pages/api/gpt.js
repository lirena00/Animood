// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.API_KEY,
// });

export default async function handler(req, res) {
  try {
    const { mood } = req.query;
    const response = await fetch(
      `https://animood-cfworker.cf-odash.workers.dev/?mood=${encodeURIComponent(
        mood
      )}`
    );
    const responseJSON = await response.json();

    res.status(200).json(responseJSON);

    // const systemPrompt = `You are an AI specializing in mood analysis and anime recommendations. Given a user's mood, you must determine their emotional state and suggest an appropriate anime genre and tag from predefined lists.

    // Follow these rules strictly:
    // - Only choose from the provided genres and tags.
    // - Keep responses concise and formatted as valid JSON.
    // - Accurately interpret emojis, slang, and expressive phrases.
    // - Avoid assumptions beyond the given mood input.

    // Genres: [Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Horror, Mahou Shoujo, Mecha, Music, Mystery, Psychological, Romance, Sci-Fi, Slice of Life, Sports, Supernatural, Thriller]

    // Tags: ["Age Regression", "Aliens", "Amnesia", "Angels", "Chuunibyou", "Cosplay", "Delinquents", "Dissociative Identities", "Dragons", "Fairy", "Gods", "Kuudere", "Maids", "Nekomimi", "Ninja", "Nudity", "Orphan", "Pirates", "Robots", "Samurai", "Tsundere", "Vampire", "Werewolf", "Witch", "Yandere", "Zombie", "Josei", "Kids", "Seinen", "Shoujo", "Shounen", "Dystopian", "Historical", "Time Skip", "Post-Apocalyptic", "Space", "Archery", "Martial Arts", "Swordplay", "Parody", "Satire", "Slapstick", "Surreal Comedy", "Coming Of Age", "Conspiracy", "Kingdom Management", "Rehabilitation", "Revenge", "Suicide", "Tragedy", "Alchemy", "Cultivation", "Isekai", "Magic", "Mythology", "Necromancy", "Super Power", "Acrobatics", "American Football", "Athletics", "Badminton", "Baseball", "Basketball", "Boxing", "Cheerleading", "Cycling", "Football", "Swimming", "Volleyball", "Wrestling", "Animals", "Astronomy", "Crime", "Death Game", "Gambling", "Gore", "Lost Civilization", "Medicine", "Pandemic", "Philosophy", "Politics", "Reincarnation", "Religion", "Royal Affairs", "Slavery", "Survival", "Terrorism", "Travel", "War", "Assassins", "Criminal Organization", "Cult", "Firefighters", "Gangs", "Mafia", "Military", "Police", "Yakuza", "Boys' Love", "Female Harem", "Love Triangle", "Male Harem", "Time Loop", "Time Manipulation", "Agriculture", "Cute Boys Doing Cute Things", "Cute Girls Doing Cute Things", "Family Life", "Horticulture", "Iyashikei"]

    // Respond strictly in this JSON format:
    // {
    //   "emotion": "<Detected Emotion>",
    //   "genre": "<Suggested Genre>",
    //   "tags": "<Suggested Tag>"
    // }`;

    // const examples = [
    //   {
    //     user: "on top of the world",
    //     response: {
    //       emotion: "Joy",
    //       genre: "Slice of Life",
    //       tags: "Cute Girls Doing Cute Things",
    //     },
    //   },
    //   {
    //     user: "😎",
    //     response: { emotion: "Cool", genre: "Action", tags: "Swordplay" },
    //   },
    //   {
    //     user: "🥱",
    //     response: { emotion: "Boredom", genre: "Drama", tags: "Slice of Life" },
    //   },
    //   {
    //     user: "Amazed",
    //     response: { emotion: "Awe", genre: "Mystery", tags: "Magic" },
    //   },
    //   {
    //     user: "deeply focused",
    //     response: {
    //       emotion: "Concentration",
    //       genre: "Psychological",
    //       tags: "Time Manipulation",
    //     },
    //   },
    //   {
    //     user: "quirky",
    //     response: { emotion: "Amusement", genre: "Comedy", tags: "Parody" },
    //   },
    //   {
    //     user: "terrified",
    //     response: { emotion: "Fear", genre: "Horror", tags: "Gore" },
    //   },
    //   {
    //     user: "👏👏",
    //     response: {
    //       emotion: "Appreciation",
    //       genre: "Drama",
    //       tags: "Coming Of Age",
    //     },
    //   },
    //   {
    //     user: "🙂🙂",
    //     response: {
    //       emotion: "Happiness",
    //       genre: "Slice of Life",
    //       tags: "Cute Girls Doing Cute Things",
    //     },
    //   },
    // ];

    // const messages = [
    //   { role: "system", content: systemPrompt },
    //   ...examples.flatMap(({ user, response }) => [
    //     { role: "user", content: user },
    //     { role: "assistant", content: JSON.stringify(response) },
    //   ]),
    //   { role: "user", content: mood },
    // ];

    // const chatCompletion = await openai.chat.completions.create({
    //   model: "gpt-4-turbo",
    //   messages,
    //   temperature: 0.9,
    //   max_tokens: 256,
    // });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
