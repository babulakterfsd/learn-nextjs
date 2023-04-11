import CommonPagesLayout from '@/layouts/commonPagesLayout';
import Head from 'next/head';

const About = () => {
  return (
    <CommonPagesLayout>
      <Head>
        <title>MovieDB | About : Your favourite movie portal</title>
        <meta
          name="description"
          content="moviedb is a movie portal created by babulakterfsd"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Babul Akter | babulakterfsd" />
        <link rel="icon" href="/assets/images/fav.png" />
      </Head>
      <div className="min-h-screen flex justify-center items-center">
        <div>
          <h1>Moviedb About Page</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            repudiandae molestiae, blanditiis officia harum hic tempora corporis
            reprehenderit, eaque quibusdam soluta excepturi nam eius quae
            voluptas aut voluptatem! Aliquid, fugit.
          </p>
        </div>
      </div>
    </CommonPagesLayout>
  );
};

export default About;
