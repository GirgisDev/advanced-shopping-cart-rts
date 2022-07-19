import { Offcanvas, Stack } from "react-bootstrap"
import { UseShoppingCart } from './../context/ShoppingCartContext';
import CartItem from './CartItem';
import { formatCurrency } from './../utils/formatCurrency';
import storeItems from "./../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = UseShoppingCart();
  const reduceCurrentCartItems = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = storeItems.find(item => item.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity
    }, 0)
  }
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(reduceCurrentCartItems())}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart