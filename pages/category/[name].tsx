import { Spinner } from "@chakra-ui/spinner";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import Category from "../../src/components/Category";

import { fetchData, getChannelByCategory } from "../../src/utils";

import { Helmet } from "react-helmet";


import { Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";

interface Props {
  selectedLanguages: string[];
  data:any
}
interface Params {
  name: string;
}

export default function CategoryPage({
  selectedLanguages,data
}: Props): ReactElement {

  const router = useRouter();
  let {name:category} = router.query;
  if(Array.isArray(category)){
    category = category[0];
  }

  return (
    <>
      <Helmet>
        <title>Watch 5000+ TV channels live Free </title>
        <meta name="description" content="Watch TV channels live for free" />
        <meta
          name="keywords"
          content="watch tv, tv channels, stream, free tv, AAJ tak, HBO, 9XM"
        />
      </Helmet>
      <Heading>{category?category:"Others"}</Heading>
      <Category
        name={category}
        key={category}
        channels={getChannelByCategory(data, category, selectedLanguages)}
      />
    </>
  );
}
