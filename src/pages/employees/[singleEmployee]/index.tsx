/* eslint-disable no-alert */
/* eslint-disable multiline-ternary */
import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { Employee } from '@/types/global.types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const SingleEmploye = () => {
  const [employee, setEmployee] = useState<Employee>({} as Employee);
  const [loading, setLoading] = useState<boolean>(true);
  const { id, name, position, salary, comment } = employee;
  const router = useRouter();
  const { singleEmployee } = router.query;

  useEffect(() => {
    if (singleEmployee) {
      axios.get(`/api/employeesdata/${singleEmployee}`).then((res) => {
        if (res.data != '') {
          setEmployee(res.data);
          setLoading(false);
        } else {
          setEmployee({} as Employee);
          setLoading(false);
        }
      });
    }
  }, [singleEmployee]);

  const handleDelete = () => {
    axios.delete(`/api/employeesdata/${singleEmployee}`).then((res) => {
      if (res.status === 200) {
        alert('Employee deleted successfully!');
        router.push('/employees');
      }
    });
  };

  const handleUpdate = () => {
    router.push(`/employees/updateemployee/${singleEmployee}`);
  };

  if (loading) {
    return (
      <CommonPagesLayout>
        <div className="main-container min-h-screen flex justify-center items-center flex-col">
          <h1 className="text-2xl font-semibold text-center text-indigo-600">
            Loading...
          </h1>
        </div>
      </CommonPagesLayout>
    );
  }

  return (
    <CommonPagesLayout>
      <Head>
        <title> MovieDB | {name} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="main-container min-h-screen flex justify-center items-center flex-col">
        {employee.name && employee.id ? (
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
            <h1 className="text-xs">{`Employee - ${id}`}</h1>
            <h1 className="font-semibold mb-2">{name}</h1>
            <p className="text-xs">{position}</p>
            <p className="text-xs">{`$${salary}`}</p>
            <p className="text-xs">{comment}</p>
          </div>
        ) : (
          <div className="main-container flex justify-center items-center flex-col">
            <h1 className="text-2xl font-semibold text-center text-red-600">
              No Employee Found with this id!
            </h1>
          </div>
        )}
        <Link href="/employees">
          <button className="bg-indigo-600 text-white p-4 text-center rounded-md my-6 lg:mb-32">
            Back to Employees
          </button>
        </Link>
      </div>
    </CommonPagesLayout>
  );
};

export default SingleEmploye;

export async function getServerSideProps(context: any) {
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

  return {
    props: {
      session,
      // data: session ? 'this' : 'that'
    },
  };
}
