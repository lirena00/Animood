import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from 'react';
import Modal from './modal';

function Card({ anime }) {
  const [ismodal, setIsmodal] = useState(false);
  const rating = (anime.meanScore / 10).toFixed(1) || 'N/A';
  const handleClickOutside = () => {
    setIsmodal(false);
  };

  const handleClickInside = (event) => {
    // Prevent the click event from bubbling up to the backdrop div
    event.stopPropagation();
  };

  const variants= {
    initial: {
      opacity: 0,
    },
  
    animate: {
      opacity: 1,
    },
  
    exit: {
      opacity: 0,
    },
  };
  


  const card = useRef()
  const blob = useRef()

  const onMouseMove = useCallback((e) => {
    if (!card.current || !blob.current) return
    const { clientX, clientY } = e
    const cardRect = card.current.getBoundingClientRect()
    const blobRect = blob.current.getBoundingClientRect()

    blob.current.animate(
      {
        transform: `translate(${clientX - cardRect.left - blobRect.width / 2}px, ${clientY - cardRect.top - blobRect.height / 2}px)`,
      },
      {
        duration: 100,
        fill: 'forwards'
      }
    )
  },[])

  useEffect(() => {
    card.current?.addEventListener('mousemove', onMouseMove)
    return () => {
      card.current?.removeEventListener('mousemove', onMouseMove)
    }
  }, [])


  let title =  anime.title.userPreferred
  if (title.length > 32)
    title = `${title.substr(0, 32)}...`

  return (
<>


      <div ref={card} 
      onClick={setIsmodal.bind(this,true)}
      className=' hover:flex-grow snap-start group flex-shrink-0 h-full w-full overflow-hidden relative isolate  p-[1px] bg-transparent backdrop-blur-0 [&:hover>.inner]:bg-primary/90  [&:hover>.inner>.card]:scale-[0.88] [&:hover>.blob]:opacity-100 rounded-[calc(0.5rem+1px)]'>
        <div ref={blob} className="blob"></div>
        <div className='inner z-1 h-full w-full rounded-lg'>
          <div className='card rounded-md h-full w-full overflow-hidden transition-all duration-200'>
            <div className='relative transition-all duration- h-full duration-200  '>
              <motion.div
               variants={variants}
               animate="animate"
               exit="exit"
               initial="initial"
               transition={[0.83, 0, 0.17, 1]}             
              className="relative aspect-[2/3]   ">
                <Image
                  src={anime.coverImage.extraLarge}
                  alt="Cover Image"
                  width={200}
                  height={200}
                  className="transition-opacity duration-300 2xl:w-full select-none  h-full object-cover rounded-md"
                />

              </motion.div>

              <div className='font-medium text-sm text-white py-1'>
                {title}
              </div>
              <span className="absolute top-2 left-2 bg-primary rounded-md px-2 py-1 flex items-center text-xs space-x-1.5 text-gray-400">
              {((anime.meanScore)/10).toFixed(1)}
              </span>

              <span className='absolute top-2 right-2 px-2 py-1  bg-primary text-gray-400 rounded-md text-xs '>EP {anime.episodes}</span>

            </div>
          </div>
        </div>
      </div>
 
 
      <div 
  onClick={handleClickOutside}
  className={`${ismodal ? 'visible' : 'invisible'} transition-all duration-300 fixed backdrop-blur-lg top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center`}
>
  <div onClick={handleClickInside} className={`w-[95%] lg:w-[60%] transition-all duration-300 ${ismodal?'scale-100':'scale-0'}`}>
    <Modal anime={anime} />
  </div>
</div>


      </>
  );
}

export default Card;

/*
hover:w-[400px]
group-hover:opacity-0 
w-[150px]
group-hover:aspect-[16/9]
                <Image 
                  src={anime.bannerImage || "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1-OquNCNB6srGe.jpg"}
                  alt="Banner Image"
                  layout='fill'
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md absolute inset-0 object-cover "
                />
*/