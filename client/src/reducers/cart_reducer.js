import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempProduct = state.cart.find((i) => i.id === id + color);
    if (tempProduct) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          const newAmount = Math.min(item.amount + amount, item.max);
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        color,
        name: product.name,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const { cart } = state;
    const temp = cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: temp };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        let newAmount = item.amount;
        if (value === "inc") {
          newAmount = Math.min(item.max, newAmount + 1);
        } else {
          newAmount = Math.max(1, newAmount - 1);
        }
        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      { total_items: 0, total_amount: 0 }
    );
    return { ...state, total_amount, total_items };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
