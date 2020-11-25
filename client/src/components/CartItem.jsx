import React from "react";
import { Box, HStack, Stack, Text, Image, Button } from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import { useCart } from "../context";
const CartItem = (props) => {
  const { setCartItems } = useCart();
  return (
    <>
      <Box mb="2" borderWidth="2px" height="130px">
        <HStack>
          <Image src={props.imageurl} width="auto" pt="2" height="100px" />
          <Stack spacing={0} pt={2}>
            <Text fontSize="md">
              {props.name} - {props.quantity}g
            </Text>

            <Text fontSize="md">₦{props.price}</Text>
            <Button
              size="sm"
              onClick={() => {
                setCartItems(null, props.id);
              }}
              rightIcon={<MinusIcon />}
            >
              Remove
            </Button>
          </Stack>
        </HStack>
      </Box>
    </>
  );
};
export default CartItem;
