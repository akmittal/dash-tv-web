import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const proxy =  async (req:NextApiRequest, res:NextApiResponse) => {
    const single =Array.isArray(req.query.url)?req.query.url[0]:req.query.url;
    const url = decodeURIComponent(single);
    const result = await fetch(url);
    const body = await result.body;
    body.pipe(res);
  };

  export default proxy;