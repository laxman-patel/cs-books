import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        zIndex={3}
        height="20"
        width="full"
        bgColor="gray.100"
        position="sticky"
        top={"100%"}
      >
        <Text>
          Proudly made with ❤️ for <b>Krapa Shankar</b> Sir
        </Text>
      </Flex>
    </>
  );
};

export default Footer;
