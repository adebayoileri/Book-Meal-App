import React from "react";
import Header from "../../components/Header";
import axios from "axios";
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

export default function CreateRestaurant() {
  const [submitted, setSubmitted] = React.useState(false);
  const [rest, setRest] = React.useState({
    name: null,
    imageUrl: null,
    description: null,
    location: null,
  });
  const toast = useToast();
  const handleFieldChange = (name) => (event) => {
    setRest({ ...rest, [name]: event.target.value });
  };
  const CreateRestaurant = async () => {
    setSubmitted(true);
    await axios
      .post(`https://bookmealapp.herokuapp.com/api/v1/caterer/restaraunts/create`, {
        ...rest,
      })
      .then((result) => {
        console.log({ result });
        if (result.status === 200) {
          toast({
            title: "Restaurant created.",
            description: "Your restaurant has been successfully created",
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
          Create A Restaurant
        </Text>
        <Stack spacing="3">
          <FormControl id="rest-name" isRequired>
            <FormLabel>Restaurant Name</FormLabel>
            <Input
              focusBorderColor="orange.400"
              placeholder="Restaurant name"
              value={rest.name}
              onChange={handleFieldChange("name")}
            />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Restaurant description</FormLabel>
            <Input
              focusBorderColor="orange.400"
              placeholder="Restaurant Description"
              value={rest.description}
              onChange={handleFieldChange("description")}
            />
          </FormControl>
          <FormControl id="Image URL" isRequired>
            <FormLabel>Restaurant Image URL</FormLabel>
            <Input
              errorBorderColor="red.500"
              focusBorderColor="orange.400"
              placeholder="URL for restaurant poster"
              value={rest.imageUrl}
              onChange={handleFieldChange("imageUrl")}
            />
          </FormControl>
          <FormControl id="location" isRequired>
            <FormLabel>Loaction</FormLabel>
            <Input
              focusBorderColor="orange.400"
              placeholder="Restaurant Location"
              value={rest.location}
              onChange={handleFieldChange("location")}
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
            CreateRestaurant();
          }}
          disabled={
            !rest.name || !rest.imageUrl || !rest.description || !rest.location
          }
          isLoading={submitted}
          type="submit"
        >
          Create Restaurant
        </Button>
      </Container>
    </>
  );
}
