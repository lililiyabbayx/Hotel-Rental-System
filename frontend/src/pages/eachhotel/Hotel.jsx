import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { IconButton, Button, Box, Typography, Grid, Modal } from "@mui/material";
import {
  ArrowBackIosNew as ArrowLeftIcon,
  ArrowForwardIos as ArrowRightIcon,
  Close as CloseIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";

const photos = [
  {
    src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/562015580.webp?k=ecaa152c1ee54ca77e23b1bd214238cbc9db80a5aad364c8fbce1f3fe554eaa3&o=",
  },
  {
    src: "https://grandsylhet.com/wp-content/uploads/al_opt_content/IMAGE/grandsylhet.com/wp-content/themes/grandsylhet/assets/images/homeslides/introslider_02.jpg.bv_resized_mobile.jpg.bv.webp",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTQgKj9NLRIDp2E6FwuyF5F1LzI6_PjoblGQ&s",
  },
  {
    src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  },
  {
    src: "https://www.grandsultanresort.com/wp-content/uploads/2024/01/King-Deluxe-A-Banner.webp",
  },
  {
    src: "https://images.trvl-media.com/lodging/12000000/11590000/11589000/11588944/d1235775.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
  },
];

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);// //to check the state of current slide number of photo array
  const [open, setOpen] = useState(false);

  const handleOpen = (i) => {
    //opens the photo modal and sets the active slide to the clicked photo's index.

    setSlideNumber(i);
    setOpen(true);
  };

<<<<<<< HEAD
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">Tower Street Apartments</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New york</span>
          </div>
          <span className="hotelDistance">
            Excellent location – 500m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków–Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
=======
  const handleClose = () => {//close the photo modal
    setOpen(false);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
            // as moving left go to the previous slide or loop back to the last slide.
        newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }//as moving right, go to the next slide or loop back to the first slide.

    setSlideNumber(newSlideNumber);
  };

  return (
    <Box>
      <Navbar />
      <Header type="list" />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
        {open && (
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 20, right: 20, color: "white" }}
              >
                <CloseIcon />
              </IconButton>
              <IconButton onClick={() => handleMove("l")} sx={{ color: "white" }}>
                <ArrowLeftIcon />
              </IconButton>
              <img
                src={photos[slideNumber].src}
                alt=""
                style={{ width: "80%", height: "80vh", objectFit: "cover" }}
              />
              <IconButton onClick={() => handleMove("r")} sx={{ color: "white" }}>
                <ArrowRightIcon />
              </IconButton>
            </Box>
          </Modal>
        )}
        <Box sx={{ maxWidth: 1024, width: "100%", p: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
          Book Now!
          </Button>
          <Typography variant="h4" gutterBottom>
          Sylhet Grand Hotel
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocationIcon />
            <Typography>15/A Sylhet, Bangladesh</Typography>
          </Box>
          <Typography color="primary">Excellent location – 500m from center</Typography>
          <Typography color="success.main" gutterBottom>
            Book at only 1000/- and get free shuttle to the tea garden
          </Typography>
          <Grid container spacing={2}>
            {photos.map((photo, i) => (
              <Grid item xs={4} key={i}>
                <Box
                  component="img"
                  src={photo.src}
                  alt=""
                  sx={{ width: "100%", cursor: "pointer" }}
                  onClick={() => handleOpen(i)}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Box sx={{ flex: 3 }}>
              <Typography variant="h5">Stay in the heart of City</Typography>
              <Typography mt={2}>
              Nestled in the scenic Sylhet tea gardens, our hotel offers
              tranquil accommodations and stunning views. Enjoy modern amenities, 
              free Wi-Fi, and air-conditioned rooms. Discover nearby attractions, 
              including Jaflong, Ratargul, and Bichanakandi.

              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                backgroundColor: "#ebf3ff",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6">Perfect for a 9-night stay!</Typography>
              <Typography>
              Located in the heart of Sylhet, this property boasts an excellent location score of 9.5!

              </Typography>
              <Typography variant="h6">
                <b>1000/-TK</b> (9 nights)
              </Typography>
              <Button variant="contained" color="primary">
                Reserve or Book Now!
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hotel;
>>>>>>> 98c03c22ee97ade1a26485b47dc69a769daea048
