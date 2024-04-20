import Wrapper from "@/components/wrapper";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/card";
import Head from "next/head";
function Anilist() {
  const { data: session } = useSession();
  const [recommended, setRecommended] = useState(null);
  useEffect(() => {
    if (session) {
      const accessToken = session.user.token;
      const query = `
      query Q {
        Page(perPage: 35) {
          recommendations(sort: ID_DESC, onList: true) {
            id
            
            mediaRecommendation {
              id
              duration 
              type
              genres
              externalLinks {
                type
                icon
                id
                url
                color
              }
              description
              format
              episodes
              meanScore
              coverImage {
                extraLarge
                large
                medium
                color
              }
              title {
                romaji
                english
                userPreferred
              }
        
            }
          }
        }
      }
      `;

      fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: query,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const reco = data.data.Page.recommendations;
          const filteredRecommendations =
            reco && Array.isArray(reco)
              ? reco.filter(
                  (recommendation) =>
                    recommendation.mediaRecommendation.type !== "MANGA"
                )
              : [];

          const uniqueRecommendationIds = new Set();

          // Filter out duplicates from the recommendations array
          const filteredData = filteredRecommendations.filter(
            (recommendation) => {
              // Check if the ID is already in the set
              if (
                uniqueRecommendationIds.has(
                  recommendation.mediaRecommendation.id
                )
              ) {
                // If it's a duplicate, return false to exclude it from the filtered array
                return false;
              }
              // If it's not a duplicate, add the ID to the set and return true
              uniqueRecommendationIds.add(
                recommendation.mediaRecommendation.id
              );
              return true;
            }
          );
          setRecommended(filteredData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Animood | Title</title>
      </Head>

      <Wrapper>
        <main className={` flex min-h-screen flex-col  z-10 space-y-4 p-4 `}>
          {session ? null : (
            <div className="h-full w-full justify-center items-center text-white text-xl ">
              Sign In To Use This Feature
            </div>
          )}
          {recommended && (
            <>
              <p className="font-semibold text-gray-300 mb-2 relative pl-1 mt-4 text-xl md:text-xl lg:text-2xl ">
                <span className="bg-action h-full absolute left-0 top-0 bottom-0 w-1"></span>
                <span className="ml-3 font-semibold">
                  Based on your Anime List
                </span>
              </p>
              <div className="flex flex-col w-[100%] overflow-hidden ">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-7  w-full  snap-x   overflow-x-hidden py-4 px-3 gap-2 justify-center font-sans transition-all duration-300 "
                >
                  {recommended.map((anime) => (
                    <Card anime={anime.mediaRecommendation} key={anime.id} />
                  ))}
                </motion.div>
              </div>
            </>
          )}
        </main>
      </Wrapper>
    </>
  );
}

export default Anilist;
