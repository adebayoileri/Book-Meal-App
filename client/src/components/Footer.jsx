import React from "react";
import { Box, SimpleGrid, List, ListItem, Image } from "@chakra-ui/react";
const Footer = () => {
  return (
    <Box pt="6rem" style={{ background: "#15202B" }}>
      {/* <Container> */}
      <SimpleGrid
        columns={[1, null, 4]}
        spacing="20px"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        <Box p="8" maxW="320px" height={"140px"} alignSelf="center">
          <Image src="https://res.cloudinary.com/codeinstd/image/upload/v1605887131/Logo_r6q9od.png" />
        </Box>
        <Box
          p="3"
          maxW="320px"
          height={"140px"}
          alignSelf="center"
          justifySelf="center"
        >
          <List>
            <ListItem>Book Meal</ListItem>
            <ListItem>About</ListItem>
            <ListItem>Create Account</ListItem>
            <ListItem>Add a Restaraunt</ListItem>
          </List>
        </Box>
        <Box
          p="3"
          maxW="320px"
          height={"140px"}
          alignSelf="center"
          justifySelf="center"
        >
          <List>
            <ListItem>Services</ListItem>
            <ListItem>Restaurants Near Me</ListItem>
            <ListItem>Read FAQS</ListItem>
            {/* <ListItem></ListItem> */}
          </List>
        </Box>
        <Box
          p="3"
          maxW="320px"
          height={"140px"}
          alignSelf="center"
          justifySelf="center"
        >
          <List>
            <ListItem>Contact</ListItem>
            <ListItem>+234-9011550351</ListItem>
            <ListItem>hello@bookmeal.app</ListItem>
            <ListItem>Internet</ListItem>
          </List>
        </Box>
      </SimpleGrid>
      {/* </Container> */}
    </Box>
  );
};

export default Footer;
