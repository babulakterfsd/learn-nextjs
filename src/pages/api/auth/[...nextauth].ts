import connectDB from '@/utils/connectDB';
import generateRandomString from '@/utils/randomString';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const client = await connectDB();
        const database = client.db('moviedb');
        const usersCollection = database.collection('users');

        const user = await usersCollection.findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordCorrect = user.password === credentials?.password;

        if (!isPasswordCorrect) {
          throw new Error('Invalid password');
        }

        return user;
      },
    }),
  ],
  session: {
    startegy: 'jwt',
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.SECRET,
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }: any) => {
      const user = token.user as { email: string; password: string };
      session.user = user;
      session.accessToken = generateRandomString();
      return {
        user: session.user,
        accessToken: session.accessToken,
        status: session.status,
        expires: session.expires,
      };
    },

    signIn: async (user: any) => {
      const client = await connectDB();
      const database = client.db('moviedb');
      const usersCollection = database.collection('users');

      const userExists = await usersCollection.findOne({
        email: user?.user?.email,
      });

      if (!userExists) {
        await usersCollection.insertOne({
          email: user?.user?.email,
          password: null,
        });
      }

      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
