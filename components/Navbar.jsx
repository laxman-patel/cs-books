import React from "react";
import {
  chakra,
  Flex,
  VisuallyHidden,
  HStack,
  Button,
  Box,
  IconButton,
  VStack,
  CloseButton,
  useColorModeValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const NavBar = () => {
  const mobileNav = useDisclosure();
  const [session, loading] = useSession();

  return (
    <>
      <chakra.header
        bg={"gray.100"}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="outline"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <Link href="/" passHref>
              <chakra.a
                title="Sharda classes"
                display="flex"
                alignItems="center"
              >
                <>
                  <img src="/logo.svg" width="150" />
                  <VisuallyHidden>Sharda classes</VisuallyHidden>
                </>
              </chakra.a>
            </Link>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={10}
              mr={10}
              color="gray.700"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Link href="/">
                <Button leftIcon={<AiOutlineHome />} variant="link">
                  Home
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="link" leftIcon={<AiOutlineVideoCamera />}>
                  Courses
                </Button>
              </Link>
            </HStack>
            {session?.user ? (
              <>
                <Menu>
                  <MenuButton>
                    <Avatar
                      name={session.user.name}
                      size="sm"
                      src={session.user.image}
                    />
                  </MenuButton>
                  <MenuList zIndex={3}>
                    <MenuGroup title="Profile">
                      <MenuItem>{session.user.name}</MenuItem>
                      <MenuItem>{session.user.email}</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Actions">
                      <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Button onClick={() => signIn()} colorScheme="orange" size="sm">
                  Log in
                </Button>
              </>
            )}
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={"gray.100"}
                spacing={3}
                rounded="sm"
                shadow="sm"
                zIndex={2}
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                  colorScheme="gray"
                />
                <Link href="/">
                  <Button
                    w="full"
                    color={"gray.700"}
                    leftIcon={<AiOutlineHome />}
                    variant="ghost"
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button
                    w="full"
                    leftIcon={<AiOutlineVideoCamera />}
                    variant="ghost"
                  >
                    Courses
                  </Button>
                </Link>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
};

export default NavBar;
