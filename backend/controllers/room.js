import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req,res,next) =>{
    const hotelId=req.params.hotelid;
    const newRoom=new Room(req.body)

    try{
        const savedRoom=await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}});

        }catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);
        
    }catch(err){
        next(err);
    }

};
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ); //mongodb set method, it gonna update first then return the new update
    res.status(200).json(updatedRoom); //200 ok
  } catch (err) {
    next(err); //server side 500
  }
};

export const getroom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id); //find hotel by id
    res.status(200).json(room); //200 ok if successfull return hotel
  } catch (err) {
    next(err); //server side 500
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find(); //(req.params.id); //find hotel by id
    res.status(200).json(rooms); //200 ok if successfull return hotel
  } catch (err) {
    next(err); //server side 500
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted Room successfully"); //200 ok just send a message
  } catch (err) {
    next(err); //server side 500
  }
};


