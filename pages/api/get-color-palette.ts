// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { colorShades, arrayToObject } from "../../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { color, name, size, diff }: any = req.query;
  let colorObj: any = {};
  colorObj[name] = arrayToObject(colorShades(`#${color}`, size, diff));
  res.status(200).json({ ...colorObj });
}
