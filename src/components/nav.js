import Link from "next/link";
import { useState } from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Nav() {
  const { data: session} = useSession();
     
  return (
    <>
    <nav className=" flex border-r-white  items-center bg-secondary/50 z-50 backdrop-blur-xl w-full fixed top-0 left-0   gap-4 p-2 text-left">

 <motion.div  
initial={{ x:-20, opacity: 0 }}
whileInView={{ x:0,y:0 , opacity: 1 }}
transition={{ duration: 0.1 }}

 className={` absolute top-full z-50 -left-1 hidden lg:block `}>
 <ul className="w-[72px] bg-secondary/50 p-1 gap-2 flex flex-col items-center font-medium  h-screen  text-sm card text-white  py-2 transition-all duration-300">
<Link href="/mood">
<li className="hover:bg-primary w-[68px] p-2 mx-auto flex flex-col gap-2 items-center text-white transition-all duration-120 border-action hover:border-l-4 ">
<svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 16 16"><path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25a.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"></path></svg>
Mood
</li>
</Link>

<Link href="/anilist">
<li className="hover:bg-primary w-[68px] p-2 mx-auto flex flex-col gap-2 items-center text-white transition-all duration-120 border-action hover:border-l-4 ">
<svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24"><path fill="currentColor" d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5l-.057-.165L11.84 3.736c.106-.502.46-.788 1.053-.788h2.422c.71 0 1.1.391 1.1 1.1v12.38H22.9c.71 0 1.1.392 1.1 1.101zM11.034 2.947l6.337 18.104h-4.918l-1.052-3.131H6.019l-1.077 3.131H0L6.361 2.948h4.673zm-.66 10.96l-1.69-5.014l-1.541 5.015h3.23z"></path></svg>
AL
</li>
</Link>

<Link href="/history">
<li className="hover:bg-primary text-center w-[68px] p-2 mx-auto flex flex-col gap-2 items-center text-white transition-all duration-120 border-action hover:border-l-4 ">
<svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"></path><path stroke-linejoin="round" d="M12 9v4h4"></path><circle cx="12" cy="12" r="10" stroke-dasharray=".5 3.5"></circle></g></svg>
History
</li>
</Link>

<Link href="/">
<li className="hover:bg-primary w-[68px] p-2 mx-auto flex flex-col gap-2 items-center text-white transition-all duration-120 border-action hover:border-l-4 ">
<svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m.05 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m.1-14.3q.625 0 1.088.4t.462 1q0 .55-.337.975t-.763.8q-.575.5-1.012 1.1t-.438 1.35q0 .35.263.588t.612.237q.375 0 .638-.25t.337-.625q.1-.525.45-.937t.75-.788q.575-.55.988-1.2t.412-1.45q0-1.275-1.037-2.087T12.1 6q-.95 0-1.812.4T8.975 7.625q-.175.3-.112.638t.337.512q.35.2.725.125t.625-.425q.275-.375.688-.575t.862-.2"></path></svg>
FAQ
</li>
</Link>


</ul>
</motion.div>

<span className="text-3xl px-2  animood font-mono select-none" >
  <Link href="/"> 
Animood
  </Link>
  </span>
   


{session? (
              <div className="w-[2.125rem] h-[2.125rem] absolute right-2  flex flex-col items-center group ">
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/profile/${session?.user.name}`)
                  }
                  className="rounded-md border-action border-2 bg-primary overflow-hidden"
                >
                  <Image
                    src={session?.user.image.medium}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                  />
                </button>
                <ul className="bg-secondary/50 absolute text-sm z-50 w-36 right-0 text-left top-10 text-gray-300 shadow-2xl opacity-0  py-2 rounded  font-light invisible group-hover:visible group-hover:opacity-100 duration-300 transition-all grid  gap-1">
                 

                  <li className="hover:bg-primary  transition-all duration-120 border-action hover:border-l-4 ">
                  <button
                    type="button"
                    className=" w-full h-full p-2"
                    onClick={() => signOut("AniListProvider")}
                  >
                    Log out
                  </button>
                  </li>
                </ul>

              </div>
            ) : (
              <button
                type="button"
                onClick={() => signIn("AniListProvider")}
                title="Login With AniList"
                className="w-9.5 h-9.5 bg-primary border-2 absolute right-2  border-action rounded-md overflow-hidden"
              >
                <Image
                  className="h-7 w-7 object-cover"
                  width={0}
                  height={0}
                  src={`https://avatar.vercel.sh/1`}
                  alt="pfp"
                />
              </button>
            )}

</nav>
<motion.div  
initial={{ y:-20, opacity: 0 }}
whileInView={{ x:0,y:0 , opacity: 1 }}
transition={{ duration: 0.1 }}

 className={` fixed top-auto z-50 backdrop-blur-lg  bottom-0 w-full block lg:hidden `}>
 <ul className=" bg-secondary/50 p-1 px-4  gap-2 flex justify-between items-center font-medium h-[72px] text-sm card text-white  py-2 transition-all duration-300">
<Link href="/">
<li className="hover:bg-primary w-[68px] p-2 mx-auto flex flex-col gap-2 items-center text-white transition-all duration-120 border-action hover:border-b-4 ">
<svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"></path></svg>
Home
</li>
</Link>


<Link href="/">
<li className="hover:bg-primary w-[68px] p-2 mx-auto flex flex-col gap-2 items-center text-white transition-all duration-120 border-action hover:border-b-4 ">
<svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M9.739.85c.183-.835 1.374-.84 1.564-.005l.01.04l.017.077c.22.934.975 1.648 1.922 1.812c.872.152.872 1.404 0 1.556a2.396 2.396 0 0 0-1.925 1.827l-.024.103c-.19.834-1.38.83-1.564-.007l-.02-.088a2.38 2.38 0 0 0-1.917-1.836c-.87-.152-.87-1.402 0-1.553A2.38 2.38 0 0 0 9.718.948l.014-.064zM8.658 6.398A1.294 1.294 0 0 0 7.625 5.4v7.215a2.998 2.998 0 0 0 5.204-.85a3.016 3.016 0 0 1-.778-.183c-.595-.224-1.242-.665-1.773-1.436a.625.625 0 0 1 1.03-.709c.382.555.82.839 1.183.975c.184.07.348.1.476.11l.023.002C13.61 9.85 14 8.546 14 7.457c0-.734-.177-1.458-.483-2.072l-.079.015c-.52.09-.934.484-1.051.998l-.024.102c-.448 1.967-3.255 1.955-3.686-.016zM6.375 4.615a1.963 1.963 0 0 1 0-2.127v-.52a2.618 2.618 0 0 0-4.612 1.698v.002c.039.39.198.68.382.89c.229.261.47.368.527.38a.625.625 0 1 1-.277 1.22c-.36-.083-.82-.355-1.19-.775a2.813 2.813 0 0 1-.383-.562C.312 5.526 0 6.483 0 7.457c0 .735.178 1.568.483 2.238c.08-.09.167-.172.26-.244a.625.625 0 1 1 .774.98c-.178.141-.364.444-.478.795a2.997 2.997 0 0 0 5.336 1.389v-3.67a2.69 2.69 0 0 1-1.405.585a.625.625 0 1 1-.139-1.243c.509-.056.879-.349 1.143-.734c.268-.39.384-.818.401-1.023z" clipRule="evenodd"></path></svg>
AI 
</li>
</Link>


<Link href="/">
<li className="hover:bg-primary w-[68px] p-2 mx-auto flex flex-col gap-2 items-center text-white transition-all duration-120 border-action hover:border-b-4 ">
<svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m.05 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m.1-14.3q.625 0 1.088.4t.462 1q0 .55-.337.975t-.763.8q-.575.5-1.012 1.1t-.438 1.35q0 .35.263.588t.612.237q.375 0 .638-.25t.337-.625q.1-.525.45-.937t.75-.788q.575-.55.988-1.2t.412-1.45q0-1.275-1.037-2.087T12.1 6q-.95 0-1.812.4T8.975 7.625q-.175.3-.112.638t.337.512q.35.2.725.125t.625-.425q.275-.375.688-.575t.862-.2"></path></svg>
FAQ
</li>
</Link>


</ul>
</motion.div>

</>
  );
}