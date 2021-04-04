import React, { useEffect, useState } from "react";
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
import { db } from '../firebase';
import Footer from "../Footer/Footer";

const promise = loadStripe('pk_test_51IZFxCKyrTYhmZjRBxrvyHk5rq2YRvJMLAvdQTJ2qYOV9fJHDcdmHCBEZiD63vL0KXoZOTGqpQ0oBnHtIVwZrmJt00Wz2DRaog');

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  const getCartItems = () => {
    db.collection('users')
      .doc(user?.uid)
      .collection('cart')
      .onSnapshot((snapshot) => {
        const tempItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setCartItems(tempItems);
      })
  }

  useEffect(() => {
    getCartItems();
  }, [user])

  const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += (item.item.price * item.item.quantity)
    })

    return total;
  }

  const getTotalQuantity = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.item.quantity
    })

    return total;
  }

  return (
    <Router>
      <div className="app">
        <Header cartItems={cartItems} />

        <Switch>
          <Route path="/add">
            <AddItem />
          </Route>

          <Route path="/edit">
            <Edit />
          </Route>

          <Route path="/admin">
            <AdminPanel />
          </Route>

          <Route path="/orders">
            <Orders
              getTotalPrice={getTotalPrice}
              getTotalQuantity={getTotalQuantity}
              cartItems={cartItems} />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Checkout
              getTotalPrice={getTotalPrice}
              getTotalQuantity={getTotalQuantity}
              cartItems={cartItems} />
          </Route>

          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment
                getTotalPrice={getTotalPrice}
                getTotalQuantity={getTotalQuantity}
                cartItems={cartItems} />
            </Elements>
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

