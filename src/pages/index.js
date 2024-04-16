import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/card";
import Typewriter from 'typewriter-effect';
import { CanvasRevealEffectDemo2 } from "@/components/ui/canvas-reveal-effect";
import { useSession } from "next-auth/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import Wrapper from "@/components/wrapper";

export default function Mood() {
  const { data: session} = useSession();
  const [mood, setMood] = useState('');

  const moods = [
    'Romantic 💕',
    'Dreamy 🌙',
    'Tender 💖',
    'Affectionate 😍',
    'Passionate 🔥',
    'Intimate 🌹',
    'Loving ❤️',
    'Enamored 😊',
    'Blissful 🥰',
    'Warm ☺️',
    'Cozy 🛋️',
    'Euphoric 🌟',
    'Ecstatic 🤩',
    'Infatuated 💘',
    'Swooning 😌',
    'Adoring 🌼',
    'Cherished 💞',
    'Sensual 🎇',
    'Devoted 💌',
    'Content 😌',
    'Happy 😊',
    'Delighted 😄',
    'Joyful 😁',
    'Smitten 😻',
    'Grateful 🙏',
    'Amorous 💑',
    'Elated 🥳',
    'Fulfilled 😇',
    'Cuddly 🐻',
    'Sentimental 💭',
    'Peaceful ☮️',
    'Enchanted ✨',
    'Radiant 🌞',
    'Bubbly 🥂',
    'Hopeful 🌼',
    'Fancy 💫',
    'Giddy 🎉',
    'Blushing 😳',
    'Heartfelt 💖',
    'Dreamy ✨',
    'Whimsical 🌈'
  ];
  

  return (
  
    <main
      className={`bg-primary flex min-h-screen flex-col items-center z-10 justify-between p-4 `}
    >
      <div className="flex flex-col w-full  font-mono   space-y-4">
 


        <div className="bg-secondary rounded-xl py-10 px-4 z-10 space-y-2 relative overflow-hidden">

        <div className="h-full w-full absolute  inset-0">
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-black"
                colors={[
                [255, 255, 255],
                  [35, 169, 213],
                  [35, 169, 213],
                  
                ]}
                dotSize={2}
              />
            </div>

<div className="relative z-20">
          <span className="  text-5xl animood pb-6 pt-2 ">
          Animood
        </span>
          <form
            className="w-full flex"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission behavior
              const keyword = e.target.search.value;
              router.push("/search?keyword=" + encodeURIComponent(keyword));
            }}
          >
            <input
              type="text"
              name="search"
              placeholder="Enter your mood"
              className="w-[90%] lg:w-[30%] p-2 rounded-l-md bg-white text-gray-500 outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-action rounded-r-md text-white grid place-items-center"
            >
        <div className="w-7 h-7 outline-none bg-action  text-white ">
<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M192 112a80 80 0 1 1-80-80a80 80 0 0 1 80 80" opacity=".2"></path><path d="m229.66 218.34l-50.06-50.06a88.21 88.21 0 1 0-11.32 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32M40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72"></path></g></svg>
        </div>
          
            </button>
          </form>

<div className="py-2  my-4 gap-1 flex-wrap flex">

        {moods.map((mood, index) => (
 <div key={index} className="text-gray-500 text-sm w-fit rounded-full py-1.5 px-4 bg-white">
  {mood}
 </div>
       
        ))}
     

</div>

          </div>
        </div>



    <div className="grid grid-cols-2 text-white gap-4 justify-between">

        <div className="relative p-4 text-center py-10 text-xl w-full border-white/[0.2] border ">
        <div className="h-full w-full absolute  inset-0">
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-black"
                colors={[
                [255, 255, 255],
                  [35, 169, 213],
                ]}
                dotSize={2}
              />
            </div>
           <span className="z-20 relative text-white">Mood based recommendation</span> 
        </div>

        <div className="relative p-4 py-10 text-xl w-full border-white/[0.2] border ">
        <div className="h-full w-full absolute  inset-0">
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-black"
                colors={[
                [255, 255, 255],
                  [35, 169, 213],
                ]}
                dotSize={2}
              />
            </div>
           <span className="z-20 relative text-white">History based recommendation</span> 
        </div>

        <div className="relative p-4 py-10 text-xl w-full border-white/[0.2] border ">
        <div className="h-full w-full absolute  inset-0">
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-black"
                colors={[
                [255, 255, 255],
                  [35, 169, 213],
                ]}
                dotSize={2}
              />
            </div>
           <span className="z-20 relative text-white">Anime list based recommendation</span> 
        </div>



    </div>
 
 

     </div>
    </main>
 
  );
}
