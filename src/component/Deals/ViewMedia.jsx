import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ViewMedia.css";
import uploadimage from "../../Images/upload-button.png";
import View from "../../Images/view_media.png";
import Stepper from "../AdvertisementBooking/Stepper";

export default class ViewMedia extends Component {
  render() {
    return (
      <div>
        {" "}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "14px" }}>Eggs</div>
          <p className="media_active">Active</p>
        </div>
        <Grid container>
          <Grid item xs={12} md={6} className="media_title_container">
            <div className="profile_media_div">
              {/* <div className="profile_media"> */}
              <img src={View} className="diet_profile_media" />
              {/* </div> */}
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="media_title_container">
            {/* <Labelbox
              type="text"
              labelname="Media Title"
              value="Top Five Heart Tips"
            /> */}
            <Stepper />
          </Grid>
        </Grid>
      </div>
    );
  }
}
