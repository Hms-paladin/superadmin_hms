import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helper/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ManageCatagoryModal.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Upload } from "antd";
import { FiInfo } from "react-icons/fi";
import load from "../../images/load.png";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import UploadManageCatagory from "./UploadManageCatagory";
import ValidationLibrary from "../../helper/validationfunction";
import { apiurl } from "../../App";
import axios from 'axios';
import plus_square from "../../images/plus_square.svg";
import ReactSVG from "react-svg";

import dateformat from 'dateformat';

export default class ManageCatagoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editId:'', 
      open: false, 
      pink: "", 
      pinklist: [],
      checked:false,
      manageCategory: {
        'sh_category': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        }
        
      
      } };
  }

  
  detectChange = () => {
    this.setState({
      checked:!this.state.checked
    })
  }

  checkValidation = () => {
  
    var manageCategory = this.state.manageCategory;
    var serviceKeys = Object.keys(manageCategory);
    for (var i in serviceKeys) {
      var errorcheck = ValidationLibrary.checkValidation(manageCategory[serviceKeys[i]].value, manageCategory[serviceKeys[i]].validation);
      console.log(errorcheck);
      manageCategory[serviceKeys[i]].error = !errorcheck.state;
      manageCategory[serviceKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = serviceKeys.filter((obj) => manageCategory[obj].error == true);
    if (filtererr.length > 0) {
     
      this.setState({ error: true})
    } else {
      this.setState({ error: false })
      this.onSubmitData()
    }
    this.setState({ manageCategory })
  }

  changeDynamic = (data, key) => {
    var manageCategory = this.state.manageCategory;
    var errorcheck = ValidationLibrary.checkValidation(data, manageCategory[key].validation);
    manageCategory[key].value = data;
    manageCategory[key].error = !errorcheck.state;
    manageCategory[key].errmsg = errorcheck.msg;
    this.setState({ manageCategory });
  }


  clear = () => {
    this.state.manageCategory.sh_category.value = "";
   
    this.state.checked = false;

    this.setState({})
  }

  onSubmitData = () => {
    // alert("submit_data")
   
    var manageCategoryApiData = {
      sh_active: this.state.checked ? 1 : 0,
      sh_category: this.state.manageCategory.sh_category.value,
      created_by: 1,
      created_on: dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"),
      modified_by: 1,
      modified_on: dateformat(new Date(), "yyyy-mm-dd hh:MM:ss")

    }
  
  
    
    if(this.props.edit){
      this.manageCategoryUpdateApi(manageCategoryApiData)   
    }
    else{
      this.manageCategoryInsertApi(manageCategoryApiData)
      // Insert Api Call
    }
    this.props.closemodal()
  }

  // insert api
  manageCategoryInsertApi = (manageCategoryApiData) => {
    
    console.log("submit", manageCategoryApiData)
    axios({ 
      method: 'POST',
      url: apiurl + 'insert_mas_sh_category',
      data: {
        ...manageCategoryApiData
      }    
    })
    .then((response) => {
      this.props.generateAlert("Category Created Successfully")
      this.props.getTableData()
    })
    
    .catch((error) => {
      // alert(JSON.stringify(error))
    })
  }

//  edit api
manageCategoryUpdateApi = (manageCategoryApiData) => {
  axios({
    method:'PUT',
    url: apiurl+'edit_mas_sh_category',
    data:{
      id:this.props.editData.id,
      ...manageCategoryApiData
    }
  })
  .then((response)=>{
    console.log("response_checkingg",response)
    this.props.generateAlert("Category Updated Successfully")
    this.props.getTableData()
  }).catch((error)=>{
    // alert(JSON.stringify(error))
  })
}

componentWillMount(){
  // Assigning Edit Data
  const { editData,editOpenModal } = this.props;
  console.log("asdfjdshfjsdhfjksdhfjds",editData)
  if (editOpenModal === true) {
    this.state.editId= editData.id
    this.state.manageCategory.sh_category.value = editData.sh_category
    this.state.checked = editData.sh_active == 1 ? true : false
  }
  this.setState({})
}


  render() {

    return (
      <>
        <div
          className={`doctor_mediauploads ${
            this.state.open === true && "d-none"
          }`}
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={6} className="shop_modal_grid">
              <div className="media_title_head">
              <Labelbox
                type="text"
                labelname="Category"
                valuelabel={'sh_category'}
                changeData={(data) => this.changeDynamic(data, 'sh_category')}
                value={this.state.manageCategory.sh_category.value}
                error={this.state.manageCategory.sh_category.error}
                errmsg={this.state.manageCategory.sh_category.errmsg}
                required
              />
              </div>
            </Grid>

            <Grid item xs={6} md={6} className="shop_modal_grid-1">
              <div className="media_title_head" style={{ display: "flex" }}>
             
                <div style={{ fontSize: "16px", marginTop: "5px" }}>Active</div>
                <Checkbox checked={this.state.checked} onChange={this.detectChange}></Checkbox>
              </div>
            </Grid>
          </Grid>

          <Grid container>
         

            <Grid
              item
              xs={6}
              md={6}
              style={{ marginTop: "20px" }}
              // className="final_button_grid"
            >
               <div className="medibutt_container">
              <Button variant="contained" className="cancel_medibutt" onClick={this.clear}>Cancel</Button>
              <Button className="submit" onClick={() => this.checkValidation()}>
              {!this.props.edit ?  "Submit" : "Update"}
              </Button>
            </div>
            </Grid>
          </Grid>


          <Grid container className="img_footer_content">
            <div className="foot">
         
            </div>
          </Grid>
        </div>
        <Modalcomp
          clrchange="text_color"
          title="Upload Instructions"
          visible={this.state.open}
          closemodal={this.handleClose}
        >
          <UploadManageCatagory />
        </Modalcomp>
      </>
    );
  }
}
