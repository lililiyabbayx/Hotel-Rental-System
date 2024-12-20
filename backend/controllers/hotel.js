import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
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

//localhost:5500/api/hotels?featured=true&limit=3

export const getHotels = async (req, res, next) => {
  try {
    const { min, max, limit, featured, ...others } = req.query;

    // Convert string "true"/"false" to boolean
    const featuredBool = featured === "true" ? true : false;

    // Create query object
    const query = {
      ...others,
      ...(featured && { featured: featuredBool }),
      cheapestPrice: {
        $gt: min || 1,
        $lt: max || 10000,
      },
    };

    console.log("Query being executed:", query); // Debug log

    const hotels = await Hotel.find(query).limit(parseInt(limit) || 0);

    console.log("Found hotels:", hotels); // Debug log

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
<<<<<<< HEAD
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
=======

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

>>>>>>> 98c03c22ee97ade1a26485b47dc69a769daea048
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
<<<<<<< HEAD
    next(err);
  }
};
=======
    next(err); //server side 500
  }
};

>>>>>>> 98c03c22ee97ade1a26485b47dc69a769daea048
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
<<<<<<< HEAD
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
=======
    const airbnbCount = await Hotel.countDocuments({ type: "airbnb" });

    res.status(200).json([
      {
        type: "hotel",
        count: hotelCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "villa",
        count: villaCount,
      },
      {
        type: "airbnb",
        count: airbnbCount,
      },
    ]);
  } catch (err) {
    next(err); //server side 500
  }
};
>>>>>>> 98c03c22ee97ade1a26485b47dc69a769daea048
