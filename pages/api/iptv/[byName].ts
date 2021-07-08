import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs";
import { promisify } from "util";


const readFileP = promisify(readFile);



const metaPath = path.resolve(__dirname,"..", "_files", "byName.json");
const filepath = path.resolve(__dirname, "..","_files","data.json");



const fetchDataWithLanguages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const name = Array.isArray(req.query.byName)?req.query.byName[0]:req.query.byName;
  const metaFileString = await readFileP(metaPath,"utf-8");
  const fileString = await readFileP(filepath,"utf-8");
  const metaFile = JSON.parse(metaFileString);
  const file= JSON.parse(fileString);
  const channel = file[metaFile[name]]

  
  res.json(channel);
};


export default fetchDataWithLanguages;
