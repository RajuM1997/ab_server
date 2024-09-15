const express = require("express");

const {
  addGallery,
  updateGallery,
  deleteGallery,
  getSingleGallery,
  getAllGallery,
} = require("../controllers/gallery.js");
const router = express.Router();

// post gallery
router.post("/", addGallery);

// updated gallery
router.put("/:id", updateGallery);

// deleted gallery
router.delete("/:id", deleteGallery);

// get single gallery
router.get("/single-gallery/:id", getSingleGallery);

// get all gallery
router.get("/", getAllGallery);

module.exports = router;
