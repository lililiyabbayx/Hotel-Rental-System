import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Import the CSS file

const AdminPanel = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    maxPeople: '',
    desc: '',
    roomNumbers: [{ number: '', unavailableDates: [] }],
    availability: true,
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const response = await axios.get('http://localhost:5500/api/rooms');
    setRooms(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoomNumberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRoomNumbers = [...formData.roomNumbers];
    updatedRoomNumbers[index][name] = value;
    setFormData({ ...formData, roomNumbers: updatedRoomNumbers });
  };

  const addRoom = async () => {
    await axios.post('http://localhost:5500/api/rooms', formData);
    fetchRooms();
    setFormData({
      title: '',
      price: '',
      maxPeople: '',
      desc: '',
      roomNumbers: [{ number: '', unavailableDates: [] }],
      availability: true,
    });
  };

  const toggleAvailability = async (roomId) => {
    const roomToUpdate = rooms.find(room => room._id === roomId);
    await axios.put(`http://localhost:5500/api/rooms/${roomId}`, {
      availability: !roomToUpdate.availability,
    });
    fetchRooms();
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <h2>Add Room</h2>
      <form onSubmit={(e) => { e.preventDefault(); addRoom(); }}>
        <input type="text" name="title" placeholder="Room Title" value={formData.title} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" name="maxPeople" placeholder="Max People" value={formData.maxPeople} onChange={handleChange} required />
        <textarea name="desc" placeholder="Description" value={formData.desc} onChange={handleChange} required />
        {formData.roomNumbers.map((roomNumber, index) => (
          <div key={index}>
            <input type="number" name="number" placeholder="Room Number" value={roomNumber.number} onChange={(e) => handleRoomNumberChange(index, e)} required />
          </div>
        ))}
        <button type="button" onClick={() => setFormData({ ...formData, roomNumbers: [...formData.roomNumbers, { number: '', unavailableDates: [] }] })}>
          Add Room Number
        </button>
        <button type="submit">Add Room</button>
      </form>

      <h2>Existing Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.title} - ${room.price} - Max People: {room.maxPeople} - Availability: {room.availability ? 'Available' : 'Unavailable'}
            <button onClick={() => toggleAvailability(room._id)}>
              {room.availability ? 'Mark as Unavailable' : 'Mark as Available'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
