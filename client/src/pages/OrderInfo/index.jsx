import React from "react";
import axios from "axios";
import Header from "../../components/Header";
import {
  Container,
  Text,
  Box,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import { capitalize } from "../../utils";
const userToken = JSON.parse(localStorage.getItem("userData"))["token"];
axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
export default function OrderInfo(props) {
  const { authTokens } = useAuth();
  const [orderItems, setOrderItems] = React.useState([]);
  const [order, setOrder] = React.useState(null);
  const [canceled, setCanceled] = React.useState(false);
  const toast = useToast();
  const userData = authTokens?.["data"];
  React.useEffect(() => {
    const getOrderItems = async () => {
      const result = await axios.get(
        `https://bookmealapp.herokuapp.com/api/v1/orders/items/${props.match.params.id}`
      );
      //   console.log(result);
      if (result.status === 200) {
        setOrderItems(result.data["data"]);
      }
    };
    getOrderItems();
  }, [props.match.params.id]);
  React.useEffect(() => {
    const getOrder = async () => {
      const result = await axios.get(
        `https://bookmealapp.herokuapp.com/api/v1/orders/${props.match.params.id}`
      );
      setOrder(result.data["data"]);
    };
    getOrder();
  }, [props.match.params.id, canceled]);
  const cancelOrder = async () => {
      try {
          const response = await axios.put(
              `https://bookmealapp.herokuapp.com/api/v1/orders/cancel/${props.match.params.id}`
              );
              if (response.status === 200) {
                  toast({
                      title: "Canceled Order.",
                      description: "You have sucessfully canceled your order",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    setCanceled(true);
                } else {
                    toast({
          title: "An error occurred.",
          description: "Please consirm your internet connection",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <Container maxW="xl" mt="6rem">
        <Text textAlign="left" fontSize="4xl" color={"#20ac76"}>
          Order Info
        </Text>
        <Box p={4} background={"#f5f5f5"} mx="auto" my="40px">
          <Text fontSize="2xl">Order Information</Text>
          <Text fontSize="xl">
            Fullname: {capitalize(userData?.first_name)}{" "}
            {capitalize(userData?.last_name)}
          </Text>
          <Text fontSize="xl">Email: {userData?.email}</Text>
          <Text fontSize="xl">Order ID: {props.match.params.id}</Text>
          <Text fontSize="xl">Status: {order?.["status"]}</Text>
        </Box>
        <Box p={4} background={"#f5f5f5"} mx="auto" my="40px">
          <Text fontSize="2xl">Order Summary</Text>
          <Stack spacing={3}>
            {orderItems.length > 0 &&
              orderItems.map((item, index) => (
                <Box px={4} key={index}>
                  <Text>
                    {item.mealname}- ₦{item.price}
                  </Text>
                </Box>
              ))}
            <Button onClick={() => cancelOrder()}>Cancel Order &times; </Button>
            <Box>
              <Box px={4}>
                {/* <Text fontSize="md">Subtotal: ₦{}</Text> */}
                <Text fontSize="md">
                  Delivery Address: {order?.deliveryaddress}
                </Text>
                <Text fontSize="lg" fontWeight="semi.bold">
                  {/* Total: ₦{subTotal + 400} */}
                </Text>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
