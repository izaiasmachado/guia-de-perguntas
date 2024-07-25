const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");

const publicRouter = require("./public");
const guestRouter = require("./guest");
const privateRouter = require("./private");

router.use(AuthMiddleware.loadUserIfTokenIsGiven);
router.use("/", guestRouter);
router.use("/", privateRouter);
router.use("/", publicRouter);

module.exports = router;
