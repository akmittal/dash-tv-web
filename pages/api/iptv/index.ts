import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const HandleHome = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = new URLSearchParams();
  for (const key in req.query) {
    const queryValue = req.query[key]
   
   
    if(Array.isArray(queryValue)){
      for(const value of queryValue){
        params.append(
          key,
          value
        );
      }
    }else{
      params.set(
        key,queryValue
        
      );
    }

    
  }

  const url = `https://holy-wave-2608.fly.dev/channels?${params.toString()}`;
  const result = await fetch(url);
  const body = result.body;
  body?.pipe(res);
};

export default HandleHome;
