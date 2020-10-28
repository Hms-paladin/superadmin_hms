import React from "react";
import dateformat from 'dateformat';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./StockAdd.css";
import Labelbox from "../../helper/ShopLabelComponent/labelbox";
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
      colorInfo:"",
      startdate:"",
      productQnty:"",
      productDetails:"",
      colorQty:"",
      dummy:[],
      detailsError:"",
      quantityError:"",
      qtyError:"",
      stockDetails:"",
      recievedQty:""
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
            startdate: data,
            dateError:false
        },()=>console.log(dateformat(this.state.startdate,"yyyy-mm-dd"),"dstecheckinh"))
    }
  }


  componentWillMount (){
    console.log(this.props,"stock_popup_details")
    if(this.props.edit===true){
     this.state.stockDetails=this.props.editData
     this.state.adding=true
      // this.setState({stockDetails:this.props.editData,adding:true})
    }
    console.log( this.state.stockDetails,"edjbfj")
  }
  storeValues = (e,key) => {
   
      this.setState({
      productDetails:e, 
      detailsError:false
    })
  }
    recievedQty =(e,key)=>{
      this.setState({
        recievedQty:e,
        quantityError:false
      })
    }

    changeStockDetails =(value,index,key,arr)=>{
      console.log(index,"indexchck")
      var stockDetails=this.state.stockDetails;
    if(key){
      stockDetails[key]=value;
    }else if(arr) {
    stockDetails.color_info[index].sh_quantity=value;
    
    }console.log(stockDetails.color_info[index],"val")
    this.setState({stockDetails,qtyMisMatch:false}) 
    console.log(this.state.stockDetails.color_info[index]," proper")
    }

  
    validation = () => {
    alert()
    let dateError=""
    let quantityError=""
    let qtyMisMatch=""
    let detailsError=""

    var total=this.state.stockDetails.color_info.map((qty)=>{
      return qty.sh_quantity
    })
       console.log("dknsnf",total)
    var Increment = 0 ;
      for (var i = 0; i < total.length; i++){ 
        console.log(parseInt(total[i]),"totslll")
          Increment += parseInt(total[i]);
      } 

     
    if( this.state.recievedQty !== Increment){
    qtyMisMatch="Quantity MisMatch"
   }  

   if(this.state.recievedQty==""){
    
    quantityError="Field Required"
     
   }
   if(this.state.startdate==""){
    dateError="Date Not Update"
  }

  if(this.state.productDetails==""){
    detailsError="Field Required"
  }
  if (
    quantityError ||
    dateError ||
    qtyMisMatch ||
    detailsError

  ) {
    this.setState({
      quantityError ,
      dateError,
      qtyMisMatch,
      detailsError
     
    });

    return false;
  }
  return true
  }

  onSubmitData = () => {
   var total=    this.state.stockDetails.color_info.map((qty)=>{
     return qty.sh_quantity
   })
      console.log("dknsnf",total)
      var Increment = 0 ;
      for (var i = 0; i < total.length; i++){ 
        console.log(parseInt(total[i]),"totslll")
          Increment += parseInt(total[i]);
        

      }    
      console.log(Increment,"summingtotal")
   
    var addStock={
      product_id:this.state.stockDetails.product_id,
      sh_product_details: this.state.productDetails,
      // sh_product_details: this.state.stockDetails.sh_product_details,
      sh_received_date: dateformat(this.state.startdate,"yyyy-mm-dd"),
      created_by: 1,
      created_on: dateformat(new Date(), "yyyy-mm-dd hh:mm:ss"),
      color_info:this.state.stockDetails.color_info
    }
 
    const isValid= this.validation()

    if (this.state.recievedQty==Increment ) {
      alert("yes")
      this.addingStockInsertApi(addStock);
      this.setState({qtyMisMatch:false})
    } else {
      alert("no")
    }
    console.log(this.state.recievedQty==Increment,"summing")

  };

  addingStockInsertApi = (details) =>{

    Axios({
      method: "POST",
      url: apiurl + "insertShStock",
      data: details
    })
      .then((response) => {
        console.log("insertShStock", response);
        if(response.data.status == "1") {
          this.props.getTableData()
          this.props.generateAlert("Stock Added Successfully")
        }
        if(response.data.status == "0") {
          this.props.getTableData()
          this.props.generateAlert("Stock Cannot Be Added")
        }
      })
      .catch((err) => {
        //
      });
  }


  render() {
    const {stockDetails}=this.state;
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    console.log(this.state.recievedQty,"vallllll")
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
                <Labelbox type="text" labelname="Product Code" value={stockDetails && stockDetails.sh_product_code} />
              </div>
              <div style={{ width: "45%" }}>
                <Labelbox type="text" labelname="Product Name" value={stockDetails && stockDetails.sh_product_name} />
              </div>
            </div>
          </Grid>
          <Grid md={12} sm={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            ><div>
              <Labelbox type="datepicker" labelname="Recieved Date" value={this.state.startdate}
              changeData={(date) => this.datepickerChange(date,'recieveddate')} />         
              <div className="validation__error_custom">{this.state.dateError && this.state.dateError}</div>
              </div>
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
              value={this.state.recievedQty}
              changeData={(e) => this.recievedQty(e,"sh_product_qty")} />
              <div className="validation__error_custom">{this.state.quantityError && this.state.quantityError}</div>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className="stock_box_container">       
           <div className="stockcart_box">

      {stockDetails && stockDetails.color_info.length >0 && stockDetails.color_info.map((colorInfo,index)=>{
        return(
        <div className="stock_second_content"  >
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
              <label className="shop_colorpalatte_label">Color Palette</label>
            </div>
            <div className="color_palette_box">
               <div className="color_palette" style={{backgroundColor:`${JSON.parse(colorInfo.sh_color_palette)}`}}>
             </div>
           
            </div>
            </div>
          <div style={{ width: "80px" }}>
          <Labelbox 
              type="number" 
              labelname="Qty"             
              // value={colorInfo.sh_quantity}
              changeData={(value) => this.changeStockDetails(value,index,null,true)} />
            <div className="validation__error_custom">{this.state.qtyMisMatch && this.state.qtyMisMatch}</div>
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
          <Button className="stock_update" onClick={()=>this.onSubmitData()}>Update</Button>
        </div>
      </div>
    );
  }
}
