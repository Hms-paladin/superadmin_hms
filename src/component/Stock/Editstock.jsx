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
      startdate:new Date(),
      productQnty:"",
      productDetails:"",
      colorQty:"",
      dummy:[],
      detailsError:"",
      quantityError:"",
      qtyError:"",
      stockDetails:"",
      recievedQty:"",
      errors:{},
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
  

  componentWillMount (){
    console.log(this.props.editData,"stock_popup_details")
    if(this.props.edit===true){
   
    var editData=JSON.parse(JSON.stringify(this.props.editData));
    editData.color_info.map((qty)=>qty.sh_quantity="");
    editData.sh_received_date=dateformat(new Date(),"yyyy-mm-dd");
    editData.sh_received_qty=0;
    editData.sh_product_details="";
    this.setState({stockDetails:editData,adding:true})
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
      console.log(value,"indexchck")
      var stockDetails=this.state.stockDetails;
    if(key){
      stockDetails[key]=value;

    }else if(arr) {
    stockDetails.color_info[index].sh_quantity=value;
    }console.log(stockDetails.color_info[index],"val");
   
    this.setState({stockDetails,qtyMisMatch:false}) 
    
    console.log(stockDetails.color_info[index],"proper")
    }

  
    validation = () => {
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
    var stockDetails=this.state.stockDetails;
   
     console.log("qty1",Increment)
     console.log("qty2",stockDetails.sh_received_qty)

   if(this.state.recievedQty==""){
    quantityError="Field Required"
   }
   if(stockDetails.sh_received_qty!==Increment){
    qtyMisMatch="Quantity Mismatch";
  }
  if(stockDetails.sh_received_qty==Increment){
    qtyMisMatch=false;
  }
  
  if(this.state.productDetails==""){
    detailsError="Field Required"
  }
  if (
    quantityError ||
    qtyMisMatch ||
    detailsError

  ) {
    this.setState({
      quantityError ,
      qtyMisMatch,
      detailsError
     
    });

    return false;
  }
  return true

  }

  onSubmitData = (index) => {


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
   
    var addStock=this.state.stockDetails;
      addStock.created_by= 1;
      addStock.created_on= dateformat(new Date(), "yyyy-mm-dd hh:mm:ss");
      addStock.sh_product_details=this.state.productDetails;
      addStock.sh_received_qty=this.state.recievedQty;

      const isValid =this.validation()
      if(this.state.recievedQty==Increment && isValid){
        this.addingStockInsertApi(addStock)
        }
      
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
    const {stockDetails,errors}=this.state;
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    console.log(this.state,"states")

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
              <Labelbox type="datepicker" labelname="Recieved Date"  disableFuture={true} value={stockDetails && stockDetails.sh_received_date}
              changeData={(date) => this.changeStockDetails(date,null,'sh_received_date',null)} />         
              </div>
              <div style={{width:"50%"}}>
                <Labelbox 
                type="text" 
                labelname="Details" 
                value={this.state.productDetails}
                changeData={(value) => this.storeValues(value,"sh_product_details")}/>
                <div className="validation__error_custom">{this.state.detailsError && this.state.detailsError}</div>

                </div>  

              <div><Labelbox 
              type="number" 
              labelname="Received Qty"  
              value={this.state.recievedQty}
              changeData={(value) => this.recievedQty(value,"sh_received_qty")} />
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
              value={colorInfo.sh_quantity}
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
          <Button className="stock_update" onClick={()=>this.onSubmitData()}>Submit</Button>
        </div>
      </div>
    );
  }
}













// import React from "react";
// import dateformat from 'dateformat';
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
// import "./StockAdd.css";
// import Labelbox from "../../helper/ShopLabelComponent/labelbox";
// import "antd/dist/antd.css";
// import Axios from "axios";
// import { apiurl } from "../../App";
// import { Select } from "antd";


