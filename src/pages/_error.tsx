/* eslint-disable no-nested-ternary */
/* eslint-disable multiline-ternary */
import AuthLayout from '@/layouts/authLayout';
import Link from 'next/link';

const Error = ({ statusCode }: { statusCode: number }) => {
  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col gap-y-6 justify-center items-center">
        <h1 className="text-2xl font-semibold text-red-400">
          {!statusCode
            ? `An error occured in client`
            : statusCode === 404
            ? `Page Not Found !`
            : `${statusCode} - An error occured in the server`}
        </h1>
        <Link href="/">
          <button className="bg-indigo-600 text-white p-2 text-center rounded-md">
            Back to Home
          </button>
        </Link>
      </div>
    </AuthLayout>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
