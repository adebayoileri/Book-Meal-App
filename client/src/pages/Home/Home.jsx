import React from "react";
// import logo from "../../logo.svg";
import { Box, chakra, Flex, Text, Image, SimpleGrid, Center, Button } from "@chakra-ui/react";
import "../index.css";
import Header from "../../components/Header";
import RestarauntCard from "../../components/RestarauntCard";
import Footer from "../../components/Footer";
// import {
//   Link as ReactRouterLink
// } from "react-router-dom";
import {restaurants, rtypes } from "../../data/rest";
const Container = (props) => (
  <Box w="full" pb="12" pt="3" mx="auto" maxW="1200px" px={6} {...props} />
);
export default function Home() {
  return (
    <>
      <Header />
      <Box as="section" pt="12rem" pb="2rem" mb={20} className="landing-box">
        <Container>
          <Box maxW="1200px" mx="auto" textAlign="left">
            <Flex>
              <Box w="400px">
                <chakra.h1
                  fontSize="5xl"
                  letterSpacing="tight"
                  fontWeight="bold"
                  mb="16px"
                  lineHeight="1.2"
                >
                  Book <span style={{ color: "#FF8908" }}>Meal</span> is here to
                  satisfy your need !
                </chakra.h1>
                <Text opacity={0.7} fontSize={{ base: "lg", lg: "xl" }} mt="6">
                  Discover Restaurants near you and get quality meal services
                  rendered to you
                </Text>
              </Box>
              {/* <Box maxW="500px">
              <Image src="https://res.cloudinary.com/codeinstd/image/upload/v1605877886/Group_2_2x_v3cngf.png"/>
            </Box> */}
            </Flex>
          </Box>
        </Container>
      </Box>
      <Box mb={5}>
        <Box as="section" pb="6rem" id="projects">
          <Box maxW="84%" mx="auto" textAlign="left">
            <chakra.h5
              fontSize="3xl"
              letterSpacing="tight"
              fontWeight="bold"
              mb="16px"
              lineHeight="1.2"
            >
              Recommended Restaurants
            </chakra.h5>
          </Box>
          {/* <Container> */}
          <Box maxW="84%" mx="auto">
            <div className="featured-restaraunt">
              {restaurants &&
                restaurants.map((rest, index) => (
                  <RestarauntCard
                    key={index}
                    image={rest.image}
                    name={rest.name}
                    rating={rest.rating}
                  />
                ))}
            </div>
          </Box>
        <Center><Button size="md" as="a" href="/restaurants" background={"#FF8908"} color={"#fff"}>See More Restaurants</Button></Center>
        </Box>
      </Box>
      {/* restarunt near me */}
      <Box mb={2}>
        <Box as="section" pb="6rem" id="projects">
          <Box maxW="84%" mx="auto" textAlign="left">
            <chakra.h5
              fontSize="3xl"
              letterSpacing="tight"
              fontWeight="bold"
              mb="16px"
              lineHeight="1.2"
            >
              Restaraunt Near Me
            </chakra.h5>
          </Box>
          <Container>
            <SimpleGrid columns={[1, null, 3]} spacing="30px">
              {rtypes &&
                rtypes.map((rte, index) => (
                  <Box
                    p="5"
                    maxW="320px"
                    height={"400px"}
                    alignSelf="center"
                    key={index}
                  >
                    <Image src={rte.image} height="180px" />
                    <Text
                      mt={2}
                      fontSize="xl"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {rte.name}
                    </Text>
                  </Box>
                ))}
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
