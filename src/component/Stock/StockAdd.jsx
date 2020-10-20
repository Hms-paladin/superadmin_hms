// import React from "react";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Dialog from "@material-ui/core/Dialog";
// import PersonIcon from "@material-ui/icons/Person";
// import AddIcon from "@material-ui/icons/Add";
// import Typography from "@material-ui/core/Typography";
// import { blue } from "@material-ui/core/colors";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
// import Divider from "@material-ui/core/Divider";
// import { withStyles } from "@material-ui/core/styles";
// import Profile from "../../Images/1.jpg";
// import "./StockAdd.css";
// import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
// import Labelbox from '../../helpers/labelbox/labelbox'
// import { DatePicker } from 'antd';
// import 'antd/dist/antd.css';
// import { IoIosGlobe } from "react-icons/io";
// import EditIcon from "@material-ui/icons/Edit";
// import CloseIcon from '@material-ui/icons/Close';
// import IconButton from '@material-ui/core/IconButton';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { Select } from 'antd';
// import Badge from '@material-ui/core/Badge';
// import {Dropdown} from 'react-bootstrap';

// const color=<div style={{backgroundColor:"#2680EB", width:"50px", height:"20px" ,marginTop:"5px"}} />;

// const { Option } = Select;
// function handleChange(value)
// {
//   console.log(`selected ${value}`);
// }
// const styles = {};
// export default class StockView extends React.Component {
// constructor(props) {
// super(props);
// this.state = { cancel: null };
// }
// handleClose = () => {
// this.props.onClose(this.props.selectedValue);
// };
// open=()=>
// {
// this.setState({view:true})
// }
// onclose=()=>
// {
// this.setState({view:false})
// }

// render() {
//   const color=<div style={{backgroundColor:"#FC478A", width:"50px", height:"20px" ,marginTop:"5px"}} />;
//   const colour=<div style={{backgroundColor:"#F6BE3E", width:"50px", height:"20px" ,marginTop:"5px"}} />;
//   const colors=<div style={{backgroundColor:"#2FD1F2", width:"50px", height:"20px" ,marginTop:"5px"}} />;
// const styles = "";
// const { classes, onClose, cancel, selectedValue, ...other } = this.props;
// const techCompanies = [
// { label: "Apple"  , value: "option 1"},
// { label: "Facebook" , value: "option 2"},
// { label: "Netflix" , value: "option 3"},
// { label: "Tesla" , value:"option 4"},

// ];
// return (
// <div className="stock_popup_details">

// <Dialog
//   onClose={this.handleClose}
//   aria-labelledby="simple-dialog-title"
//   {...other}
//   minWidth="md"
//   className="order_modal"
// >
// <div className="stock_add">
//   <h4 className="stock_add_title">ADD PRODUCT</h4>
//   <CloseIcon  className="close_addproduct" onClick={this.handleClose}/>
// </div>

// <div className="stock_content">
//   <div className="stock_content_one"><h5 className="content_one">Product Name</h5><h5 className="dummy">Royal Giraffe Cycle</h5></div>
//   <div className="stock_content_two"><h5 className="content_two">Total Stock</h5><h5 className="dummy">20</h5></div>
//   <div className="stock_content_three"><h5 className="content_three">08</h5><h5 className="dummy">03</h5></div>
//   <div className="stock_content_four"><h5 className="content_four">08</h5><h5 className="dummy">01</h5></div>
//   <div className="stock_content_five"><h5 className="content_five">08</h5><h5 className="dummy">07</h5></div>
//   <div className="stock_content_six"><h5 className="content_six">Total Sale</h5><h5 className="dummy">05</h5></div>
// </div>

