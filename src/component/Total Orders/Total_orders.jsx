import React, { Component } from "react";
import "./Total_orders.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Total_orders_table from "./Total_oders_table";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import Plus from "../../images/plus.png";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import dateFormat from "dateformat";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Labelbox from "../../helper/labelbox/labelbox";
import Paper from "@material-ui/core/Paper";
import excel from "../../images/excel.svg";
import pdf from "../../images/pdf.svg";
import print from "../../images/print.svg";
import DateRangeSelect from "../../helper/DateRange/DateRange";

const current_date = dateFormat(new Date(), "dd mmm yyyy");

class Total_orders extends Component {
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
      <div className="totalorder_shopping">
        <Paper>
          <div className="totalorderheader">
            <div className="totalorder_title">TOTAL ORDER</div>

            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <ButtonGroup className="clinic_group_details" size="small" aria-label="small outlined button group">
              <Button className="diet_details_day">This Day</Button>
              <Button className="diet_details_month">This Month</Button>
              <Button className="diet_details_month">This Year</Button>
            </ButtonGroup> */}
              {/* 
              <div className="totalorder_date"> 
                <ChevronLeftIcon className="totalorder_icon"/>
                  <div className="date_totalorder">{current_date}</div>
                <ChevronRightIcon className="totalorder_icon"/></div> */}

              {/* <div className="content_search"> */}
              <DateRangeSelect
                dynalign={"dynalign"}
                rangeDate={(item) => this.getRangeDate(item)}
              />
              <Search
                className="search"
                placeholder=" Search "
                onSearch={(value) => console.log(value)}
                style={{ width: 150 }}
              />

              <div className="office">
                <img src={excel} className="excel" />
                <img src={pdf} className="pdf" />
                <img src={print} className="print" />
              </div>
              {/* </div> */}
            </div>
          </div>

          <Total_orders_table />
        </Paper>
      </div>
    );
  }
}

export default Total_orders;
