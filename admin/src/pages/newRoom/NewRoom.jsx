import { Box, Button, InputLabel, Input, Select, MenuItem, Typography, TextareaAutosize } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <Box sx={{ flex: 6, padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", boxShadow: 2, padding: 2, margin: 2 }}>
          <Typography variant="h5" sx={{ color: "lightgray" }}>
            Add New Room
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", boxShadow: 2, p: 2 }}>
          <Box sx={{ flex: 2, p: 2 }}>
            <form>
              {roomInputs.map((input) => (
                <Box key={input.id} sx={{ mb: 2, display: "flex", flexDirection: "column", width: "40%" }}>
                  <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
                  <Input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    fullWidth
                    sx={{
                      borderBottom: "1px solid gray",
                      padding: "5px",
                    }}
                  />
                </Box>
              ))}
              
              <Box sx={{ mb: 2, display: "flex", flexDirection: "column", width: "40%" }}>
                <InputLabel htmlFor="rooms">Rooms</InputLabel>
                <TextareaAutosize
                  id="rooms"
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Give comma between room numbers."
                  minRows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid gray",
                    borderRadius: "4px",
                  }}
                />
              </Box>

              <Box sx={{ mb: 2, display: "flex", flexDirection: "column", width: "40%" }}>
                <InputLabel htmlFor="hotelId">Choose a hotel</InputLabel>
                <Select
                  id="hotelId"
                  value={hotelId || ""}
                  onChange={(e) => setHotelId(e.target.value)}
                  fullWidth
                  sx={{
                    padding: "10px",
                    borderBottom: "1px solid gray",
                  }}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <MenuItem key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </MenuItem>
                      ))}
                </Select>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                sx={{
                  width: "150px",
                  padding: "10px",
                  fontWeight: "bold",
                  mt: 2,
                  backgroundColor: "teal",
                  color: "white",
                }}
              >
                Send
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewRoom;
