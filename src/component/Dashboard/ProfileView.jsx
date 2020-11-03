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
import "./ProfileView.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import user from '../../images/user.png'


import ChevronRightIcon from "@material-ui/icons/ChevronRight";
const styles = {};
export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cancel: null,

     };
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
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
console.log(this.props,"1234")
    return (
      <div className="Shopping_dasshboard_details">
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          minWidth="md"
          className="profile_modal"
        >
          <div className="customer_Shopping">
          {this.props.showData.profile_image && this.props.showData.profile_image !== " " && this.props.showData.profile_image !== null && (
                <img src={this.props.showData.profile_image && this.props.showData.profile_image} className="customer_shopping_avatar" alt="patient" />
             )}

            {(this.props.showData.profile_image === " " || this.props.showData.profile_image == null) && (
              <img src={user} alt="patient_pic" className="customer_shopping_avatar" />
            )}      
                </div>
          <CloseIcon className="close_ordertotal" onClick={this.handleClose} />
          <div className="Shopping_profile_view">
            <div className="order_heading">
              <h2 className="customer_name">{this.props.showData.customer}</h2>
              <h4 className="customer_order">Order Details</h4>
            </div>

            <div className="total_orderview">
              <div className="shopping_details_one">
                <div className="shopping_details_content">
                  <label className="product_shop">Product</label>
                  <span className="product_name">{this.props.showData.product}</span>
                </div>
                <div className="shopping_details_content">
                  <label className="product_shop">Delivery Address</label>
                  <span className="product_name">
                  {this.props.showData.address}
                  </span>
                </div>

                <div className="shopping_details_content">
                  <label className="product_shop">Booked Date</label>
                  <span className="product_name">{this.props.showData.bookeddate}</span>
                </div>
                <div className="shopping_details_content">
                  <label className="product_shop">Total Cost</label>
                  <span className="product_name">{this.props.showData.cost} KWD</span>
                </div>
              </div>
            </div>
        
          </div>
        </Dialog>
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(ProfileView);
