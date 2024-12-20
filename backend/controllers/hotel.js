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
        $lt: max || 999,
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
    res.status(200).json("deleted Hotel successfully"); //200 ok just send a message
  } catch (err) {
    next(err); //server side 500
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err); //server side 500
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
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
