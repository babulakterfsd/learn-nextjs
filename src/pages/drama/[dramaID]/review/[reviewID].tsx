import CommonPagesLayout from '@/layouts/commonPagesLayout';
import Head from 'next/head';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SingleDrama = () => {
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('reviewID');
  const dramaId = searchParams.get('dramaID');
  const router = useRouter();
  const path = usePathname();
  // console.log(path);

  return (
    <CommonPagesLayout>
      <Head>
        <title>
          MovieDB | Review {reviewId} of Drama {dramaId} : Your favourite movie
          portal
        </title>
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
          Review {reviewId} of Drama {dramaId}
        </h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 text-center rounded-md my-6 lg:mb-32"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </CommonPagesLayout>
  );
};

export default SingleDrama;
