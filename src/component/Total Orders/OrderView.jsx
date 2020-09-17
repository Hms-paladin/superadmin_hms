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
import "./OrderView.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
const styles = {};
export default class OrderView extends React.Component {
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
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;

    return (
      <div className="Shopping_popup_details">
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          minWidth="md"
          className="customer_modal"
          CloseIcon="open"
        >
          {/* <div><img src={Profile} className="customer_Shopping"/></div> */}
          <div className="customer_Shopping">
            <img className="customer_shopping_avatar" src={Profile} />
          </div>
          <CloseIcon className="close_ordertotal" onClick={this.handleClose} />
          <div className="Shopping_order_view">
            <div className="order_heading">
              <h2 className="customer_name">AAMINA</h2>
              <h4 className="customer_order">Order Details</h4>
            </div>

            <div className="shopping_details">
              <div className="shopping_details_one">
                <div className="shopping_details_content">
                  <label className="product_shop">Product</label>
                  <span className="product_name">Rollin Giraffe Cycle</span>
                </div>
                <div className="shopping_details_content">
                  <label className="product_shop">Delivery Address</label>
                  <span className="product_name">
                    Hamadan, As sulamaniyah, Riyadh 12242, Saudi Arabia
                  </span>
                </div>

                <div className="shopping_details_content">
                  <label className="product_shop">Booked Date</label>
                  <span className="product_name">19 Sep 2019</span>
                </div>
                <div className="shopping_details_content">
                  <label className="product_shop">Total Cost</label>
                  <span className="product_name">80 KWD</span>
                </div>
                {/* <div className="shopping_details_content">
             <label className="product_shop">Product</label>
            <span className="product_name">Rollin Giraffe Cycle</span>
           </div>

           <div className="shopping_details_content">
             <label className="customer_address">Address</label>
            <span className="address_detail">Hamadan, As sulamaniyah,</span>
            <span className="address_detail">Riyadh 12242, Saudi Arabia</span>
           </div>

           <div className="shopping_details_content">
             <label className="booking_date">Booked ON</label>
            <span className="date_booked">19 Sep 2019</span>
           </div> */}
              </div>
            </div>
            {/* <Divider className="divide" />

            <div className="shopping_quantity">
              <div className="quantity_cost">
                <h5 className="cost_bottom">
                  Quatity<span className="bottom_quantity">1</span>
                </h5>
                <h5 className="cost_bottom">
                  Cost (KWD)<span className="bottom_cost">80</span>
                </h5>
              </div>
            </div> */}
          </div>
        </Dialog>
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(OrderView);
