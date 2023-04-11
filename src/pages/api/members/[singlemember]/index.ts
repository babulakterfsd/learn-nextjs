import { DataFromDB, Member } from '@/types/global.types';
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
  const { singlemember } = req.query;
  switch (method) {
    case 'GET':
      if (!singlemember) {
        res.status(400).json({ message: 'Missing id parameter' });
      } else {
        try {
          const members = await memberCollection.find().toArray();
          const member = members.find(
            (sm: Member) => sm._id.toString() === singlemember
          );
          res.status(200).json(member);
        } catch (error) {
          console.log({ message: 'Something went wrong' });
        }
      }
      break;

    case 'PUT':
      if (!singlemember) {
        res.status(400).json({ message: 'Missing id parameter' });
      } else {
        try {
          const { name, email, salary, comment } = req.body;
          const members = await memberCollection.find().toArray();
          const member = members.find(
            (sm: Member) => sm._id.toString() === singlemember
          );
          const index = members.indexOf(member);
          members[index] = {
            _id: member._id,
            name,
            email,
            salary,
            comment,
          };
          await memberCollection.updateOne(
            { _id: member._id },
            { $set: members[index] }
          );
          res.status(200).json({ message: 'Member updated successfully!' });
        } catch (error) {
          console.log({
            message: 'Something went wrong while updating member',
          });
        }
      }
      break;

    case 'DELETE':
      if (!singlemember) {
        res.status(400).json({ message: 'Missing id parameter' });
      } else {
        try {
          const members = await memberCollection.find().toArray();
          const member = members.find(
            (sm: Member) => sm._id.toString() === singlemember
          );
          await memberCollection.deleteOne({ _id: member._id });
          res.status(200).json({ message: 'Member deleted successfully!' });
        } catch (error) {
          console.log({
            message: 'Something went wrong while deleting member',
          });
        }
      }
      break;

    default:
      res.status(502).json({ message: 'Bad Gateway' });
  }
}
