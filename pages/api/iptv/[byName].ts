import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const HandleHome = async (req: NextApiRequest, res: NextApiResponse) => {
  const name = Array.isArray(req.query.byName)?req.query.byName[0]:req.query.byName
  const url = `https://holy-wave-2608.fly.dev/channel/${name}`;
  const result = await fetch(url);
  const body = result.body;
  body?.pipe(res);
};

export default HandleHome;
