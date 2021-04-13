
import { Spinner } from "@chakra-ui/spinner";
import React, { ReactElement } from "react";
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
  
  const { isLoading, error, data } = useQuery("data", fetchData);
  if (isLoading) return <Spinner />;

  if (error) return <>'An error has occurred: ' + error.message</>;

  return (
    <div>
       <Helmet>
        <title>Watch 5000+ TV channels live Free </title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      
     
      {getCategories(data, selectedLanguages).map((category) => (
        <Category
          name={category}
          channels={getChannelByCategory(data, category, selectedLanguages)}
        />
      ))}
    </div>
  );
}
