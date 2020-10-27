import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./PrintData";
import ReactSVG from 'react-svg';
import Pdf from '../../images/pdf.svg';
import Print from '../../images/print.svg';
import Excel from '../../images/excel.svg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Input,notification,Spin} from "antd";

import Paper from "@material-ui/core/Paper";
import "./Stocklist_table.css";
import Tablecomponent from "../../helper/ShopTableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Editstock from "./Editstock";
import { apiurl } from "../../../src/App.js";
import axios from 'axios';



const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class Stocklist_table extends React.Component {
  state = {
    openview: false,
    tabledata: [], edit:false,
    insertOpen: false,
    editopen:false,
    editData:"",
    stockDetails:[],
    stockColors:[],
    tabledatafull:[],
    search: null,
    spinner: false,
  };

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data,id) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "add") {
      this.setState({ editopen: true });
      this.setState({
        edit: true,
        editData:this.state.tabledatafull.find((val) => val.product_id === id),
      });
  };
  }
 
  insertModalOpen = () => {
    this.setState({
      insertOpen: true,
      edit: false,
    });
  };

  closemodal = () => {
    this.setState({
      insertOpen: false,
      editopen: false,
     
    });
  };

  componentDidMount() {
    this.getTableData()
  }

  getTableData = () => {
    this.setState({spinner: true })

    var self=this
    axios({
      method: "GET",
      url: apiurl + "getShStockList",
     
    })
      .then((response) => {
        console.log(response, "resres");
        var tabledata = [];
var tabledatafull=[];
        response.data.data.map((val,index) => {
          console.log(val, "res");
          tabledata.push({
            product_name: val.sh_product_name,
            stocknumber: val.total_stock,
           id:val.product_id,
           
          });
          tabledatafull.push(val,index)
          self.setState({
            product_code:val.sh_product_code,
            stockDetails:response.data.data,
            stockColors:response.data.data[0].color_info
          })
        
        });

        this.setState({
          tabledata: tabledata,
         tabledatafull:tabledatafull,
         spinner: false
        });
        console.log(this.state.tabledatafull,"seeking")
      })
      .catch((error) => {
        // alert(JSON.stringify(error))
      });
  };
    //Pdf Generation
    generatepdf = () => {
      if (this.state.tabledata.length === 0) {
        notification.warning({
          message: "No data found",
          placement: "topRight",
        });
      }else{
      const doc = new jsPDF("a3")
      var bodydata = []
      this.state.tabledata.map((data, index) => {
        bodydata.push([
          index + 1,
          data.product_name, data.stocknumber
        ])
      })
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Stock List", 15, 23); // 15,13 for css
        },
        margin: { top: 30 },
        showHead: "everyPage",
        theme: "grid",
        head: [['S.No', 'Product Name', 'Total Stock']],
        body: bodydata,
      })
  
      doc.save('Stock List.pdf')
    }
  };

  searchChange = (e) => {
    this.setState({ search: e.target.value })
  }


  render()
  {    const { Search } = Input;

    const searchData = []
    this.state.tabledata.filter((data, index) => {
       console.log(data, "Search_data");
       if (this.state.search === undefined || this.state.search === null){
        searchData.push({
          product_name: data.product_name,
          stocknumber:data.stocknumber,         
          id:index
          })
      }
      else if (
           data.product_name !== null && data.product_name.toLowerCase().includes(this.state.search.toLowerCase())
        || data.stocknumber !== null && data.stocknumber.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
      
      ) {
         
        searchData.push({
          product_name: data.product_name,
          stocknumber:data.stocknumber,         
          id:index
          })
      }
    })

// EXCEL FUNCTION
var multiDataSetbody = []
this.state.tabledata.map((xldata, index) => {
  if (index % 2 !== 0) {
    multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
    { value: xldata.product_name },
    { value: xldata.stocknumber },
  
    ])
  } else {
    multiDataSetbody.push([
      { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
      { value: xldata.product_name, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
      { value: xldata.stocknumber, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
    
    ])
  }
})

const multiDataSet = [
  {
    columns: [
      { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
      { title: "Product Name", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
      { title: "Stock Quantity", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
    
    ],
    data: multiDataSetbody
  }
];
    return (

      <div>
         <div className="stock_Totalorder">
        <Paper>
          <div className="stock_uploadsmasterheader">
            <div className="titleTotalorder">STOCK LIST</div>

      
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
           
           <Search
                placeholder=" Search "
                onChange={(e) => this.searchChange(e)}
                style={{ width: 150 }}
                className="search_box_container"
              />
              
              <div className="office">
              <ReactSVG src={Pdf} style={{ marginRight: "15px", marginLeft: "15px" }} onClick={this.generatepdf}
                style={{ marginRight: "15px", marginLeft: "15px" }} />

                {this.state.tabledata.length===0?
                <ReactSVG src={Excel} style={{ marginRight: "15px" }} onClick={this.Notification}/>:
              <ExcelFile filename={"Stock Quantity"} element={<ReactSVG src={Excel} style={{ marginRight: "15px" }} />}>
                <ExcelSheet dataSet={multiDataSet} name="Stock Quantity" />
              </ExcelFile>}

              {this.state.tabledata.length===0?
              <ReactSVG src={Print}  onClick={this.Notification}/>:
              <ReactToPrint
                trigger={() => <ReactSVG src={Print} />}
                content={() => this.componentRef}
              />}

            </div>
            <div style={{ display: "none" }}>
              <PrintData printtableData={this.state.tabledata}
                ref={el => (this.componentRef = el)} />
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <Spin className="spinner_align" spinning={this.state.spinner}>

        <Tablecomponent
         
          heading={[
            { id: "", label: "S.No" },
            { id: "product_name", label: "Product Name" },
            { id: "stocknumber", label: "Total Stock" },
            { id: "", label: "Action" },
          ]}
          
          rowdata={searchData && this.state.tabledata}
          tableicon_align={"cell_eye"}
          modelopen={(e,id) => this.modelopen(e,id)}
          Workflow="close"
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"      
        />
        </Spin>
   
        <Modalcomp
          visible={this.state.editopen}
          title={"ADD PRODUCT STOCK"}
          closemodal={(e) => this.closemodal(e)}
          editData={this.state.editData}
        >
          <Editstock 
          closemodal={() => this.closemodal()}
          getTableData={this.getTableData}
          edit={this.state.edit}
          editData={this.state.editData}
          stockDetails={this.state.stockDetails}
          stockColors={this.state.stockColors} 
         />
        </Modalcomp>
      </div>
    );
  }
}

export default Stocklist_table;
