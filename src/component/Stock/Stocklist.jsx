import React, { Component } from "react";
import "./Stocklist.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Stocklist_table from "./Stocklist_table";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import Plus from "../../images/plus.png";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import dateFormat from "dateformat";
import Labelbox from "../../helper/labelbox/labelbox";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Paper from "@material-ui/core/Paper";
import excel from "../../images/excel.svg";
import pdf from "../../images/pdf.svg";
import print from "../../images/print.svg";
import DateRangeSelect from "../../helper/DateRange/DateRange";

const current_date = dateFormat(new Date(), "dd mmm yyyy");
class Stocklist extends Component {
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
      <div className="stock_Totalorder">
        <Paper>
          <div className="stock_uploadsmasterheader">
            <div className="titleTotalorder">STOCK LIST</div>

      
            <div
              // className="group_container"
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
           
              <Search
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
          <Stocklist_table />
        </Paper>
      </div>
    );
  }
}

export default Stocklist;
