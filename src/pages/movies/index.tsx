import Movie from '@/components/singleMovie';
import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { CustomMovie, Movies } from '@/types/global.types';
import Head from 'next/head';

const Movies = ({ movies }: Movies) => {
  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | Movies : Your favourite movie portal</title>
        <meta
          name="description"
          content="moviedb is a movie portal created by babulakterfsd"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="min-h-screen">
        <div
          className="grid grid-cols-12 lg:gap-x-4 overflow-y-auto "
          data-aos="zoom-in"
          data-aos-duration="4500"
        >
          <div className="col-span-12 lg:col-span-3 bg-slate-600 text-white py-10 flex flex-col gap-y-3 text-center h-96 my-10 rounded-md">
            <span className="hover:text-indigo-400 cursor-pointer">
              Popular
            </span>
            <span className="hover:text-indigo-400 cursor-pointer">
              Top Rated
            </span>
          </div>
          <div className="col-span-12 lg:col-span-9 grid lg:grid-cols-4 gap-6 my-6 lg:my-12 ">
            {movies?.slice(0, 100)?.map((singleMovie: CustomMovie) => {
              const { id, title, poster_path, release_date } = singleMovie;

              return (
                <Movie
                  key={id}
                  id={id}
                  title={title}
                  poster_path={poster_path}
                  release_date={release_date}
                />
              );
            })}
          </div>
        </div>
      </div>
    </CommonPagesLayout>
  );
};

export default Movies;

export const getStaticProps = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=a13358bebd02c9fa5bbb19b0a3b42f36`
  );

  const data = await response.json();

  return {
    props: {
      movies: data.results,
    },
  };
};
