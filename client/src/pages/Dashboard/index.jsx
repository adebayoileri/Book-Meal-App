import React from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/auth";
import { capitalize } from "../../utils/"
import { Container, Text, SimpleGrid, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
const Dashboard = () => {
  const { authTokens } = useAuth();
  const name = authTokens["data"]["first_name"];
  return (
    <>
      <Header />
      <Container maxW="xl" mt="6rem">
        <Text textAlign="left" fontSize="4xl">
          Welcome {capitalize(name)}
        </Text>
        <Box>
          <SimpleGrid columns={[1, null, 3]} spacing="30px" mt="4">
            <Box
              height="200px"
              width="300px"
              textAlign="center"
              pt="5"
              boxShadow="lg"
              borderRadius="25px"
            >
              <Text fontSize="xl">Orders</Text>
              <Text fontSize="5xl" color={"#FF8908"}>347</Text>
            </Box>
            <Box
              height="200px"
              width="300px"
              textAlign="center"
              pt="5"
              boxShadow="lg"
              borderRadius="25px"
            >
              <Text fontSize="xl">Meals</Text>
              <Text fontSize="5xl" color={"#FF8908"}>347</Text>
            </Box>
            <Box
              height="200px"
              width="300px"
              textAlign="center"
              pt="5"
              boxShadow="lg"
              borderRadius="25px"
            >
              <Text fontSize="xl">Sales</Text>
              <Text fontSize="5xl" color={"#FF8908"}>₦25,000</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
      <Container maxW="xl" mt="3rem">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Order History</Tab>
            <Tab>Payment History</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};
export default Dashboard;
