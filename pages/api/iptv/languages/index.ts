import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const HandleLanguages = async (req: NextApiRequest, res: NextApiResponse) => {


  const url = `https://holy-wave-2608.fly.dev/languages`;
  const result = await fetch(url);
  const body = result.body;
  body?.pipe(res);
};

export default HandleLanguages;