// const { Option } = Select;
// function handleChange(value) {
//   console.log(`selected ${value}`);
// }
// var todayDate = dateformat(new Date(), "yyyy-mm-dd")
// export default class Editstock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       cancel: null,
//       adding:false,
//       productId:"",
//       productCode:"",
//       productName:"",
//       colorInfo:"",
//       startdate:new Date(),
//       productQnty:"",
//       productDetails:"",
//       colorQty:"",
//       dummy:[],
//       detailsError:"",
//       quantityError:"",
//       qtyError:"",
//       stockDetails:"",
//       recievedQty:"",
//       errors:{},
//      };
//     }
//   handleClose = () => {
//     this.props.onClose(this.props.selectedValue);
//   };
//   open = () => {
//     this.setState({ view: true });
//   };
//   onclose = () => {
//     this.setState({ view: false });
//   };
  

//   componentWillMount (){
//     console.log(this.props.editData,"stock_popup_details")
//     if(this.props.edit===true){
   
//     var editData=JSON.parse(JSON.stringify(this.props.editData));
//     editData.color_info.map((qty)=>qty.sh_quantity=0);
//     editData.sh_received_date=dateformat(new Date(),"yyyy-mm-dd");
//     editData.sh_received_qty=0;
//     editData.sh_product_details="";
//       this.setState({stockDetails:editData,adding:true})
//     }
//     console.log( this.state.stockDetails,"edjbfj")
//   }
//   storeValues = (e,key) => {
   
//       this.setState({
//       productDetails:e, 
//       detailsError:false
//     })
//   }
//     recievedQty =(e,key)=>{
//       this.setState({
//         recievedQty:e,
//         quantityError:false
//       })
//     }

//     changeStockDetails =(value,index,key,arr)=>{
//       console.log(value,"indexchck")
//       var stockDetails=this.state.stockDetails;
//     if(key){
//       stockDetails[key]=value;

//     }else if(arr) {
//     stockDetails.color_info[index].sh_quantity=value;
//     }console.log(stockDetails.color_info[index],"val");
   
//     this.setState({stockDetails,qtyMisMatch:false}) 
//     console.log(stockDetails.color_info[index],"proper")
//     }

  
//     validation = (callback) => {
  
//     var stockDetails=this.state.stockDetails;
//     var totalcount=stockDetails.color_info.reduce((acc,obj)=>acc+parseInt(obj.sh_quantity),0);
//     var errors=this.state.errors;
//      errors={};
//      console.log("qty1",totalcount)
//      console.log("qty2",stockDetails.sh_received_qty)

//    if(totalcount<1||totalcount!=stockDetails.sh_received_qty){
//     errors['mismatch']="Quantity Mismatch";
//    } 

//    if(!stockDetails.sh_received_qty){
//     errors['qty_error']="Field Required";
//    }
//   //  if(!stockDetails.sh_received_date){
//   //   errors['date_error']="Date Required";
//   // }
//   if(!stockDetails.sh_product_details){
//     errors['details_error']="Field Required";
//   }
//   if(Object.keys(errors).length==0){
//     this.setState({errors},function(){
//       callback&&callback(true);
//     })
//   }else{
//     // return false;
//     this.setState({errors},function(){
//       callback&&callback(false);
//     })

//   }

//   }

//   onSubmitData = (index) => {


//    var total=    this.state.stockDetails.color_info.map((qty)=>{
//      return qty.sh_quantity
//    })
//       console.log("dknsnf",total)
//       var Increment = 0 ;
//       for (var i = 0; i < total.length; i++){ 
//         console.log(parseInt(total[i]),"totslll")
//           Increment += parseInt(total[i]);
        

//       }    
//       console.log(Increment,"summingtotal")
   
//     var addStock=this.state.stockDetails;
//       addStock.created_by= 1;
//       addStock.created_on= dateformat(new Date(), "yyyy-mm-dd hh:mm:ss");
 
//     this.validation((data)=>{
//       console.log("success",data)
//       if(data){
//         this.addingStockInsertApi(addStock);
//       }
//     })

    
//     console.log(this.state.recievedQty==Increment,"summing")

