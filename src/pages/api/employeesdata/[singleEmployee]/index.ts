// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Employee } from '@/types/global.types';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { singleEmployee } = req.query;
    if (!singleEmployee) {
      res.status(400).json({ message: 'Missing id parameter' });
    } else {
      const allEmployeesInJson = fs.readFileSync('data/employee.json');
      const allEmployees = JSON.parse(allEmployeesInJson.toString());
      const employee = allEmployees.find(
        (singleemployee: Employee) =>
          singleemployee.id.toString() === singleEmployee
      );
      res.status(200).json(employee);
    }
  }
  if (req.method === 'DELETE') {
    const { singleEmployee } = req.query;
    if (!singleEmployee) {
      res.status(400).json({ message: 'Missing id parameter' });
    } else {
      const allEmployeesInJson = fs.readFileSync('data/employee.json');
      const allEmployees = JSON.parse(allEmployeesInJson.toString());
      const employee = allEmployees.find(
        (singleemployee: Employee) =>
          singleemployee.id.toString() === singleEmployee
      );
      const index = allEmployees.indexOf(employee);
      allEmployees.splice(index, 1);
      fs.writeFileSync('data/employee.json', JSON.stringify(allEmployees));
      res.status(200).json({ message: 'Employee deleted successfully!' });
    }
  }
  if (req.method === 'PATCH') {
    const { singleEmployee } = req.query;
    if (!singleEmployee) {
      res.status(400).json({ message: 'Missing id parameter' });
    } else {
      const allEmployeesInJson = fs.readFileSync('data/employee.json');
      const allEmployees = JSON.parse(allEmployeesInJson.toString());
      const employee = allEmployees.find((singleemployee: Employee) => {
        return singleemployee.id.toString() === singleEmployee;
      });
      const index = allEmployees.indexOf(employee);
      const { name, salary, position, comment } = req.body;
      allEmployees[index] = {
        id: +employee.id,
        name,
        salary,
        position,
        comment,
      };
      fs.writeFileSync('data/employee.json', JSON.stringify(allEmployees));
      res.status(200).json({ message: 'Employee updated successfully!' });
    }
  }
}
