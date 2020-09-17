import React, { Component } from "react";
import BookingDetails from "./BookingDetails";
import "./BookingDetails.css";

import dateFormat from "dateformat";

export default class DealsMaster extends Component {
  render() {
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    return (
      <div>
        <div className="dashboard_header">
          <div className="dashboard_title">DEALS</div>
        </div>
        <BookingDetails />
      </div>
    );
  }
}
