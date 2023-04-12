/* eslint-disable no-nested-ternary */
/* eslint-disable multiline-ternary */
import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { Member } from '@/types/global.types';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AllMembers = (props: any) => {
  const { members } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    members !== undefined && setLoading(false);
  }, [members]);

  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | Members : Your favourite movie portal</title>
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
          My Family Members
        </h1>
        {loading ? (
          <h2 className="text-center font-semibold text-red-500 my-12">
            Loading Members...
          </h2>
        ) : // eslint-disable-next-line no-nested-ternary
        members?.length < 1 ? (
          <h2 className="text-center font-semibold text-red-500 my-12">
            No member found
          </h2>
        ) : (
          <div className="grid grid-cols-12 gap-2 lg:gap-4 my-6">
            {members?.map((member: Member) => {
              return (
                <div className="col-span-12 lg:col-span-3" key={member._id}>
                  <Link href={`/members/${member._id}`}>
                    <div className=" bg-white text-gray-500 rounded-md shadow-md h-32 flex flex-col justify-center items-center text-center px-1.5">
                      <h2 className="text-lg font-semibold text-gray-700">
                        {member.name}
                      </h2>
                      <p className="text-sm text-gray-500">{member.email}</p>
                      <p className="text-sm text-gray-500">{`$${member.salary}`}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center">
          <Link href="/members/addmember">
            <button className="bg-indigo-600 text-white p-4 text-center rounded-md my-6 lg:mb-32">
              Add Member
            </button>
          </Link>
        </div>
      </div>
    </CommonPagesLayout>
  );
};

export default AllMembers;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${
          process.env.NEXTAUTH_URL + context?.resolvedUrl
        }`,
        permanent: false,
      },
    };
  }

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`);
  const members = await data.json();

  return {
    props: {
      members: members,
    },
  };
};
