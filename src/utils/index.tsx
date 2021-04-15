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
const channelIncudesLanguage = (channel: Channel, languages: string[]) => {
  return channel.languages
    .map((lang) => lang.name)
    .some((val) => languages.includes(val));
};

export const getCategories = (data: Channel[], languages: string[]) => {
  return Array.from(
    new Set(
      data
        .filter(
          (channel) =>
            channel.category !== "XXX" &&
            channelIncudesLanguage(channel, languages)
        )
        .map((channel) => channel.category)
    )
  );
};

export const getChannelByCategory = (
  data: Channel[],
  category: string,
  languages: string[]
) => {
  return data.filter(
    (channel) =>
      channel.category !== "XXX" &&
      channel.category === category &&
      channelIncudesLanguage(channel, languages)
  );
};

export const getLanguages = (channels: Channel[]): Language[] => {
  const languageCodes = new Set();
  const languages = [];
  for (const channel of channels) {
    for (const language of channel.languages) {
      if (!languageCodes.has(language.code)) {
        languageCodes.add(language.code);
        languages.push(language);
      }
    }
  }
  return languages;
};
