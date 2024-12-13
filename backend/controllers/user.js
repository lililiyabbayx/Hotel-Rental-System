import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ); //mongodb set method, it gonna update first then return the new update
    res.status(200).json(updatedUser); //200 ok
  } catch (err) {
    next(err); //server side 500
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); //find User by id
    res.status(200).json(user); //200 ok if successfull return User
  } catch (err) {
    next(err); //server side 500
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find(); //(req.params.id); //find User by id
    res.status(200).json(users); //200 ok if successfull return User
  } catch (err) {
    next(err); //server side 500
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted User successfully"); //200 ok just send a message
  } catch (err) {
    next(err); //server side 500
  }
};
