import React, { Component } from "react";
import { notification,Input } from "antd";
import "./Preorder_table.css";
import Tablecomponent from "../../helper/ShopTableComponent/altTableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Editorder from "./Editorder";
import axios from "axios";
import { apiurl } from "../../App";
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./PrintData";
import ReactSVG from 'react-svg';
import Pdf from '../../images/pdf.svg';
import Print from '../../images/print.svg';
import Excel from '../../images/excel.svg';
import jsPDF from 'jspdf';
import { Paper } from "@material-ui/core";
import plus from "../../images/plus.png";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class Preorder_table extends React.Component {
  state = {
    date: "rrr",

    openview: false,
    tabledata: [],
    preorderdata: [],
    edit:false,
    search: null,
    insertOpen: false,
    editopen:false,
    editData:""
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

  generateAlert = (description) => {
    notification.success({
      message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  }; 

  
  modelopen = (data,id) => {
    // alert(id)
    if (data === "view") {
      this.setState({ editopen: true });
    } else if (data === "add") {
      this.setState({ editopen: true });
      this.setState({
        edit: true,
        editData:this.state.preorderdata.find((val) => val.id === id),
      });
      
    }
    console.log(this.state.editData, "dataaa_idd");
  };

  
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
   
    this.getTableData();
    }
    getTableData = (data) =>{
      this.setState({spinner:true})
      var self = this
  
      
      axios({
        method:"GET",
        url:apiurl + 'getPreOrders',
        data:{
          }
            
      })
      .then((res)=>{
       var tabledata=[]
          var preorderdata=[];
             console.log(res,"resres")
          res.data.data.map((val,index)=>{
            console.log(val,"valeded")
            preorderdata.push({
              sh_product_name:val.sh_product_name,             
              expected_date:val.expected_date,
              expected_quantity:val.expected_quantity,
              booked:val.booked,
              id:val.product_id
  
              })
    tabledata.push(val)
  
    this.setState({
      preorderdata:preorderdata,
        tabledata:preorderdata,
        props_loading: false,
        spinner:false,
       
    },() => console.log("viewdatacheck",this.state.preorderdata))
  
  })
             
        })
     
    }
    
  
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
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
    // console.log(this.state.tableData,"datasss")
    this.state.tabledata.map((data, index) => {
      console.log("ksdjnks")
      bodydata.push([
        index + 1,
        data.sh_product_name, data.expected_date ,data.expected_quantity ,data.booked
      ])
    })
    doc.autoTable({
      beforePageContent: function (data) {
        doc.text("Pre Orders", 15, 23); // 15,13 for css
      },
      margin: { top: 30 },
      showHead: "everyPage",
      theme: "grid",
      head: [['S.No', 'Product Name', 'Expected Date','Expected Quantity','Booked']],
      body: bodydata,
    })

    doc.save('Pre Orders.pdf')
  }
};
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
    var tabledata = this.state.tabledata;
    const { Search } = Input;
    const searchData = []
    this.state.tabledata.filter((data, index) => {
       console.log(data, "Search_data");
       if (this.state.search === undefined || this.state.search === null){
        searchData.push({
          sh_product_name: data.sh_product_name,
          expected_date:data.expected_date,   
          expected_quantity:data.expected_quantity,  
          booked:data.booked,   
       
          id:data.id
          })
      }
      else if (
           data.sh_product_name !== null && data.sh_product_name.toLowerCase().includes(this.state.search.toLowerCase())
          || data.expected_date !== null && data.expected_date.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
          || data.expected_quantity !== null && data.expected_quantity.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
          // || data.active !== null && data.active.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())

      ) 
      {
         
        searchData.push({
          sh_product_name:data.sh_product_name,
          expected_date:data.expected_date,   
          expected_quantity:data.expected_quantity, 
          booked:data.booked,   
          id:index
          })
      }
    })

// EXCEL FUNCTION
var multiDataSetbody = []
this.state.tabledata.map((xldata, index) => {
  if (index % 2 !== 0) {
    multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
    { value: xldata.sh_product_name },
    { value: xldata.expected_date },
    { value: xldata.expected_quantity },
    { value: xldata.booked },

  
    ])
  } else {
    multiDataSetbody.push([
      { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
      { value: xldata.sh_product_name, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
      { value: xldata.expected_date, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
      { value: xldata.expected_quantity, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
      { value: xldata.booked, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },

    ])
  }
})

const multiDataSet = [
  {
    columns: [
      { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
      { title: "Product Name", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
      { title: "Expected Date", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
      { title: "Expected Quantity", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
      { title: "Booked", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },

    ],
    data: multiDataSetbody
  }
];

    return (
      <div>
        <Paper>
          <div className="uploadmasterheader">
            <div className="titleuser">PRE ORDERS </div>

        
            <div className="group_container">
          
              <Search
                className="revenue-search"
                placeholder=" Search "
                onChange={(e) => this.searchChange(e)}
                style={{ width: 150 }}
              />

<div className="office">
              <ReactSVG src={Pdf} style={{ marginRight: "15px", marginLeft: "15px" }} onClick={this.generatepdf}
                style={{ marginRight: "15px", marginLeft: "15px" }} />

                {this.state.tabledata.length===0?
                <ReactSVG src={Excel} style={{ marginRight: "15px" }} onClick={this.Notification}/>:
              <ExcelFile filename={"Manage Product"} element={<ReactSVG src={Excel} style={{ marginRight: "15px" }} />}>
                <ExcelSheet dataSet={multiDataSet} name="Manage Product" />
              </ExcelFile>}

              {this.state.tabledata.length===0?
              <ReactSVG src={Print}  onClick={this.Notification}/>:
              <ReactToPrint
                trigger={() => <ReactSVG src={Print} />}
                content={() => this.componentRef}
              />}

            </div>
            <div style={{ display: "none" }}>
              <PrintData printtableData={searchData}
                ref={el => (this.componentRef = el)} />
              </div>
              <div className="manage_container">
                {/* <img
                  className="manage_plus-icon"
                  src={plus}
                  alt={"hi"}
                  onClick={this.insertModalOpen}
                /> */}
              </div>
            </div>
          </div>

       
        </Paper>
        
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "sh_product_name", label: "Product Name" },
            { id: "expected_date", label: "Expected Date" },
            { id: "expected_quantity", label: "Expected Qty" },
            { id: "booked", label: "Booked" },

            { id: "", label: "Action" },
          ]}
          rowdata={searchData}
          tableicon_align={"cell_eye"}
          modelopen={(e,id) => this.modelopen(e,id)}
          Workflow="close"
          // EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          EditIcon="close"
        />

    
       
        <Modalcomp
             visible={
              this.state.insertOpen
                ? this.state.insertOpen
                : this.state.editopen
            }
          editData={this.state.editData}
          title={"ADD EXPECTED STOCK"}
          closemodal={(e) => this.closemodal(e)}
        >
          <Editorder  
           closemodal={() => this.closemodal()}
           getTableData={this.getTableData}
           generateAlert={this.generateAlert}
           edit={this.state.edit}
          editData={this.state.editData}/>
        </Modalcomp>
      </div>
    );
  }
}

export default Preorder_table;
