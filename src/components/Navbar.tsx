import { Flex } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import Link from "next/link";

export default function Navbar(): ReactElement {
  return (
    <Flex style={{ width: "100%" }}>
      <Link href="/" >
        <a>
        <Flex p="2" justifyContent="center" width="full">
          <img src="/logo.png" width="35%" height="auto" alt="Dash TV Logo" />
        </Flex>
        </a>
      </Link>
    </Flex>
  );
}
