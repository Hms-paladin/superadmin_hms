import React, { Component } from "react";
import "./TrackingMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import { Spin,notification,Input } from 'antd';
import Button from "@material-ui/core/Button";
import Plus from "../../images/plus.png";
import dateFormat from "dateformat";
import "./DeliveryView.css";
import Paper from "@material-ui/core/Card";
import Labelbox from "../../helper/labelbox/labelbox";
import ValidationLibrary from '../../helper/validationfunction';
import clock from '../../images/time (1).png'
import CustomizedSteppers from '../../StepperStatus/Status'
import { apiurl } from "../../App";
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export default class DeliveryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deliveryMode: null,
      timeValue: false,
      deliveryStatusUpdate: {
        'date': {
          'value': dateFormat(new Date(), "yyyy-mm-dd"),
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'time': {
          'value': new Date(),
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
      }
    };
  }

  componentDidMount() {
    this.getDeliveryTrackingStatus()
  }
  getDeliveryTrackingStatus = () => {
    axios({
      method: 'POST',
      url: apiurl + 'viewShOrderStatus',
      data: {
        order_id: this.props.orderId
      }
    }).then((response) => {
      console.log(response.data.data,"orderstatusrespone")
      this.setState({
        deliveryMode: response.data.data.filter(val => val.status_id != 5).find(data => data.sh_date_time === null) !== undefined ? response.data.data.filter(val => val.status_id != 5).find(data => data.sh_date_time === null) : response.data.data.filter(val => val.status_id != 5).find(data => data.status_id === 6),
        deliveryTrackingStatus: response.data.data,
      }, () => console.log(this.state.deliveryMode, "deliveryMode"))
    }).catch((error) => {
      console.log(error)
    })
  }

  checkValidation = (id) => {
    var deliveryStatusUpdate = this.state.deliveryStatusUpdate;
    var deliveryStatusUpdateKeys = Object.keys(deliveryStatusUpdate);
    console.log(deliveryStatusUpdateKeys);
    for (var i in deliveryStatusUpdateKeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        deliveryStatusUpdate[deliveryStatusUpdateKeys[i]].value,
        deliveryStatusUpdate[deliveryStatusUpdateKeys[i]].validation
      );
      console.log(errorcheck);
      deliveryStatusUpdate[deliveryStatusUpdateKeys[i]].error = !errorcheck.state;
      deliveryStatusUpdate[deliveryStatusUpdateKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = deliveryStatusUpdateKeys.filter(
      (obj) => deliveryStatusUpdate[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      this.updateDeliveryStatus(id);
    }
    this.setState({ deliveryStatusUpdate });
  };

  changeDynamic = (data, key) => {
    if (key === "time") {
      this.setState({
        timeValue: true
      })
    }
    var deliveryStatusUpdate = this.state.deliveryStatusUpdate;
    var errorcheck = ValidationLibrary.checkValidation(data, deliveryStatusUpdate[key].validation);
    deliveryStatusUpdate[key].value = data;
    deliveryStatusUpdate[key].error = !errorcheck.state;
    deliveryStatusUpdate[key].errmsg = errorcheck.msg;
    this.setState({ deliveryStatusUpdate });
    this.setState({})
  }

  generateAlert = (description) => {
    notification.success({
      message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  updateDeliveryStatus = (id) => {
    var date = dateFormat(this.state.deliveryStatusUpdate.date.value, "yyyy-mm-dd")
    var time = dateFormat(this.state.timeValue === true ? `${this.state.deliveryStatusUpdate.date.value} ${this.state.deliveryStatusUpdate.time.value}` : this.state.deliveryStatusUpdate.time.value, "HH:MM:ss")
    console.log(`${date} ${time}`, "sdfjslkdf")
    axios({
      method: 'POST',
      url: apiurl + 'updateShOrderStatus',
      data: {
        order_id: this.props.orderId,
        date_time: `${date} ${time}`,
        status: id,
      }
    }).then((response) => {
      if(response.data.status==1){
    
      this.generateAlert("Order Status Updated Succesfully")
      this.props.closemodal(false)
      this.props.getTableData()
      
      }
    })
  }

  render() {
    console.log(this.props,"viewtrack")
    return (
      <div className="delivery_view">
        <CustomizedSteppers deliveryTrackingStatus={this.state.deliveryTrackingStatus} />
        <div>
          <p className="enter_tracking">Enter Tracking</p>
        </div>
        {/* <div className="delivery_packing">
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
        </div> */}

            <Paper className="pharpaper_container">
            <div className="outfor_butt"><Button className="outfor_deliverybutt">{this.state.deliveryMode !== null && this.state.deliveryMode.sh_status}</Button></div>
            <div className="delivery_date"><div className="deli_timediv">
              <Labelbox
                type="datepicker"
                labelname="Date"
                changeData={(data) => this.changeDynamic(data, 'date')}
                value={this.state.deliveryStatusUpdate.date.value}
                error={this.state.deliveryStatusUpdate.date.error}
                errmsg={this.state.deliveryStatusUpdate.date.errmsg}
                disablePast
              />
            </div>
              <div className="deli_timediv deli_time_svg">
                <Labelbox
                  type="timepicker"
                  labelname="Time"
                  changeData={(data) => this.changeDynamic(data, 'time')}
                  value={this.state.deliveryStatusUpdate.time.value}
                  error={this.state.deliveryStatusUpdate.time.error}
                  errmsg={this.state.deliveryStatusUpdate.time.errmsg}
                  railwayTime
                >              
                </Labelbox>
              </div>
            </div>
          </Paper>

          {
          this.state.deliveryMode !== null && this.state.deliveryMode.sh_date_time === null &&
          <div className="modalbutt_container"><div><div><Button className="cancel_buttphar" variant="contained" onClick={() => this.props.closemodal(false)}>Cancel</Button></div></div>
            <div><div><Button className="update_button" variant="contained" color="primary" onClick={() => this.checkValidation(this.state.deliveryMode.status_id)}>Submit</Button></div></div>
          </div>
        }

        {/* <div className="modalbutt_container">
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
        </div> */}
      </div>
    );
  }
}
