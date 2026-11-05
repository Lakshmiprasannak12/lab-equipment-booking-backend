const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authmiddleware");
const checkRole = require("../middlewares/roleMiddleware");

const {
    getAdminResources,
    addResource,
    editResource,
    removeResource
} = require("../controllers/adminResourceController");

router.use(protect);
router.use(checkRole("admin"));

router.get("/resources", getAdminResources)
router.post("/resources", addResource);
router.patch("/resources/:id", editResource);
router.delete("/resources/:id", removeResource);
module.exports = router;