// <div className="stock_second_content">
//   <div style={{width:"140px"}}><Labelbox type="text" labelname="Color" placeholder="Pink" className="second_content_one"/></div>
//   <div className="shop_colorpalatte_dropdown">
//       <div><label className="shop_colorpalatte_label">Color Palette </label></div>
//       <Select className="shop_colorpalatte_toggledropdown" defaultValue={color} style={{ width:"100px"}} onChange={handleChange}>
//       <Option className="shop_colorpalatte_toggledropdown" value="option 1"><div style={{backgroundColor:"#FC478A", width:"50px", height:"20px" ,marginTop:"5px"}} /></Option>
//       <Option className="shop_colorpalatte_toggledropdown" value="option 2"><div style={{backgroundColor:"#F6BE3E", width:"50px", height:"20px" ,marginTop:"5px"}} /></Option>
//       <Option className="shop_colorpalatte_toggledropdown" value="option 3"><div style={{backgroundColor:"#2FD1F2", width:"50px", height:"20px" ,marginTop:"5px"}} /></Option>
//       </Select>
//    </div>
//   <div style={{width:"80px"}}><Labelbox type="number" labelname="Qty" className="second_content_one"/></div>
//   <div  style={{width:"150px"}}><Labelbox type="datepicker" value="" labelname="Estimated Date"  className="second_content_one"/></div>

// </div>

// <div className="stock_second_content">
//   <div style={{width:"140px"}}><Labelbox type="text" labelname="Color" placeholder="Orange" className="third_content_one"/></div>
//   <div className="shop_colorpalatte_dropdown">
//     <div><label className="shop_colorpalatte_label">Color Palette </label></div>
//       <Select className="shop_colorpalatte_toggledropdown" defaultValue={colour} style={{ width:"100px"}} onChange={handleChange}>
//       <Option className="shop_colorpalatte_toggledropdown" value="option 1"><div style={{backgroundColor:"#FC478A", width:"50px", height:"20px" ,marginTop:"5px"}} /></Option>
//       <Option className="shop_colorpalatte_toggledropdown" value="option 2"><div style={{backgroundColor:"#F6BE3E", width:"50px", height:"20px" ,marginTop:"5px"}} /></Option>
//       <Option className="shop_colorpalatte_toggledropdown" value="option 3"><div style={{backgroundColor:"#2FD1F2", width:"50px", height:"20px" ,marginTop:"5px"}} /></Option>
//       </Select>
//    </div>
//   <div style={{width:"80px"}}><Labelbox type="number" labelname="Qty" className="third_content_one"/></div>
//   <div style={{width:"150px"}}><Labelbox type="datepicker" labelname="Estimated Date"  className="third_content_one"/></div>

// </div>

// <div className="stock_second_content">
//   <div style={{width:"140px"}}><Labelbox type="text" labelname="Color" placeholder="Blue" className="fourth_content_one"/></div>
//   <div className="shop_colorpalatte_dropdown">
//     <div><label className="shop_colorpalatte_label">Color Palette </label></div>
//       <Select className="shop_colorpalatte_toggledropdown" defaultValue={colors} style={{ width:"100px"}} onChange={handleChange}>
//       <Option className="shop_colorpalatte_toggledropdown" value="option 1"><div style={{backgroundColor:"#FC478A", width:"50px", height:"20px" ,marginTop:"5px"}} /></Option>
//       <Option className="shop_colorpalatte_toggledropdown" value="option 2"><div style={{backgroundColor:"#F6BE3E", width:"50px", height:"20px" ,marginTop:"5px"}} /></Option>
//       <Option className="shop_colorpalatte_toggledropdown" value="option 3"><div style={{backgroundColor:"#2FD1F2", width:"50px", height:"20px" ,marginTop:"5px"}} /></Option>
//       </Select>
//    </div>
//   <div style={{width:"80px"}}><Labelbox type="number" labelname="Qty" className="fourth_content_one"/></div>
//   <div style={{width:"150px"}}><Labelbox type="datepicker" labelname="Estimated Date"  className="fourth_content_one"/></div>

// </div>

// <div className="stock_button">
//   <Button className="stock_cancel" onClick={this.handleClose}>Cancel</Button>
//   <Button className="stock_update" >Update</Button>
// </div>

// </Dialog>

// </div>
// );
// }
// }
// const Trainer_viewWrapped = withStyles(styles)(StockView);

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Profile from "../../images/1.jpg";
import "./StockAdd.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import Labelbox from "../../helper/labelbox/labelbox";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Select } from "antd";
import Badge from "@material-ui/core/Badge";
import { Dropdown } from "react-bootstrap";

