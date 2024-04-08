import {
  APPLY_VOUCHER_REQUEST,
  APPLY_VOUCHER_SUCCESS,
  APPLY_VOUCHER_FAIL,
  REMOVE_VOUCHER_REQUEST,
  REMOVE_VOUCHER_SUCCESS,
  REMOVE_VOUCHER_FAIL,
  CLEAR_ERRORS,
} from "../constants/voucherConstants";

export const voucherReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLY_VOUCHER_REQUEST:
    case REMOVE_VOUCHER_REQUEST:
      return { ...state, loading: true };
    case APPLY_VOUCHER_SUCCESS:
      return { ...state, loading: false, applied: action.payload };

    case REMOVE_VOUCHER_SUCCESS:
      return { ...state, loading: false, removed: action.payload };
    case APPLY_VOUCHER_FAIL:
    case REMOVE_VOUCHER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
