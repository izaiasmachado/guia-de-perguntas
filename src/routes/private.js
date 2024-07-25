/**
 * Rotas que somente podem ser acessadas por usuários autenticados
 */
const express = require("express");

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AskQuestionController = require("../controllers/AskQuestionController");

const router = express.Router();

router.use(AuthMiddleware.checkIfUserIsAuthenticated);
router.get("/ask", AskQuestionController.index);
router.post("/ask", AskQuestionController.create);

module.exports = router;
