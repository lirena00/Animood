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
    const fetchRecommendedAnime = async () => {
      try {
        if (!session) return;

        const accessToken = session.user.token;
        const query = `
          query GetRecommendedAnime {
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

        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const recommendations = data?.data?.Page?.recommendations || [];

        const uniqueRecommendations = filterUniqueRecommendations(recommendations);
        const filteredAnime = filterNonAnime(uniqueRecommendations);

        setRecommended(filteredAnime);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendedAnime();
  }, [session]);

  const filterUniqueRecommendations = (recommendations) => {
    const uniqueIds = new Set();
    return recommendations.filter((recommendation) => {
      if (uniqueIds.has(recommendation.mediaRecommendation.id)) {
        return false;
      }
      uniqueIds.add(recommendation.mediaRecommendation.id);
      return true;
    });
  };

  const filterNonAnime = (recommendations) => {
    return recommendations.filter(
      (recommendation) => recommendation.mediaRecommendation.type !== "MANGA"
    );
  };

  return (
    <>
      <Head>
        <title>Animood | Title</title>
      </Head>

      <Wrapper>
        <main className="flex min-h-screen flex-col z-10 space-y-4 p-4">
          {!session && (
            <div className="h-full w-full justify-center items-center text-white text-xl">
              Sign In To Use This Feature
            </div>
          )}
          {recommended && (
            <>
              <p className="font-semibold text-gray-300 mb-2 relative pl-1 mt-4 text-xl md:text-xl lg:text-2xl">
                <span className="bg-action h-full absolute left-0 top-0 bottom-0 w-1"></span>
                <span className="ml-3 font-semibold">Based on your Anime List</span>
              </p>
              <div className="flex flex-col w-full overflow-hidden">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-7 w-full snap-x overflow-x-hidden py-4 px-3 gap-2 justify-center font-sans transition-all duration-300"
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
