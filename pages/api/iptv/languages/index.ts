import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { readdir } from "fs";
import { promisify } from "util";
import { createItemsIfOld } from "..";

const readdirP = promisify(readdir);

const metaPath = path.resolve(process.cwd(), "_files","languages");

const fetchDataWithLanguages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await createItemsIfOld()
  const files = await readdirP(metaPath);
  res.json(files.map((file) => file.replace(".json", "")));
};

export default fetchDataWithLanguages;
