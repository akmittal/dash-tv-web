import { NextApiRequest, NextApiResponse } from "next";

const HandleLanguages = async (req: NextApiRequest, res: NextApiResponse) => {


  const url = `http://localhost:4000/languages`;
  const result = await fetch(url);
  const body = result.body;
  body?.pipe(res);
};

export default HandleLanguages;
