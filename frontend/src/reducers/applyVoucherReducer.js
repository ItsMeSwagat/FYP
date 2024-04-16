import {
  APPLY_VOUCHER_REQUEST,
  APPLY_VOUCHER_SUCCESS,
  APPLY_VOUCHER_FAIL,
  REMOVE_VOUCHER_REQUEST,
  REMOVE_VOUCHER_SUCCESS,
  REMOVE_VOUCHER_FAIL,
  CREATE_VOUCHER_REQUEST,
  CREATE_VOUCHER_SUCCESS,
  CREATE_VOUCHER_FAIL,
  GET_ALL_VOUCHERS_REQUEST,
  GET_ALL_VOUCHERS_SUCCESS,
  GET_ALL_VOUCHERS_FAIL,
  UPDATE_VOUCHER_REQUEST,
  UPDATE_VOUCHER_SUCCESS,
  UPDATE_VOUCHER_FAIL,
  DELETE_VOUCHER_REQUEST,
  DELETE_VOUCHER_SUCCESS,
  DELETE_VOUCHER_FAIL,
  CLEAR_ERRORS,
  UPDATE_VOUCHER_RESET,
  DELETE_VOUCHER_RESET,
  CREATE_VOUCHER_RESET,
  VOUCHER_DETAILS_REQUEST,
  VOUCHER_DETAILS_SUCCESS,
  VOUCHER_DETAILS_FAIL,
} from "../constants/voucherConstants";

export const voucherReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLY_VOUCHER_REQUEST:
    case REMOVE_VOUCHER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case APPLY_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        applied: action.payload,
      };

    case REMOVE_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        removed: action.payload,
      };
    case APPLY_VOUCHER_FAIL:
    case REMOVE_VOUCHER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const createVoucherReducer = (state = { voucher: {} }, action) => {
  switch (action.type) {
    case CREATE_VOUCHER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_VOUCHER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        voucher: action.payload.voucher,
      };
    case CREATE_VOUCHER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_VOUCHER_RESET:
      return {
        ...state,
        success: false,
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

export const voucherDetailsReducer = (state = { voucher: {} }, action) => {
  switch (action.type) {
    case VOUCHER_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case VOUCHER_DETAILS_SUCCESS:
      return {
        loading: false,
        voucher: action.payload,
      };
    case VOUCHER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const getAllVouchersReducer = (state = { vouchers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_VOUCHERS_REQUEST:
      return {
        loading: true,
        vouchers: [],
      };
    case GET_ALL_VOUCHERS_SUCCESS:
      return {
        loading: false,
        vouchers: action.payload,
      };
    case GET_ALL_VOUCHERS_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const adminVoucherReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VOUCHER_REQUEST:
    case DELETE_VOUCHER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_VOUCHER_FAIL:
    case DELETE_VOUCHER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_VOUCHER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_VOUCHER_RESET:
      return {
        ...state,
        isDeleted: false,
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
