import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helper/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ManageCatagoryModal.css";
import Checkbox from "@material-ui/core/Checkbox";
import { Upload } from "antd";
import { FiInfo } from "react-icons/fi";
import load from "../../images/load.png";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import UploadManageCatagory from "./UploadManageCatagory";
import Axios from "axios";
import { apiurl } from "../../App";
import plus_square from "../../images/plus_square.svg";
import ReactSVG from "react-svg";
import ValidationLibrary from '../../helper/validationfunction';
import dateformat from 'dateformat';
import { InputLabel } from "@material-ui/core";
import {Select,Spin} from 'antd';
import { message } from "antd";
import { Card } from "@material-ui/core";
import { IoIosCloseCircleOutline } from "react-icons/io";


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}


const {Option} = Select;
export default class ManageCatagoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: false, 
      spinner: false,
      edit: false,
      cardEdit: false,
      editId:'',
      subcatId:'',
      Category:'',
      pink: "", 
      checked:false,
      pinklist: [],
      total:"",
      imageChanged: false,
      imageUrl: "",
      imageName: "",
      imageError: "",
      hidefilelist: false,
      imagedata: [],
      subCategory:"",
      subCatError:"",
      CategoryList: null,
      CategoryId: null,
      addedPackInfo:[],
      sh_sub_category_id:null,
    };
  }

  componentWillMount() {

    this.Categorydropdown();
    this.getAddedPackInfo();
    const { editData,editOpenModal } = this.props;
    console.log("asdfjdshfjsdhfjksdhfjds",this.props)
    console.log(   this.state.CategoryId ,"state_CategoryId")
    if ( editOpenModal === true) {
      this.state.edit=true
      this.state.editId= editData.id
      this.state.CategoryId = editData.sh_category_id
      this.state.subCategory = editData.sh_subcategory
      this.state.filename = editData.sh_upload_filename
      this.state.imagedata = editData.sh_upload_filename
      this.state.checked = editData.sh_active
      this.state.subcatId=editData.sh_sub_category_id
    }
    this.setState({})
  }

  detectChange = () => {
    if(this.state.checked =!this.state.checked)
    this.setState({
      checked:"1"
    })
    else{
      this.setState({checked:this.state.checked})
    }
    
  }

  
  handleChange = (info) => {
    // console.log("ajusfjdsfsdjhfljdsh",info)

    if (info.fileList.length == 0) {
      let fileList = [...info.fileList];

      fileList = fileList.slice(-1);

      this.setState({ fileList, imagedata: fileList, hidefilelist: false });
    }

    if (info.fileList.length > 0) {
      if (
        info.fileList[0].type == "image/png" 
      ) {
        let fileList = [...info.fileList];

        fileList = fileList.slice(-1);

        fileList = fileList.map((file) => {
          if (file.response) {
            file.url = file.response.url;
          }
          return file;
        });

        this.setState({
          fileList,
          imagedata: fileList,
          imageChanged: true,
          hidefilelist: false,
          imageError: false,
        });
      } else {
        this.setState({ open: true });
      }
    }
  };



  handleChange = (event,data) => {
    this.setState({
      subCategory: event.target.value,
    });
  };
  submitText = () => {
    this.setState({
      pink: [...this.state.pinklist, this.state.pink],
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };


  Categorydropdown = () => {
    var self = this;
    Axios({
      method: "GET",
      url: apiurl + "get_mas_sh_category",
      
    })
      .then((response) => {
        console.log(response, "clinic");

        this.setState({ 
          CategoryList: response.data.data,
          // CategoryId:response.data.data.id
        },()=>this.getAddedPackInfo()); 
      })
      .catch((error) => {
        // console.log(JSON.stringify(error));
      });

    this.setState({});
  };
 
changeDynamic = (data, key) => {

  console.log("Data", data);
  console.log("key", key);
  if(key == "id") {
    this.setState({CategoryId:data},()=>this.getAddedPackInfo());
  }

  this.setState({ [key]: data });
};



  uploadFile = (e) => {
    if (
      e.target.files[0].type == "image/png" ||
      e.target.files[0].type == "image/jpeg" 
    ) {
      this.setState({
        imagedata: e.target.files[0],
        filename: e.target.files[0].name,
        type: e.target.files[0].type,
        mediaError: false,
        imageChanged: true,
        imageError: false,
      });
    } else {
      this.setState({ open: true });
    }
  };

  validation = () => {
    let subCatError = "";
    let imageError = "";
  

    if(this.state.subCategory === "") {
      
      subCatError = "Field Required"
    }

  

    if (this.state.imagedata.length === 0) {
      imageError = "Field Required";
    }
   
    if (
      subCatError ||
      imageError 
    ) {
      this.setState({
        subCatError ,
        imageError 
      });

      return false;
    }
    return true
  }



  resetFormValue = () => {

    this.state.subCategory = "";
    this.state.checked="";
    this.state.filename = "";


    this.setState({
      subCategory : "",
      checked:"",
      filename : ""
    });
  };

  
  handleSubmit = () => {

    let formdata = new FormData();

    console.log("safjsdhfjskhejrhsfsd",this.state.CategoryId)

    formdata.set("sh_active", this.state.checked === false ? 0 : 1);
    formdata.set("sh_category_id", this.state.CategoryId);
    formdata.set("sh_subcategory", this.state.subCategory);
    !this.state.edit && formdata.set("created_by", 1);
    !this.state.edit && formdata.set("created_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"));
    console.log("dsfjksdhfjhdsersfjsdkjfhsd",formdata)
   

    const isValid = this.validation()

    if(this.state.edit === false && isValid) {
      formdata.append("sh_upload_filename", this.state.imagedata);
      this.sendDetails(formdata)
    } 
    if(this.state.edit === true && isValid) {
      formdata.set("sh_sub_category_id",  this.state.subcatId);
      formdata.set("modified_by", 1);
      formdata.set("modified_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"));
    
    if (this.state.imageChanged === true) {
      formdata.append("sh_upload_filename", this.state.imagedata);
  
    }else{
      !this.state.imageChanged && formdata.append('sh_upload_filename', [])
    }
      this.sendEditDetails(formdata)
    }
    
  }

  editCardPack = (details) =>{

   

    this.setState({
     
      CategoryId:details.sh_category_id,
      subCategory : details.sh_subcategory,
      filename : details.sh_upload_filename,
      imagedata : details.sh_upload_filename,
      checked : details.sh_active,
      subcatId:details.sh_sub_category_id,
    })
     
      let formdata = new FormData();

   
    formdata.set("sh_sub_category_id",  this.state.subcatId);
    formdata.set("modified_by", 1);
    formdata.set("modified_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"));
    formdata.set("sh_active", this.state.checked);
    formdata.set("sh_category_id", this.state.CategoryId);
    formdata.set("sh_subcategory", this.state.subCategory);
    !this.state.edit && formdata.set("created_by", 1);
    !this.state.edit && formdata.set("created_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"));
    !this.state.imageChanged && formdata.append('imageArray', [])
    console.log("dsfjksdhfjhdsersfjsdkjfhsd",formdata)
   
    const isValid = this.validation()

    if(this.state.cardEdit== true && isValid){
      this.sendEditDetails(formdata)
    }
  }

  sendDetails =(details) =>{
    Axios({
      method:"POST",
      url: apiurl+'insertShSubCategory',
      data: details
    }).then((response) => {
      console.log("sdfsjdhfjshfeurishf",response)
      if(response.data.status == "1") {
        this.props.getTableData()
        this.getAddedPackInfo()
       
        this.props.generateAlert("Sub Category Added Successfully")
        this.resetFormValue()
       

      }
      else  if(response.data.status === "0") {
        this.getAddedPackInfo()
        this.props.generateAlert("Sub-Category already exists")
        this.resetFormValue()
      }
    }).catch((err) => {
      // 
    })
  }

  sendEditDetails = (details) =>{
    Axios({
      method:"PUT",
      url: apiurl+'editShSubCategory',
      data: details
    }).then((response) => {
      console.log("sendEditDetails",response)
     
      if(response.data.status =="1") {
        this.getAddedPackInfo()
        this.props.getTableData()
        this.props.generateAlert("Sub Category Added Successfully")
        this.resetFormValue()
       
      }
    
    }).catch((err) => {
      // 
    })
  }


  getAddedPackInfo = () => {
    this.setState({ spinner: true })
    var self = this
    Axios({
      method:'POST',
      url:apiurl + 'getShSubCategory',
      data:{"sh_category_id":this.state.CategoryId}
    }).then((response) => {
      console.log(response,"pack")
         this.setState({
           addedPackInfo:response.data.data,
        
         })
         console.log("addedPackInfo",this.state.addedPackInfo)
    })
    self.setState({
      spinner:false
    })
  }

 
  deleteCard = (id) => {
    var self = this;
    Axios({
      method: "DELETE",
      url: apiurl + "deleteShSubCategory",
      data: {
        "sh_sub_category_id": id
      },
    })
      .then((response) => {
        console.log("sdfjsdhafjklsdhfk", response);
        if (response.data.status == "1") {
          this.props.generateAlert("Sub Category Deleted Successfully");
          this.getAddedPackInfo()
        } else {
          this.props.generateAlert(
            "Sub Category contains product and could not be deleted"
          );
        }
      })
      .catch((err) => {
        //
      });
    }
 

  render() {
    console.log("add_data", this.props)

    return (
      <>
        <div
          className={`doctor_mediauploads ${
            this.state.open === true && "d-none"
          }`}
        >
          <Grid container spacing={3}>
            <Grid item xs={4} md={4} className="shop_modal_grid">
            <div className="cat_div" >
         
         
            <Labelbox
               className="catge_sub"
                type="select"
                labelname={"Category"}
                valuelabel={"sh_category"}
                valuebind={"id"}
                changeData={(data) => this.changeDynamic(data, "id")}
                dropdown={this.state.CategoryList}
                value={this.state.CategoryId}
                
              />

</div>

            </Grid>

            <Grid item xs={4} md={4} className="shop_modal_grid-1">
          

                    <div className="advertise_cost--unique">
                      <div className="sub_cat">Sub Category</div>
                      <input
                        type="text"
                        className="html__input--subcat"
                        value={this.state.subCategory}
                        onChange={(data,event) => this.handleChange(data,event, "subcategory")}
                      ></input>
                    </div>
                    <div className="validation__error">{this.state.subCatError && this.state.subCatError}</div>


            </Grid>
            <Grid item xs={4} md={4} className="shop_subcat_grid-1">
            <div className="checkbox__container">
                  <lable className="labtxt">Active</lable>
                  <div className="check__contain">
                        <Checkbox checked={this.state.checked} onChange={this.detectChange}></Checkbox>
                   </div>      
                </div>  
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6} md={6} className="shop_modal_grid">
              <div className="media_title_head">
                <div className="product_img_div">
                  <label>
                    <h5 className="product_image">Upload Product Image</h5>
                  </label>

                  <span>
                  <FiInfo
                      // src={Info}
                      className="info_icon"
                      onClick={this.handleOpen}
                    />
                  </span>
                </div>
                <div className="upload__container_advertise">
                      <input
                        type="text"
                        value={this.state.filename}
                        className="html__input-box"
                        placeholder="My image.jpg"
                        onClick={() =>
                          document.getElementById("getFile").click()
                        }
                      />
                      <div className="upload__container--btn">
                        <Button
                          className="button_browse upload__pics--btn"
                          onClick={() =>
                            document.getElementById("getFile").click()
                          }
                        >
                          Browse
                        </Button>
                      </div>
                      <input
                        type="file"
                        id="getFile"
                        onChange={this.uploadFile}
                        className="hideFile"
                      />
                    </div>

                    <div className="validation__error">
                      {this.state.imageError && this.state.imageError}
                    </div>
              </div>
              <div>
                    <ReactSVG src={plus_square} className="subcatplus_square" onClick={() => this.handleSubmit()} />
                  </div>
            </Grid>

            <Grid
              item
              xs={6}
              md={6}
              style={{ marginTop: "20px" }}
              // className="final_button_grid"
            >
              <div className="shop_mediabutton-container">
                <Button
                  className="shop-cancel-form"
                  onClick={() => this.props.closemodal(false)}
                >
                  Cancel
                </Button>
                <Button className="shop-submit-Upload"
                 onClick={() => this.props.closemodal(false)}
                 >  {!this.props.edit ?  "Submit" : "Update"}</Button>
              </div>
            </Grid>
          </Grid>

          <div className="browser_divider"></div>
          <Spin className="spinner_align" spinning={this.state.spinner}>
          <Grid container className="card_footer_content">
        
          {this.state.addedPackInfo&&this.state.addedPackInfo.length>0 && this.state.addedPackInfo.map((addedPackInfo) =>{
            return(
         
              <Grid item  xs={6} md={3} className="">
                <div className="up_img_div">
                <IoIosCloseCircleOutline 
                className="deleteICON"
                onClick={()=> this.deleteCard(addedPackInfo.sh_sub_category_id)}
                />
                  
            <Card className="carddisplay " onClick={()=>this.editCardPack(addedPackInfo)}>
           
              <img src={addedPackInfo.sh_upload_filename} className="package_images"/>
              <div className="background_check">
                      <div className="category_display">Category<p>{addedPackInfo.sh_category}</p></div>
                      <div className="subcategory_display">Sub Category<p>{addedPackInfo.sh_subcategory}</p></div>
                      </div>
                     
                      </Card>
                      </div>
                </Grid>
              
            )
          })} 
       
          </Grid>
          </Spin>
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
