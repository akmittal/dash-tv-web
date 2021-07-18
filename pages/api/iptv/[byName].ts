import { NextApiRequest, NextApiResponse } from "next";

const HandleHome = async (req: NextApiRequest, res: NextApiResponse) => {
  const name = Array.isArray(req.query.byName)?req.query.byName[0]:req.query.byName
  const url = `http://localhost:4000/channel/${name}`;
  const result = await fetch(url);
  const body = result.body;
  body?.pipe(res);
};

export default HandleHome;
