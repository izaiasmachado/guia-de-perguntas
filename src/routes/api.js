const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.post("/login", AuthMiddleware.validateLoginBody, AuthController.login);
router.post(
  "/register",
  AuthMiddleware.validateRegisterBody,
  AuthController.register
);

module.exports = router;
