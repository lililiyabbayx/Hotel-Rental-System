import { Box, Button, InputLabel, Input, Typography, Select, MenuItem } from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/datqeddrl/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("/hotels", newhotel);
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
            Add New Product
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", boxShadow: 2, p: 2 }}>
          <Box sx={{ flex: 1, textAlign: "center" }}>
          <img
  src={
    files
      ? URL.createObjectURL(files[0])
      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
  }
  alt="Uploaded file preview" // Provide a meaningful description
  style={{
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  }}
/>

          </Box>
          <Box sx={{ flex: 2, p: 2 }}>
            <form>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Image:
                  <DriveFolderUploadOutlinedIcon
                    sx={{ cursor: "pointer", ml: 1 }}
                    onClick={() => document.getElementById("file").click()} // Trigger the file input
                  />
                </Typography>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }} // Keep the input hidden
                />
              </Box>

              {hotelInputs.map((input) => (
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
                <InputLabel htmlFor="featured">Featured</InputLabel>
                <Select
                  id="featured"
                  value={info.featured || ""}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    padding: "10px",
                    borderBottom: "1px solid gray",
                  }}
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                </Select>
              </Box>

              <Box sx={{ mb: 2, display: "flex", flexDirection: "column", width: "40%" }}>
                <InputLabel htmlFor="rooms">Rooms</InputLabel>
                <Select
                  id="rooms"
                  multiple
                  value={rooms}
                  onChange={handleSelect}
                  fullWidth
                  sx={{
                    padding: "10px",
                    borderBottom: "1px solid gray",
                  }}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <MenuItem key={room._id} value={room._id}>
                          {room.title}
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

export default NewHotel;
