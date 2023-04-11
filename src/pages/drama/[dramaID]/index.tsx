import CommonPagesLayout from '@/layouts/commonPagesLayout';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const SingleDrama = () => {
  const searchParams = useSearchParams();
  const dramaId = searchParams.get('dramaID');
  const router = useRouter();

  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | Drama - {dramaId} : Your favourite movie portal</title>
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
          Drama {dramaId} is very good and it's rating is 9.5/10 !
        </h1>
        <div className="flex gap-x-4">
          <button
            className="bg-indigo-600 text-white px-4 py-2 text-center rounded-md my-6 lg:mb-32"
            onClick={() => router.push('/drama')}
          >
            Back to Drama
          </button>
          <Link
            href={`/drama/${dramaId}/review/${Math.floor(Math.random() * 30)}`}
          >
            <button className="bg-indigo-600 text-white px-4 py-2 text-center rounded-md my-6 lg:mb-32">
              Watch Drama {dramaId} Review
            </button>
          </Link>
        </div>
      </div>
    </CommonPagesLayout>
  );
};

export default SingleDrama;
