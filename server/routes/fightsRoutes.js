const express = require("express");
const router = express.Router();
const {
  getAllFights,
  getOneFight,
  createFight,
  updateFight,
  deleteFight,
} = require("../controllers/fightsContoller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.get("/", getAllFights);
router.get("/:id", getOneFight);
router.post(
  "/",
  [authenticateUser, authorizePermissions("admin")],
  createFight,
);
router.patch(
  "/:id",
  [authenticateUser, authorizePermissions("admin")],
  updateFight,
);
router.delete(
  "/:id",
  [authenticateUser, authorizePermissions("admin")],
  deleteFight,
);

module.exports = router;
