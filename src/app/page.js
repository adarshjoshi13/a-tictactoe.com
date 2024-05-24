import React from 'react';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/solid';


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <Link href="/modes/PlayWithFriend">
        <div className="rounded-lg border-4 border-blue-600 hover:border-blue-800 transition duration-300 mb-6 p-4">
          <p className="text-3xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">
            Play With Friend
          </p>
        </div>
      </Link>

      <Link href="/modes/PlayWithBot">
        <div className="rounded-lg border-4 border-red-600 hover:border-red-800 transition duration-300 mb-6 p-4">
          <p className="text-3xl text-center font-bold text-red-600 hover:text-red-800 transition duration-300">
            Play With Bot
            <br></br>
            (HARDEST)
          </p>
        </div>
      </Link>

      <div className="rounded-lg border-4 border-purple-600 hover:border-purple-800 transition duration-300 mb-6 p-4 flex items-center justify-center">
        <LockClosedIcon className="w-8 h-8 text-black-600 mr-2" />
        <p className="text-2xl text-center font-bold text-purple-600 hover:text-purple-800 transition duration-300">
          Play With Stranger
          <br></br>
          (COMING SOON)
        </p>
      </div>

    </div>
  );
}
