import { Box, Button, InputLabel, Input, Typography } from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useRef } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  
  // Create a reference for the file input
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/datqeddrl/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <Box sx={{ flex: 6, p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", boxShadow: 2, p: 2, m: 2 }}>
          <Typography variant="h5" sx={{ color: "lightgray" }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", boxShadow: 2, p: 2 }}>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
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
                    sx={{ cursor: "pointer" }}
                    onClick={() => fileInputRef.current.click()} // Trigger file input click
                  />
                </Typography>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  ref={fileInputRef} // Assign the ref
                />
              </Box>

              {inputs.map((input) => (
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

export default New;
