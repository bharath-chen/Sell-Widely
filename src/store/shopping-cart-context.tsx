// src/context/ShoppingCartContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "../models/product";
// import { Product } from "../data/data";

type CartItem = {
  product: Product;
  quantity: number;
};

// Define the actions that can be dispatched
type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | {
      type: "ADD_TO_CART_WITH_QUANTITY";
      payload: { product: Product; quantity: number };
    }
  | { type: "SET_CART_ITEMS"; payload: { products: Product[] } }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | {
      type: "ORDER_PLACED";
    };

// Define the initial state
type ShoppingCartState = {
  cart: CartItem[];
  totalItemsCount: number;
  totalPrice: number;
  placedOrders: CartItem[];
};

type CartContextValue = ShoppingCartState & {
  addItemToCart: (product: Product) => void;
  setCartItems: (products: Product[]) => void;
  addItemToCartWithQuantity: (product: Product, quantity: number) => void;
  removeItemFromCart: (id: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  orderPlaced: () => void;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

const initialState: ShoppingCartState = {
  cart: [],
  totalItemsCount: 0,
  totalPrice: 0,
  placedOrders: [],
};

const localStorageKey = "shoppingCart";

const loadStateFromLocalStorage = (): ShoppingCartState => {
  const storedState = localStorage.getItem(localStorageKey);
  return storedState ? JSON.parse(storedState) : initialState;
};

const saveStateToLocalStorage = (state: ShoppingCartState) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

// Create the context
const ShoppingCartContext = createContext<CartContextValue | null>(null);

function calculateTotalItemsCount(cartItems: CartItem[]) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

function calculateTotalPrice(cartItems: CartItem[]) {
  return cartItems.reduce(
    (total, item) => total + +item.product.selling_price * item.quantity,
    0
  );
}

function CartReducer(state: ShoppingCartState, action: CartAction) {
  switch (action.type) {
    case "ADD_TO_CART":
      // eslint-disable-next-line no-case-declarations
      const existingCartItem = state.cart.find(
        (item) => item.product.product_id === action.payload.product_id
      );

      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.product_id === action.payload.product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { product: action.payload, quantity: 1 }],
        };
      }

    case "SET_CART_ITEMS":
      return {
        ...state,
        cart: action.payload.products.map((p) => ({
          product: p,
          quantity: p?.qty,
        })),
      };

    case "ADD_TO_CART_WITH_QUANTITY":
      // eslint-disable-next-line no-case-declarations
      const isExisting = state.cart.find(
        (item) => item.product.product_id === action.payload.product.product_id
      );

      if (isExisting) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.product_id === action.payload.product.product_id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              product: action.payload.product,
              quantity: action.payload.quantity,
            },
          ],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => +item.product.product_id !== action.payload
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          +item.product.product_id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "ORDER_PLACED":
      // eslint-disable-next-line no-case-declarations
      const placedOrders = [...state.cart];

      return {
        ...state,
        cart: [],
        placedOrders: placedOrders,
      };

    default:
      return state;
  }
}

// Create a provider component
function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartState, dispatch] = useReducer(
    CartReducer,
    initialState,
    loadStateFromLocalStorage
  );

  useEffect(() => {
    saveStateToLocalStorage(cartState);
  }, [cartState]);

  const ctx: CartContextValue = {
    cart: cartState.cart,
    placedOrders: cartState.placedOrders,
    totalItemsCount: calculateTotalItemsCount(cartState.cart),
    totalPrice: calculateTotalPrice(cartState.cart),
    setCartItems(products) {
      dispatch({ type: "SET_CART_ITEMS", payload: { products } });
    },
    addItemToCart(product) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    },
    addItemToCartWithQuantity(product, quantity) {
      dispatch({
        type: "ADD_TO_CART_WITH_QUANTITY",
        payload: { product, quantity },
      });
    },
    removeItemFromCart(id) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    },
    updateQuantity(productId, quantity = 0) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
    },
    orderPlaced() {
      dispatch({ type: "ORDER_PLACED" });
    },
  };

  return (
    <ShoppingCartContext.Provider value={ctx}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

// Custom hook for using the context
function useShoppingCartContext() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCartContext must be used within a ShoppingCartProvider"
    );
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ShoppingCartProvider, useShoppingCartContext };
