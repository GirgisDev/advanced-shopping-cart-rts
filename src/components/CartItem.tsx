import { UseShoppingCart } from "../context/ShoppingCartContext";
import { Stack, Button } from "react-bootstrap";
import storeItems from "./../data/items.json";
import { formatCurrency } from "./../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = UseShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (!item) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{
          width: "125px",
          height: "75px",
          objectFit: "cover",
        }}
      />
      <div className="me-auto">
        <div>
          {item.name} &nbsp;
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button 
        variant="outline-danger" 
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
