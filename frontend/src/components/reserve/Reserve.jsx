import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useContext, useState, useEffect, useMemo } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [updatedRooms, setUpdatedRooms] = useState([]); // To track updated room availability
  const { data, reFetch } = useFetch(`http://localhost:5500/api/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  // Validate if dates are set properly
  console.log('Dates from SearchContext:', dates);

  // Define getDatesInRange function before useMemo
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate); // Convert startDate string to Date
    const end = new Date(endDate); // Convert endDate string to Date
    const dates = [];
    let currentDate = start;

    // Log dates for debugging
    console.log('Start Date:', start, 'End Date:', end);

    while (currentDate <= end) {
      dates.push(new Date(currentDate).getTime());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Memoizing alldates to avoid unnecessary recalculations
  const alldates = useMemo(() => {
    if (dates && dates.startDate && dates.endDate) {
      return getDatesInRange(dates.startDate, dates.endDate);
    }
    console.warn('No valid dates provided, returning empty array');
    return [];
  }, [dates]);

  console.log('Selected dates:', alldates);

  const isAvailable = useMemo(() => {
    return (roomNumber) => {
      console.log('Checking availability for room:', roomNumber.number);
      console.log('Unavailable dates:', roomNumber.unavailableDates);
      console.log('Selected dates:', alldates);

      const isAvailable = !roomNumber.unavailableDates?.some((date) =>
        alldates.includes(new Date(date).getTime()) // Compare the dates correctly
      );

      console.log(`Room ${roomNumber.number} availability:`, isAvailable);
      return isAvailable;
    };
  }, [alldates]);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      console.log('Selected rooms:', selectedRooms);
      console.log('Selected dates:', alldates);

      if (selectedRooms.length === 0 || alldates.length === 0) {
        console.error('Please select at least one room and valid dates.');
        return;
      }

      // Update the unavailableDates for each selected room on the server
      await Promise.all(
        selectedRooms.map((roomId) => {
          console.log('Sending update request for room ID:', roomId);
          return axios.put(`http://localhost:5500/api/rooms/availability/${roomId}`, { dates: alldates });
        })
      );

      // After successful update, re-fetch the room data to reflect changes
      console.log('Re-fetching room data after updating availability');
      await reFetch();

      setOpen(false); // Close the modal after the reservation is successful
      navigate("/"); // Redirect to the home page or another page
    } catch (err) {
      console.error("Error reserving rooms", err);
    }
  };

  useEffect(() => {
    if (data) {
      console.log('Data fetched from backend:', data);

      setUpdatedRooms(
        data
          .filter(item => item !== null) // Filter out null values from data
          .map((hotel) => ({
            ...hotel,
            roomNumbers: hotel.roomNumbers.map((room) => ({
              ...room,
              isAvailable: isAvailable(room), // Update room availability based on selected dates
            })),
          }))
      );
    }
  }, [data, isAvailable]); // Add isAvailable as a dependency

  useEffect(() => {
    console.log('Updated rooms:', updatedRooms);
  }, [updatedRooms]);

  return (
    <Box sx={{ position: "fixed", top: 20, left: 0, right: 0, bottom: 0, bgcolor: "rgba(0, 0, 0, 0.5)" }}>
      <Box sx={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", bgcolor: "white", p: 3, borderRadius: 1, width: "80%" }}>
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(false)} sx={{ position: "absolute", top: 5, right: 5, cursor: "pointer" }} />
        <Typography variant="h6">Select your rooms:</Typography>

        {updatedRooms
          ?.filter((item) => item !== null) // Filter out null values from data
          .map((item) => (
            <Box key={item._id} sx={{ mt: 3 }}>
              <Typography variant="h6">{item?.title}</Typography>
              <Typography variant="body2">{item?.desc}</Typography>
              <Typography variant="body2">Max people: {item?.maxPeople}</Typography>
              <Typography variant="body2">${item?.price} per night</Typography>
              <Box sx={{ mt: 2 }}>
                {item?.roomNumbers?.map((roomNumber) => (
                  <FormControlLabel
                    key={roomNumber._id}
                    control={
                      <Checkbox
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!roomNumber.isAvailable} // Disable if the room is unavailable
                      />
                    }
                    label={`Room ${roomNumber.number}`}
                  />
                ))}
              </Box>
            </Box>
          ))}

        <Button variant="contained" color="primary" onClick={handleClick} sx={{ mt: 3, width: "100%" }}>
          Reserve Now!
        </Button>
      </Box>
    </Box>
  );
};

export default Reserve;
