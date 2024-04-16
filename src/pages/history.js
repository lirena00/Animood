import Wrapper from "@/components/wrapper";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "@/components/card";
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

    <Wrapper>
    <main
      className={` flex min-h-screen flex-col  z-10 justify-between p-4 `}    
    >

     {anime && (
      <>
      <p className="font-semibold text-gray-300 mb-2 relative pl-1 mt-4 text-xl md:text-xl lg:text-2xl ">
        <span className="bg-action h-full absolute left-0 top-0 bottom-0 w-1"></span>
        <span className="ml-3 font-semibold">Because on your recent activity</span>
      </p>
      <div className="flex flex-col w-[100%] overflow-hidden ">
        <div className="grid grid-cols-7  w-full  snap-x   overflow-x-hidden py-4 px-3 gap-2 justify-center font-sans transition-all duration-300 ">
          {anime.recommendations.edges.slice(0,14).map((anime) => ( 
            <Card anime={anime.node.mediaRecommendation} key={anime.node.id} />
          ))}
        </div>
        </div>
        </>
      )}
    

</main>
</Wrapper>
  );
}

export default History;

