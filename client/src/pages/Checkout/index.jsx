import React, { useState } from "react";
import Header from "../../components/Header";
import { useAuth, useCart } from "../../context";
import {
  Text,
  Container,
  Box,
  Input,
  Center,
  Button,
  Select,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { capitalize, logOut } from "../../utils";

const Checkout = () => {
  const { authTokens } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const userData = authTokens["data"];
  const subTotal =
    cartItems.length > 0 &&
    cartItems.reduce((a, b) => ({ price: Number(a.price) + Number(b.price) }))
      .price;
      // eslint-disable-next-line
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [payMethod, setPayMethod] = useState("pod");
  return (
    <>
      <Header />
      <Container maxW="xl" mt="6rem">
        <Text textAlign="left" fontSize="4xl" color={"#20ac76"}>
          Checkout & Place Order
        </Text>
        <Box p={4} background={"#f5f5f5"} mx="auto" my="40px">
          <Text fontSize="2xl">Contact details</Text>
          <Text fontSize="xl">
            Fullname: {capitalize(userData.first_name)}{" "}
            {capitalize(userData.last_name)}
          </Text>
          <Text fontSize="xl">Email: {userData.email}</Text>
          <Text color={"#FF8908"}>
            Not your Account?{" "}
            <chakra.a as="button" onClick={() => logOut()}>
              Change Account
            </chakra.a>
          </Text>
        </Box>
        <Box p={4} background={"#f5f5f5"} mx="auto" my="40px">
          <Text fontSize="2xl">Delivery Address</Text>
          <Input
            type="text"
            placeholder="Delivery Address"
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
            }}
            focusBorderColor="orange.400"
            isRequired
            mt="10px"
          />
        </Box>
        <Box p={4} background={"#f5f5f5"} mx="auto" my="40px">
          <Text fontSize="2xl">Payment Method</Text>
          <Select
            placeholder="Select your preferred payment method"
            focusBorderColor="orange.400"
            mt="10px"
            onChange={(e) => {
              setPayMethod(e.target.value);
            }}
          >
            <option value="pod">Pay On Delivery</option>
            <option value="paystack">Pay With Paystack</option>
          </Select>
        </Box>
        <Box p={4} background={"#f5f5f5"} mx="auto" my="40px">
          <Text fontSize="2xl">Order Summary</Text>
          <Stack spacing={3}>
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <Box px={4}>
                  <Text>
                    {item.name}- ₦{item.price}
                  </Text>
                  <Text
                    as="button"
                    onClick={() => {
                      setCartItems(null, item.id);
                    }}
                  >
                    Remove &times;{" "}
                  </Text>
                </Box>
              ))}
            <Box>
              <Box px={4}>
                <Text fontSize="md">Subtotal: ₦{subTotal}</Text>
                <Text fontSize="md">Delivery Address: ₦400</Text>
                <Text fontSize="lg" fontWeight="semi.bold">
                  Total: ₦{subTotal + 400}
                </Text>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Center my={6}>
            {payMethod === "paystack" ? (
              <Button
                color="white"
                width="xl"
                background={"#3bb75e"}
                mt={2}
                disabled={!(cartItems.length > 0)}
              >
                Pay With Paystack
              </Button>
            ) : (
              <Button
                color="white"
                width="xl"
                background={"#3bb75e"}
                mt={2}
                disabled={!(cartItems.length > 0)}
              >
                Place Order
              </Button>
            )}
          </Center>
        </Box>
      </Container>
    </>
  );
};

export default Checkout;
