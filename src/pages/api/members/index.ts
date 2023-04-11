import { DataFromDB } from '@/types/global.types';
import connectDB from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataFromDB>
) {
  const client = await connectDB();
  const database = client.db('moviedb');
  const memberCollection = database.collection('members');
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const members = await memberCollection.find().toArray();
        res.status(200).json(members);
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;
    case 'POST':
      try {
        const { name, email, salary, comment } = req.body;
        const member = await memberCollection.insertOne({
          name,
          email,
          salary,
          comment,
        });
        res
          .status(201)
          .json({ message: 'Member added successfully', data: member });
      } catch (error) {
        res.status(500).json({ message: 'Member adding failed on db' });
      }
      break;

    default:
      res.status(502).json({ message: 'Bad Gateway' });
  }
}
