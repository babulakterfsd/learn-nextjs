import CommonPagesLayout from '@/layouts/commonPagesLayout';
import Head from 'next/head';
import useSWR from 'swr';

const fetcher = async (...args: any) => {
  // let myArgs: any = [...args];
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();

  return data;
};

const Contributors = () => {
  const { data, error, isLoading } = useSWR(`contributors`, fetcher, {
    //   refreshInterval: 10,
  });

  let returningJsx: React.ReactElement = <div></div>;

  if (isLoading) {
    returningJsx = (
      <div className="flex justify-center items-center">
        <p>Loading....</p>
      </div>
    );
  }

  if (error) {
    returningJsx = (
      <div className="flex justify-center items-center">
        <p>Something Wrong Happend !</p>
      </div>
    );
  }
  if (data) {
    returningJsx = data?.map((d: { name: string; email: string }) => (
      <div
        key={Math.random() * 9}
        className="bg-indigo-500 text-white  text-center p-2 rounded-md col-span-12 lg:col-span-3"
      >
        <h3 className="font-semibold">{d.name}</h3>
        <p className="text-xs">{d.email}</p>
      </div>
    ));
  }

  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | Contributors : Your favourite movie portal</title>
        <meta
          name="description"
          content="moviedb is a movie portal created by babulakterfsd"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="min-h-screen text-center">
        <h1 className="font-semibold mt-12 text-2xl underline">
          Our Dedicated Contributors
        </h1>
        <div className="grid grid-cols-12 gap-6 my-6 justify-center items-center">
          {returningJsx}
        </div>
      </div>
    </CommonPagesLayout>
  );
};

export default Contributors;
