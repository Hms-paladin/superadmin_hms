import React, { Component } from "react";
import "./RevenueMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import RevenueDetails from "./RevenueDetails";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import Plus from "../../images/plus.png";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import dateFormat from "dateformat";
import Labelbox from "../../helper/labelbox/labelbox";
import { Paper } from "@material-ui/core";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import excel from "../../images/excel.svg";
import pdf from "../../images/pdf.svg";
import print from "../../images/print.svg";
import DateRangeSelect from "../../helper/DateRange/DateRange";
import axios from "axios";
import { apiurl } from "../../App";
import dateformat from 'dateformat';

const current_date = dateFormat(new Date(), "dd mmm yyyy");

class RevenueMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
      revenuedata: [],
      tabledata: [],
      startDate:new Date(), 
      endDate: new Date(),
      spinner: false,
      grandTotal:0,

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
        url:apiurl + 'getShRevenue',
        data:{
          "vendor_id":"0",
          "date_from":startdate,
          "date_to":enddate
        
        }
    })
    .then((res)=>{
        console.log(res.data.data.result,"res")
       
        var revenuedata=[];
        res.data.data.result.map((val,index)=>{
            console.log(res,"responsetable")
            revenuedata.push({
              bookeddate:dateformat(val.booked_date, "dd mmm yyyy"),
              customer:val.customer,
              card:val.card,
              wallet:val.wallet,
              totalcharge:val.total_charge,
              
                        

              id:val.booking_id
  
            })
           
            this.setState({
              revenuedata:revenuedata,
              props_loading: false,
              spinner:false
            
        
            },()=>{
              for(var i in revenuedata){
                this.state.grandTotal=revenuedata[i].totalcharge+this.state.grandTotal
              }
              console.log("sdfljasdhfljshdafjkhsdf",this.state.tableData)
            }
            ) 
        })
     
      console.log("appointment_check",this.state.revenuedata)
        
     
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
      url:apiurl + 'getShRevenue',
      data:{
          "vendor_id":"0",
          "date_from": dateformat(this.state.startDate,"yyyy-mm-dd"),
          "date_to": dateformat(this.state.endDate,"yyyy-mm-dd"),
        
        }
    })
    .then((res)=>{
        console.log(res.data.data.result,"response_order")
        console.log(this.state.endDate,"current_date")
       
        var revenuedata=[];
        res.data.data.result.map((val,index)=>{
          console.log(val,"valeded")
          revenuedata.push({
            bookeddate:dateformat(val.booked_date, "dd mmm yyyy"),

              customer:val.customer,
              card:val.card,
              wallet:val.wallet,
              totalcharge:val.total_charge,
              
                        

              id:val.booking_id
            })
  
 
           
      })
      
        this.setState({
             revenuedata,
            tabledata:revenuedata,
            props_loading: false,
            spinner:false
        },() => console.log("viewdatacheck",this.state.tabledata))
     
    })
    .catch((error) => {
        // alert(JSON.stringify(error))
    })
  }
  
  

  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    return (
      <div className="doctor_revenue">
        <Paper>
          <div className="revenue_uploadsmasterheader">
            <div className="revenue_uploadsmasterheader_flex1">
              {" "}
              <div className="revenue-header">REVENUE</div>
              {/* <div style={{ width: "190px", marginLeft: "10px" }}>
                <Labelbox
                  type="select"
                  value="ALL"
                  style={{ width: "150px" }}
                  labelname="Product"
                />
              </div> */}
            </div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
              // className="group_container"
            >
              {/* <ButtonGroup
                className="clinic_group_detailss"
                size="small"
                aria-label="small outlined button group"
              >
                <Button className="diet_details_day">This Day</Button>
                <Button className="diet_details_month">This Month</Button>
                <Button className="diet_details_month">This Year</Button>
              </ButtonGroup>

              <div className="currentdate">
                <FaChevronLeft className="current_left" />
                {current_date}
                <FaChevronRight className="current_right" />
              </div> */}
              <div>
                <DateRangeSelect
                  dynalign={"dynalign"}
                  rangeDate={(item)=>this.dayReport(item)} 
                  />
              </div>
              <Search
                className="revenue-search"
                placeholder=" Search "
                onSearch={(value) => console.log(value)}
                style={{ width: 150 }}
              />

              <div className="office">
                <img src={excel} className="excel" />
                <img src={pdf} className="pdf" />
                <img src={print} className="print" />
              </div>
            </div>
          </div>
          <RevenueDetails
          revenuedata={this.state.revenuedata} 
          tableData={this.state.tabledata}
          />
     <Button className="grandTotal">Grand Total : {this.state.grandTotal} KWD</Button>

        </Paper>
      </div>
    );
  }
}

export default RevenueMaster;
