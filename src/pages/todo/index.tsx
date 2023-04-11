/* eslint-disable multiline-ternary */
import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { Todos, TodoType } from '@/types/global.types';
import Head from 'next/head';
import Link from 'next/link';

const Todo = ({ todos }: Todos) => {
  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | Todo : Your favourite movie portal</title>
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
          Here is what we gonna provide for our users.
        </h1>
        <div className="text-center text-xs">
          (complerted todos are green, incompleteds are indigo)
        </div>
        <div className="grid grid-cols-12 gap-2 lg:gap-4 my-6">
          {todos.map((todo: TodoType) => {
            return (
              <div className="col-span-12 lg:col-span-3" key={todo.id}>
                <Link href={`/todo/${todo.id}`}>
                  <div
                    className={`text-black p-2 rounded-md text-center cursor-pointer ${
                      todo.completed === true ? 'bg-green-600' : 'bg-indigo-300'
                    }`}
                  >
                    <h1 className="font-bold">{todo.title}</h1>
                    <h4>{todo.completed}</h4>
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

export default Todo;

export async function getServerSideProps() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10`
  );
  const todos = await response.json();

  return {
    props: {
      todos,
    },
  };
}
