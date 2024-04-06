import {
  APPLY_VOUCHER_REQUEST,
  APPLY_VOUCHER_SUCCESS,
  APPLY_VOUCHER_FAIL,
} from "../constants/cartConstants";

export const applyVoucherReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLY_VOUCHER_REQUEST:
      return { loading: true };
    case APPLY_VOUCHER_SUCCESS:
      return { loading: false, applied: action.payload };
    case APPLY_VOUCHER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
