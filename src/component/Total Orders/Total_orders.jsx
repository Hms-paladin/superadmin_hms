import React, { Component } from "react";
import "./Total_orders.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Total_orders_table from "./Total_oders_table";
import { Input,notification,Spin} from "antd";
import dateFormat from "dateformat";
import Paper from "@material-ui/core/Paper";
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./PrintData";
import ReactSVG from 'react-svg';
import Pdf from '../../images/pdf.svg';
import Print from '../../images/print.svg';
import Excel from '../../images/excel.svg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DateRangeSelect from "../../helper/DateRange/DateRange";
import axios from "axios";
import { apiurl } from "../../App";
import dateformat from 'dateformat';

const current_date=(dateFormat(new Date(),"dd mmm yyyy"))
var moment = require("moment");

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
      search: null,
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

      //Pdf Generation
      generatepdf = () => {
        if (this.state.totalorderData.length === 0) {
          notification.warning({
            message: "No data found",
            placement: "topRight",
          });
        }else{
        const doc = new jsPDF("a3")
        var bodydata = []
        this.state.totalorderData.map((data, index) => {
          bodydata.push([
            index + 1,
            data.customer, data.phone_number, data.booked_on, data.price
          ])
        })
        doc.autoTable({
          beforePageContent: function (data) {
            doc.text("Total Orders", 15, 23); // 15,13 for css
          },
          margin: { top: 30 },
          showHead: "everyPage",
          theme: "grid",
          head: [['S.No', 'Customer', 'Phone Number', 'Booked Date', 'Price(KWD)']],
          body: bodydata,
        })
    
        doc.save('Total Orders.pdf')
      }
    };


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
              booked_on:dateformat(val.booked_date, "dd mmm yyyy"),
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
            booked_on:dateformat(val.booked_date, "dd mmm yyyy"),
            price:val.price + "KWD",
            


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
  
  searchChange = (e) => {
    this.setState({ search: e.target.value })
  }


  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    const searchData = []
    this.state.totalorderData.filter((data, index) => {
       console.log(data, "Search_data");
       if (this.state.search === undefined || this.state.search === null){
        searchData.push({
          customer: data.customer,
          phone_number:data.phone_number,
          booked_on:data.booked_on,
          price: data.price,
          id:data.id
          })
      }
      else if (
           data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase())
        // || data.product_name !== null && data.product_name.toLowerCase().includes(this.state.search.toLowerCase())
        || data.phone_number !== null && data.phone_number.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
        || data.price !== null && data.price.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
      ) {
         
        searchData.push({
          customer: data.customer,
          phone_number:data.phone_number,
          booked_on:data.booked_on,
          price: data.price + "KWD",
          id:data.id
          })
      }
    })

    // EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.totalorderData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
        { value: xldata.customer },
        { value: xldata.phone_number },
        { value: xldata.booked_on },
        { value: xldata.price },
        ])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.customer, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.phone_number, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.booked_on, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.price, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
        ])
      }
    })

    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Customer", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Phone Number", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Booked On", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Price", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
        ],
        data: multiDataSetbody
      }
    ];

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
        
              <DateRangeSelect
                dynalign={"dynalign"}
                rangeDate={(item)=>this.dayReport(item)} 
              />

               <Search
                placeholder=" Search "
                onChange={(e) => this.searchChange(e)}
                style={{ width: 150 }}
                className="search_box_container"
              />

             <ReactSVG src={Pdf} style={{ marginRight: "15px", marginLeft: "15px" }} onClick={this.generatepdf}
                style={{ marginRight: "15px", marginLeft: "15px" }} />
            
               {this.state.totalorderData.length===0?
                <ReactSVG src={Excel} style={{ marginRight: "15px" }} onClick={this.Notification}/>:
              <ExcelFile filename={"Total Orders"} element={<ReactSVG src={Excel} style={{ marginRight: "15px" }} />}>
                <ExcelSheet dataSet={multiDataSet} name="Total Orders" />
              </ExcelFile>}

              {this.state.totalorderData.length===0?
              <ReactSVG src={Print}  onClick={this.Notification}/>:
              <ReactToPrint
                trigger={() => <ReactSVG src={Print} />}
                content={() => this.componentRef}
              />}
              </div>
              <div style={{ display: "none" }}>
              <PrintData printtableData={this.state.totalorderData}
                ref={el => (this.componentRef = el)} /> </div>
          </div>
          <Spin className="spinner_align" spinning={this.state.spinner}>

          <Total_orders_table
          totalorderData={this.state.totalorderData} 
          viewData={this.state.viewData}
          searchData={searchData}
          tableData={this.state.tabledata}
           />
           </Spin>
        </Paper>
      </div>
    );
  }
}

export default Total_orders;
