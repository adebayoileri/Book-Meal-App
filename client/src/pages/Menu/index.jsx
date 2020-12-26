import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
import { useCart } from "../../context";
import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
// import { AddIcon } from "@chakra-ui/icons";
import "../index.css";
import Header from "../../components/Header";
const MenuCard = lazy(() => import("../../components/MenuCard"));
const CartItem = lazy(() => import("../../components/CartItem"));

const Menu = (props) => {
  const { cartItems } = useCart();
  const restaurantId = props.match.params.id;
  const [menu, setMenu] = useState([]);
  const [firstAdd, setFirstAdd] = React.useState(false);
  const [restData, setRestData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const subTotal =
    cartItems.length > 0 &&
    cartItems.reduce((a, b) => ({ price: Number(a.price) + Number(b.price) }))
      .price;
  const handleClick = () => {
    onOpen();
  };
  const openCart = () => {
    if (!firstAdd) {
      onOpen();
      setFirstAdd(true);
    }
  };
  const getRestaurantMenu = async () => {
    const response = await axios.get(
      `https://bookmealapp.herokuapp.com/api/v1/meals/r/${restaurantId}`
    );
    if (response.status === 200) {
      setMenu(response.data["data"]);
    }
  };
  const getRestaurantData = async () => {
    const restaurantData = await axios.get(
      `https://bookmealapp.herokuapp.com/api/v1/restaurants/${restaurantId}`
    );
    if (restaurantData.status === 200) {
      setRestData(restaurantData.data["data"]);
    }
  };
  useEffect(() => {
    getRestaurantData();
    getRestaurantMenu();
    // eslint-disable-next-line
  }, [restaurantId]);

  return (
    <>
      <Header />
      <Box as="section" pt="8rem" className="login-page">
        <Box
          w="full"
          pb="12"
          mt="12rem"
          pt="12"
          mx="auto"
          maxW="1200px"
          px={6}
          bg="white"
        >
          <Flex maxW="720px" align="center">
            <HStack
              spacing="5"
              as="nav"
              ml="24px"
              display={{ md: "flex" }}
            >
              <Stack spacing="10px">
                <Text fontSize={{base: "lg", md: "2xl"}}>
                  {restData.name} - {restData.location}
                </Text>
                <Text fontSize={{base: "lg", md:"2xl"}}> {restData.description}</Text>
              </Stack>
              <Button onClick={() => handleClick()} size="lg">
                View Cart
              </Button>
            </HStack>
          </Flex>
          <Box mt="3">
            <SimpleGrid columns={[1, null, 4]} spacing="30px">
              {menu && menu.length > 0 ? (
                menu.map((meal) => (
                  <MenuCard
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    imageurl={meal.imageurl}
                    openCart={openCart}
                    price={meal.price}
                    quantity={meal.quantity}
                    catererId={meal.caterer_id}
                  />
                ))
              ) : (
                <Center mt={4}>No Meals Available In The Menu</Center>
              )}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Drawer onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Cart</DrawerHeader>
            <DrawerBody>
              {cartItems &&
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    imageurl={item.imageurl}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
              {cartItems && cartItems.length > 0 ? (
                <>
                  <Stack spacing="20px">
                    <Box p={4}>
                      <Text fontSize="md">Subtotal: ₦{subTotal}</Text>
                      <Text fontSize="md">Delivery Address: ₦400</Text>
                      <Text fontSize="lg" fontWeight="semi.bold">
                        Total: ₦{subTotal + 400}
                      </Text>
                    </Box>
                  </Stack>
                  <Box mt={4}>
                    <Button
                      style={{ width: "100%" }}
                      bg={"#20ac76"}
                      as="a"
                      href="/checkout"
                      color={"#ffff"}
                    >
                      PROCEED TO CHECKOUT
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Image
                    src={
                      "https://res.cloudinary.com/adebayo/image/upload/v1606237142/ufo_of9d2u.gif"
                    }
                  />
                  <Text textAlign="center"> Your Cart Is Empty</Text>
                </>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
export default Menu;
