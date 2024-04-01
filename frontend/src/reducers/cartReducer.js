import {
  ADD_TO_CART,
  REMOVE_CART_PRODUCT,
  SAVE_SHIPPING_DETAILS,
} from "../constants/cartConstants";


export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const ItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (ItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === ItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_PRODUCT:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_DETAILS:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
