import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useCart } from "../context";

const MenuCard = (props) => {
  const { setCartItems } = useCart();
  const addToCart = (data) => {
    // console.log(data)
    setCartItems(data);
    toast({
      title: "Added to cart",
      description: `${data.name} has been added to your cart`,
      status: "success",
      duration: 2600,
      isClosable: true,
    });
  };

  const toast = useToast();
  return (
    <Box p="5" maxW="300px" height={"300px"} borderWidth="1px" className="card">
      <Image borderRadius="md" src={props.imageurl} />
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {props.name}
      </Text>
      <HStack>
        <Text color="gray.500" fontWeight="semibold">
        ₦{props.price}
        </Text>
        <Text color="gray.500" fontWeight="semibold">
          {props.quantity}g
        </Text>
      </HStack>
      <Flex mt={2} align="center">
        <Button
          //   variant="solid"
          style={{ background: "#FF8908", color: "white" }}
          onClick={() => {
            props.openCart();
            addToCart({
              id: props.id,
              name: props.name,
              price: props.price,
              quantity: props.quantity,
              imageurl: props.imageurl,
            });
          }}
        >
          ADD TO CART
        </Button>
      </Flex>
    </Box>
  );
};
export default MenuCard;
