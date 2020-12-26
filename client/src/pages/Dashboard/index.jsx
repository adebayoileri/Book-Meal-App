import React from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/auth";
import { capitalize } from "../../utils/";
import "./index.css";
import {
  Container,
  Text,
  SimpleGrid,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
const Dashboard = () => {
  const { authTokens } = useAuth();
  const name = authTokens["data"]?.["first_name"];
  const userRole = authTokens?.["data"]["role"];
  return (
    <>
      <Header />
      <Container maxW="xl" mt="6rem">
        <Text textAlign="left" fontSize="4xl">
          Welcome {capitalize(name)}
        </Text>
        {userRole === "caterer" ? (
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
                <Text fontSize="5xl" color={"#FF8908"}>
                  347
                </Text>
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
                <Text fontSize="5xl" color={"#FF8908"}>
                  347
                </Text>
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
                <Text fontSize="5xl" color={"#FF8908"}>
                  ₦25,000
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        ) : (
          " "
        )}
      </Container>
      <Container maxW="xl" mt="3rem">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Pending Orders</Tab>
            <Tab>Order History</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <table style={{ width: "100%" }}>
                <tr>
                  <th>USER ID</th>
                  <th>Status</th>
                  <th>Delivery Address</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Centro comercial Moctezuma</td>
                  <td>Germany</td>
                </tr>
              </table>
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
