import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
<<<<<<< HEAD
      
=======
>>>>>>> 0efbc60d9029f89e68616652c6c5db7bca99dd5a
    },
    price: {
      type: Number,
      required: true,
<<<<<<< HEAD
      
    },
    maxPeople: {
      type: String,
      required: true,
      
    },
    desc: {
        type: String,
        required: true,
        
      },
    roomNumbers: [{number:Number,unavailableDates:{type:[Date]}}],
=======
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
<<<<<<< HEAD
    availability: { type: Boolean, default: true }, // Add availability field
=======
>>>>>>> 0efbc60d9029f89e68616652c6c5db7bca99dd5a
>>>>>>> e6a793d5b80232ce8333da1cb49bfbe3916b7359
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema); //modelname,create model
