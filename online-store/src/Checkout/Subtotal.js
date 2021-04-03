import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Subtotal({ getTotalPrice, getTotalQuantity }) {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getTotalQuantity()} items): <strong>${getTotalPrice()}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      {user ?
        (<Button variant="success" onClick={e => history.push('/payment')}>Proceed to Checkout</Button>) :
        (<Button variant="success" onClick={e => history.push('/login')}>Proceed to Checkout</Button>)}
    </div>
  );
}

export default Subtotal;