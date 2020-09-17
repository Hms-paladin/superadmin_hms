import React, { Component } from "react";
import plus from "../../images/plus.png";
import Grid from "@material-ui/core/Grid";
import "./Product_UploadMaster.css";
import Labelbox from "../../helper/labelbox/labelbox";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Modalcomp from "../../helper/ModalComp/ModalComp";
import Product_UploadModal from "./Product_UploadModal";
import Product_UploadTable from "./Product_UploadTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Input, Select, Icon } from "antd";
import dateFormat from "dateformat";
import excel from "../../images/excel.svg";
import pdf from "../../images/pdf.svg";
import print from "../../images/print.svg";
import { Paper } from "@material-ui/core";

const current_date = dateFormat(new Date(), "dd mmm yyyy");

export default class Product_uploadMaster extends Component {
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
      <div>
        <Paper>
          <div className="uploadmasterheader">
            <div className="titleuser">MANAGE PRODUCT </div>

            {/* <div style={{ width: "190px", marginLeft: "10px" }}>
              <Labelbox
                type="select"
                value="ALL"
                style={{ width: "150px" }}
                labelname="Product"
              />
            </div> */}
            <div className="group_container">
              {/* <ButtonGroup  
                className="clinic_group_detailss"
                size="small"
                aria-label="small outlined button group"
              >
                <Button className="diet_details_day">This Day</Button>
                <Button className="diet_details_month">This Month</Button>
                <Button className="diet_details_month">This Year</Button>
              </ButtonGroup> */}

              {/* <div className="currentdate">
                <FaChevronLeft className="current_left" />
                {current_date}
                <FaChevronRight className="current_right" />
              </div> */}

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
              <div className="manage_container">
                <img
                  className="manage_plus-icon"
                  src={plus}
                  alt={"hi"}
                  onClick={this.handleClickopen}
                />
              </div>
            </div>
          </div>

          <Product_UploadTable />
          <div>
            <Product_UploadModal
              open={this.state.open}
              clrchange="text_color"
              closemodal={this.handleClickclose}
            />
          </div>
        </Paper>
      </div>
    );
  }
}
