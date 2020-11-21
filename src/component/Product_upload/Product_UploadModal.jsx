import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Labelbox from "../../helper/labelbox/labelbox";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import "./Product_UploadModal.css";
import Checkbox from "@material-ui/core/Checkbox";
import { Upload } from "antd";
import Pink from "../../images/pink1.png";
import { IoIosCloseCircleOutline, IoIosCodeWorking } from "react-icons/io";
import Axios from "axios";
import { apiurl } from "../../App";
import { Select } from "antd";
import { FiInfo } from "react-icons/fi";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Upload_Product from "./Upload_Product"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import dateformat from 'dateformat';
import { isThisSecond } from "date-fns";
import Divider from '@material-ui/core/Divider';

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}


export default class ProductUploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: false, 
      CategoryList: null,
      CategoryId: 1,
      SubCatList: null,
      SubCatId: null,
      productCode:"",
      productName:"",
      productMrp:"",
      productPrice:"",
      checked:false,
      productDesc:"",
      colorList: "", 
      productId:null,
      productImages:[],
      productInfo:[],
      imageChanged: false,
      imageUrl: "",
      imageName: "",
      imageError: "",
      hidefilelist: false,
      imagedata: [],
      fileUploadDatas:"",
      product: "",
      displayColorPicker: false,
      imageId:"",
      imageProdId:"",
      getColor:[],
      prodCodeErr:"",
      prodNameErr:"",
      prodMrpErr:"",
      prodPriceErr:"",
      prodDescErr:"",
      colorListErr:"",
      colorPickErr:"",
      subCatIdErr: "",
      dummyclr:true,
      background: '#fff',
      colorData:null,
      cardEdit: false,
      colorId:"",
     };
  }


  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };



  handleChange = (color) => {
    this.setState({ dummyclr:false,color: color.rgb })
    console.log("colorcheck",color)
  };



  detectChange = () => {
    if(this.state.checked =!this.state.checked)
    this.setState({
      checked:"1"
    })
    else{
      this.setState({checked:this.state.checked})
    }
    
  }

  validation = () => {
    let subCatIdErr = "";
    let prodCodeErr = "";
    let prodNameErr = "";
    let prodMrpErr = "";
    let prodPriceErr = "";
    let prodDescErr = "";
    let colorListErr = "";
    let colorPickErr = "";
    let imageError = "";

    if(this.state.SubCatId === null) {
      
      subCatIdErr = "Field Required"
    }

    if(this.state.productCode === "") {
      
      prodCodeErr = "Field Required"
    }
    if(this.state.productName === "") {
      
      prodNameErr = "Field Required"
    }
    if(this.state.productMrp === "") {
      
      prodMrpErr = "Field Required"
    }
    if(this.state.productPrice === "") {
      
      prodPriceErr = "Field Required"
    }
    if(this.state.productDesc === "") {
      
      prodDescErr = "Field Required"
    }
    if(!this.state.edit==true && this.state.colorList === "") {
      
      colorListErr = "Field Required"
    }
    if(!this.state.edit==true && this.state.color === "") {
      
      colorPickErr = "Field Required"
    }
  
    if (!this.state.edit==true && this.state.imagedata.length === 0) {
      imageError = "Field Required";
    }
   
    if (
      subCatIdErr ||
      prodCodeErr ||
      prodNameErr ||
      prodMrpErr  ||
      prodPriceErr||
      prodDescErr ||
      colorListErr||
      imageError ||
      colorPickErr

    ) {
      this.setState({
        subCatIdErr,
        prodCodeErr,
        prodNameErr,
        prodMrpErr,
        prodPriceErr,
        prodDescErr,
        colorListErr,
        imageError,
        colorPickErr
      });

      return false;
    }
    return true
  }


  storeValues = (e,key,editor) => {
    if(key==="productCode"){
      this.setState({
      productCode:e,
      prodCodeErr:false
    })}
    if(key==="productName"){
      this.setState({
      productName:e,    
      prodNameErr:false
    })}
    if(key==="productMrp"){
      this.setState({
        productMrp:e,   
        prodMrpErr:false 
    })}
    if(key==="productPrice"){
      this.setState({
        productPrice:e,   
        prodPriceErr:false 
    })}
    if(key==="colorList"){
      this.setState({
        colorList: e,
        colorListErr:false
      })}
     
}

