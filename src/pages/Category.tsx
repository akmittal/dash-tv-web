import { Spinner } from "@chakra-ui/spinner";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import Category from "../components/Category";

import { fetchData, getChannelByCategory } from "../utils";

import { Helmet } from "react-helmet";

import { useParams } from "react-router";
import { Heading } from "@chakra-ui/layout";

interface Props {
  selectedLanguages: string[];
}
interface Params {
  name: string;
}

export default function CategoryPage({
  selectedLanguages,
}: Props): ReactElement {
  const { isLoading, error, data } = useQuery("data", fetchData, {
    staleTime: 1000 * 60 * 60,
  });

  const params = useParams<Params>();
  const category = params.name;

  if (isLoading) return <Spinner />;

  if (error) return <>'An error has occurred: ' + error.message</>;

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
