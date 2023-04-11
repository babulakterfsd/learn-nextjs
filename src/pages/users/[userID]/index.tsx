import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { User, UserType } from '@/types/global.types';
import { GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// ei component e ami dekhaichi kivabe getStaticPaths e kono path na thakle kivabe loader use korte hoy ar usefallback use korte hoy. ekhane ami path generate korchi 3 ta (slice kore nichi), kintu ami jodi 3 er porer kono user id te acces nei, tailer loading hoye oi data fetch kore niye ashbe. tobe ekhane interesting bepar holo, jodi user page theke link e click kore ashi, taile loading dekhbo na, karon next eta aagei bujhte pare, ar tai json ta aagei ene rakhe. kintu ami jodi 3 er porer kono user ke address bare likhe hit kori, tkhn next oi time e fetch korbe ar loading dekhabe. jemon, 1,2,3 number user ke adrssbare likhe hit kore anleo kintu loading hoye na

const SingleUser = ({ user }: User) => {
  const { id, name, email, phone, website } = user || {};
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="main-container min-h-screen flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | User - {name} : Your favourite movie portal</title>
        <meta
          name="description"
          content="moviedb is a movie portal created by babulakterfsd"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="main-container min-h-screen flex justify-center items-center flex-col">
        <div className="bg-indigo-800 text-white text-center p-4 rounded-md">
          <h1 className="text-xs">{`User - ${id}`}</h1>
          <h1 className="font-semibold mb-2">{name}</h1>
          <h4 className="text-sm">{email}</h4>
          <h4 className="text-sm">{phone}</h4>
          <h4 className="text-sm">{website}</h4>
        </div>
        <Link href="/users">
          <button className="bg-indigo-600 text-white p-4 text-center rounded-md my-6 lg:mb-32">
            Back to users
          </button>
        </Link>
      </div>
    </CommonPagesLayout>
  );
};

export default SingleUser;

export const getStaticProps = async (context: any) => {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userID}`
  );
  const data = await response.json();

  //data na paoa gele 404 marbe
  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await response.json();

  const paths = users.slice(0, 3)?.map((user: UserType) => {
    return {
      params: {
        userID: `${user.id}`,
      },
    };
  });

  return {
    paths,
    fallback: true, // blocking deyar maane hocche nextjs ota server ei generate kore direct html pathabe, kono loading dekhabe na. true er cheye blocking valo
  };
};
