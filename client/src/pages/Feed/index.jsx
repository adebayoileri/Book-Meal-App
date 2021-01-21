import React, {lazy, useState, useEffect } from "react";
import { Box, chakra, Link, SimpleGrid } from "@chakra-ui/react";
// import {
//     Link as ReactRouterLink
// } from "react-router-dom";
import axios from "axios"
import Header from "../../components/Header";
// import { restaurants } from "../../data/rest";
const RestaurantCard  = lazy(() => import("../../components/RestarauntCard"));
const Container = (props) => (
  <Box w="full" pb="12" pt="3" mx="auto" maxW="1200px" px={6} {...props} />
);

const Feed = () => {
  const [restaurants, setRestaurants] = useState();
  const getAllRestaurants = async () => {
    const response = await axios.get(
      // `https://bookmealapp.herokuapp.com/api/v1/restaurants`
      `https://bookmealapp.herokuapp.com/api/v1/restaurants`
    );
    if(response.status === 200){
      setRestaurants(response.data["data"]);
    }
  };
  useEffect(() =>{
    getAllRestaurants()
  }, [])
  return (
    <>
      <Header />
      <Box mb={2} mt={5} pt="6rem">
        <Box as="section" pb="6rem" id="restaurants">
          <Box maxW="84%" mx="auto" textAlign="left">
            <chakra.h5
              fontSize="3xl"
              letterSpacing="tight"
              fontWeight="bold"
              mb="16px"
              lineHeight="1.2"
            >
              Restaurants
            </chakra.h5>
          </Box>
          <Container>
            <SimpleGrid columns={[1, null, 4]} spacing="30px">
              {restaurants &&
                restaurants.map((rest) => (
                  <Link href={`/r/${rest.vendor_id}`} style={{ textDecoration: "none" }}>
                    <RestaurantCard
                      height={"340px"}
                      key={rest.id}
                      image={rest.image}
                      imageUrl={rest.imageurl}
                      name={rest.name}
                      location={rest.location}
                      rating={rest.rating}
                    />
                  </Link>
                ))}
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default Feed;
