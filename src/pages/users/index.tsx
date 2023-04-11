import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { Users, UserType } from '@/types/global.types';
import Head from 'next/head';
import Link from 'next/link';

const TestApis = ({ users }: Users) => {
  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | All Users : Your favourite movie portal</title>
        <meta
          name="description"
          content="moviedb is a movie portal created by babulakterfsd"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="main-container min-h-screen">
        <h1 className="text-center lg:text-xl mt-16 underline">
          All of Our Users
        </h1>
        <div className="grid grid-cols-12 gap-2 lg:gap-4 my-6">
          {users.map((user: UserType) => {
            return (
              <div className="col-span-12 lg:col-span-3" key={user.id}>
                <Link href={`/users/${user.id}`}>
                  <div className=" bg-indigo-300 text-black p-2 rounded-md text-center cursor-pointer">
                    <h1 className="font-bold">{user.name}</h1>
                    <h4>{user.email}</h4>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </CommonPagesLayout>
  );
};

export default TestApis;

export async function getStaticProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}
