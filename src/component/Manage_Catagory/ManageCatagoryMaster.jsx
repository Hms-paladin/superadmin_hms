import React, { Component } from "react";
import plus from "../../images/plus.png";
import Grid from "@material-ui/core/Grid";
import "./ManageCatagoryMaster.css";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import AddCategory from "./AddCategory";
import ManageCatagoryTable from "./ManageCatagoryTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Input, Select, Icon } from "antd";
import dateFormat from "dateformat";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Paper } from "@material-ui/core";

const current_date = dateFormat(new Date(), "dd mmm yyyy");

export default class ManageCatagoryMaster extends Component {
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
            <div className="titleuser">MANAGE CATEGORY</div>

            <div className="manage_container">
              {/* <div className="manage_date">
                <ChevronLeftIcon className="manage_icon"/>
                  <div className="date_manage">{current_date}</div>
                <ChevronRightIcon className="manage_icon"/></div> */}

              <div className="manage_content_search">
                <Search
                  className="manage_search"
                  placeholder=" Search "
                  onSearch={(value) => console.log(value)}
                  style={{ width: 150 }}
                />
              </div>

              <img
                className="manage_plus-icon"
                src={plus}
                alt={"hi"}
                onClick={this.handleClickopen}
              />
            </div>
          </div>

          <ManageCatagoryTable />
          <div className="Upload-modal-container">
            <Modalcomp
              visible={this.state.open}
              closemodal={this.handleClickclose}
              title={"ADD CATEGORY"}
              clrchange="text_color"
              custommodalsize="manage_catagory_modal"
            >
              <AddCategory
                visible={this.state.open}
                clrchange="text_color"
                closemodal={this.handleClickclose}
              />
            </Modalcomp>
          </div>
        </Paper>
      </div>
    );
  }
}
