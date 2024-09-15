const Gallery = require("../models/Gallery");

const addGallery = async (req, res, next) => {
  const newGallery = new Gallery(req.body);
  try {
    const savedGallery = await newGallery.save(newGallery);
    res.status(200).json(savedGallery);
  } catch (error) {
    next(error);
  }
};

const updateGallery = async (req, res, next) => {
  try {
    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedGallery);
  } catch (err) {
    next(err);
  }
};

const deleteGallery = async (req, res, next) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json("gallery has been deleted");
  } catch (err) {
    next(err);
  }
};

const getSingleGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    res.status(200).json(gallery);
  } catch (err) {
    next(err);
  }
};

const getAllGallery = async (req, res, next) => {
  const { limit, ...others } = req.query;
  try {
    const gallery = await Gallery.aggregate([
      { $match: { ...others } },
      { $sample: { size: parseInt(limit) || 50 } },
    ]);
    res.status(200).json(gallery);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addGallery,
  updateGallery,
  deleteGallery,
  getSingleGallery,
  getAllGallery,
};
