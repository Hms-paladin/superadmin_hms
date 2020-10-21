import React from "react";
import Tablecomponent from "../../helper/ShopTableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import View_Product from "../Product_upload/View_Product";
import Product_UploadModal from "../Product_upload/Product_UploadModal";
import Checkbox from "@material-ui/core/Checkbox";
import Editproduct from "./Edit_product";
import { Spin, notification, Input } from "antd";
import axios from "axios";
import { apiurl } from "../../App";
import "./Product_UploadTable.css";
import excel from "../../images/excel.svg";
import pdf from "../../images/pdf.svg";
import print from "../../images/print.svg";
import { Paper } from "@material-ui/core";
import plus from "../../images/plus.png";
import ProductUploadModal from "../Product_upload/Product_UploadModal";
import DeleteMedia from "../../helper/deletemodel";


var moment = require("moment");

export default class Product_Upload extends React.Component {
  state = {
    openview: false,
    spinner: false,
    tableData: [],
    tableDatafull: [],
    totalData: [],
    view:false,
    viewData:"",
    edit:false,
    editData:"",
    addview: false,
    add:false,
    addData:"",
    insertOpen: false,
    deleteopen: false,

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

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  // modelopen = (data) => {
  //   if (data === "view") {
  //     this.setState({ openview: true });
  //   } else if (data === "edit") {
  //     this.setState({ editopen: true });
  //   }
  // };

  
  modelopen = (data, id) => {
    console.log(id, "edit_data");

    
    console.log(this.state.totalData, "edit_id");
    // if (data === "add") {
    //   console.log(data, "view_data");
    //   this.setState({ addview: true });
    //   this.setState({ workflow: true });
    //   this.setState({
    //     add:true,
    //     addData: this.state.totalData.find((val) => val.product_id === id),
    //   });

    // } 

    if (data === "view") {
      console.log(data, "view_data");
      this.setState({ openview: true });
      // this.setState({ workflow: true });
      this.setState({
        view:true,
        viewData: this.state.totalData.find((val) => val.product_id === id),
      });
      console.log(this.state.viewData, "viewwwww");
    } 
    else if (data === "edit") {
      this.setState({ editopen: true });
      this.setState({
        edit: true,
        editData:this.state.totalData.find((val) => val.product_id === id),
      });
      console.log(this.state.editData, "dataaa_idd");
    }
   
  };

  deleteopen = (type, id) => {
    alert(id)
    this.setState({
      deleteopen: true,
      iddata: id,
    });
  };

  insertModalOpen = () => {
    this.setState({
      insertOpen: true,
      edit: false,
    });
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false,insertOpen: false, deleteopen: false});
  };

  componentWillMount() {
    this.getTableData();
  }

  getTableData = () => {
    this.setState({ spinner: true,props_loading: true });
    var tableData = [];
    var tableDatafull = [];
    var self = this;
    axios({
      method: "GET", //get sh_category_id method
      url: apiurl + "getShProductInfo",
      data: {},
    }).then((response) => {
      console.log(response, "response_data");
      response.data.data.map((val) => {
      
        tableData.push({
          sh_product_name: val.sh_product_name,
          created_on: moment(val.created_on).format("DD MMM YYYY"),
          sh_mrp: val.sh_mrp,
          sh_is_active:
            val.sh_is_active == "1" ? (
              <Checkbox checked={true} />
            ) : (
              <Checkbox checked={false} />
            ),
          id: val.product_id,
        });

        tableDatafull.push(val);
        
      });

      self.setState({
        tableData: tableData,
        tableDatafull: tableDatafull,
        totalData: response.data.data,
        props_loading: false,
        spinner: false,
      });
    });
  };


  deleterow = () => {
    this.setState({ props_loading: true });
    this.setState({ spinner: true });
    var self = this;
    axios({
      method: "DELETE",
      url: apiurl + "deleteShProductInfo",
      data: {
        "product_id": this.state.iddata,
      },
    })
      .then((response) => {
        console.log("sdfjsdhafjklsdhfk", response);
        if (response.data.status == "1") {
          this.getTableData();
          this.props.generateAlert("Sub Category Deleted Successfully");
        } else {
          this.props.generateAlert(
            "Sub Category contains product and could not be deleted"
          );
        }
      })
      .catch((err) => {
        //
      });

    this.setState({
      Deletemodalopen: false,
    });
    this.setState({ spinner: false,props_loading:false });
  };

  render() {
    var tableData = this.state.tableData;
    const { Search } = Input;
    return (
      <div>
         <Paper>
          <div className="uploadmasterheader">
            <div className="titleuser">MANAGE PRODUCT </div>

        
            <div className="group_container">
          
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
              <div className="manage_container">
                <img
                  className="manage_plus-icon"
                  src={plus}
                  alt={"hi"}
                  onClick={this.insertModalOpen}
                />
              </div>
            </div>
          </div>

       
        </Paper>

        <Spin className="spinner_align" spinning={this.state.spinner}>
          {tableData.length > 0 && (
            <Tablecomponent
              heading={[
                { id: "", label: "S.No" },
                { id: "product_name", label: "Product Name" },
                { id: "created_date", label: "Created Date" },
                { id: "fee", label: "Cost(KWD)" },
                { id: "active", label: "Active" },
                { id: "", label: "Action" },
              ]}
              rowdata={tableData.length > 0 && tableData}
              tableicon_align={"cell_eye"}
              modelopen={(e,id) => this.modelopen(e,id)}
              deleteopen={this.deleteopen}
              Workflow="close"
              add="close"
            />
          )}
        </Spin>

        <Modalcomp
     
          clrchange="text_color"
          visible={
            this.state.insertOpen
              ? this.state.insertOpen
              : this.state.editopen
          }
          title={
            this.state.insertOpen === true
              ? "ADD PRODUCT"
              : "EDIT PRODUCT"
          }
          closemodal={(e) => this.closemodal(e)}
          xswidth={"md"}
            >

          <ProductUploadModal 
             clrchange="text_color"
             getTableData={this.getTableData}
             closemodal={() => this.closemodal()}
            //  addData={this.state.addData}
             insertOpenModal={this.state.insertOpen}
            //  add={this.state.add}
             generateAlert={this.generateAlert}
             editData={this.state.editData}
             editOpenModal={this.state.editopen}
             edit={this.state.edit}
     />

     </Modalcomp>

        <Modalcomp
          custommodalsize="productupload_view_modal"
          clrchange="text_color"
          visible={this.state.openview}
          title={"VIEW DETAILS"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"lg"}
        >
          <View_Product  
           clrchange="text_color"
           getTableData={this.getTableData}
           viewData={this.state.viewData}
           viewOpenModal={this.state.openview}
           view={this.state.view}
           viewData={this.state.viewData}
           />

        </Modalcomp>

        <Modalcomp
              visible={this.state.deleteopen}
              title={"Delete"}
              closemodal={this.closemodal}
              customwidth_dialog="cus_wid_delmodel"
              xswidth={"xs"}
            >
              <DeleteMedia
                deleterow={this.deleterow}
                closemodal={this.closemodal}
              />
            </Modalcomp>
      </div>
    );
  }
}
