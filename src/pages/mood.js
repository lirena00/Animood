import { useEffect, useState } from "react";
import Card from "@/components/card";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Wrapper from "@/components/wrapper";
import Head from "next/head";

export default function Mood(res) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("");
  const [response, setResponse] = useState(null);
  const [sort, setSort] = useState("TRENDING_DESC");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (res) {
      const { data } = res;
      setResponse(data);
    }
  }, [res]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `/api/gpt?mood=${encodeURIComponent(mood)}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  useEffect(() => {
    if (response) {
      var accessToken = "";
      if (session) {
        accessToken = session.user.token;
      }
      const headers = session
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        : {
            "Content-Type": "application/json",
          };
      const query = `
      query Q {
        Page(perPage: 48) {
          media(sort: ${sort} type: ANIME tag:"${response.tags}" genre:"${
        response.genre
      }" isAdult:false ${session ? "onList:false" : ""} ) {
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
        headers: headers,
        body: JSON.stringify({
          query: query,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.data.Page.media);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [response, session, sort]);

  return (
    <>
      <Head>
        <title>Animood | Mood</title>
        <meta name="title" content="Animood" />
      </Head>

      <Wrapper>
        <main
          className={`bg-primary flex min-h-screen flex-col items-center z-10 space-y-4 p-4 `}
        >
          <div className="flex flex-col w-full items-center justify-between  text-sm  space-y-4">
            <span className="  text-5xl animood pb-6 pt-2 ">Animood</span>

            <div className="font-bold text-3xl lg:text-5xl  w-full mx-auto justify-center flex">
              <mark className="inline-block px-2 pb-[14px] text-white bg-action leading-[0.125em]">
                I want to Feel Like
              </mark>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex  items-center justify-center relative w-[95%] lg:w-[50%]"
            >
              <input
                type="text"
                name="mood"
                placeholder="Enter your mood"
                value={mood}
                className="w-full px-4 py-2.5 outline-none text-gray-400 rounded-l-lg"
                onChange={handleMoodChange}
              />
              <button type="submit">
                <div className="w-10 h-10 outline-none bg-action rounded-r-lg text-white grid place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 256 256"
                  >
                    <g fill="currentColor">
                      <path
                        d="M192 112a80 80 0 1 1-80-80a80 80 0 0 1 80 80"
                        opacity=".2"
                      ></path>
                      <path d="m229.66 218.34l-50.06-50.06a88.21 88.21 0 1 0-11.32 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32M40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72"></path>
                    </g>
                  </svg>
                </div>
              </button>
            </form>

            {loading && (
              <div className="grid place-items-center text-xl text-white">
                <Typewriter
                  options={{
                    strings: ["Summoning Onii-chan...", "Fetching data..."],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
              </div>
            )}

            {data && data.length > 0 && (
              <div className="relative space-y-4">
                <div className="flex gap-2 absolute right-3  items-center">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-transparent text-base text-gray-300 outline-none px-2 py-1 text-semibold"
                  >
                    <option value="TRENDING_DESC">Trending</option>
                    <option value="POPULARITY_DESC">Popularity</option>
                    <option value="SCORE_DESC">Score</option>
                  </select>
                </div>
                <div className="flex flex-col w-[100%] overflow-hidden ">
                  <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8  w-full  snap-x   overflow-x-hidden py-4 px-3 gap-2 justify-center font-sans transition-all duration-300 "
                  >
                    {data.map((anime) => (
                      <Card anime={anime} key={anime.id} />
                    ))}
                  </motion.section>
                </div>
              </div>
            )}
          </div>
        </main>
      </Wrapper>
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    var mood = context.query.mood;
    if (!mood) {
      return {
        props: {
          data: null,
        },
      };
    }
  } catch (e) {
    return {
      props: {
        data: null,
      },
    };
  }
  const req = context.req;
  const baseUrl = req ? `http://${req.headers.host}` : "";
  const response = await fetch(
    `${baseUrl}/api/gpt?mood=${encodeURIComponent(mood)}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};