//   };

//   addingStockInsertApi = (details) =>{

//     Axios({
//       method: "POST",
//       url: apiurl + "insertShStock",
//       data: details
//     })
//       .then((response) => {
//         console.log("insertShStock", response);
//         if(response.data.status == "1") {
//           this.props.getTableData()
//           this.props.generateAlert("Stock Added Successfully")
//         }
//         if(response.data.status == "0") {
//           this.props.getTableData()
//           this.props.generateAlert("Stock Cannot Be Added")
//         }
//       })
//       .catch((err) => {
//         //
//       });
//   }


//   render() {
//     const {stockDetails,errors}=this.state;
//     const { classes, onClose, cancel, selectedValue, ...other } = this.props;
//     console.log(this.state,"states")

//     return (
      
//       <div className="stock_popup_details">
//         <Grid container>
        
//           <Grid md={12} sm={12}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div style={{ width: "45%" }}>
//                 <Labelbox type="text" labelname="Product Code" value={stockDetails && stockDetails.sh_product_code} />
//               </div>
//               <div style={{ width: "45%" }}>
//                 <Labelbox type="text" labelname="Product Name" value={stockDetails && stockDetails.sh_product_name} />
//               </div>
//             </div>
//           </Grid>
//           <Grid md={12} sm={12}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//               }}
//             ><div>
//               <Labelbox type="datepicker" labelname="Recieved Date"  disableFuture={true} value={stockDetails && stockDetails.sh_received_date}
//               changeData={(date) => this.changeStockDetails(date,null,'sh_received_date',null)} />         
//               <div className="validation__error_custom">{errors&&errors.date_error}</div>
//               </div>
//               <div style={{width:"50%"}}>
//                 <Labelbox 
//                 type="text" 
//                 labelname="Details" 
//                 value={stockDetails && stockDetails.sh_product_details}
//                 changeData={(value) => this.changeStockDetails(value,null,"sh_product_details",null)}/>
//                 <div className="validation__error_custom">{errors&&errors.details_error}</div>

//                 </div>  

//               <div><Labelbox 
//               type="number" 
//               labelname="Received Qty"  
//               value={stockDetails && stockDetails.sh_received_qty}
//               changeData={(value) => this.changeStockDetails(value,null,"sh_received_qty",null)} />
//               <div className="validation__error_custom">{errors&&errors.qty_error}</div>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         <div className="stock_box_container">       
//            <div className="stockcart_box">

//       {stockDetails && stockDetails.color_info.length >0 && stockDetails.color_info.map((colorInfo,index)=>{
//         return(
//         <div className="stock_second_content"  >
//           <div style={{ width: "140px" }}>
//             <Labelbox         
//               type="text"
//               labelname="Color"
//               value={colorInfo.sh_color}
//               className="second_content_one"
//             />
//           </div>
//           <div className="shop_colorpalatte_dropdown">
//             <div>
//               <label className="shop_colorpalatte_label">Color Palette</label>
//             </div>
//             <div className="color_palette_box">
//                <div className="color_palette" style={{backgroundColor:`${JSON.parse(colorInfo.sh_color_palette)}`}}>
//              </div>
           
//             </div>
//             </div>
//           <div style={{ width: "80px" }}>
//           <Labelbox 
//               type="number" 
//               labelname="Qty"             
//               value={colorInfo.sh_quantity}
//               changeData={(value) => this.changeStockDetails(value,index,null,true)} />
           
//           </div>
//           </div>
//          )
//         })}
//        <div className="validation__error_custom">{errors&&errors.mismatch}</div>
//         </div>
//         </div>
          

//         <div className="stock_button">
//           <Button className="stock_cancel" onClick={this.handleClose}>
//             Cancel
//           </Button>
//           <Button className="stock_update" onClick={()=>this.onSubmitData()}>Submit</Button>
//         </div>
//       </div>
//     );
//   }
// }
