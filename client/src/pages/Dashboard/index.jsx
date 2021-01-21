import React from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/auth";
import { capitalize } from "../../utils/";
import axios from "axios";
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
  Button,
  Link,
} from "@chakra-ui/react";
// import {Link} from "react-router-dom"
const userToken = JSON.parse(localStorage.getItem("userData"))["token"];
axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
const Dashboard = () => {
  const { authTokens } = useAuth();
  const name = authTokens["data"]?.["first_name"];
  const userRole = authTokens?.["data"]["role"];
  const [orders, setOrders] = React.useState([]);
  const [corders, setCorders] = React.useState([]);
  const [meals, setMeals] = React.useState([]);
  const [rend, setRerend] = React.useState(false);

  React.useEffect(() => {
    if (userRole === "customer") {
      const getAllOrders = async () => {
        const response = await axios.get(
          `https://bookmealapp.herokuapp.com/api/v1/orders`
        );
        if (response.status === 200) {
          setOrders(response.data["data"]);
        }
      };
      getAllOrders();
    }
    if (userRole === "caterer") {
      const getAllCorders = async () => {
        const response = await axios.get(
          `https://bookmealapp.herokuapp.com/api/v1/caterer/orders`
        );
        if (response.status === 200) {
          setCorders(response.data["data"]);
        }
      };
      const getMeals = async () => {
        const response = await axios.get(
          `https://bookmealapp.herokuapp.com/api/v1/meals`
        );
        if (response.status === 200) {
          setMeals(response.data["data"]);
        }
      };
      getAllCorders();
      getMeals();
    }
  }, [userRole]);

  const acceptOrder = async (orderId) => {
    const response = await axios.put(
      `https://bookmealapp.herokuapp.com/api/v1/caterer/orders/accept/${orderId}`
    );
    if (response.status === 200) {
      setMeals(response.data["data"]);
      setRerend(true);
    }
  };
  const catererMealsLength =
    meals &&
    meals.filter((ml) => ml?.caterer_id === authTokens["data"]?.["id"]).length;

  return (
    <>
      <Header />
      <Container maxW="xl" mt="6rem">
        <Text textAlign="left" fontSize="4xl">
          Welcome {capitalize(name)}
        </Text>
        {userRole === "caterer" ? (
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignContent="center"
            >
              <Link href="/restaurant/create">
                <Button
                  my={4}
                  style={{ background: "#FF8908", color: "white" }}
                  variant="solid"
                >
                  Create A Restaurant
                </Button>
              </Link>
              <Link href="/meal/create">
                <Button
                  my={4}
                  style={{ background: "#FF8908", color: "white" }}
                  variant="solid"
                >
                  Add Meal to Restaurant
                </Button>
              </Link>
            </Box>
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
                  {corders && corders?.length}
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
                  {catererMealsLength && catererMealsLength}
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
                  ₦0
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        ) : (
          " "
        )}
      </Container>
      <Container maxW="xl" mt="3rem">
        {userRole === "customer" ? (
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
                    <th>Ordered At</th>
                  </tr>
                  {orders &&
                    orders.map((ord, idx) => (
                      <tr key={idx}>
                        <td>{ord?.user_id}</td>
                        <td>{ord?.status}</td>
                        <td>{ord?.deliveryaddress}</td>
                        <td>{ord?.createdat.slice(0, 10)}</td>
                      </tr>
                    ))}
                </table>
              </TabPanel>
              <TabPanel>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th>USER ID</th>
                    <th>Status</th>
                    <th>Delivery Address</th>
                    <th>Ordered At</th>
                  </tr>
                  {orders &&
                    orders
                      .filter((ord) => ord.status !== "pending")
                      .map((ord, idx) => (
                        <tr key={idx}>
                          <td>{ord?.user_id}</td>
                          <td>{ord?.status}</td>
                          <td>{ord?.deliveryaddress}</td>
                          <td>{ord?.createdat.slice(0, 10)}</td>
                        </tr>
                      ))}
                </table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          ""
        )}

        {/* caterer's tabs */}

        {userRole === "caterer" ? (
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Pending Orders</Tab>
              {/* <Tab>Order History</Tab> */}
            </TabList>
            <TabPanels>
              <TabPanel>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th>Meal Name</th>
                    <th>ORDER ID</th>
                    <th>PRICE</th>
                    <th>Quantity</th>
                    <th>Ordered At</th>
                    <th>Actions</th>
                  </tr>
                  {corders &&
                    corders.map((ord, idx) => (
                      <tr key={idx}>
                        <td>{ord?.mealname}</td>
                        <td>{ord?.order_id}</td>
                        <td>{ord?.price}</td>
                        <td>{ord?.quantity}</td>

                        <td>{ord?.createdat.slice(0, 10)}</td>
                        <td>
                          <Button
                            onClick={() => {
                              acceptOrder(ord?.order_id);
                            }}
                            isDisabled={rend}
                          >
                            Accept Order
                          </Button>{" "}
                        </td>
                      </tr>
                    ))}
                </table>
              </TabPanel>
              {/* <TabPanel>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th>USER ID</th>
                    <th>Status</th>
                    <th>Delivery Address</th>
                    <th>Ordered At</th>
                  </tr>
                  {corders &&
                    corders
                      .filter((ord) => ord.status !== "pending")
                      .map((ord, idx) => (
                        <tr key={idx}>
                          <td>{ord?.user_id}</td>
                          <td>{ord?.status}</td>
                          <td>{ord?.deliveryaddress}</td>
                          <td>{ord?.createdat.slice(0, 10)}</td>
                        </tr>
                      ))}
                </table>
              </TabPanel> */}
            </TabPanels>
          </Tabs>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};
export default Dashboard;
