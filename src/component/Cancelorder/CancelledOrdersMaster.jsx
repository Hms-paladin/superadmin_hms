import React, { Component } from "react";
import plus from "../../images/plus.png";
import Grid from "@material-ui/core/Grid";
import "./CancelledOrdersMaster.css";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import CancelledOrdersTable from "./CancelledOrdersTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import dateFormat from "dateformat";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Input, Select, Icon } from "antd";
import { Paper } from "@material-ui/core";
import excel from "../../images/excel.svg";
import pdf from "../../images/pdf.svg";
import print from "../../images/print.svg";
import DateRangeSelect from "../../helper/DateRange/DateRange";

const current_date = dateFormat(new Date(), "dd mmm yyyy");

export default class CancelledOrdersMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  render() {
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    return (
      <div className="cancelorders_shopping">
        <Paper>
          <div className="uploadmasterheader">
            <div className="titleuser_cancelorder">CANCELLED ORDERS</div>

            <div
              // className="totalorder_container_cancel"
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
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
                <img src={excel} className="excel" />
                <img src={pdf} className="pdf" />
                <img src={print} className="print" />
              </div>
              {/* </div> */}
            </div>
          </div>

          <CancelledOrdersTable />
        </Paper>
      </div>
    );
  }
}
