
import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./Editorder.css";
import Labelbox from "../../helper/labelbox/labelbox";
import "antd/dist/antd.css";
import dateformat from 'dateformat';
import { Select } from "antd";
import Axios from "axios";
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
      stockDetails:"",
      stockColor:[],
      xpectedQty:"",
      quantityError:"",
      startdate:dateformat(new Date(), "yyyy-mm-dd"),
      errors:{},
      touched:{},
    };
  }

  datepickerChange = (data, key) => {
    if (key === 'expected_date') {
        this.setState({
            startdate: data,
            dateError:false
        },()=>console.log(dateformat(this.state.startdate,"yyyy-mm-dd"),"dstecheckinh"))
    }
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
    // console.log("asdfjdshfjsdhfjksdhfjds",this.props)
    if(edit===true){
    this.state.productID=editData.id
    }this.getModalData()
  
    
  }


  changeStockDetails =(value,index,key,arr)=>{
    console.log(value,"indexchck")
    var stockDetails=this.state.stockDetails;
    var touched = this.state.touched;
  if(key){
    touched[key]=true;
    stockDetails[key]=value;

  }else if(arr) {
    touched['mismatch']=true;
  stockDetails.color_info[index].expected_quantity=value;
  }console.log(stockDetails.color_info[index],"valdhffkjd");
  this.validation();
  this.setState({stockDetails,qtyMisMatch:false}) 
  console.log(stockDetails.color_info[index],"proper")
  }


  getModalData = (data) =>{
    this.setState({spinner:true})
    var self = this  
    Axios({
      method:"POST",
      url:apiurl + 'getPreOrderById',
      data:{
        "product_id":this.state.productID
        }
          
    })
    .then((response)=>{
           console.log(response,"resresres")
         self.setState({
          stockDetails:response.data.data[0],
          // stockColor:response.data.data[0].color_info,
         },()=>this.setting())
        

})


   
 
  }

  setting=()=>{
    this.state.stockDetails.expected_quantity=0;
    this.setState({})
    // console.log(this.state.stockDetails,"djsbfjsdb")
  }

  validation = (callback) => {
  
    var stockDetails=this.state.stockDetails;
    var totalcount=stockDetails.color_info.reduce((acc,obj)=>acc+parseInt(obj.expected_quantity),0);
    var errors=this.state.errors;
     errors={};
     console.log("qty1",totalcount)
     console.log("qty2",stockDetails.expected_quantity)

   if(totalcount<1||totalcount!=stockDetails.expected_quantity){
    errors['mismatch']="Qty Mismatch";
   } 

   if(!stockDetails.expected_quantity){
    errors['expected_quantity']="Field Required";
   }
   if(!stockDetails.expected_date){
    errors['date_error']="Date Required";
  }
  // if(!stockDetails.sh_product_details){
  //   errors['sh_product_details']="Field Required";
  // }
  if(Object.keys(errors).length==0){
    this.setState({errors},function(){
      callback&&callback(true);
    })
  }else{
    // return false;
    this.setState({errors},function(){
      callback&&callback(false);
    })

  }

  }

onSubmitData = () => {
  
   var addStock=this.state.stockDetails;
     addStock.created_by= 1;
     addStock.expected_date=this.state.startdate;
     var touched = this.state.touched;
     touched={};
     touched.expected_quantity=true;
     touched.sh_product_details=true;
     touched.expected_date=true;
     touched.mismatch=true;

     this.setState({touched},function(){
      this.validation((data)=>{
        console.log("success",data)
        if(data){
          this.addingPreOrderInsertApi(addStock);
        }
      })
    })

    

  };

 addingPreOrderInsertApi = (details) =>{

  Axios({
    method: "POST",
    url: apiurl + "insertExpectedStocks",
    data: details
  })
  .then((response) => {
    // console.log("insertShStock", response);
    if(response.data.status == "1") {
      this.props.getTableData()
      this.props.generateAlert("Pre-Order Stock Added Successfully")
    }
    if(response.data.status == "0") {
      this.props.getTableData()
      this.props.generateAlert("Pre-Order Stock Cannot Be Added")
    }
  })
  .catch((err) => {
    //
  });
}



  render() {
    const {stockDetails,errors,touched}= this.state;
    var stocks=this.state.stockDetails

    // console.log(stocks,"ordercheck")
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
  
              <div className="stock_available">
                <Labelbox type="text" labelname="Product Name" value={stockDetails.sh_product_name}/>
              </div>
              <div className="stock_available" >
                <Labelbox type="text" labelname="Available Stock" value={stockDetails.avilable_quantity} />
              </div>
              <div>
              <Labelbox 
              type="number" 
              labelname="Expected Qty"  
              value={stockDetails.expected_quantity}
              changeData={(value) => this.changeStockDetails(value,null,"expected_quantity",null)} />
              <div className="validation__error_custom">{errors.expected_quantity&&touched.expected_quantity&&errors.expected_quantity}</div>
              </div>

              <div>
              <Labelbox type="datepicker" labelname="Expected Date"   
              value={this.state.startdate} disablePast={true}
              changeData={(date) => this.datepickerChange(date,'expected_date')} />         
              <div className="validation__error_custom">{this.state.dateError && this.state.dateError}</div>
    
              </div>
               
            </div>
          </Grid>
         
        </Grid>
        <div className="stock_box_container">       
           <div className="stockcart_box">
        {stockDetails&&stockDetails.color_info.length >0 && stockDetails.color_info.map((stockColor,index) => {
                  return(

                    <div className="stock_second_content"  >
          <div style={{ width: "140px" }} >
            <Labelbox
              type="text"
              labelname="Color"
              value={stockColor.sh_color}
              className="second_content_one"
            />
          </div>
          <div className="shop_colorpalatte_dropdown">
            <div><label className="shop_colorpalatte_label">Color Palette </label></div>
            <div className="color_palette_box">
             <div className="color_palette" style={{backgroundColor:`${JSON.parse(stockColor.sh_color_palette)}`}}></div>
            </div>
            </div>
          <div style={{ width: "80px" }}>
            <Labelbox
              type="number"
              labelname="Qty"
              className="second_content_one"
              value={stockColor.expected_quantity==undefined? "0":stockColor.expected_quantity}
              changeData={(value) => this.changeStockDetails(value,index,null,true)} />
          <div className="validation__error_custom_qty">{errors.mismatch&&touched.mismatch &&errors.mismatch}</div>

          </div>
          </div>
       )})}
       
        </div>
         </div>
        <div className="stock_button">
          <Button className="stock_cancel" onClick={this.props.closemodal(false)}>
            Cancel
          </Button>
          <Button className="stock_update" onClick={()=>this.onSubmitData()}>Update</Button>
        </div>
      </div>
    );
  }
}
