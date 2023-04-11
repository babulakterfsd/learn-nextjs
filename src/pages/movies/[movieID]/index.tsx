import CommonPagesLayout from '@/layouts/commonPagesLayout';
import { MovieProps, SingleMovie } from '@/types/global.types';
import { GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Movie = ({ movie }: SingleMovie) => {
  const {
    title,
    overview,
    production_companies,
    backdrop_path,
    genres,
    status,
  } = movie;
  const imagePath = 'https://image.tmdb.org/t/p/original';

  return (
    <CommonPagesLayout>
      <Head>
        <title> MovieDB : {title} </title>
        <meta name="description" content={overview} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="flex flex-col justify-center items-center">
        <div className="min-h-screen flex flex-col lg:flex-row mt-8 lg:gap-x-16 lg:items-center gap-y-6">
          <Image
            src={imagePath + backdrop_path}
            alt={title}
            height="500"
            width="500"
            className="w-full lg:w-5/6 rounded-md lg:rounded-none"
            data-aos="zoom-in"
            data-aos-duration="4500"
          />
          <div
            className="bg-slate-300 text-slate-600 rounded-md shadow-sm p-8 relative w-full"
            data-aos="zoom-in"
            data-aos-duration="4500"
          >
            <h3 className="text-4xl font-semibold text-center">{title} </h3>
            <div className="text-center text-red-600 font-semibold">
              <span className="text-xs mb-14">{`A film by ${production_companies?.[0]?.name}`}</span>
            </div>
            <span
              style={{
                position: 'absolute',
                top: '20px',
                left: '10px',
                textAlign: 'center',
                padding: '2px',
                background: '#2faa58',
                color: '#fff',
                transform: 'rotate(-45deg) translateY(-15px) translateX(-5px)',
                textShadow: ``,
              }}
              className="rounded-lg text-xs"
            >
              {status}
            </span>{' '}
            <div className="my-6 mx-auto text-center">
              <p className="">{overview}</p>
            </div>
            <div className="flex justify-center gap-x-3">
              {genres?.map((g: { id: string; name: string }) => (
                <span
                  key={g.id}
                  className="bg-indigo-500 text-white px-1 py-0.5 text-xs rounded-md"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link href="/movies">
          <button className="bg-indigo-600 text-white p-4 text-center rounded-md my-6 lg:mb-32">
            Back to Movies
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
    `https://api.themoviedb.org/3/movie/${params?.movieID}?api_key=a13358bebd02c9fa5bbb19b0a3b42f36`
  );
  const data = await response.json();

  return {
    props: {
      movie: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=a13358bebd02c9fa5bbb19b0a3b42f36`
  );
  const movies = await response.json();

  const paths = movies?.results?.map((movie: MovieProps) => {
    return {
      params: {
        movieID: `${movie?.id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
