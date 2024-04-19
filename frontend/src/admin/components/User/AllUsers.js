import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../user/components/Loader/Loader";
import {
  adminDeleteUser,
  adminGetAllUsers,
  clearErrors,
} from "../../../actions/userAction";
import { ADMIN_DELETE_USER_RESET } from "../../../constants/userConstants";

const AllUsers = () => {
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("User Deleted Successfully");
      dispatch({ type: ADMIN_DELETE_USER_RESET });
    }
    dispatch(adminGetAllUsers());
  }, [dispatch, error, deleteError, isDeleted]);

  const deleteUserHandler = (id) => {
    dispatch(adminDeleteUser(id));
  };

  const columnData = [
    { field: "id", headerName: "USER ID", minWidth: 300, flex: 0.5 },

    {
      field: "name",
      headerName: "NAME",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "role",
      headerName: "ROLE",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "email",
      headerName: "EMAIL",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 250,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              className=" bg-[#141414] text-white hover:bg-[#eddb8e] hover:text-black px-2 py-1.5 rounded-md border-2 font-medium"
              to={`/admin/user/${params.id}`}
            >
              UPDATE ROLE
            </Link>

            <button
              onClick={() => deleteUserHandler(params.id)}
              className=" bg-[#141414] text-white hover:bg-[#eddb8e] hover:text-black px-2 py-1.5 rounded-md border-2 font-medium"
            >
              DELETE
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rowData = [];

  users &&
    users.forEach((item) => {
      rowData.push({
        id: item._id,
        name: item.name,
        role: item.role,
        email: item.email,
      });
    });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" my-3">
          <DataGrid
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            rows={rowData}
            columns={columnData}
            disableSelectionOnClick
          />
        </div>
      )}
    </>
  );
};

export default AllUsers;
