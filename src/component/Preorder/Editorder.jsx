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
import "./Editorder.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import Labelbox from "../../helper/ShopLabelComponent/labelbox";
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
import axios from "axios";
import { apiurl } from "../../App";
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
    this.state = { 
      cancel: null , 
      productID:"",
      stockDetails:[],
      stockColor:[]
    };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open = () => {
    this.setState({ edit: true });
  };
  onclose = () => {
    this.setState({ edit: false });
  };

  componentDidMount(){
    const {editData, edit}=this.props
    console.log("asdfjdshfjsdhfjksdhfjds",this.props)
    if(edit===true){
    this.state.productID=editData.id
    
    }this.getTableData()
    console.log(this.state.productID,"did")
  }

  getTableData = (data) =>{
    this.setState({spinner:true})
    var self = this

    
    axios({
      method:"POST",
      url:apiurl + 'getPreOrderById',
      data:{
        "product_id":this.state.productID
        }
          
    })
    .then((response)=>{
  
           console.log(response,"resresres")
         this.setState({
          stockDetails:response.data.data,
          stockColor:response.data.data[0].color_info
         })
            
  
})
           
   
  }
  render() {
    console.log(this.state.stockDetails,"ordercheck")
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
     
        <Grid container>
          <Grid md={12} sm={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >

                {this.state.stockDetails&&this.state.stockDetails.length>0 && this.state.stockDetails.map((stockDetails) => {
                  return(
                    <div>
              <div>
                <Labelbox type="text" labelname="Product Name" value={stockDetails.sh_product_name}/>
              </div>
              <div className="stock_available" >
                <Labelbox type="text" labelname="Available Stock" value={stockDetails.avilable_quantity} />
              </div>
              <Labelbox type="text" labelname="Expected Qty" value={stockDetails.expected_date} />

              <Labelbox type="datepicker" labelname="Expected Date" value={stockDetails.expected_quantity}/>

            </div>
                  )})}
                  </div>
          </Grid>
         
        </Grid>

        {this.state.stockColor&&this.state.stockColor.length>0 && this.state.stockColor.map((stockColor) => {
                  return(

<div className="stock_box_container">       
           <div className="stockcart_box">

      
        <div className="stock_second_content">
          <div style={{ width: "140px" }}>
            <Labelbox
              type="text"
              labelname="Color"
              value={stockColor.sh_color}
              className="second_content_one"
            />
          </div>
          <div className="shop_colorpalatte_dropdown">
            <div>
              <label className="shop_colorpalatte_label">Color Palette </label>
            </div>
            <div
              className="color_palette_box"
             
            >
             <div className="color_palette" style={{backgroundColor:`${JSON.parse(stockColor.sh_color_palette)}`}}>
             </div>
            </div>
            </div>
          <div style={{ width: "80px" }}>
            <Labelbox
              type="number"
              labelname="Qty"
              className="second_content_one"
            />
          </div>
          </div>
          {/* <div className="stock_second_content">
          <div style={{ width: "140px" }}>
            <Labelbox
              type="text"
              labelname="Color"
              placeholder="Example:Pink"
              className="second_content_one"
            />
          </div>
          <div className="shop_colorpalatte_dropdown">
            <div>
              <label className="shop_colorpalatte_label">Color Palette </label>
            </div>
            <div
              className="color_palette_box"
             
            >
             <div className="color_palette">

             </div>
            </div>
            </div>
          <div style={{ width: "80px" }}>
            <Labelbox
              type="number"
              labelname="Qty"
              className="second_content_one"
            />
          </div>
          </div> */}
          {/* <div className="stock_second_content">
          <div style={{ width: "140px" }}>
            <Labelbox
              type="text"
              labelname="Color"
              placeholder="Example:Pink"
              className="second_content_one"
            />
          </div>
          <div className="shop_colorpalatte_dropdown">
            <div>
              <label className="shop_colorpalatte_label">Color Palette </label>
            </div>
            <div
              className="color_palette_box"
             
            >
             <div className="color_palette">

             </div>
            </div>
            </div>
          <div style={{ width: "80px" }}>
            <Labelbox
              type="number"
              labelname="Qty"
              className="second_content_one"
            />
          </div>
          </div> */}
          {/* <div className="stock_second_content">
          <div style={{ width: "140px" }}>
            <Labelbox
              type="text"
              labelname="Color"
              placeholder="Example:Pink"
              className="second_content_one"
            />
          </div>
          <div className="shop_colorpalatte_dropdown">
            <div>
              <label className="shop_colorpalatte_label">Color Palette </label>
            </div>
            <div
              className="color_palette_box"
             
            >
             <div className="color_palette">

             </div>
            </div>
            </div>
          <div style={{ width: "80px" }}>
            <Labelbox
              type="number"
              labelname="Qty"
              className="second_content_one"
            />
          </div>
          </div> */}
        </div>
        </div>
                  )})}
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
