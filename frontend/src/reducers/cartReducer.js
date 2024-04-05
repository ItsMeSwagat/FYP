import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  GET_USER_CART_REQUEST,
  GET_USER_CART_SUCCESS,
  GET_USER_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAIL,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_FAIL,
  CLEAR_ERRORS,
} from "../constants/cartConstants";

const initialState = {
  cart: {},
  loading: false,
  error: null,
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case GET_USER_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.cartItems],
        loading: false,
      };

    case ADD_TO_CART_FAIL:
    case GET_USER_CART_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_USER_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cart: action.payload,
        loading: false,
      };

    case REMOVE_CART_REQUEST:
    case UPDATE_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REMOVE_CART_SUCCESS:
      return {
        ...state,
        delete: action.payload,
        loading: false,
      };

    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        update: action.payload,
        loading: false,
      };

    case REMOVE_CART_FAIL:
    case UPDATE_CART_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
