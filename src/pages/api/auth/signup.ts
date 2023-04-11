import { DataFromDB } from '@/types/global.types';
import connectDB from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataFromDB>
) {
  const client = await connectDB();
  const database = client.db('moviedb');
  const usersCollection = database.collection('users');
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;

        const existingUser = await database
          .collection('users')
          .findOne({ email: email });

        if (existingUser?.email === email) {
          res.status(200).json({ message: 'User already exists' });
          return;
        }

        if (!email || !email.includes('@') || password?.length < 6) {
          res.status(200).json({ message: 'Email or Password is not valid' });
          return;
        } else {
          const user = await usersCollection.insertOne({
            email,
            password,
          });
          res
            .status(201)
            .json({ message: 'User created successfully', data: user });
        }
      } catch (error) {
        res.status(500).json({ message: 'user creating failed in db' });
      }
      break;

    default:
      res.status(502).json({ message: 'Bad Gateway' });
  }
}
