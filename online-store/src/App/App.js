import React, { useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Home from "../Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Login from "../Login/Login";
import Payment from "../Order/Payment";
import Orders from "../Order/Orders";
import { auth } from "../firebase";
import { useStateValue } from "../StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AdminPanel from "../AdminPanel/AdminPanel";
import Edit from "../AdminPanel/Edit";
import AddItem from "../AdminPanel/AddItem";
import Footer from "../Footer/Footer";


const promise = loadStripe('pk_test_51IZFxCKyrTYhmZjRBxrvyHk5rq2YRvJMLAvdQTJ2qYOV9fJHDcdmHCBEZiD63vL0KXoZOTGqpQ0oBnHtIVwZrmJt00Wz2DRaog');

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/add">
            <Header />
            <AddItem />
            
          </Route>
          <Route path="/edit">
            <Header />
            <Edit />
            
          </Route>
          <Route path="/admin">
            <Header />
            <AdminPanel />
            
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
           
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
           
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;