import React, { lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import { AuthContext, CartContext } from "./context";
import Loading from "./components/Loading";
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/Signup/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard/"));
const Feed = lazy(() => import("./pages/Feed"));
const Menu = lazy(() => import("./pages/Menu"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderInfo = lazy(() => import("./pages/OrderInfo"));
const CreateMeal = lazy(() => import("./pages/CreateMeal"));
const CreateRestaraunt = lazy(() => import("./pages/CreateRestaurant"));


const hist = createBrowserHistory();
function App() {
  const currentTokens = JSON.parse(localStorage.getItem("userData"));
  let currentCartItems = localStorage.getItem("cartItems") 
  currentCartItems = JSON.parse(currentCartItems) || [];
  const [authTokens, setAuthTokens] = React.useState(currentTokens);
  const [cartItems, setCartItems] = React.useState(currentCartItems);
  const setAuthData = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("dataExpires", new Date() + 2 * 60 * 60 * 1000);
    setAuthTokens(data);
  };
  const updateCart = (data, id) => {
    if(id){
      localStorage.removeItem("cartItems");
      const aDelete = cartItems && cartItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(aDelete));
      setCartItems(aDelete)
    }else{
      currentCartItems.push(data)
      localStorage.setItem("cartItems", JSON.stringify(currentCartItems));
      setCartItems(currentCartItems);
    }
  };
  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setAuthData }}>
        <CartContext.Provider value={{ cartItems, setCartItems: updateCart }}>
          <Suspense fallback={<Loading />}>
            <Router history={hist}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/checkout" component={Checkout} />
                <PrivateRoute path="/restaurants" component={Feed} />
                <PrivateRoute path="/r/:id" component={Menu} />
                <PrivateRoute path="/orders/:id" component={OrderInfo} />
                <PrivateRoute path="/meal/create" component={CreateMeal} />
                <PrivateRoute path="/restaurant/create" component={CreateRestaraunt} />
              </Switch>
            </Router>
          </Suspense>
        </CartContext.Provider>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
