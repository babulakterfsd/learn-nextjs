import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();

  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB : Your favourite movie portal</title>
        <meta
          name="description"
          content="moviedb is a movie portal created by babulakterfsd"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>

      <main>
        <div className="min-h-screen">
          <h1 className="text-2xl font-semibold mt-8 text-center">
            <span>Welcome to MovieDB !</span>
          </h1>
          <div className="text-center">
            <span className="text-transparent text-md bg-clip-text bg-gradient-to-r from-red-700 to-indigo-700  font-extrabold">
              {session?.user?.email}
            </span>
          </div>
          <div className="flex-wrap lg:flex-nowrap flex justify-around items-center mt-6 lg:mt-14 gap-y-8">
            <Image
              src="/assets/images/pk.jpg"
              height="500"
              width="500"
              alt="pk"
              data-aos="zoom-in"
              data-aos-duration="4500"
            />

            <div
              data-aos="zoom-in"
              data-aos-duration="4500"
              className="bg-white text-slate-400 rounded-md p-4"
            >
              <h3 className="text-md font-bold my-2">
                Search movie as you need
              </h3>
              <ol className="list-disc list-inside text-sm ">
                <li>Nested Route</li>
                <li>Dynamic Route</li>
                <li>Private Route / Public Route</li>
                <li>Authentication</li>
                <li>Data fetching</li>
                <li>State management with contextAPI</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </CommonPagesLayout>
  );
}
