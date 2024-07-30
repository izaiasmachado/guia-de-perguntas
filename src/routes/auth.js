const express = require("express");

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const LoginMiddleware = require("../middlewares/LoginMiddleware");
const RegisterMiddleware = require("../middlewares/RegisterMiddleware");

const LoginController = require("../controllers/LoginController");
const RegisterController = require("../controllers/RegisterController");
const LogoutController = require("../controllers/LogoutController");

const router = express.Router();

router.get(
  "/logout",
  AuthMiddleware.ensureUserIsAuthenticated,
  LogoutController.index
);

router.use(AuthMiddleware.ensureUserIsNotAuthenticated);
router.get("/login", LoginController.index);
router.post("/login", LoginMiddleware.validateLoginBody, LoginController.login);

router.get("/register", RegisterController.index);
router.post(
  "/register",
  RegisterMiddleware.validateRegisterBody,
  RegisterController.register
);

module.exports = router;
