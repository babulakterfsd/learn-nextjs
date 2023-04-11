// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json('Running MovieDB Server');
}

/*
api routes e banano api gula front end e getStaticProps, getServerSideProps, getStaticPaths er vitor fetch korte parbo na. development mood e kaj hobe, kintu build korte gelei error dibe. karon oi function gula run hoy build time e, ar api route gula run hoy request time e.

*/