handleOnChange =(e,editor) => {

    const data = editor.getData()
    // console.log(data,"description")
    this.setState({
      productDesc:data,
      prodDescErr:false
    })
  
    
}

handleChangeComplete = (color) => {
  this.setState({ background: color.hex });
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
  

  componentWillMount () {
    this.Categorydropdown()
    this.SubCatdropdown()
    
  }

  componentDidMount(){
    const { editData,editOpenModal } = this.props;
    console.log("asdfjdshfjsdhfjksdhfjds",this.props)
   
    if ( editOpenModal === true) {
      this.state.edit=true
      this.state.productId=editData.product_id
      this.state.CategoryId = editData.sh_category_id
      this.state.SubCatId = editData.sh_subcategoryid
      this.state.productCode = editData.sh_product_code
      this.state.productName = editData.sh_product_name
      this.state.productPrice = editData.sh_price
      this.state.productMrp = editData.sh_mrp
      this.state.checked = editData.sh_is_active
      this.state.productDesc=editData.sh_product_description
      this.loadproductInfo()
      // this.setState({
      //   edit:true,
      //   productId:editData.product_id,
      //   CategoryId :editData.sh_category_id,
      //   productDesc:editData.sh_product_description,
      //   SubCatId : editData.sh_subcategoryid,
      //   productCode : editData.sh_product_code,
      //   productName : editData.sh_product_name,
      //   productPrice : editData.sh_price,
      //   productMrp : editData.sh_mrp,
      //   checked : editData.sh_is_active,
      // })
     
      // this.state.getColor=editData.colors_pallete_id
   
  }
  // console.log("colorarry",this.state.productDesc)

  }

  Categorydropdown = () => {
    var self = this;
    Axios({
      method: "GET",
      url: apiurl + "get_mas_sh_category",
      
    })
      .then((response) => {
        // console.log(response, "clinic");

        this.setState({ 
          CategoryList: response.data.data,
        },()=>this.SubCatdropdown()); 
      })
      .catch((error) => {
      });

    this.setState({});
  };

  
  SubCatdropdown = () => {
    var self = this;
    Axios({
      method: "POST",
      url: apiurl + "getShSubCategory",
      data:{
        "sh_category_id":this.state.CategoryId
      }
    })
      .then((response) => {
        // console.log(response, "SubCatdropdown");

        this.setState({ 
          SubCatList:response.data.data,
        }); 
      })
      .catch((error) => {
      });

    this.setState({});
  };
 
changeDynamic = (data, key) => {

  console.log("Data", data);
  console.log("key", key);
  if(key == "id") {
    this.setState({CategoryId:data},()=>this.SubCatdropdown());
  }
  if(key == "sh_sub_category_id") {
    this.setState({
      SubCatId:data,
      subCatIdErr:false
    });
  }

  this.setState({ [key]: data });
};



  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false ,displayColorPicker: false});
  };
  componentWillReceiveProps() {
    console.log("check", this.props.xswidth);
  }

  resetFormValue = () => {

    // alert("wow")
   
    this.state.filename = "";

    this.setState({
   
      filename : "",
    

    });
  };


handleSubmit = () => {
// alert("Inserting")
  let formdata = new FormData();

    formdata.set("sh_category_id", this.state.CategoryId);
    formdata.set("sh_subcategory_id", this.state.SubCatId);
    formdata.set("sh_product_name", this.state.productName);
    formdata.set("sh_mrp", this.state.productMrp);
    formdata.set("sh_price", this.state.productPrice);
    formdata.set("sh_product_description", this.state.productDesc);
    formdata.append("sh_filename", this.state.imagedata);    
    formdata.set("sh_is_active", this.state.checked === false ? 0 : 1);
    formdata.set("sh_product_code", this.state.productCode);
    formdata.set("sh_product_id", this.state.productId === null ? 0 : this.state.productId);
  
    formdata.set("sh_color_palette", this.state.background===true ?this.state.initalColor :this.state.background);
    formdata.set("sh_color", this.state.colorList);

    formdata.set("created_by", 1);
    formdata.set("created_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"));
    const isValid =this.validation()


    if (isValid){
      this.addProductDetails(formdata)
    }
    
}  
addProductDetails = (details) =>{
  alert("insertShProductInfo")
  var self=this;
  Axios({
    method:"POST",
    url: apiurl+'insertShProductInfo',
    data: details
  }).then((response) => {
    this.resetFormValue()
    // console.log("insertProductres",  response.data.data)
   
    // console.log(this.state.productId,"idcheck")
    if(response.data.status == "1") {
      this.props.getTableData()
    
      this.props.generateAlert("Product Added Successfully")
      self.setState({
        productId :response.data.data[0].product_id
      },()=>this.loadproductInfo())

 

    }
    else  if(response.data.status == "0") {
      this.props.generateAlert("Product Name already exists")
    }
   
  })
  // console.log(this.state.productId,"idrecieve")
}

