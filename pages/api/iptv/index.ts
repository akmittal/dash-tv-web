import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { stat, readFile, writeFile, existsSync, mkdirSync, fstat } from "fs";
import { promisify } from "util";
import type { Channel } from "../../../src/utils";

const readFileP = promisify(readFile);
const writeFileP = promisify(writeFile);
const statP = promisify(stat);

const filepath = path.resolve(process.cwd(), "_files");
const languagePath = path.resolve(filepath, "languages");

if (!existsSync(languagePath)) {
  mkdirSync(languagePath, { recursive: true });
}
async function fileTooold() {
  try {
    const stats = await statP(`${filepath}/languages/English.json`);
    const now = new Date();
    const diff = Math.abs(now.valueOf() - stats.mtime.valueOf());
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays > 1;
  } catch {
    return true;
  }
}
export async function createItemsIfOld() {
  if (await fileTooold()) {
    console.log("files too old creating");
    await createItems();
  } else {
    console.log("Skipping");
  }
}

const fetchDataWithLanguages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await createItemsIfOld();

  let languages = req.query.language;
  languages = Array.isArray(languages) ? languages : [languages];
  const fullList = [];

  const data = await Promise.all(
    languages.map(async (language) => {
      const fileContent = await readFileP(
        `${filepath}/languages/${language}.json`,
        {
          encoding: "utf-8",
        }
      );
      return JSON.parse(fileContent);
    })
  );
  for (const list of data) {
    fullList.push(...list);
  }
  res.json(fullList);
};

async function createItems() {
  const res = await fetch("https://iptv-org.github.io/iptv/channels.json");
  const json: Channel[] = await res.json();

  const meta: Record<string, Channel[]> = {};
  const metaByName: Record<string, number> = {};

  for (let idx = 0; idx < json.length; idx++) {
    const channel = json[idx];
    metaByName[channel.name] = idx;
    for (const language of channel.languages) {
      if (meta[language.name]) {
        meta[language.name].push(channel);
      } else {
        meta[language.name] = [channel];
      }
    }
  }
  const metaNamePath = path.join(filepath, `byName.json`);
  const dataFilePath = path.join(filepath, `data.json`);
  await writeFileP(metaNamePath, JSON.stringify(metaByName));
  await writeFileP(dataFilePath, JSON.stringify(json));
  for (const languageName in meta) {
    const fullpath = path.join(filepath, "languages", `${languageName}.json`);
    try {
      await writeFileP(fullpath, JSON.stringify(meta[languageName]));
    } catch (err) {
      console.error({ err });
    }
  }
}

export default fetchDataWithLanguages;
