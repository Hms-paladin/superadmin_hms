import React from "react";
import dateformat from 'dateformat';

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
import Axios from "axios";
import { apiurl } from "../../App";
import { Select } from "antd";



const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
var todayDate = dateformat(new Date(), "yyyy-mm-dd")
export default class Editstock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cancel: null,
      adding:false,
      productId:"",
      productCode:"",
      productName:"",
      colorInfo:[],
      startdate:"",
      productQnty:"",
      productDetails:"",
      colorQty:"",
      dummy:[],
      detailsError:"",
      quantityError:"",
      qtyError:"",
      testindex:""
      // minDate:startdate
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
  datepickerChange = (data, key) => {
    if (key === 'recieveddate') {
        this.setState({
            startdate: data
        },()=>console.log(dateformat(this.state.startdate,"yyyy-mm-dd"),"dstecheckinh"))
    }
  }

  compareDate = () => {
 
   
  }


  componentWillMount (){
    console.log(this.props,"stock_popup_details")
    if(this.props.edit===true){
      this.state.adding=true
      this.state.productId=this.props.editData.product_id
      this.state.productCode=this.props.editData.sh_product_code
      this.state.productName=this.props.editData.sh_product_name
      this.state.colorInfo=this.props.editData.color_info

    }
    console.log( this.props.editData.color_info.index,"edjbfj")
  }

  storeValues = (e,key,index) => {
   
    console.log(e,key,index,"podadai")
    
    if(key==="productDetails"){
      this.setState({
      productDetails:e, 
      detailsError:false
    })}
    if(key==="productQnty"){
      this.setState({
        productQnty:e, 
        quantityError:false
    })}

  }


  validation = () => {
    let detailsError=""
    let quantityError=""
    let qtyError=""

   if(this.state.productDetails==""){
     detailsError="Field Required"
   }
   if(this.state.productQnty==""){
    quantityError="Field Required"
  }
  if(this.state.colorQty==""){
    qtyError="Field Required"
  }
  if (
    detailsError ||
    quantityError ||
    qtyError 

  ) {
    this.setState({
      detailsError,
      quantityError,
      qtyError,
     
    });

    return false;
  }
  return true
  }

  onSubmitData = () => {
   
    var addingStock = {
      product_id: this.state.productId,
      sh_product_details: this.state.productDetails,
      sh_received_date: dateformat(this.state.startdate,"yyyy-mm-dd"),
      createdby: 1,
      createdon: dateformat(new Date(), "yyyy-mm-dd hh:mm:ss"),
    }
    const isValid= this.validation()

    if ( this.state.adding=== true && isValid) {
      this.addingStockInsertApi(addingStock);
    } 

  };

  addingStockInsertApi = (details) =>{
    Axios({
      method: "POST",
      url: apiurl + "insertShStock",
      data: {
        details
      },
    })
      .then((response) => {
        console.log("insertShStock", response);
    
        
      })
      .catch((err) => {
        //
      });
  }


  render() {
   
  
    
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    return (
      <div className="stock_popup_details">
   
        <Grid container>
          <Grid md={12} sm={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "45%" }}>
                <Labelbox type="text" labelname="Product Code" value={this.state.productCode} />
              </div>
              <div style={{ width: "45%" }}>
                <Labelbox type="text" labelname="Product Name" value={this.state.productName} />
              </div>
            </div>
          </Grid>
          <Grid md={12} sm={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Labelbox type="datepicker" labelname="Recieved Date" value={this.state.startdate}
              changeData={(date) => this.datepickerChange(date,'recieveddate')} />        

              <div style={{width:"50%"}}>
                <Labelbox 
                type="text" 
                labelname="Details" 
                value={this.state.productDetails}
                changeData={(e) => this.storeValues(e,"productDetails")}/>
                <div className="validation__error_custom">{this.state.detailsError && this.state.detailsError}</div>

                </div>  

              <div><Labelbox 
              type="number" 
              labelname="Received Qty"  
              value={this.state.productQnty}
              changeData={(e) => this.storeValues(e,"productQnty")} />
              <div className="validation__error_custom">{this.state.quantityError && this.state.quantityError}</div>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className="stock_box_container">       
           <div className="stockcart_box">

      {this.state.colorInfo && this.state.colorInfo.length >0 && this.state.colorInfo.map((colorInfo,index)=>{
          console.log( index,"trying")

        return(

        <div className="stock_second_content" >
          <div style={{ width: "140px" }}>
            <Labelbox         
              type="text"
              labelname="Color"
              value={colorInfo.sh_color}
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
               <div className="color_palette" style={{backgroundColor:`${JSON.parse(colorInfo.sh_color_palette)}`}}>
             </div>
           
            </div>
            </div>
          <div style={{ width: "80px" }}>
          <Labelbox 
              type="number" 
              labelname="Qty"  
              value={this.state.colorQty}
              changeData={(e) => this.storeValues(e,"qty",index)} />
            <div className="validation__error_custom">{this.state.qtyError && this.state.qtyError}</div>
          </div>
          </div>
         )
        })}
      
        </div>
        </div>
          

        <div className="stock_button">
          <Button className="stock_cancel" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button className="stock_update" onClick={()=>this.onSubmitData()}>Submit</Button>
        </div>
      </div>
    );
  }
}
