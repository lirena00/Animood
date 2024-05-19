
![image](https://github.com/LiReNa00/Animood/assets/92094239/d22e1a68-ae71-4e4f-a36a-eeb4bfc604ca)

## Inspiration
One day, I was feeling particularly cheerful and decided to unwind with some anime. Typically, I'd choose something at random, preferring to avoid spoilers and dive into new stories blind. However, on this occasion, my pick didn't align with my upbeat mood, leaving me feeling disconnected from the storyline. Disheartened, I set the series aside for another time.
After few months, I revisited the same anime and found myself surprisingly captivated. It dawned on me that my mood was the missing piece of the puzzle, influencing my perception of the show. Curious if others had similar experiences, I scoured the internet for platforms that recommend anime based on mood, only to find moveme.tv which only recommends movie based on mood. So I took it in my hands and made Animood.

## What it does
Animood is designed to suggest anime based on your mood, history, and overall anime list. Initially focused solely on mood, I expanded its features during development to include these additional aspects, though they're still in the beta phase.

## How I built it
For mood-based recommendations, I structured the prompt for Gemini to recognize mood based on the provided text/emoji. It then returns a JSON response indicating the most suitable tag and genre for the mood. Utilizing this information, search results are gathered from the AniList GraphQL API, and these results are ultimately displayed to the user.

## What I learned
- Through this experience, I gained valuable insights. Firstly, I discovered the profound influence of mood on the enjoyment of entertainment, motivating the development of Animood.

- Secondly, I learned how to craft prompts that minimize errors and enhance efficiency. Additionally, I honed my skills in leveraging generative AI more effectively within my projects.

## What's next for Animood
The next phase of enhancing Animood's recommendations centers on personalization. By delving into the user's genre preferences and viewing history, we aim to tailor suggestions more accurately. Additionally, we'll integrate a similarity percentage feature, akin to Netflix's, to provide users with insights into how closely recommended anime align with their interests. When this will be completed history and overall anime list suggestion will be completed in my opinion.
