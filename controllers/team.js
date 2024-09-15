const Team = require("../models/Team");

const addTeam = async (req, res, next) => {
  const newTeam = new Team(req.body);
  try {
    const savedTeam = await newTeam.save(newTeam);
    res.status(200).json(savedTeam);
  } catch (error) {
    next(error);
  }
};

const updateTeam = async (req, res, next) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTeam);
  } catch (err) {
    next(err);
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json("Team has been deleted");
  } catch (err) {
    next(err);
  }
};

const getSingleTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    res.status(200).json(team);
  } catch (err) {
    next(err);
  }
};

const getAllTeam = async (req, res, next) => {
  const { ...others } = req.query;
  try {
    const team = await Team.find({
      ...others,
    }).limit(req.query.limit);
    res.status(200).json(team);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addTeam,
  updateTeam,
  deleteTeam,
  getSingleTeam,
  getAllTeam,
};
