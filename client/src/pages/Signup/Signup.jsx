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
  Text,
  Link,
} from "@chakra-ui/react";
import "../index.css";

// const baseUrl = `http://localhost:8080/api/v1/auth/`;

export default function SignUp() {
  const [user, setUser] = React.useState({
    first_name: null,
    last_name: null,
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

  const PostSignIn = async () => {
    setSubmitted(true);
    await axios
      .post(`auth/signup`, {
        ...user,
        role: "customer",
      })
      .then((result) => {
        console.log({ result });
        if (result.status === 201) {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          // console.log(result);
          setAuthTokens(result.data);
          setIsLoggedIn(true);
          setSubmitted(false);
        }
      })
      .catch((err) => {
        setSubmitted(false);
        err.response.data["message"]["details"] &&
          err.response.data["message"]["details"].map((msg) =>
            toast({
              title: "An error occurred.",
              description: msg?.message,
              status: "error",
              duration: 9000,
              isClosable: true,
            })
          );
        console.log({ err });
      });
  };
  if (isLoggedIn) {
    // return (window.location.href = "/dashboard");
    console.log("sucess");
  }

  return (
    <>
      <Box as="section" pt="4rem" className="login-page">
        <Box w="full" pt="3" mx="auto" maxW="1200px" px={6} bg="white">
          <Box maxW="760px" mx="auto" textAlign="center">
            <chakra.h2 fontSize="5xl">Create An Account</chakra.h2>
            <Stack spacing="3">
              <FormControl id="first-name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  focusBorderColor="orange.400"
                  placeholder="First name"
                  value={user.first_name}
                  onChange={handleFieldChange("first_name")}
                />
              </FormControl>
              <FormControl id="last-name" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  focusBorderColor="orange.400"
                  placeholder="Last name"
                  value={user.last_name}
                  onChange={handleFieldChange("last_name")}
                />
              </FormControl>
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
              onClick={() => {
                PostSignIn();
              }}
              disabled={
                !user.first_name ||
                !user.last_name ||
                !user.email ||
                !user.password
              }
              isLoading={submitted}
              type="submit"
            >
              Submit
            </Button>
            <Text mt="2">
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#FF8908" }}>
                Login
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