submitHandle = () =>{
  // alert("Editing Content")
  let formdata = new FormData();

    formdata.set("sh_category_id", this.state.CategoryId);
    formdata.set("sh_subcategory_id", this.state.SubCatId);
    formdata.set("sh_product_name", this.state.productName);
    formdata.set("sh_mrp", this.state.productMrp);
    formdata.set("sh_price", this.state.productPrice);
    formdata.set("sh_product_description", this.state.productDesc);
    formdata.set("sh_is_active", this.state.checked === false ? 0 : 1);
    formdata.set("sh_product_code", this.state.productCode);
    formdata.set("product_id", this.state.productId );
  
    formdata.set("modified_by", 1);
    formdata.set("modified_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"));

    const isValid=this.validation()
    if(isValid){
      this.updateContent(formdata)
    }
}

updateContent =(details) =>{
  // alert("editShProductInfo")
  // console.log(details,"updatecontent")
  Axios({
    method:'PUT',
    url:apiurl + 'editShProductInfo',
    data:details
    
  }).then((response) => {
    //  console.log("insertproddetails",response)
     if(response.data.status == "1"){
      this.props.getTableData()    
      this.props.generateAlert("Product Detail Updated Successfully")
     }
  },()=>this.loadproductInfo())
  } 


addProductDetails = (details) =>{
  // alert("insertShProductInfo")
  var self=this;
  Axios({
    method:"POST",
    url: apiurl+'insertShProductInfo',
    data: details
  }).then((response) => {
    this.resetFormValue()
    // console.log("insertProductres",  response.data.data)
   
    // console.log(this.state.productId,"idcheck")
    if(response.data.status == "1") {
      this.props.getTableData()
    
      this.props.generateAlert("Product Added Successfully")
      self.setState({
        productId :response.data.data[0].product_id
      },()=>this.loadproductInfo())
    }
  })
}

loadproductInfo = () => {
  
  this.setState({ spinner: true });
  var self=this;
    Axios({
    method:'POST',
    url:apiurl + 'getShProductInfoById',
    data:{
      product_id: this.state.productId,
    }
  }).then((response) => {
    //  console.log("proddetails",response)
       this.setState({
          productInfo:response.data.data,
          productImages:response.data.data[0].product_image,
       })
  })
  self.setState({
      spinner:false,

  })
 
  }

  editCardContent =(details)=>{
    // console.log(details,"detailsvanthuru")
    // alert("editCardContent")
 
    this.setState({
      cardEdit:true,
      colorList:details.sh_color,
      filename : details.sh_filename,
      imagedata : details.sh_filename,
      imageProdId:details.sh_product_id,
      imageId:details.image_id,
      background: details.sh_color_palette,
    })

    // this.state.cardEdit=true
    // this.state.colorList=details.sh_color
    // this.state.filename=details.sh_filename
    // this.state.imagedata=details.sh_filename
    // this.state.imageProdId=details.sh_product_id
    // this.state.imageId=details.image_id
    // this.state.background=JSON.parse(details.sh_color_palette)


    // this.setState({})
   
    // console.log(this.state,"vaaadaa")
  }

