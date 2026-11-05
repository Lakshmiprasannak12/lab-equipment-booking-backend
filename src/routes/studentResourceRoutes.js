const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authmiddleware");
const checkRole = require("../middlewares/roleMiddleware");

const {
    getStudentResources
} = require("../controllers/studentResourceController");

router.use(protect);
router.use(checkRole("student"));

router.get("/resources", getStudentResources);

module.exports = router;