import React from "react";
import Tablecomponent from "../../helper/ShopTableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Checkbox from "@material-ui/core/Checkbox";
import AddCategory from "./AddCategory";
import axios from 'axios';
import { apiurl } from "../../App";
import "./ManageCatagoryTable.css";
import ManageCatagoryModal from "./ManageCatagoryModal";
import DeleteMedia from "../../helper/deletemodel";
import { Spin,notification,Input } from 'antd';
import plus from "../../images/plus.png";

var moment = require('moment');

export default class ManageSubCatagoryTable extends React.Component {
  state = {
    openview: false,
    spinner: false,
    tableData: [],
    tableDatafull :[],
    totalData:[],
    searchData:"",
    insertOpen: false,
    deleteopen: false,
    open:true,
    edit:false,
    editData:"",
  
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



  modelopen = (data, id) => {
    console.log(id, "edit_data");

    
    console.log(this.state.totalData, "edit_id");
    if (data === "view") {
      console.log(data, "view_data");
      this.setState({ editopen: false });
      this.setState({ workflow: true });
      this.setState({
        viewData: this.state.totalData.find((val) => val.id === id),
      });
    } else if (data === "edit") {
      this.setState({ editopen: true });
      this.setState({
        edit: true,
        editData:this.state.totalData.find((val) => val.sh_sub_category_id === id),
      });
      console.log(this.state.editData, "dataaa_idd");
    }
    console.log(this.state.viewData, "viewwwww");
  };


  insertModalOpen = () => {
    this.setState({
      insertOpen: true,
      edit: false,
    });
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false,insertOpen: false});
  };

  iconclick = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };


  componentWillMount() {
    this.getTableData();
  }

    getTableData = () => {
    this.setState({ spinner: true })
    var tableData = [];
    var tableDatafull = [];
    var self = this
    axios({
      method: 'GET', //get sh_category_id method 
      url: apiurl + 'getShSubCategoryList',
      data: {
       
      }
    })
    .then((response) => {
      console.log(response, "response_data")
      response.data.data.map((val) => {
        console.log(val, "valdata")

        tableData.push({
          sh_category: val.sh_category,
          sh_subcategory:val.sh_subcategory,
          created_on: moment(val.created_on).format('DD MMM YYYY'),
          active: val.sh_active == "1" ? (
            <Checkbox
            checked={true}
          />
        ): (
          <Checkbox
          checked={false}
        />
        ),
        id:val.sh_sub_category_id,
        })

        tableDatafull.push(val)

      })

      self.setState({
        tableData: tableData,
        tableDatafull: tableDatafull,
        totalData: response.data.data,
        props_loading: false,
        spinner:false
      })
    })
  }
  deleteopen = (type, id) => {
    this.setState({
      deleteopen: true,
      iddata: id,
    });
  };

  
  deleterow = () => {
    this.setState({ props_loading: true });
    this.setState({ spinner: true });
    var self = this;
    axios({
      method: "DELETE",
      url: apiurl + "deleteShSubCategory",
      data: {
        "sh_sub_category_id": this.state.iddata,
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


  closemodal = () => {
    this.setState({
      openview: false,
      insertOpen: false,
      editopen: false,
      Deletemodalopen: false,
      deleteopen: false,
    });
  };

  render() {
    var tableData = this.state.tableData;
    const { Search } = Input;
    return (
      <div>
          <div className="uploadmasterheader">
            <div className="titleuser">MANAGE SUB CATEGORY</div>

            <div className="manage_container">
           
              <div className="manage_content_search">
              <Search
                  placeholder="Search"
                  onSearch={(value) => console.log(value)}
                  style={{ width: 150}}
                  className="mr-2 ml-2 "
                  onChange={(e) => this.setState({ searchData: e.target.value })}
                />
              </div>

              <img
                className="manage_plus-icon"
                src={plus}
                alt={"hi"}
                onClick={this.insertModalOpen}
                />
            </div>
          </div>
        <Spin className="spinner_align" spinning={this.state.spinner}>

           {tableData.length > 0 && (
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "catagory", label: "Category" },
            { id: "subcatagory", label: "Sub Category" },
            { id: "created_date", label: "Created Date" },
            { id: "active", label: "Active" },
            { id: "", label: "Action" },
          ]}
          rowdata={tableData.length > 0 && tableData}
          deleteopen={this.deleteopen}
          modelopen={(e,id) => this.modelopen(e,id)}
          tableicon_align={"cell_eye"}
          VisibilityIcon="close"
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
                  ? "ADD SUB CATEGORY"
                  : "EDIT SUB CATEGORY"
              }
              closemodal={(e) => this.closemodal(e)}
              xswidth={"md"}
            >


          <ManageCatagoryModal 
             btnProps={this.state.insertOpen}
             getTableData={this.getTableData}
             closemodal={() => this.closemodal()}
             editData={this.state.editData}
             editOpenModal={this.state.editopen}
             edit={this.state.edit}
             generateAlert={this.generateAlert}

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
