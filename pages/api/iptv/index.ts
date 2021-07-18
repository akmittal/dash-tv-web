import { NextApiRequest, NextApiResponse } from "next";

const HandleHome = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = new URLSearchParams();
  for (const key in req.query) {
    if(Array.isArray(req.query[key])){
      for(const value of req.query[key]){
        params.append(
          key,
          value
        );
      }
    }else{
      params.set(
        key,
        req.query[key]
      );
    }

    
  }

  const url = `https://shy-sea-8296.fly.dev/channels?${params.toString()}`;
  const result = await fetch(url);
  const body = result.body;
  body?.pipe(res);
};

export default HandleHome;
