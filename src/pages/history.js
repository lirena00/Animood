import Wrapper from "@/components/wrapper";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import Head from "next/head";
function History() {
  const { data: session} = useSession();
  const [anime,setAnime] = useState(null);
  useEffect(() => {
    if (session) {
      const query=`
      query Q{
        Page(perPage: 10) {
          activities(userId: 5854717, sort: ID_DESC) {
            ... on ListActivity {
              type
              likeCount
              createdAt
              media {
                id
                type
                status(version: 2)
                isAdult
                recommendations {
                  edges {
                    node {
                      id
                      mediaRecommendation {
                        id
                        genres
                        format
                        duration
                        description
                        externalLinks{
                          type
                          icon
                          id 
                          url 
                          color
                        }
                        bannerImage
                        coverImage{
                          large
                          extraLarge
                          medium
                        }
                        meanScore
                        episodes
                        title {
                          romaji
                          english
                          native
                          userPreferred
                        }
                      }                      
                    }
                  }
                }
                bannerImage
                title {
                  userPreferred
                }
                coverImage {
                  large
                }
              }
            }
          }
        }
      }
      
      `     
    
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
      
      for (let i = 0; i < data.data.Page.activities.length; i++) {
        if (data.data.Page.activities[i].type === "ANIME_LIST"  ) {
          const activity = data.data.Page.activities[i];
          setAnime(activity.media);
          break; 
        }
      }
      
    })
}}, [session]);

  return (
<>
<Head>
  <title>Animood | History</title>
  <meta name="title" content="Animood" />
<meta name="description" content="Animood is AI based anime recommendation website which recommends you anime based on your mood, history and overall anime list." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://animood.vercel.app" />
<meta property="og:title" content="Animood" />
<meta property="og:description" content="Animood is AI based anime recommendation website which recommends you anime based on your mood, history and overall anime list." />
<meta property="og:image" content="/animood.jpg" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://animood.vercel.app" />
<meta property="twitter:title" content="Animood" />
<meta property="twitter:description" content="Animood is AI based anime recommendation website which recommends you anime based on your mood, history and overall anime list." />
<meta property="twitter:image" content="/animood.jpg" />
<meta theme-color="#23A9D5" />
</Head>

    <Wrapper>
    <main
      className={` flex min-h-screen flex-col  z-10 justify-between p-4 `}    
    >


    {session?(null):(<div className="h-full w-full justify-center items-center text-white text-xl ">Sign In To Use This Feature</div>)}
     {anime && (
      <>
      <p className="font-semibold text-gray-300 mb-2 relative pl-1 mt-4 text-xl md:text-xl lg:text-2xl ">
        <span className="bg-action h-full absolute left-0 top-0 bottom-0 w-1"></span>
        <span className="ml-3 font-semibold">Because on your recent activity</span>
      </p>
      <div className="flex flex-col w-[100%] overflow-hidden ">
        <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid grid-cols-7  w-full  snap-x   overflow-x-hidden py-4 px-3 gap-2 justify-center font-sans transition-all duration-300 ">
          {anime.recommendations.edges.slice(0,14).map((anime) => ( 
            <Card anime={anime.node.mediaRecommendation} key={anime.node.id} />
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

export default History;