const color = (
  <div
    style={{
      backgroundColor: "#2680EB",
      width: "50px",
      height: "20px",
      marginTop: "5px",
    }}
  />
);

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const styles = {};
export default class Editstock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open = () => {
    this.setState({ view: true });
  };
  onclose = () => {
    this.setState({ view: false });
  };

  render() {
    const color = (
      <div
        style={{
          backgroundColor: "#FC478A",
          width: "50px",
          height: "20px",
          marginTop: "5px",
        }}
      />
    );
    const colour = (
      <div
        style={{
          backgroundColor: "#F6BE3E",
          width: "50px",
          height: "20px",
          marginTop: "5px",
        }}
      />
    );
    const colors = (
      <div
        style={{
          backgroundColor: "#2FD1F2",
          width: "50px",
          height: "20px",
          marginTop: "5px",
        }}
      />
    );
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    const techCompanies = [
      { label: "Apple", value: "option 1" },
      { label: "Facebook", value: "option 2" },
      { label: "Netflix", value: "option 3" },
      { label: "Tesla", value: "option 4" },
    ];
    return (
      <div className="stock_popup_details">
        {/* <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          minWidth="md"
          className="order_modal"
        > */}
        {/* <div className="stock_add">
          <h4 className="stock_add_title">ADD PRODUCT</h4>
          <CloseIcon className="close_addproduct" onClick={this.handleClose} />
        </div> */}
        <Grid container>
          <Grid md={12} sm={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <div style={{ width: "45%" }}>
                <Labelbox type="text" labelname="Product Code   " />
              </div>
              <div style={{ width: "45%" }}>
                <Labelbox type="text" labelname="Product Name   " />
              </div>
            </div>
          </Grid>
          <Grid md={12} sm={12}>
            {/* <Grid md={3} sm={3}> */}
            <div className="stocklist_det"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
                          <Grid md={3} sm={3}>

              <Labelbox type="datepicker" labelname="Received Date" />
            </Grid>
            <Grid md={1} sm={0}>
              </Grid>
            <Grid md={4} sm={6}>
              <Labelbox type="text" labelname="Details" />
              </Grid>
              <Grid md={1} sm={0}>
              </Grid>
              <Grid md={3} sm={3}>

              <Labelbox type="text" labelname="Received Qty" />
              </Grid>

            </div>
          </Grid>
          {/* </Grid> */}
        </Grid>
        <div className="stock_box_container">       
           <div className="stockcart_box">

        </div>
        </div>


        {/* <div className="stock_content">
          <div className="stock_content_one">
            <h5 className="content_one">Product Name</h5>
            <h5 className="dummy">Royal Giraffe Cycle</h5>
          </div>
          <div className="stock_content_two">
            <h5 className="content_two">Total Stock</h5>
            <h5 className="dummy">20</h5>
          </div>
          <div className="stock_content_three">
            <h5 className="content_three">08</h5>
            <h5 className="dummy">03</h5>
          </div>
          <div className="stock_content_four">
            <h5 className="content_four">08</h5>
            <h5 className="dummy">01</h5>
          </div>
          <div className="stock_content_five">
            <h5 className="content_five">08</h5>
            <h5 className="dummy">07</h5>
          </div>
          <div className="stock_content_six">
            <h5 className="content_six">Total Sale</h5>
            <h5 className="dummy">05</h5>
          </div>
        </div> */}

        {/* <div className="stock_second_content">
          <div style={{ width: "140px" }}>
            <Labelbox
              type="text"
              labelname="Color"
              placeholder="Pink"
              className="second_content_one"
            />
          </div>
          <div className="shop_colorpalatte_dropdown">
            <div>
              <label className="shop_colorpalatte_label">Color Palette </label>
            </div>
            <input
              type="text"
              style={{
                backgroundColor: "#FC478A",
                width: "150px",
                height: "30px",
              }}
            /> */}
        {/* <Labelbox
              type="text"
              style={{
                backgroundColor: "#FC478A",
              }}
            />
            <Select
              className="shop_colorpalatte_toggledropdown"
              defaultValue={color}
              style={{ width: "100px" }}
              onChange={handleChange}
            >
              <Option
                className="shop_colorpalatte_toggledropdown"
                value="option 1"
              >
                <div
                  style={{
                    backgroundColor: "#FC478A",
                    width: "50px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                />
              </Option>
              <Option
                className="shop_colorpalatte_toggledropdown"
                value="option 2"
              >
                <div
                  style={{
                    backgroundColor: "#F6BE3E",
                    width: "50px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                />
              </Option>
              <Option
                className="shop_colorpalatte_toggledropdown"
                value="option 3"
              >
                <div
                  style={{
                    backgroundColor: "#2FD1F2",
                    width: "50px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                />
              </Option>
            </Select> */}
        {/* </div>
          <div style={{ width: "80px" }}>
            <Labelbox
              type="number"
              labelname="Qty"
              className="second_content_one"
            />
          </div> */}
        {/* <div style={{ width: "150px" }}>
            <Labelbox
              type="datepicker"
              value=""
              labelname="Estimated Date"
              className="second_content_one"
            />
          </div> */}
        {/* </div> */}

        {/* <div className="stock_second_content">
          <div style={{ width: "140px" }}>
            <Labelbox
              type="text"
              labelname="Color"
              placeholder="Orange"
              className="third_content_one"
            />
          </div>
          <div className="shop_colorpalatte_dropdown">
            <div>
              <label className="shop_colorpalatte_label">Color Palette </label>
            </div>
            <Select
              className="shop_colorpalatte_toggledropdown"
              defaultValue={colour}
              style={{ width: "100px" }}
              onChange={handleChange}
            >
              <Option
                className="shop_colorpalatte_toggledropdown"
                value="option 1"
              >
                <div
                  style={{
                    backgroundColor: "#FC478A",
                    width: "50px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                />
              </Option>
              <Option
                className="shop_colorpalatte_toggledropdown"
                value="option 2"
              >
                <div
                  style={{
                    backgroundColor: "#F6BE3E",
                    width: "50px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                />
              </Option>
              <Option
                className="shop_colorpalatte_toggledropdown"
                value="option 3"
              >
                <div
                  style={{
                    backgroundColor: "#2FD1F2",
                    width: "50px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                />
              </Option>
            </Select>
          </div>
          <div style={{ width: "80px" }}>
            <Labelbox
              type="number"
              labelname="Qty"
              className="third_content_one"
            />
          </div>
          <div style={{ width: "150px" }}>
            <Labelbox
              type="datepicker"
              labelname="Estimated Date"
              className="third_content_one"
            />
          </div>
        </div>

        <div className="stock_second_content">
          <div style={{ width: "140px" }}>
            <Labelbox
              type="text"
              labelname="Color"
              placeholder="Blue"
              className="fourth_content_one"
            />
          </div>
          <div className="shop_colorpalatte_dropdown">
            <div>
              <label className="shop_colorpalatte_label">Color Palette </label>
            </div>
            <Select
              className="shop_colorpalatte_toggledropdown"
              defaultValue={colors}
              style={{ width: "100px" }}
              onChange={handleChange}
            >
              <Option
                className="shop_colorpalatte_toggledropdown"
                value="option 1"
              >
                <div
                  style={{
                    backgroundColor: "#FC478A",
                    width: "50px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                />
              </Option>
              <Option
                className="shop_colorpalatte_toggledropdown"
                value="option 2"
              >
                <div
                  style={{
                    backgroundColor: "#F6BE3E",
                    width: "50px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                />
              </Option>
              <Option
                className="shop_colorpalatte_toggledropdown"
                value="option 3"
              >
                <div
                  style={{
                    backgroundColor: "#2FD1F2",
                    width: "50px",
                    height: "20px",
                    marginTop: "5px",
                  }}
                />
              </Option>
            </Select>
          </div>
          <div style={{ width: "80px" }}>
            <Labelbox
              type="number"
              labelname="Qty"
              className="fourth_content_one"
            />
          </div>
          <div style={{ width: "150px" }}>
            <Labelbox
              type="datepicker"
              labelname="Estimated Date"
              className="fourth_content_one"
            />
          </div>
        </div> */}

        <div className="stock_button">
          <Button className="stock_cancel" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button className="stock_update">Update</Button>
        </div>
        {/* </Dialog> */}
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(Editstock);
