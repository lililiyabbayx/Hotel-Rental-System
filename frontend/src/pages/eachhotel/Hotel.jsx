import { useState, useEffect, useContext } from "react";
import { Box, Button, Container, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCircleArrowLeft, faCircleArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Reserve from "../../components/reserve/Reserve";
import { SearchContext } from "../../context/SearchContext"; // Ensure this import is present

const Hotel = () => {
   const location = useLocation();
   const id = location.pathname.split("/")[2];
   const [slideNumber, setSlideNumber] = useState(0);
   const [open, setOpen] = useState(false);
   const [openModal, setOpenModal] = useState(false);

   const { data, loading } = useFetch(`http://localhost:5500/api/hotels/find/${id}`);
   
   const { dates, options } = useContext(SearchContext); // Use context here

   const [loadingDates, setLoadingDates] = useState(true);

   useEffect(() => {
      if (dates?.startDate && dates?.endDate) {
         setLoadingDates(false);
      }
   }, [dates]);

   const startDate = dates?.startDate;
   const endDate = dates?.endDate;

   if (loadingDates) {
      return <div>Loading Dates...</div>;
   }

   if (!startDate || !endDate) {
      return <div>Invalid dates</div>;
   }

   const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
   const dayDifference = (date1, date2) => {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
   };

   const days = dayDifference(new Date(endDate), new Date(startDate));

   const handleOpen = (i) => {
      setSlideNumber(i);
      setOpen(true);
   };

   const handleMove = (direction) => {
      setSlideNumber(direction === "l" ? (slideNumber === 0 ? data?.photos?.length - 1 : slideNumber - 1) : (slideNumber === data?.photos?.length - 1 ? 0 : slideNumber + 1));
   };

   const handleClick = () => {
      setOpenModal(true);
   };

   return (
      <Box>
         <Navbar />
         <Header type="list" />
         {loading ? (
            "Loading..."
         ) : (
            <Container>
               {/* Image Slider */}
               {open && (
                  <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, bgcolor: "rgba(0,0,0,0.5)" }}>
                     <IconButton onClick={() => setOpen(false)} sx={{ color: "white", position: "absolute", top: 20, right: 20 }}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                     </IconButton>
                     <IconButton onClick={() => handleMove("l")} sx={{ color: "white", position: "absolute", top: "50%", left: 20 }}>
                        <FontAwesomeIcon icon={faCircleArrowLeft} />
                     </IconButton>
                     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={data.photos[slideNumber]} alt="" style={{ maxWidth: "100%", height: "auto" }} />
                     </Box>
                     <IconButton onClick={() => handleMove("r")} sx={{ color: "white", position: "absolute", top: "50%", right: 20 }}>
                        <FontAwesomeIcon icon={faCircleArrowRight} />
                     </IconButton>
                  </Box>
               )}

               {/* Hotel Details */}
               <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
                  <Typography variant="h4">{data.name}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                     <FontAwesomeIcon icon={faLocationDot} />
                     <Typography sx={{ ml: 1 }}>{data.address}</Typography>
                  </Box>
                  <Typography sx={{ mt: 1, fontStyle: "italic" }}>
                     Excellent location – {data.distance}m from center
                  </Typography>
                  <Typography sx={{ mt: 2, fontWeight: "bold", color: "green" }}>
                     Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                  </Typography>

                  {/* Hotel Images */}
                  <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                     {data.photos?.map((photo, i) => (
                        <Box key={i} sx={{ cursor: "pointer" }}>
                           <img src={photo} alt="hotel" width="100%" onClick={() => handleOpen(i)} />
                        </Box>
                     ))}
                  </Box>

                  {/* Price and Reserve Button */}
                  <Box sx={{ mt: 4, textAlign: "center" }}>
                     <Typography variant="h6">Perfect for a {days}-night stay!</Typography>
                     <Typography sx={{ mt: 1 }}>Located in the real heart of the city with a 9.8 location score!</Typography>
                     <Typography sx={{ mt: 2 }} variant="h4">
                        <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                     </Typography>
                     <Button variant="contained" color="primary" onClick={handleClick} sx={{ mt: 3 }}>
                        Reserve or Book Now!
                     </Button>
                  </Box>
               </Box>

               {/* Modal for Reservation */}
               {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
            </Container>
         )}
      </Box>
   );
};

export default Hotel;
