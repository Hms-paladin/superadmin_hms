import React, { Component } from "react";
import "./TrackingMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import Plus from "../../images/plus.png";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import dateFormat from "dateformat";
import TrackingTable from "./TrackingTable";
import Labelbox from "../../helper/labelbox/labelbox";
import Paper from "@material-ui/core/Paper";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Pdf from "../../images/pdf.svg";
import Print from "../../images/print.svg";
import Excel from "../../images/excel.svg";
import DateRangeSelect from "../../helper/DateRange/DateRange";

const current_date = dateFormat(new Date(), "dd mmm yyyy");
export default class DeliveryMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
    };
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    return (
      <div className="doctor_revenue">
        <Paper>
          <div className="tracking_uploadmasterheader">
            <div className="titleuser">TRACKING</div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
              className="totalorder_container"
            >
              <DateRangeSelect
                dynalign={"dynalign"}
                rangeDate={(item) => this.getRangeDate(item)}
              />

              {/* <div className="content_search"> */}
              <Search
                className="search"
                placeholder=" Search "
                onSearch={(value) => console.log(value)}
                style={{ width: 150 }}
              />

              <div className="office">
                <img src={Excel} className="excel" />
                <img src={Pdf} className="pdf" />
                <img src={Print} className="print" />
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className="totaltable">
            <TrackingTable />
          </div>
        </Paper>
      </div>
    );
  }
}
