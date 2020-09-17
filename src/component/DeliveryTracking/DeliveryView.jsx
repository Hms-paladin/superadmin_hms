import React, { Component } from "react";
import "./TrackingMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import Plus from "../../images/plus.png";
import dateFormat from "dateformat";
import "./DeliveryView.css";
import Paper from "@material-ui/core/Card";
import Labelbox from "../../helper/labelbox/labelbox";
import Stepper from "../../StepperStatus/Status";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export default class DeliveryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
    };
  }

  render() {
    return (
      <div className="delivery_view">
        <Stepper />
        <div>
          <p className="enter_tracking">Enter Tracking</p>
        </div>
        <div className="delivery_packing">
          <Paper className="pharpaper_container">
            <div className="outfor_butt">
              <Button className="outfor_deliverybutt">Out for Delivery</Button>
            </div>
            <div className="delivery_date">
              <div className="deli_timediv">
                <Labelbox type="text" labelname="Date" />
              </div>

              <div className="deli_timediv">
                <Labelbox type="text" labelname="Time" />
              </div>
            </div>
          </Paper>
        </div>
        <div className="modalbutt_container">
          <div>
            <div>
              <Button
                className="cancel_buttphar"
                variant="contained"
                onClick={() => this.props.closemodal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
          <div>
            <div>
              <Button
                className="update_button"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
