import React, { Component } from "react";
import "./Total_orders.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Total_orders_table from "./Total_oders_table";
import { Input,notification} from "antd";
import Button from "@material-ui/core/Button";
import Plus from "../../images/plus.png";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import dateFormat from "dateformat";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Labelbox from "../../helper/labelbox/labelbox";
import Paper from "@material-ui/core/Paper";
import excel from "../../images/excel.svg";
import pdf from "../../images/pdf.svg";
import print from "../../images/print.svg";
import DateRangeSelect from "../../helper/DateRange/DateRange";
import axios from "axios";
import { apiurl } from "../../App";
import dateformat from 'dateformat';

const current_date=(dateFormat(new Date(),"dd mmm yyyy"))
var moment = require("moment");



class Total_orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
      totalorderData: [],
      tabledata: [],
      startDate:new Date(), 
      endDate: new Date(),
      viewData:[],
      spinner: false,

    };
  }
  componentDidMount() {
    this.dayReport([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
  }],true)
  this.getTableData();
  }
  dayReport=(data,firstOpen)=>{
 
    console.log(data,"itemdaterange")
    var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
    var enddate = dateformat(data[0].endDate, "yyyy-mm-dd")
    this.setState({startDate:startdate,endDate:enddate})
    if(!firstOpen){
    this.setState({ spinner: true })
    }
    var self = this
    axios({
        method:"POST",
        url:apiurl + 'getShTotalOrders',
        data:{
  
          "date_from":startdate,
          "date_to":enddate
        
        }
    })
    .then((res)=>{
        console.log(res.data.data,"res")
       
        var totalorderData=[];
        var viewData = [];
        res.data.data.map((val,index)=>{
            console.log(res,"responsetable")
            totalorderData.push({
              customer:val.customer,
              phone_number:val.phone_no,
              booked_on:val.booked_date,
              price:val.price,
              

              id:val.order_id
  
            })
            viewData.push({
              customer:val.customer,
              product:val.product_name,
              address:val.delivery_address,
              
              profile_image:val.profile_image,
              bookeddate:dateformat(val.booked_date,"dd mmm yyyy"),
              cost:val.price,
              id:val.order_id
            })
            
        })
      this.setState({
        totalorderData:totalorderData,
        viewData:viewData,
        props_loading: false,
        spinner:false
      
  
      })
      console.log("appointment_check",this.state.viewData)
        
     
    })
    .catch((error) => {
        // alert(JSON.stringify(error))
    })
  }
  
  
  getTableData = (data) =>{
    this.setState({spinner:true})
    var self = this

    
    axios({
      method:"POST",
      url:apiurl + 'getShTotalOrders',
      data:{
          "date_from": dateformat(this.state.startDate,"yyyy-mm-dd"),
          "date_to": dateformat(this.state.endDate,"yyyy-mm-dd"),
        }
    })
    .then((res)=>{
        console.log(res.data.data,"response_order")
        console.log(this.state.endDate,"current_date")
       
        var totalorderData=[];
        var viewData = [];
        res.data.data.map((val,index)=>{
          console.log(val,"valeded")
          totalorderData.push({
            customer:val.customer,
            phone_number:val.phone_no,
            booked_on:val.booked_date,
            price:val.price,
            


            id:val.order_id,
            })
  
  viewData.push({
    customer:val.customer,
    product:val.product_name,
    address:val.delivery_address,
    
    profile_image:val.profile_image,
    bookeddate:dateformat(val.booked_date,"dd mmm yyyy"),
    cost:val.price,
    id:val.order_id
  })
           
      })
      
        this.setState({
            totalorderData,
            viewData:viewData,
            tabledata:totalorderData,
            props_loading: false,
            spinner:false
        },() => console.log("viewdatacheck",this.state.viewData))
     
    })
    .catch((error) => {
        // alert(JSON.stringify(error))
    })
  }
  
  
  
  Notification=()=>{
    notification.info({
      message:
        'No Data Found',
        placement:"topRight",
    });
  }
  

  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    return (
      <div className="totalorder_shopping">
        <Paper>
          <div className="totalorderheader">
            <div className="totalorder_title">TOTAL ORDER</div>

            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <ButtonGroup className="clinic_group_details" size="small" aria-label="small outlined button group">
              <Button className="diet_details_day">This Day</Button>
              <Button className="diet_details_month">This Month</Button>
              <Button className="diet_details_month">This Year</Button>
            </ButtonGroup> */}
              {/* 
              <div className="totalorder_date"> 
                <ChevronLeftIcon className="totalorder_icon"/>
                  <div className="date_totalorder">{current_date}</div>
                <ChevronRightIcon className="totalorder_icon"/></div> */}

              {/* <div className="content_search"> */}
              <DateRangeSelect
                dynalign={"dynalign"}
                rangeDate={(item)=>this.dayReport(item)} 
              />
              <Search
                className="search"
                placeholder=" Search "
                onSearch={(value) => console.log(value)}
                style={{ width: 150 }}
              />

              <div className="office">
                <img src={excel} className="excel" />
                <img src={pdf} className="pdf" />
                <img src={print} className="print" />
              </div>
              {/* </div> */}
            </div>
          </div>

          <Total_orders_table
          totalorderData={this.state.totalorderData} 
          viewData={this.state.viewData}
          
          tableData={this.state.tabledata}
           />
        </Paper>
      </div>
    );
  }
}

export default Total_orders;
