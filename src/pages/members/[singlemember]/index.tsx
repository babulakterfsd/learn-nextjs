/* eslint-disable no-alert */
/* eslint-disable multiline-ternary */
import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { Member } from '@/types/global.types';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const SingleMember = () => {
  const [member, setMember] = useState<Member>({} as Member);
  const [loading, setLoading] = useState(true);
  const { name, email, salary, comment } = member;
  const router = useRouter();
  const { singlemember } = router.query;

  useEffect(() => {
    if (singlemember) {
      axios.get(`/api/members/${singlemember}`).then((res) => {
        setMember(res.data);
        setLoading(false);
      });
    }
  }, [singlemember]);

  const handleDelete = () => {
    axios.delete(`/api/members/${singlemember}`).then((res) => {
      if (res.status === 200) {
        alert('Member deleted successfully!');
        router.push('/members');
      }
    });
  };

  const handleUpdate = () => {
    router.push(`/members/updatemember/${singlemember}`);
  };

  return (
    <CommonPagesLayout>
      <Head>
        <title> MovieDB | {name} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="main-container min-h-screen flex justify-center items-center flex-col">
        {loading ? (
          <h2 className="text-center font-semibold text-red-500 my-12">
            Loading Member's Info...
          </h2>
        ) : (
          <div className="bg-indigo-800 text-white text-center p-4 rounded-md relative min-w-[180px]">
            <div className="absolute left-0 top-0">
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-600 text-lg hover:bg-indigo-400 bg-indigo-800 rounded-sm p-1"
              >
                <MdDelete />
              </button>
            </div>
            <div className="absolute right-0 top-0">
              <button
                type="button"
                onClick={handleUpdate}
                className="text-green-600 text-lg hover:bg-indigo-600 bg-indigo-800 rounded-sm p-1"
              >
                <AiFillEdit />
              </button>
            </div>
            <h1 className="font-semibold mb-2">{name}</h1>
            <p className="text-xs">{email}</p>
            <p className="text-xs">{`$${salary}`}</p>
            <p className="text-xs">{comment}</p>
          </div>
        )}
        <Link href="/members">
          <button className="bg-indigo-600 text-white p-4 text-center rounded-md my-6 lg:mb-32">
            Back to Members
          </button>
        </Link>
      </div>
    </CommonPagesLayout>
  );
};

export default SingleMember;
