import CommonPagesLayout from '@/layouts/commonPagesLayout';
import Head from 'next/head';
import Link from 'next/link';

const Drama = () => {
  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | Drama : Your favourite movie portal</title>
        <meta
          name="description"
          content="moviedb is a movie portal created by babulakterfsd"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="min-h-screen flex flex-col gap-y-4 justify-center items-center">
        <h1 className="lg:text-xl font-semibold">
          Welcome to Drama Collection !
        </h1>
        <Link href={`/drama/${Math.floor(Math.random() * 30)}`}>
          <button className="bg-indigo-600 text-white px-4 py-2 text-center rounded-md my-6 lg:mb-32">
            Watch Drama
          </button>
        </Link>
      </div>
    </CommonPagesLayout>
  );
};

export default Drama;
