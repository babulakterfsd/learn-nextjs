/* eslint-disable multiline-ternary */
import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { Todo, TodoType } from '@/types/global.types';
import { GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Movie = ({ todo }: Todo) => {
  const { id, title, completed } = todo;

  return (
    <CommonPagesLayout>
      <Head>
        <title> MovieDB : Todo - {title} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="main-container min-h-screen flex justify-center items-center flex-col">
        <div className="bg-indigo-800 text-white text-center p-4 rounded-md">
          <h1 className="text-xs">{`Todo - ${id}`}</h1>
          <h1 className="font-semibold mb-2">{title}</h1>
          <span
            className={`text-white text-xs font-semibold px-1 rounded-md text-center ${
              todo.completed === true ? 'bg-green-600' : 'bg-indigo-300'
            }`}
          >
            {completed ? 'Completed' : 'Incompleted'}
          </span>
        </div>
        <Link href="/todo">
          <button className="bg-indigo-600 text-white p-4 text-center rounded-md my-6 lg:mb-32">
            Back to Todos
          </button>
        </Link>
      </div>
    </CommonPagesLayout>
  );
};

export default Movie;

export const getStaticProps = async (context: any) => {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params.todoID}`
  );
  const data = await response.json();

  return {
    props: {
      todo: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const todos = await response.json();

  const paths = todos?.map((todo: TodoType) => {
    return {
      params: {
        todoID: `${todo?.id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
