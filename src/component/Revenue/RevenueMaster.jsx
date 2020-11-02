import React, { Component } from "react";
import "./RevenueMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import RevenueDetails from "./RevenueDetails";
import { Input,notification,Spin} from "antd";
import Button from "@material-ui/core/Button";
import dateFormat from "dateformat";
import { Paper } from "@material-ui/core";
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

const current_date = dateFormat(new Date(), "dd mmm yyyy");


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


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
  
      //Pdf Generation
      generatepdf = () => {
        if (this.state.revenuedata.length === 0) {
          notification.warning({
            message: "No data found",
            placement: "topRight",
          });
        }else{
        const doc = new jsPDF("a3")
        var bodydata = []
        this.state.revenuedata.map((data, index) => {
          bodydata.push([
            index + 1,
            data.bookeddate, data.customer, data.card, data.wallet, data.totalcharge
          ])
        })
        doc.autoTable({
          beforePageContent: function (data) {
            doc.text("Revenue", 15, 23); // 15,13 for css
          },
          margin: { top: 30 },
          showHead: "everyPage",
          theme: "grid",
          head: [['S.No','Booked Date', 'Customer', 'Card', 'Wallet', 'Total Charge(KWD)']],
          body: bodydata,
        })
    
        doc.save('Revenue.pdf')
      }
    };

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
  
  searchChange = (e) => {
    this.setState({ search: e.target.value })
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));

    const searchData = []
    this.state.revenuedata.filter((data, index) => {
       console.log(data, "Search_data");
       if (this.state.search === undefined || this.state.search === null){
        searchData.push({
          bookeddate: data.bookeddate,
          customer: data.customer,
          card:data.card,
          wallet:data.wallet,
          totalcharge: data.totalcharge,
          id:index
          })
      }
      else if (
            data.bookeddate !== null && data.bookeddate.toLowerCase().includes(this.state.search.toLowerCase())
        ||  data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase())
        || data.card !== null && data.card.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
        || data.wallet !== null && data.wallet.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
        || data.totalcharge !== null && data.totalcharge.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
      ) {
         
        searchData.push({
          bookeddate: data.bookeddate,
          customer: data.customer,
          card:data.card,
          wallet:data.wallet,
          totalcharge: data.totalcharge,
          id:index
          })
      }
    })


    // EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.revenuedata.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
        { value: xldata.bookeddate },
        { value: xldata.customer },
        { value: xldata.card },
        { value: xldata.wallet },
        { value: xldata.totalcharge },
        ])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.bookeddate, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.customer, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.card, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.wallet, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.totalcharge, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
        ])
      }
    })

    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Booked Date", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Customer", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Card", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Wallet", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Total Charge(KWD)", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
        ],
        data: multiDataSetbody
      }
    ];



    return (
      <div className="doctor_revenue">
        <Paper>
          <div className="revenue_uploadsmasterheader">
            <div className="revenue_uploadsmasterheader_flex1">
              {" "}
              <div className="revenue-header">REVENUE</div>
          
            </div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                
              }}
            >
         
              <div style={{zIndex:'1201'}}>
                <DateRangeSelect
                  dynalign={"dynalign"}
                  rangeDate={(item)=>this.dayReport(item)} 
                  />
              </div>
              <Search
                placeholder=" Search "
                onChange={(e) => this.searchChange(e)}
                style={{ width: 150 }}
                className="search_box_container"
              />

<ReactSVG src={Pdf} style={{ marginRight: "15px", marginLeft: "15px" }} onClick={this.generatepdf}
                style={{ marginRight: "15px", marginLeft: "15px" }} />

                {this.state.revenuedata.length===0?
                <ReactSVG src={Excel} style={{ marginRight: "15px" }} onClick={this.Notification}/>:
              <ExcelFile filename={"Revenue"} element={<ReactSVG src={Excel} style={{ marginRight: "15px" }} />}>
                <ExcelSheet dataSet={multiDataSet} name="Revenue" />
              </ExcelFile>}

              {this.state.revenuedata.length===0?
              <ReactSVG src={Print}  onClick={this.Notification}/>:
              <ReactToPrint
                trigger={() => <ReactSVG src={Print} />}
                content={() => this.componentRef}
              />}

            </div>
            <div style={{ display: "none" }}>
              <PrintData printtableData={this.state.revenuedata}
                ref={el => (this.componentRef = el)} />
            </div>
            </div>
            <Spin className="spinner_align" spinning={this.state.spinner}>
   
          <RevenueDetails
          revenuedata={this.state.revenuedata} 
          tableData={this.state.tabledata}
          searchData={searchData}
          />
          </Spin>
     <Button className="grandTotal">Grand Total : {this.state.grandTotal} KWD</Button>

        </Paper>
      </div>
    );
  }
}

export default RevenueMaster;
