import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "@/components/card";
export default function Home() {

  const [mood, setMood] = useState('');
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/gemini?mood=${encodeURIComponent(mood)}`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data) // Handle the response data here, such as updating state or displaying it on the page
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  useEffect(() => {
    if (response) {

      //request anilist graphql api to get anime data
      const query = `
      query Q {
        Page(perPage: 32) {
          media(sort: POPULARITY_DESC type: ANIME tag:"${response.tags}" genre:"${response.genre}" ) {
            id
            title {
              romaji
              english
              userPreferred
            }
            description
            genres
            format
            duration
            episodes
            bannerImage
            episodes
            meanScore
            externalLinks {
              id
              url
              icon
              color
              type     
            }
            coverImage {
              large
              extraLarge
            }
          }
        }
      }
      `;

      fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
   //       Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: query,
        }),
      })  
      .then((response) => response.json())
      .then((data) => {
        
        console.log(data.data.Page.media)
        setData(data.data.Page.media)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  }, [response]);

  return (
    <main
      className={`bg-primary flex min-h-screen flex-col items-center z-10 justify-between p-4 `}
    >
      <div className="flex flex-col w-full items-center justify-between font-mono text-sm  space-y-4">
        <span className="  text-5xl animood pb-6 pt-2 ">
          Animood
        </span>

        <div className="font-bold text-5xl w-full mx-auto justify-center flex">
            <mark className="inline-block px-2 pb-[14px] text-white bg-action leading-[0.125em]">
              I want to Feel Like
            </mark>

        </div>

        <form onSubmit={handleSubmit} className="flex  items-center justify-center relative w-[50%]">
          
      <input 
        type="text" 
        name="mood" 
        placeholder="Enter your mood" 
        value={mood} 
        className="w-full px-4 py-2.5 outline-none text-gray-400 rounded-l-lg"
        onChange={handleMoodChange} 
      />
      <button type="submit">
        <div className="w-10 h-10 outline-none bg-action rounded-r-lg">
j
        </div>
      </button>
    </form>

{data && data.length > 0 && (
  <div className="flex flex-col w-[100%] overflow-hidden">
    <div className="flex w-full  snap-x   overflow-x-hidden py-4 px-3 gap-2 justify-center font-sans transition-all duration-300 ">
      {data.slice(0,8).map((anime) => (
        
<Card anime={anime} key={anime.id} />
      ))}
    </div>

    <div className="flex w-full snap-x  overflow-x-hidden py-4 px-3 gap-2 justify-center font-sans transition-all duration-300 ">
      {data.slice(9,17).map((anime) => (
        
<Card anime={anime} key={anime.id} />
      ))}
    </div>

  </div>
)}

     </div>

     <div style={{ filter:'blur(100px)'}} className="w-[550px] h-[550px] bg-action rounded-full translate-y-1/2 -z-[1] fixed bottom-0">

     </div>
    </main>
  );
}

