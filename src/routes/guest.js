/**
 * Rotas que podem ser acessadas tanto por usuários
 * autenticados quanto por usuários não autenticados
 */
const express = require("express");

const HomeController = require("../controllers/HomeController");
const QuestionController = require("../controllers/QuestionController");

const router = express.Router();

router.get("/", HomeController.index);
router.get("/q/:questionId", QuestionController.index);

module.exports = router;
