import React from "react";
import "./BookingTable.css";  

const bookings = [
  { id: 1, name: "Deluxe Pool View", type: "With Breakfast", date: "Nov 22 – 25", status: "Booked", payment: "Full payment" },
  { id: 2, name: "Deluxe Pool View with Breakfast", type: "Free Cancellation | Breakfast only", date: "Nov 24 – 28", status: "Booked", payment: "On Property" },
  { id: 3, name: "Luxury Room with Balcony", type: "Free Cancellation | Breakfast + Lunch/Dinner", date: "Nov 24 – 28", status: "Reserved", payment: "Half Payment" },
  { id: 4, name: "Deluxe Room Twin Bed With Balcony", type: "Free Cancellation", date: "Nov 28 – 30", status: "Booked", payment: "Full payment" },
  { id: 5, name: "Deluxe Room Twin Bed With Balcony", type: "Free Cancellation | Breakfast only", date: "Nov 28 – 30", status: "Available", payment: "On Property" },
  { id: 6, name: "Premium Room With Balcony", type: "Free Cancellation | Breakfast only", date: "Nov 14 – 18", status: "Cancel", payment: "Half Payment" },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Booked":
      return "status-booked";
    case "Reserved":
      return "status-reserved";
    case "Available":
      return "status-available";
    case "Cancel":
      return "status-cancel";
    default:
      return "";
  }
};

const getPaymentClass = (payment) => {
  switch (payment) {
    case "Full payment":
      return "payment-full";
    case "Half Payment":
      return "payment-half";
    case "On Property":
      return "payment-on-property";
    default:
      return "";
  }
};

const BookingsTable = () => {
  return (
    <div className="bookings-table-container">
      <h2>Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.name}</td>
              <td>{booking.type}</td>
              <td>{booking.date}</td>
              <td className={getStatusClass(booking.status)}>{booking.status}</td>
              <td className={getPaymentClass(booking.payment)}>{booking.payment}</td>
              <td><button className="view-button">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;