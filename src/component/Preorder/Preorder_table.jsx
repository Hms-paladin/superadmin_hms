import React, { Component } from "react";
import { notification } from "antd";
import "./Preorder_table.css";
import Tablecomponent from "../../helper/ShopTableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Editorder from "./Editorder";
import axios from "axios";
import { apiurl } from "../../App";

class Preorder_table extends React.Component {
  state = {
    date: "rrr",

    openview: false,
    tabledata: [],
    preorderdata: [],
    edit:false,
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
              product_name:val.sh_product_name,             
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

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "product_name", label: "Product Name" },
            { id: "expected_date", label: "Expected Date" },
            { id: "expected_quantity", label: "Expected Qty" },
            { id: "booked", label: "Booked" },

            { id: "", label: "Action" },
          ]}
          rowdata={this.state.tabledata && this.state.tabledata}
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
