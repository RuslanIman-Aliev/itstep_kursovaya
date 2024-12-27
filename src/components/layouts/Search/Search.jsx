import React, { useEffect, useState, useNavigate } from 'react'
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import './Search.css'
const Search =()=>{

  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [guests, setGuests] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
        flatpickr("#date-range", {
          mode: "range",
          dateFormat: "Y-m-d",
          onChange: (selectedDates, dateStr) => {
            setDateRange(dateStr);
          },
        });
      }, []);
    return(
        <div className="check-availability">

            <div className="form-container">

              <FaMapMarkerAlt className="icon" />
              <div className="form-group">
                <input className='find-object input-style' type="text" />
                <p className='headers'>Location</p>
              </div>
              <FaCalendarAlt className="icon " />
              <div className="form-group">
                <input type="text" className='find-date input-style' id='date-range' />
                <p className='headers'>Check in-out</p>
              </div>
              {/* Добавить выпадающий список количества людей как в референсе*/}
              <FaUserFriends className="icon" />
              <div className="form-group">
                <input className='people-count input-style' type="text" />
                <p className='headers'>Guests&Rooms</p>
              </div>

              <button className="search-button">
                <FaSearch className="search-icon" />
              </button>
            </div>
          </div>
    )
}

export default Search