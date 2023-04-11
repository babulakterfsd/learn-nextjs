import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'data/employee.json');
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData.toString());
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'error happened' });
    }
  }
  if (req.method === 'POST') {
    const { name, salary, position, comment, id } = req.body;
    const formData = { name, salary, position, comment, id };
    const filePath = path.join(process.cwd(), 'data/employee.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());
    if (data.length > 0) {
      const lastId = data[data.length - 1].id;
      formData.id = +lastId + 1;
      data.push(formData);
    } else {
      formData.id = 1;
      data.push(formData);
    }
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Form submitted successfully' });
  }
}
