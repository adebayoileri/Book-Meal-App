import React from "react";
import Header from "../../components/Header";
import axios from "axios";
import { useAuth } from "../../context/auth";
import {
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Button,
} from "@chakra-ui/react";
const userToken = JSON.parse(localStorage.getItem("userData"))["token"];
axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

export default function CreateMeal() {
  const { authTokens } = useAuth();
  const [submitted, setSubmitted] = React.useState(false);
  const [meal, setMeal] = React.useState({
    name: null,
    description: null,
    imageUrl: null,
    quantity: 100,
    price: null,
    caterer_id: authTokens?.["data"]?.id,
  });
  const toast = useToast();
  const handleFieldChange = (name) => (event) => {
    if (name === "price") {
      setMeal({ ...meal, [name]: Number(event.target.value) });
    }
    setMeal({ ...meal, [name]: event.target.value });
  };
  const createMeal = async () => {
    setSubmitted(true);
    await axios
      .post(`http://localhost:8080/api/v1/meals`, {
        ...meal,
      })
      .then((result) => {
        console.log({ result });
        if (result.status === 201) {
          toast({
            title: "Meal created.",
            description: "Your meal has been successfully created",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setSubmitted(false);
          // console.log(result);
        }
      })
      .catch((err) => {
        setSubmitted(false);
        toast({
          title: "An error occurred.",
          description: `Check your network connection and try again`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log({ err });
      });
  };
  return (
    <>
      <Header />
      <Container maxW="xl" mt="6rem" alignContent="center">
        <Text textAlign="left" fontSize="4xl" color={"#20ac76"}>
          Create A Meal
        </Text>
        <Stack spacing="3">
          <FormControl id="meal-name" isRequired>
            <FormLabel>Meal Name</FormLabel>
            <Input
              focusBorderColor="orange.400"
              placeholder="Meal name"
              value={meal.name}
              onChange={handleFieldChange("name")}
            />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Meal description</FormLabel>
            <Input
              focusBorderColor="orange.400"
              placeholder="Meal Description"
              value={meal.description}
              onChange={handleFieldChange("description")}
            />
          </FormControl>
          <FormControl id="Image URL" isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              errorBorderColor="red.500"
              focusBorderColor="orange.400"
              placeholder="URL for restaurant poster"
              value={meal.imageUrl}
              onChange={handleFieldChange("imageUrl")}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              focusBorderColor="orange.400"
              placeholder="Price"
              value={meal.price}
              onChange={handleFieldChange("price")}
            />
          </FormControl>
        </Stack>
        <Button
          mt={4}
          style={{ background: "#FF8908", color: "white" }}
          variant="solid"
          w={{ base: "100%", md: "60%" }}
          ml={{ base: "20%" }}
          onClick={() => {
            createMeal();
          }}
          disabled={
            !meal.name || !meal.imageUrl || !meal.description || !meal.price
          }
          isLoading={submitted}
          type="submit"
        >
          Create Meal
        </Button>
      </Container>
    </>
  );
}
