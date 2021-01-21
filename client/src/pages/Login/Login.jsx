import React from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  chakra,
  Stack,
  Button,
  useToast,
  // Alert,
  // AlertIcon,
  Link,
  Text,
} from "@chakra-ui/react";
import "../index.css";
require("dotenv").config();

// const baseUrl = `https://bookmealapp.herokuapp.com/api/v1/auth/`;
// const localServer = `https://bookmealapp.herokuapp.com/api/v1/`;
export default function Login() {
  const [user, setUser] = React.useState({
    email: null,
    password: null,
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const toast = useToast();

  const handleFieldChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };
  const { setAuthTokens } = useAuth();

  const PostLogin = async () => {
    setSubmitted(true);
    await axios
      // .post(`https://bookmealapp.herokuapp.com/api/v1/auth/login`, {
    .post(`https://bookmealapp.herokuapp.com/api/v1/auth/login`, {

        ...user,
      })
      .then((result) => {
        // console.log({ result });
        if (result.status === 200) {
          toast({
            title: "Login Sucessful.",
            description: "You will be redirect to your dashboard",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setAuthTokens(result.data);
          setIsLoggedIn(true);
          setSubmitted(false);
        }
      })
      .catch((err) => {
        setSubmitted(false);

        toast({
          title: "An error occurred.",
          description: "Please ensure you enter a valid email and password",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        console.log({ err });
      });
  };
  if (isLoggedIn) {
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
    console.log("sucess");
  }
  return (
    <>
      <Box as="section" pt="6rem" className="login-page">
        <Box w="full" pb="12" pt="3" mx="auto" maxW="1200px" px={6} bg="white">
          <Box maxW="760px" mx="auto" textAlign="center">
            <chakra.h2 fontSize="5xl">Login</chakra.h2>
            {/* <Alert status="info">
              <AlertIcon />
              Here to test ?{" "}
              <span role="img" aria-label="wink">
                😉{" "}
              </span>{" "}
              email : ade@g.com password: password
            </Alert> */}

            <Stack spacing="3">
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  errorBorderColor="red.500"
                  focusBorderColor="orange.400"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleFieldChange("email")}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  focusBorderColor="orange.400"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleFieldChange("password")}
                />
              </FormControl>
            </Stack>
            <Button
              mt={4}
              style={{ background: "#FF8908", color: "white" }}
              variant="solid"
              w="60%"
              disabled={!user.email || !user.password}
              onClick={() => {
                PostLogin();
              }}
              isLoading={submitted}
              type="submit"
            >
              Login
            </Button>
            <Text mt="2">
              Don't have an account?{" "}
              <Link href="/signup" style={{ color: "#FF8908" }}>
                Create one
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
