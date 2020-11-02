import React from "react";
import Tablecomponent from "../../helper/ShopTableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import { Input,notification,Spin} from "antd";
import Labelbox from "../../helper/labelbox/labelbox";

import "./TrackingTable.css";
import crowngold from "../../images/crown-golden.png";
import dateFormat from "dateformat";
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./PrintData";
import ReactSVG from 'react-svg';
import Pdf from '../../images/pdf.svg';
import Print from '../../images/print.svg';
import Excel from '../../images/excel.svg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DeliveryView from "./DeliveryView";
import { apiurl } from "../../App";
import axios from 'axios';
import { AlertHeading } from "react-bootstrap/Alert";

const current_date = dateFormat(new Date(), "dd mmm yyyy");

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class DashboardTable extends React.Component {
  state = {
    openview: false,
    workflowopen:false,
    open: false,
    spinner: false,
    search: null,
    statusId: 0,
    props_loading: true,
    trackingStatus: [],
    orderId:null,
    fromDate:dateFormat(new Date(),"yyyy-mm-dd"),
    toDate:dateFormat(new Date(),"yyyy-mm-dd"),
    tableData:[],
    tableDatafull:[],
  };

  componentDidMount() {
    this.dropDownDataApi()
    this.getTableData()
  }
  
  dropDownDataApi = () => {
    axios({
      method: "POST",
      url: apiurl + "getShOrderTrackingStatus",
    })
      .then((response) => {
        console.log(response,"sadfasdf");
        this.setState(
          {
            trackingStatus: response.data.data.map((val) => {
              return { id: val.status_id, trackingStatus: val.status };
            }),
          },
          () => this.state.trackingStatus.unshift({ id: 0, trackingStatus: "All" })
        ); 
        this.setState({});
        
      },()=>console.log(this.state.trackingStatus,"idcheck"))
      .catch((error) => {
        console.log(error)
      });
     this.getTableData()
  }

  getTrackingStatus = (data) => {
    console.log(data,"dataaaaaaaa")
   
      this.setState({statusId: data},()=>this.getTableData())
      console.log(this.state.statusId,"idddddd")
    }
   
  


  getTableData = () => {
    this.setState({ props_loading: true,spinner: true })
    var self=this
    axios({
      method: 'POST',
      url: apiurl + 'getShDeliveryTrack',
      data: {
        "status_id": this.state.statusId ,
    }
      
    }).then((response) => {
      var tableData = [];
      var tableDatafull = [];
      response.data.data.length > 0 ? response.data.data.map((val, index) => {
        console.log(response.data.data,"poda")

        tableData.push({
          customer: val.customer,
          product_name: val.product_name,
          phone_no: val.phone_no,
          status: val.status,
          id: val.order_id,
        })
        tableDatafull.push(val)
        self.setState({
          tableData: tableData,
          props_loading: false,
          spinner:false,
          tableDatafull:tableData,   
        })
        console.log(this.state.tableDatafull,"tabledata")
       
      }) : this.setState({tableData:[]})
      this.setState({
        spinner:false,
        props_loading: false,
      })
    
    }).catch((error) => {
      console.log(error, "error")
    })
  }

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

 
  modelopen = (data, id) => {
    // alert(id)
    if (data === "workflow") {
      this.setState({ workflowopen: true,orderId:id});
    }
  };
  openmodal = () => {
    this.setState({ open: true });
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false, workflowopen: false });
  };
  iconclick = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  searchChange = (e) => {
    this.setState({ search: e.target.value })
  }

  Notification = () => {
    notification.warning({
      message: "No data found",
      placement: "topRight",
    });
  };

    //Pdf Generation
    generatepdf = () => {
      if (this.state.tableData.length === 0) {
        notification.warning({
          message: "No data found",
          placement: "topRight",
        });
      }else{
      const doc = new jsPDF("a3")
      var bodydata = []
      this.state.tableData.map((data, index) => {
        bodydata.push([
          index + 1,
          data.customer, data.product_name, data.phone_no, data.status
        ])
      })
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Order Processing", 15, 23); // 15,13 for css
        },
        margin: { top: 30 },
        showHead: "everyPage",
        theme: "grid",
        head: [['S.No', 'Customer', 'Product Name', 'Phone Number', 'status']],
        body: bodydata,
      })
  
      doc.save('Delivery Tracking.pdf')
    }
  };



  render() {
    const { Search } = Input;
    const searchData = []
    this.state.tableData.filter((data, index) => {
       console.log(data, "Search_data");
       if (this.state.search === undefined || this.state.search === null){
        searchData.push({
          customer: data.customer,
          product_name:data.product_name,
          phone_no:data.phone_no,
          time: data.status,
          id:index
          })
      }
      else if (
           data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase())
        || data.product_name !== null && data.product_name.toLowerCase().includes(this.state.search.toLowerCase())
        || data.phone_no !== null && data.phone_no.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
        || data.status !== null && data.status.toLowerCase().includes(this.state.search.toLowerCase())
      ) {
         
        searchData.push({
          customer: data.customer,
          product_name:data.product_name,
          phone_no:data.phone_no,
          time: data.status,
          id:index
          })
      }
    })

// EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.tableData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
        { value: xldata.customer },
        { value: xldata.product_name },
        { value: xldata.phone_no },
        { value: xldata.status },
        ])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.customer, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.product_name, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.phone_no, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.status, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
        ])
      }
    })

    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Customer", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Product Name", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Phone Number", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Status", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
        ],
        data: multiDataSetbody
      }
    ];

    console.log(searchData, "searchData");
    return (
      <div>
         <div className="tracking_uploadmasterheader">
            <div className="titleuser">TRACKING</div>

            <div className="shopp_dash">

              <div className="trackingStatus"  style={{width:"280px"}}>
                <div className="wrapping_status">Status</div>
                <Labelbox
                  type="select"
                 
                  valuelabel={'trackingStatus'}
                  valuebind={"id"}
                  dropdown={this.state.trackingStatus}
                  changeData={(data) => this.getTrackingStatus(data, 'trackingStatus')}
                  value={this.state.statusId == 0 ? "ALL" :this.state.statusId}
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

                {this.state.tableData.length===0?
                <ReactSVG src={Excel} style={{ marginRight: "15px" }} onClick={this.Notification}/>:
              <ExcelFile filename={"Delivery Tracking"} element={<ReactSVG src={Excel} style={{ marginRight: "15px" }} />}>
                <ExcelSheet dataSet={multiDataSet} name="Delivery Tracking" />
              </ExcelFile>}

              {this.state.tableData.length===0?
              <ReactSVG src={Print}  onClick={this.Notification}/>:
              <ReactToPrint
                trigger={() => <ReactSVG src={Print} />}
                content={() => this.componentRef}
              />}

            </div>
            <div style={{ display: "none" }}>
              <PrintData printtableData={this.state.tableData}
                ref={el => (this.componentRef = el)} />
            </div>

          </div>
          <Spin className="spinner_align" spinning={this.state.spinner}>

        <Tablecomponent
          heading={[
            { id: "sno", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "product_name", label: "Product Name" },
            { id: "phone_number", label: "Phone Number" },
            { id: "status", label: "Status" },
            { id: "action", label: "Action" },
          ]}
          rowdata={searchData}
          tableicon_align={"cell_eye"}
          modelopen={(e,id) => this.modelopen(e,id)}
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          add="close"
        />
</Spin>
     
        <Modalcomp
          visible={this.state.workflowopen}
          title={"DELIVERY TRACKING"}
          closemodal={this.closemodal}
          xswidth={"lg"}
          clrchange="text_color"
        >
          <DeliveryView closemodal={this.closemodal} orderId={this.state.orderId} getTableData={()=>this.getTableData()} />
        </Modalcomp>
      </div>
    );
  }
}

export default DashboardTable;
