import React from "react";
import { Box, Icon, chakra, Image, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/client";

const Hero = () => {
  const bg = useColorModeValue("white", "gray.800");
  const [session] = useSession();

  return (
    <>
      <Box pos="relative" overflow="hidden" bg={bg} mt={{ lg: 100, base: 10 }}>
        <Box maxW="7xl" mx="auto">
          <Box
            pos="relative"
            pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
            maxW={{ lg: "2xl" }}
            w={{ lg: "full" }}
            zIndex={1}
            bg={bg}
            border="solid 1px transparent"
          >
            <Icon
              display={{ base: "none", lg: "block" }}
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              h="full"
              w={48}
              color={bg}
              transform="translateX(50%)"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,00" />
            </Icon>
            <Box
              mx="auto"
              maxW={{ base: "7xl" }}
              px={{ base: 4, sm: 6, lg: 8 }}
              mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
            >
              <Box
                w="full"
                textAlign={{ sm: "center", lg: "left" }}
                justifyContent="center"
                alignItems="center"
              >
                <chakra.h1
                  fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                  letterSpacing="tight"
                  lineHeight="short"
                  fontWeight="extrabold"
                  color={useColorModeValue("gray.900", "white")}
                >
                  <chakra.span display={{ base: "block", xl: "inline" }}>
                    Welcome to the Future of E-learning!
                  </chakra.span>
                </chakra.h1>
                <chakra.p
                  mt={{ base: 3, sm: 5, md: 5 }}
                  fontSize={{ sm: "lg", md: "xl" }}
                  maxW={{ sm: "xl" }}
                  mx={{ sm: "auto", lg: 0 }}
                  color="gray.500"
                >
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </chakra.p>
                <Box
                  mt={{ base: 5, sm: 8 }}
                  display={{ sm: "flex" }}
                  justifyContent={{ sm: "center", lg: "start" }}
                  fontWeight="extrabold"
                  fontFamily="fantasy"
                >
                  <Box rounded="full" shadow="md">
                    <Link href="/courses" passHref>
                      <chakra.a
                        w="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="solid 1px transparent"
                        fontSize={{ base: "md", md: "lg" }}
                        rounded="md"
                        color="white"
                        bg="orange.500"
                        _hover={{ bg: "orange.600" }}
                        px={{ base: 8, md: 10 }}
                        py={{ base: 3, md: 4 }}
                      >
                        Start Learning
                      </chakra.a>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          position={{ lg: "absolute" }}
          top={{ lg: 0 }}
          bottom={{ lg: 0 }}
          right={{ lg: 0 }}
          w={{ lg: "50%" }}
        >
          <Image
            h={[56, 72, 96, "full"]}
            w="full"
            fit="cover"
            src="/hero.jpg"
            alt=""
            loading="lazy"
          />
        </Box>
      </Box>
    </>
  );
};

export default Hero;
