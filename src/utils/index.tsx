
export interface Channel {
  name: string;
  logo: string;
  url: string;
  category: string;
  languages: Language[];
  countries: Country[];
  tvg: TVG;
}
export interface Language {
  code: string;
  name: string;
}
interface Country {
  code: string;
  name: string;
}
interface TVG {
  id: string;
  name: string;
  url: any;
}
export const fetchData = () => {
  return fetch("https://iptv-org.github.io/iptv/channels.json").then((res) =>
    res.json()
  );
};
export const fetchDataWithLanguages = (languages?:string[]) => {
  if(!languages){
    languages = ["English"]
  }
  const params = new URLSearchParams();
  for (const language of languages){
    params.append("language", language)
  }

  return fetch(`http://localhost:3000/api/iptv?${params.toString()}`).then((res) =>
    res.json()
  );
};

export const fetchDataWithName = (name:string) => {
  return fetch(`http://localhost:3000/api/iptv/${name}`).then((res) =>
  res.json()
);
}

export const fetchAllLanguages = () => {
  return fetch(`http://localhost:3000/api/iptv/languages`).then((res) =>
  res.json()
);
}




export const getCategories = (data: Channel[], ) => {
  return Array.from(
    new Set(
      data
        .filter(
          (channel) =>
            channel.category !== "XXX"
        )
        .map((channel) => channel.category)
    )
  );
};

export const getChannelByCategory = (
  data: Channel[],
  category: string,
  
) => {
  return data.filter(
    (channel) =>
      channel.category === category &&
      channel.category !== "XXX"
  );
};
