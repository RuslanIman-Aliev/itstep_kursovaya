import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./Search.css";

const Search = ({ loc = "", date = "", guest = "" }) => {
  const [location, setLocation] = useState(loc || "");
  const [dateRange, setDateRange] = useState(date || "");
  const [guests, setGuests] = useState(guest || "");
  const navigate = useNavigate();

  useEffect(() => {
    flatpickr("#date-range", {
      mode: "range",
      dateFormat: "Y-m-d",
      defaultDate: date ? date : undefined,
      minDate: Date.now(),
      onChange: (selectedDates, dateStr) => {
        setDateRange(dateStr);
      },
    });
  }, [date]);

  const handleSearch = () => {
    const params = new URLSearchParams({
      location,
      dateRange,
      guests,
    }).toString();

    navigate(`/list?${params}`);
  };

  return (
    <div className="check-availability">
      <div className="form-container">
        <FaMapMarkerAlt className="icon" />
        <div className="form-group">
          <input
            className="find-object input-style"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location || ""}
          />
          <p className="headers">Location</p>
        </div>

        <FaCalendarAlt className="icon " />
        <div className="form-group">
          <input
            type="text"
            className="find-date input-style"
            id="date-range"
            value={dateRange || ""}
            readOnly
          />
          <p className="headers">Check in-out</p>
        </div>

        <FaUserFriends className="icon" />
        <div className="form-group">
          <input
            className="people-count input-style"
            type="text"
            onChange={(e) => setGuests(e.target.value)}
            value={guests || ""}
          />
          <p className="headers">Guests & Rooms</p>
        </div>

        <button className="search-button" onClick={handleSearch}>
          <FaSearch className="search-icon" />
        </button>
      </div>
    </div>
  );
};

export default Search;