editingCard =()=>{
// alert("Card Clicked")
//   console.log(this.state,"vanthuru")


    let formdata = new FormData();

   
    formdata.set("product_id",  this.state.imageProdId);
    formdata.set("image_id", this.state.imageId);
    formdata.set("sh_color", this.state.colorList);
    formdata.set("sh_color_palette", this.state.background);
    formdata.set("sh_filename", this.state.imagedata);

    !this.state.imageChanged && formdata.append('sh_filename', [])
    const isValid=this.validation()
    

    if(this.state.cardEdit==true && isValid){
      alert("insideIf")
      this.sendCardEdit(formdata)
    }
  }

  sendCardEdit = (details) =>{
   
// console.log(details,"detailcheckkk")
    // alert("editShProductImage")
    // console.log(details,"editShProductImage")
    Axios({
    method:'PUT',
    url:apiurl + 'editShProductImage',
    data:details
    
  }).then((response) => {
      // console.log("insertCarddetails",response)
      if(response.data.status == "1") {
        this.props.getTableData()
        this.props.generateAlert("Product Color & Image Updated")
      }
      else if(response.data.status == "0") {
          this.props.generateAlert("Product Color & Image Already Exists")
        }
      
  },()=>this.loadproductInfo())
  }

  deleteCard = (details) => {
  
    this.state.imageId=details.image_id
    this.state.productId=details.sh_product_id
    this.state.colorId=details.sh_product_colors_id

    console.log(details.image_id,"detailchkdel")

    var self = this;
    // alert(this.state.imageId)
    Axios({
      method: "DELETE",
      url: apiurl + "deleteShProductImage",
      data: {
        "product_id": this.state.productId,
        "sh_product_colors_id": this.state.colorId,
        "image_id": this.state.imageId
      },
    })
      .then((response) => {
        // console.log("deleteres", response);
        if(response.data.status== "1"){
          this.props.generateAlert("Color Based Product Deleted Successfully")
          this.loadproductInfo()
        }
        else {
          this.generateError(response.data.msg);
        }
        
      })
      .catch((err) => {
        //
      });
    }
    
  render() {
   
    // console.log("if",this.state)

    const styles = reactCSS({
    
      'default': {
        color: {
          width: '71px',
          height: "22px",
          borderRadius: "2px",
          background:`${this.state.background}`
        },   
        swatch: {
          height:'31px',
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    const {productDesc} = this.state;
    return (
      <div>
        <div
          className={`shop_manageproduct ${
            this.state.open === true && "d-none"
          }`}
        >
          <div className="dialog_main_main">
            {/* <div>
              <h4 className="product_title-shop">ADD PRODUCT </h4>
            </div> */}
            <div className="product_top_button">
              <div className="product_upload_cancel_div">
                <Button
                  className="product_upload_cancel"
                  onClick={() => this.props.closemodal()}
                >
                  Cancel
                </Button>
              </div>
              <div className="product_upload_submit_div">
                {
                   !this.props.edit ? 
                   <Button className="product_upload_submit"
                    onClick={() => this.props.closemodal(false)}
                    >Submit </Button> :
                    <Button className="product_upload_submit"
                    onClick={()=>this.submitHandle()}
                    >Update </Button>
                }
              </div>
            </div>
          </div>
          <Grid container>
            <Grid item xs={12} md={5} className="product_main_grid">
              <div className="product_section_grid">
                <div className="product_section_div">
                  <div style={{width:"100%"}}>
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

                  <div style={{width:"100%"}}>
                  <Labelbox
                    className="catge_sub"
                    type="select"
                    labelname={"Sub Category"}
                    valuelabel={"sh_subcategory"}
                    valuebind={"sh_sub_category_id"}
                    changeData={(data) => this.changeDynamic(data, "sh_sub_category_id")}
                    dropdown={this.state.SubCatList}
                    value={this.state.SubCatId}
                
                    />
                    <div className="validation__error_custom">{this.state.subCatIdErr && this.state.subCatIdErr}</div>

                  </div>

                </div>
                <div className="product_section_div">
                <div style={{width:"100%"}}>
                    
                    <Labelbox
                    type="text"
                    labelname="Product Code"
                    value={this.state.productCode}
                    changeData={(e) => this.storeValues(e,"productCode")}
                  />
                  <div className="validation__error_custom">{this.state.prodCodeErr && this.state.prodCodeErr}</div>

                  </div>

                  <div style={{width:"100%"}}>
                    
                    <Labelbox
                    type="text"
                    labelname="Product Name"
                    value={this.state.productName}
                    changeData={(e) => this.storeValues(e,"productName")}
                  />
                  <div className="validation__error_custom">{this.state.prodNameErr && this.state.prodNameErr}</div>

                  </div>

                </div>


                <div className="product_sec_price">
                  <div style={{ marginRight: "2px" }}>
                    <Labelbox
                    type="number"
                    labelname="MRP(KWD)"
                    value={this.state.productMrp}
                    changeData={(e) => this.storeValues(e,"productMrp")}
                  />
                  <div className="validation__error_custom">{this.state.prodMrpErr && this.state.prodMrpErr}</div>

                  </div>

                  <div style={{ marginRight: "2px" }}>
                
                    <Labelbox
                    type="number"
                    labelname="Price(KWD)"
                    value={this.state.productPrice}
                    changeData={(e) => this.storeValues(e,"productPrice")}
                  />
                  <div className="validation__error_custom">{this.state.prodPriceErr && this.state.prodPriceErr}</div>

                  </div>

                  <div className="checkbox__manproduct">
                  <lable className="labtxt">Active</lable>
                  <div className="check__contain">
                        <Checkbox checked={this.state.checked} onChange={this.detectChange}></Checkbox>
                   </div>      
                </div>  
                
                </div>
                <div style={{padding: "10px",fontSize:"13px"}}>
                  <div className="prod_descrip">Product Description</div>
                <CKEditor 
                className="description_text"
                editor={ClassicEditor}
                // data={productDesc}
                onChange={(e,editor) => this.handleOnChange(e,editor,"productDesc")}
                onInit={ editor => {
                  editor.setData(productDesc)
                     
                    } }/>
          
                 <div className="validation__error_desc">{this.state.prodDescErr }</div>
                </div>
              </div>
              {/* <div className="pane_split"></div> */}
            </Grid>

            <Grid item xs={12} md={7} className="product_main_section">
              <Grid container>
                <Grid item xs={12} md={12}>
                  <div className="product_sub_section">
                    <div className="product_section_2">
                   
                       <Labelbox
                        type="text"
                        labelname="Color"
                        value={this.state.colorList}
                        changeData={(e) => this.storeValues(e,"colorList")}
                      />
                    <div className="validation__error_color">{this.state.colorListErr && this.state.colorListErr}</div>
 
                    </div>


                    <div className="colorpalatte_wrap">
                    <label className="product_colorpalatte_label">
                          Color Palette
                        </label>
                        <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                  </div>
                  { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={this.state.background} onChange={ this.handleChangeComplete } />
                  </div> : null }   
                  <div className="validation__error_custom">{this.state.colorPickErr && this.state.colorPickErr}</div>

                  </div>


                
                  </div>
                </Grid>
               
                <div className="productupload_img">
             

                  <div style={{width:"83%"}}>
                <div className="product_img_div">
                  <label className="product_image_upload">Upload Product Image
                  </label>

                  <span>
                  <FiInfo
                      // src={Info}
                      className="info_icon"
                      onClick={this.handleOpen}
                    />
                  </span>
                </div>
                <div className="upload__container_advertise shoppe">
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

                    <div className="validation__error_desc">
                      {this.state.imageError && this.state.imageError}
                    </div>
              </div>

                  <div className="product_section_5">
                    {/* <Button className="add_button" onClick={() => this.handleSubmit()}>
                      Add
                    </Button> */}
                {
                   this.props.editOpenModal===true ? 
                   <Button className="product_upload_submit"
                    onClick={() => this.editingCard()}
                    >Add </Button> :
                    <Button className="product_upload_submit"
                    onClick={()=>this.handleSubmit()}
                    >Add </Button>
                }
                  </div>
              
                </div>
              </Grid>
              <Grid container className="conditional_grid">
              {this.state.productImages&&this.state.productImages.length>0 && this.state.productImages.map((productImages) =>{
                console.log(productImages)
            return(
         
              <Grid item  xs={6} md={3} className="" style={{margin: "20px"}}>
                <div className="up_img_div" >
                <IoIosCloseCircleOutline 
                className="deleteICON"
                onClick={()=> this.deleteCard(productImages)}
                />
                  
            <Card className="cardproduct_display " onClick={()=>this.editCardContent(productImages)} >
           
              <img src={productImages.sh_filename} className="package_images"/>
           
                     
                      </Card>
                      </div>
                </Grid>
              
            )
          })} 
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Modalcomp
          clrchange="text_color"
          title="Upload Instructions"
          visible={this.state.open}
          closemodal={this.handleClose}
        >
          <Upload_Product />
        </Modalcomp>
      </div>
      
    );
  }
}
