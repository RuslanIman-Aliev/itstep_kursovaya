import React ,{ useEffect } from 'react'
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaSearch } from "react-icons/fa";  
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import './About.css'
import NavBars from '../../layouts/NavBars/NavBars';

const About = () =>{
    useEffect(() => {
        flatpickr("#date-range", {
            mode: "range", 
            dateFormat: "Y-m-d",
        });
    }, []);
    return(
        
        <div className="div-container">
            
            <NavBars/>
            <div className="main-info">
            <h3 className='phrase'>Feel at home, wherever you go </h3>
            <p className='text'>Here, you can discover the perfect place that suits your style and needs—where comfort meets convenience.</p>
            <div className="availability-container">

            
            <h2 className='check-availability-text'>Check Availability</h2>
            <div className="check-availability">
      
      <div className="form-container">
      
      <FaMapMarkerAlt className="icon" />
        <div className="form-group">
          <input className='find-object' type="text"  />
          <p className='headers'>Location</p> 
        </div>
        <FaCalendarAlt className="icon " />
        <div className="form-group">
          <input type="text" className='find-date' id='date-range'/>
          <p className='headers'>Check in-out</p> 
        </div>
        {/* Добавить выпадающий список количества людей как в референсе*/}
        <FaUserFriends className="icon" />
        <div className="form-group">         
          <input className='people-count' type="text"  />
          <p className='headers'>Guests&Rooms</p> 
        </div>

        <button className="search-button">
          <FaSearch className="search-icon" />
        </button>
      </div>
    </div>
            </div>
        </div>
        </div>
    )
}
export default About