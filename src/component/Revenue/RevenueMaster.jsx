import React, { Component } from "react";
import "./RevenueMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import RevenueDetails from "./RevenueDetails";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import Plus from "../../images/plus.png";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import dateFormat from "dateformat";
import Labelbox from "../../helper/labelbox/labelbox";
import { Paper } from "@material-ui/core";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import excel from "../../images/excel.svg";
import pdf from "../../images/pdf.svg";
import print from "../../images/print.svg";
import DateRangeSelect from "../../helper/DateRange/DateRange";

const current_date = dateFormat(new Date(), "dd mmm yyyy");

class RevenueMaster extends Component {
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
          <div className="revenue_uploadsmasterheader">
            <div className="revenue_uploadsmasterheader_flex1">
              {" "}
              <div className="revenue-header">REVENUE</div>
              {/* <div style={{ width: "190px", marginLeft: "10px" }}>
                <Labelbox
                  type="select"
                  value="ALL"
                  style={{ width: "150px" }}
                  labelname="Product"
                />
              </div> */}
            </div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
              // className="group_container"
            >
              {/* <ButtonGroup
                className="clinic_group_detailss"
                size="small"
                aria-label="small outlined button group"
              >
                <Button className="diet_details_day">This Day</Button>
                <Button className="diet_details_month">This Month</Button>
                <Button className="diet_details_month">This Year</Button>
              </ButtonGroup>

              <div className="currentdate">
                <FaChevronLeft className="current_left" />
                {current_date}
                <FaChevronRight className="current_right" />
              </div> */}
              <div>
                <DateRangeSelect
                  dynalign={"dynalign"}
                  rangeDate={(item) => this.getRangeDate(item)}
                />
              </div>
              <Search
                className="revenue-search"
                placeholder=" Search "
                onSearch={(value) => console.log(value)}
                style={{ width: 150 }}
              />

              <div className="office">
                <img src={excel} className="excel" />
                <img src={pdf} className="pdf" />
                <img src={print} className="print" />
              </div>
            </div>
          </div>
          <RevenueDetails />
        </Paper>
      </div>
    );
  }
}

export default RevenueMaster;
