import React from "react";
import {
  chakra,
  Flex,
  HStack,
  Text,
  Link,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useAuth } from "../context/auth";
import { logOut } from "../utils";

const HeaderContent = (props) => {
  const { authTokens } = useAuth();
  return (
    <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
      <Flex align="center">
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          aria-label="Back to homepage"
        >
          <Text fontSize="22px">
            <Image src="https://res.cloudinary.com/adebayo/image/upload/c_scale,w_194/v1605887684/Logo_2x_f9hm4x_igpicv.png" />
          </Text>
        </Link>
      </Flex>

      <Flex maxW="720px" align="center">
        {authTokens ? (
          // <Link href="/dashboard" style={{ textDecoration: "none" }}>
          //   <Button
          //     style={{ background: "#FF8908", color: "white" }}
          //     variant="solid"
          //   >
          //     Dashboard
          //   </Button>
          // </Link>
          <Menu>
            <MenuButton as={Button} background={"#FF8908"} color={"#fff"}>
              Account
            </MenuButton>
            <MenuList background={"white"}>
              <MenuGroup title="Profile">
                <MenuItem as={Link} href="/dashboard">
                  Dashboard
                </MenuItem>
                <MenuItem as={Link} href="/restaurants">
                  Restaurants
                </MenuItem>
                <MenuItem as={Link} href="/dashboard">
                  My Account
                </MenuItem>
                <MenuItem as="button" onClick={() => logOut()}>Log out</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button
                style={{ background: "#FF8908", color: "white" }}
                variant="solid"
              >
                Login
              </Button>
            </Link>
            <HStack
              spacing="5"
              as="nav"
              ml="24px"
              display={{ base: "none", md: "flex" }}
            >
              <Link href="/signup" style={{ textDecoration: "none" }}>
                Create Account
              </Link>
            </HStack>
          </>
        )}
      </Flex>
    </Flex>
  );
};

const Header = (props) => {
  return (
    <chakra.header
      pos="fixed"
      top="0"
      zIndex="1"
      bg="white"
      left="0"
      right="0"
      borderBottomWidth="1px"
      width="full"
      {...props}
    >
      <chakra.div height="4.5rem" mx="auto" maxW="1200px">
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  );
};

export default Header;
