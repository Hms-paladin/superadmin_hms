import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './MediaUploadsModal.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Upload } from 'antd';
import { FiInfo } from "react-icons/fi";
import uploadimage from '../../images/upload-button.png'
import Modalcomp from '../../helpers/ModalComp/Modalcomp';
import UploadMedia from './UploadMedia';
import axios from 'axios';
import {message } from 'antd';
import { apiurl } from "../../App";
import ValidationLibrary from "../../helpers/ValidationLibrary/validationfunction";

export default class MediaUploadsModal extends Component {
    constructor(props){
        super(props)
        this.state={
            open:false,
            mediaupload_lab: {
              'media_title': {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
              },
              'media_description':{
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
              },
            

              
      },
      'mediaupload_active':false,
      'upload_browser':{},
}
}
    handleOpen=()=>
    {
        this.setState({open:true})
    }
    handleClose=()=>
    {
        this.setState({open:false})
    }
    changeDynamic = (data, key) => {

      if (key === 'profile_pic') {
        this.handleChange(data)

    }
      // console.log(data,"hai")
      var mediaupload_lab = this.state.mediaupload_lab;
      var errorcheck = ValidationLibrary.checkValidation(data, mediaupload_lab[key].validation);
      mediaupload_lab[key].value = data;
      mediaupload_lab[key].error = !errorcheck.state;
      mediaupload_lab[key].errmsg = errorcheck.msg;
      this.setState({ mediaupload_lab });
    }
    checkValidation = () => {
      var mediaupload_lab = this.state.mediaupload_lab;
      var medicineKeys = Object.keys(mediaupload_lab);
      // console.log(medicineKeys);
      for (var i in medicineKeys) {
        var errorcheck = ValidationLibrary.checkValidation(mediaupload_lab[medicineKeys[i]].value, mediaupload_lab[medicineKeys[i]].validation);
        // console.log(errorcheck);
        mediaupload_lab[medicineKeys[i]].error = !errorcheck.state;
        mediaupload_lab[medicineKeys[i]].errmsg = errorcheck.msg;
      }
      var filtererr = medicineKeys.filter((obj) =>
        mediaupload_lab[obj].error == true);
      // console.log(filtererr.length)
      if (filtererr.length > 0) {
        this.setState({ error: true })
      } else {
        this.setState({ error: false })
        this.onSubmitData()
      }
      this.setState({ mediaupload_lab })
    }
    onSubmitData = () => {
      var mediaupload_labApiData = {
        // Pharmacy_id: 1,
        // active_flag: 1,
        // media_title: this.state.mediaupload_lab.media_title.value,
        // mediadescription:this.state.mediaupload_lab.media_description.value,
        // isactive: this.state.mediaupload_active == true ? 1:0,
        // imageArray:this.state.mediaupload_lab.upload_browser.value,
        // unit: this.state.mediaupload_lab.medicine_mg.value,
        // unit_rate: this.state.mediaupload_lab.medicine_rate.value,
        // created_by: 1,
        // created_on: dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"),
        // modified_by:1,
        // modified_on: dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"),
        mediatype:"image",
        mediasortorder:1,
        mediavendorId:2,
        activeflag:1,
        createdby:1,
        modifiedby:1,
        modifiedon:1,
        ipaddress:"192.144.23",
        mediatitle: this.state.mediaupload_lab.media_title.value,
        mediadescription:this.state.mediaupload_lab.media_description.value,
        imageArray:"image.png",
        isactive:this.state.mediaupload_active == true ? 1:0
      }
      if(this.props.editData){
        this.mediaupload_labUpdateApi(mediaupload_labApiData)   // Update Api Call
      }else{
        this.mediaupload_labAddApi(mediaupload_labApiData)   // Insert Api Call
      }
      this.props.closemodal()
    }
    mediaupload_labAddApi = (mediaupload_labApiData) => {
      axios({
        method: 'POST',
        url: apiurl + '/insertMediaUpload',
        data: {
          ...mediaupload_labApiData
        }
      })
      // .then((response) => {
      //   console.log(response)
      //   this.props.getTableData()
      // }).catch((error) => {
      //   alert(JSON.stringify(error))
      // })
    }
    getTableData = () => {
      var tableData = [];
      var self = this
      axios({
          method: 'get',
          url: apiurl + '/mediauploaddetails',
      })
    
  }
  // For checkbox api 
  dealActiveCheck = (e) => {
    // console.log(e.target.checked, "mediaupload_checkbox")
    this.setState({
      mediaupload_active: e.target.checked
    })
  }
  // for upload broswer
  handleChange = info => {
    alert("ranjith")
    if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList,"infoupload");
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
  };

 
    render() {
    
      console.log(this.state,"statevalue")
      const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: this.handleChange,
        headers: {
          authorization: 'authorization-text',
        },
    }
        return (
            <>
            <div className={`lab_mediauploads ${this.state.open === true && "d-none"}`}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
             <div className="media_title_head">
                 <Labelbox
                 type="text" 
                 labelname="Media Title"
                 changeData={(data) => this.changeDynamic(data,'media_title')}
                 value={this.state.mediaupload_lab.media_title.value}
                 error={this.state.mediaupload_lab.media_title.error}
                 errmsg={this.state.mediaupload_lab.media_title.errmsg}/>
            </div>
             </Grid>
             <Grid item xs={12} md={6}>
             <div className="clinicmedia_upload">Upload<span><FiInfo className="info_icon" onClick={this.handleOpen}/></span></div>
             <div className="labupload_container">
               <Upload {...props} className="upload-field"> 
             <div className="labmedia_button"> <Button className="clinicButton-container">
             Browse File<div className="uploadimage-container"><img className="uploadimage" alt="upload" src={uploadimage}/></div>
             </Button>
             </div>
             </Upload>
             </div>
         </Grid>
         <Grid item xs={12} md={12}>
         <div className="labmedia_checkbox">
           <Labelbox
            type="textarea"
             labelname="Description"
             changeData={(data) => this.changeDynamic(data,'media_description')}
             value={this.state.mediaupload_lab.media_description.value}
             error={this.state.mediaupload_lab.media_description.error}
             errmsg={this.state.mediaupload_lab.media_description.errmsg}/>
             </div>
         <div className="media_checkbox_container"><Checkbox  onChange={(e) => this.dealActiveCheck(e)}/><span className="lab_active">Active</span></div>
        <div className="labmediabutton-container"><Button className="lab_Upload">Cancel</Button><Button className="labcancel-form"  onClick={this.checkValidation}>Upload</Button></div>
        </Grid> 
           </Grid>
           </div>
         <Modalcomp clrgreen title="Upload Instructions" visible={this.state.open} closemodal={this.handleClose}>
             <UploadMedia/>
         </Modalcomp>
         </>
        )
    }
}
