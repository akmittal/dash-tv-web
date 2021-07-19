import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const HandleLanguages = async (req: NextApiRequest, res: NextApiResponse) => {


  const url = `https://holy-wave-2608.fly.dev/languages`;
  const acceptEncoding =Array.isArray(req.headers["accept-encoding"])?req.headers["accept-encoding"][0]:req.headers["accept-encoding"];
  const result = await fetch(url, {headers:{
    "accept-encoding":acceptEncoding??""
  }});
  const body = result.body;
  body?.pipe(res);
};

export default HandleLanguages;
