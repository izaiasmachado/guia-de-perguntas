/**
 * Rotas que podem ser acessadas somente por usuários
 * não autenticados
 */

const express = require("express");

const LoginMiddleware = require("../middlewares/LoginMiddleware");
const RegisterMiddleware = require("../middlewares/RegisterMiddleware");

const LoginController = require("../controllers/LoginController");
const RegisterController = require("../controllers/RegisterController");

const router = express.Router();

router.get("/login", LoginController.index);
router.post("/login", LoginMiddleware.validateLoginBody, LoginController.login);

router.get("/register", RegisterController.index);
router.post(
  "/register",
  RegisterMiddleware.validateRegisterBody,
  RegisterController.register
);

module.exports = router;
