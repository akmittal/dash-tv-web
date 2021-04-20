
import { Spinner } from "@chakra-ui/spinner";
import React, { ReactElement, useMemo } from "react";
import { useQuery } from "react-query";
import Category from "../components/Category";

import {
  fetchData,
  getCategories,
  getChannelByCategory,

} from "../utils";


import { Helmet } from "react-helmet";

interface Props {
  selectedLanguages:string[]
}

export default function Home({selectedLanguages}: Props): ReactElement {
  
  const { isLoading, error, data } = useQuery("data", fetchData, {
    staleTime: 1000 * 60 * 60,
  });

  const categories = useMemo(() => getCategories(data, selectedLanguages), [data, selectedLanguages]);

  if (isLoading) return <Spinner />;

  if (error) return <>'An error has occurred: ' + error.message</>;

  return (
    <div>
       <Helmet>
        <title>Watch 5000+ TV channels live Free </title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      
     
      {categories.map((category) => (
        <Category
          name={category}
          key={category}
          channels={getChannelByCategory(data, category, selectedLanguages)}
        />
      ))}
    </div>
  );
}
