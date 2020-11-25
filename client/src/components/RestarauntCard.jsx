import React from "react";
import { Box, Flex, Badge, Text, Image } from "@chakra-ui/react";

const RestarauntCard = (props) => {
  return (
    <Box
      p="5"
      maxW="320px"
      height={props.height || "400px"}
      borderWidth="1px"
      className="card"
    >
      <Image borderRadius="md" src={props.image || props.imageUrl} />
      <Flex align="baseline" mt={2}>
        <Badge colorScheme="pink">NEW</Badge>
      </Flex>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {props.name}
      </Text>
      <Flex mt={2} align="center">
        {/* <Box as={MdStar} color="orange.400" /> */}
        <Text ml={1} fontSize="sm">
          <b>{props.location}</b>
        </Text>
      </Flex>
    </Box>
  );
};
export default RestarauntCard;
