/* eslint-disable no-console */
/* eslint-disable no-alert */
import AuthLayout from '@/layouts/authLayout';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const AddMember = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload = { name, email, salary, comment };
    axios
      .post('/api/members', payload)
      .then((res) => {
        if (res.status === 201) {
          alert('Member created successfully!');
          setLoading(false);
          router.push('/members');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <AuthLayout>
      <div className="main-container min-h-screen my-12">
        <h1 className="text-center lg:text-3xl my-6">Add A Member!</h1>
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
              placeholder="Enter member name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter member email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter member salary"
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
              placeholder="Enter member comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              Add Member
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between flex-col gap-y-2 lg:flex-row">
          <Link href="/members">
            <button
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Back to Members
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

export default AddMember;
