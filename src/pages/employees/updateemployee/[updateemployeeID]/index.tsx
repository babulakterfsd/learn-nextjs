/* eslint-disable no-console */
/* eslint-disable no-alert */
import AuthLayout from '@/layouts/authLayout';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UpdateEmployee = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [comment, setComment] = useState('');

  const router = useRouter();
  const { updateemployeeID } = router.query;

  useEffect(() => {
    if (updateemployeeID) {
      axios
        .get(`/api/employeesdata/${updateemployeeID}`)
        .then((res) => {
          if (res.data != '') {
            setName(res.data.name);
            setPosition(res.data.position);
            setSalary(res.data.salary);
            setComment(res.data.comment);
          } else {
            alert('Employee not found!');
            router.push('/employees');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [updateemployeeID, router]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      name,
      position,
      salary,
      comment,
      id: updateemployeeID,
    };
    axios
      .patch(`/api/employeesdata/${updateemployeeID}`, payload)
      .then((res) => {
        if (res.status === 200) {
          alert('Employee updated successfully!');
          router.push('/employees');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthLayout>
      <div className="main-container min-h-screen my-12">
        <h1 className="text-center lg:text-3xl my-6">Update Employee!</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-3/5 mx-auto"
        >
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="position"
            >
              Position
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="position"
              type="text"
              placeholder="Enter employee position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="salary"
              type="number"
              placeholder="Enter employee salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              placeholder="Enter employee comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Employee
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between flex-col gap-y-2 lg:flex-row">
          <Link href="/employees">
            <button
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Back to Employees
            </button>
          </Link>
          <Link href="/">
            <button
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UpdateEmployee;

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
