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
    search: null,
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
    alert(id)
    console.log(id, "edit_data");

    
    console.log(this.state.totalData.find((val) => val.sh_sub_category_id ), "edit_id");
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
        console.log(val, "datattta")

      })

      self.setState({
        tableData: tableData,
        tableDatafull: tableDatafull,
        totalData: response.data.data,
        props_loading: false,
        spinner:false
      })
      console.log(this.state.totalData, "datata")

    })
  }
  deleteopen = (type, id) => {
    alert(id)
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

  searchChange = (e) => {
    this.setState({ search: e.target.value })
  }


  render() {
    var tableData = this.state.tableData;
    const { Search } = Input;
    const searchData = []
    this.state.tableData.filter((data, index) => {
      console.log(data, "Search_data");
      if (this.state.search === undefined || this.state.search === null){
       searchData.push({
        sh_category: data.sh_category,
        sh_subcategory:data.sh_subcategory,
        created_on: moment(data.created_on).format('DD MMM YYYY'),
         })
     }
     else if (
          data.sh_category !== null && data.sh_category.toLowerCase().includes(this.state.search.toLowerCase())
       || data.sh_subcategory !== null && data.sh_subcategory.toLowerCase().includes(this.state.search.toLowerCase())
       || data.created_on !== null && data.created_on.toLowerCase().includes(this.state.search.toLowerCase())

     ) {
        
       searchData.push({
        sh_category: data.sh_category,
        sh_subcategory:data.sh_subcategory,
        created_on: moment(data.created_on).format('DD MMM YYYY'),
      
         })
     }
   })
    return (
      <div>
          <div className="uploadmasterheader">
            <div className="titleuser">MANAGE SUB CATEGORY</div>

            <div className="manage_container">
           
              <div className="manage_content_search">
              <Search
                placeholder=" search "
                onChange={(e) => this.searchChange(e)}
                style={{ width: 150 }}
                className="search_box_container"
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

        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "catagory", label: "Category" },
            { id: "subcatagory", label: "Sub Category" },
            { id: "created_date", label: "Created Date" },
            { id: "active", label: "Active" },
            { id: "", label: "Action" },
          ]}
          rowdata={searchData && this.state.tableData }
          deleteopen={this.deleteopen}
          modelopen={(e,id) => this.modelopen(e,id)}
          tableicon_align={"cell_eye"}
          VisibilityIcon="close"
          Workflow="close"
          add="close"
        />
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
