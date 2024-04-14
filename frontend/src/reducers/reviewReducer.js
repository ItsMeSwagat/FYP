import {
  CLEAR_ERRORS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_REVIEW_RESET:
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
