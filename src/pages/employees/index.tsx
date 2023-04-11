/* eslint-disable multiline-ternary */
import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { Employee } from '@/types/global.types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('/api/employeesdata').then((res: any) => {
      setEmployees(res.data);
    });
  }, []);

  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | Employees : Your favourite movie portal</title>
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
          Our Employees List
        </h1>
        {
          // eslint-disable-next-line no-nested-ternary
          employees?.length < 1 ? (
            <h2 className="text-center font-semibold text-red-500 my-12">
              No employee found
            </h2>
          ) : (
            <div className="grid grid-cols-12 gap-2 lg:gap-4 my-6">
              {employees.map((employee: Employee) => {
                return (
                  <div className="col-span-12 lg:col-span-3" key={employee.id}>
                    <Link href={`/employees/${employee.id}`}>
                      <div className=" bg-white text-gray-500 rounded-md shadow-md h-32 flex flex-col justify-center items-center text-center px-1.5">
                        <h2 className="text-lg font-semibold text-gray-700">
                          {employee.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {employee.position}
                        </p>
                        <p className="text-sm text-gray-500">{`$${employee.salary}`}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )
        }

        <div className="flex justify-center">
          <Link href="/employees/addemployee">
            <button className="bg-indigo-600 text-white p-4 text-center rounded-md my-6 lg:mb-32">
              Add Employee
            </button>
          </Link>
        </div>
      </div>
    </CommonPagesLayout>
  );
};

export default AllEmployees;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
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
