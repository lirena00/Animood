import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CURRENT_VERSION = "1.1.0"; // Replace with the actual current version

const ChangeLog = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Check if the popup has been shown for the current version
    const versionShown = localStorage.getItem('version');
    if (versionShown !== CURRENT_VERSION) {
      setShowPopup(true);

      // Mark the popup as shown for the current version
      localStorage.setItem('version', CURRENT_VERSION);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="popup-container fixed top-1/2 w-[90%] z-50  md:w-[75vh]  left-1/2 transform -translate-x-1/2 -translate-y-1/2
    
    py-2 rounded-md  
    ">
      <div className=" bg-secondary/90 backdrop-blur-xl rounded-lg shadow-lg p-4  border-t-2 border-action">
        <div className='mx-auto w-full flex justify-center'>
        <span className="  text-5xl animood  pt-2 ">Animood</span>
        </div>


        <div className='text-center py-5 text-gray-300 text-sm'>
  This is our first update since the initial release, and we are excited to hear your feedback and suggestions! You can share them on our 
  <Link href="https://www.producthunt.com/posts/animood" target="_blank" rel="noopener noreferrer" className='underline decoration-action'> Producthunt </Link> 
  page or join the discussion on our 
  <Link href="https://discord.com/invite/X9VejqEG2Z" target="_blank" rel="noopener noreferrer" className='underline decoration-action'> Discord server </Link>. 
  We would also appreciate your support with upvotes on 
  <Link href="https://www.producthunt.com/posts/animood" target="_blank" rel="noopener noreferrer" className='underline decoration-action'> Producthunt </Link> 
  and stars on 
  <Link href="https://github.com/LiReNa00/Animood" target="_blank" rel="noopener noreferrer" className='underline decoration-action'> Github </Link>.
</div>


        <div className="relative flex py-2 items-center">
    <div className="flex-grow border-t border-gray-300"></div>
    <span className="flex-shrink mx-4 text-gray-300 text-lg">Changelogs v{CURRENT_VERSION}</span>
    <div className="flex-grow border-t border-gray-300"></div>
</div>


        <ul className='text-gray-300 w-max-sm text-sm my-1 list-disc pl-2'>
        

<li> Moods on homepage are more varied. </li>
<li>Added Sort By option on Mood page, before it was only sorting by trending.</li>
<li>Changed font to Comfortaa from Montserrat.</li>
<li>AnimeList and History based recommendations are now marked as beta.</li>
<li>Added link to producthunt and discord in header.</li>


</ul>

        <button className='mx-auto block w-full bg-primary rounded-sm border-2 border-action m-2 p-1 text-white' onClick={handleClose}>Close</button>
        <span className='text-white text-xs mx-auto justify-center flex gap-1 w-full'>Made with ❤️ by <a href="https://github.com/LiReNa00" target='_blank' rel="noopener noreferrer">Lirena</a></span>
      </div>
    </div>
  );
};

export default ChangeLog;

/*
<div className='p-2 text-gray-300 mx-auto text-center'>See all changelogs <Link className='text-action' href="/changelogs">here</Link> </div>
*/