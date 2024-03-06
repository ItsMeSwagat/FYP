const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  adminAuthenticate,
} = require("../middleware/authenticate");
const adminUserController = require("../controller/adminUserController");

router.get(
  "/users",
  authenticateUser,
  adminAuthenticate("admin"),
  adminUserController.getAllUser
);
router.get(
  "/user/:id",
  authenticateUser,
  adminAuthenticate("admin"),
  adminUserController.getSingleUser
);
router.put(
  "/user/role/:id",
  authenticateUser,
  adminAuthenticate("admin"),
  adminUserController.updateUserRole
);
router.delete(
  "/user/:id",
  authenticateUser,
  adminAuthenticate("admin"),
  adminUserController.deleteUser
);

module.exports = router;
