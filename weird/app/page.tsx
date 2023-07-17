import Image from 'next/image'

import { getChatResponse } from "./api/api";

async function getData (){
  const url = await fetch (
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept:"application/json",
        authorization:process.env.MOVIEDB_API as string,

      },
    }
  );

 


  return url.json();
}

export default function Home() {
  return (
   <div className='bg-white py-6 sn:py-8 lg:py-12 '>
    <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
      <div className='mb-10 md:mb-16'>
        <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>
             Top Trending Movies
        </h2>
        

      </div>
    </div>
   </div>

   
  )
}