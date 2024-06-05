import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  ADMIN_ALL_USERS_REQUEST,
  ADMIN_ALL_USERS_SUCCESS,
  ADMIN_ALL_USERS_FAIL,
  ADMIN_USER_DETAILS_REQUEST,
  ADMIN_USER_DETAILS_SUCCESS,
  ADMIN_USER_DETAILS_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
} from "../constants/userConstants";

import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `https://fyp-five-khaki.vercel.app/api/v1/auth/login`,
      { email, password },
      { config, withCredentials: true }
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `https://fyp-five-khaki.vercel.app/api/v1/auth/register`,
      userData,
      { config, withCredentials: true }
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(
      `https://fyp-five-khaki.vercel.app/api/v1/user/customer`
    );

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// Logout User
export const Logout = () => async (dispatch) => {
  try {
    await axios.get(`https://fyp-five-khaki.vercel.app/api/v1/auth/logout`);

    dispatch({ type: LOGOUT_SUCCESS });

    // Clear authentication token cookie
    document.cookie =
      "usertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.reload();
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

export const adminGetAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALL_USERS_REQUEST });
    const { data } = await axios.get(
      `https://fyp-five-khaki.vercel.app/api/v1/admin/users`
    );

    dispatch({ type: ADMIN_ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ADMIN_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminGetUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `https://fyp-five-khaki.vercel.app/api/v1/admin/user/${id}`
    );

    dispatch({ type: ADMIN_USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminUpdateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `https://fyp-five-khaki.vercel.app/api/v1/admin/user/role/${id}`,
      userData,
      { config, withCredentials: true }
    );

    dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const adminDeleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_USER_REQUEST });

    const { data } = await axios.delete(
      `https://fyp-five-khaki.vercel.app/api/v1/admin/user/${id}`
    );

    dispatch({ type: ADMIN_DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
