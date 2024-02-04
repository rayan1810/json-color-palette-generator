// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { colorShades, arrayToObject } from "../../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { color, name, size, diff, configType }: any = req.query;
  let colorObj: any = {};
  if (configType === "flattened") {
    colorObj = arrayToObject(colorShades(`#${color}`, size, diff), name);
  } else {
    colorObj[name] = arrayToObject(colorShades(`#${color}`, size, diff));
  }
  res.status(200).json({ ...colorObj });
}
