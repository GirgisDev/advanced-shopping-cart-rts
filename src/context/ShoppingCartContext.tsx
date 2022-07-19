import { createContext, useContext, ReactNode, useState } from "react";
import ShoppingCart from './../components/ShoppingCart';
import { useLocalStorage } from './../hooks/useLocalStorage';

type typeShoppingCartProviderProps = {
  children: ReactNode;
};

type cartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: cartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const UseShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: typeShoppingCartProviderProps) => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<cartItem[]>("shopping-cart", []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const openCart = () => toggleOpen(true);
  const closeCart = () => toggleOpen(false);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item?.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id: number) => {
    setCartItems((cartItems) => {
      if (!cartItems.find((item) => item.id === id)) {
        return [...cartItems, { id, quantity: 1 }];
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else return item;
        });
      }
    });
  };

  const decreaseItemQuantity = (id: number) => {
    setCartItems((cartItems) => {
      if (cartItems.find((item) => item.id === id)?.quantity === 1)
        return cartItems.filter((item) => item.id !== id);
      else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else return item;
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((cartItems) => {
      return cartItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
