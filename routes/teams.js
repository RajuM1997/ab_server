const express = require("express");

const {
  addTeam,
  updateTeam,
  deleteTeam,
  getSingleTeam,
  getAllTeam,
} = require("../controllers/team.js");
const router = express.Router();

// post team
router.post("/", addTeam);

// updated team
router.put("/:id", updateTeam);

// deleted team
router.delete("/:id", deleteTeam);

// get single team
router.get("/single-team/:id", getSingleTeam);

// get all team
router.get("/", getAllTeam);

module.exports = router;
