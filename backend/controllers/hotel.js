import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  //using async it will add data it will take time
  //take hotel info from user
  const newHotel = new Hotel(req.body); //req.body req from user
  try {
    const savedHotel = await newHotel.save(); //save hotel
    res.status(200).json(savedHotel); //200 ok
  } catch (err) {
    next(err); //server side 500
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ); //mongodb set method, it gonna update first then return the new update
    res.status(200).json(updatedHotel); //200 ok
  } catch (err) {
    next(err); //server side 500
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id); //find hotel by id
    res.status(200).json(hotel); //200 ok if successfull return hotel
  } catch (err) {
    next(err); //server side 500
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find(); //(req.params.id); //find hotel by id
    res.status(200).json(hotels); //200 ok if successfull return hotel
  } catch (err) {
    next(err); //server side 500
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted Hotel successfully"); //200 ok just send a message
  } catch (err) {
    next(err); //server side 500
  }
};
