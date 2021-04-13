import { Flex } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {}

export default function Navbar({}: Props): ReactElement {
  return (
    <Flex>
      <Link to="/" style={{width:"100%"}}><Flex p="2" justifyContent="center" width="full">
        <img src="/logo.png" width="200px" alt="Dash TV Logo" />
      </Flex></Link>
    </Flex>
  );
}
