import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Labelbox from "../../helper/labelbox/labelbox";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import "./Product_UploadModal.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Upload } from "antd";
import { FiInfo } from "react-icons/fi";
import Pink from "../../images/pink1.png";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import UploadProduct from "./Upload_Product";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

import { Select } from "antd";
import { isThisSecond } from "date-fns/esm";

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
export default class Editproduct extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: false, 
      color: "", 
      colorlist: [], 
      product: "",

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
      imageChanged: false,
      imageUrl: "",
      imageName: "",
      imageError: "",
      hidefilelist: false,
      imagedata: [],
      fileUploadDatas:"",
      product: "",
      displayColorPicker: false,
      color: {
        r: '',
        g: '',
        b: '',
        a: '',
      },
      initalColor:{
        r: '',
        g: '',
        b: '',
        a: '',
      },
     };
  }
  handleChange = (event) => {
    this.setState({
      colorlist: this.event.target.value,
    });
  };

  componentWillMount () {
  const { editData,editOpenModal } = this.props;
  console.log("asdfjdshfjsdhfjksdhfjds",this.props)
  if ( editOpenModal === true) {
    // alert(editData.product_id)
    this.state.edit=true
    this.state.editId= editData.product_id
    this.state.CategoryId = editData.sh_category_id
    this.state.SubCatId = editData.sh_subcategoryid
    this.state.productCode = editData.sh_product_code
    this.state.productName = editData.sh_product_name
    this.state.productPrice = editData.sh_price
    this.state.productMrp = editData.sh_mrp
    this.state.checked = editData.sh_is_active
    // this.state.productDesc = editData.sh_product_description
    // const data = editor.getData(editData.sh_product_description)
    // this.state.productDesc=data

  }
  this.setState({})
  
}

// handleOnChange =(e,editor) => {
//   const { editData,editOpenModal } = this.props;

//   if(editOpenModal === true){
//     this.state.productDesc=editData.sh_product_description
//     const data =  editor.getData(this.state.productDesc)
//     this.setState({productDesc:data})
    

//   }
  // else {
  // const data = editor.getData()
 
  // this.setState({
  //   productDesc:data,
  //   prodDescErr:false
  // })
  // }
//   console.log("productDesc",this.state.productDesc)

// }

  // submitText = () => {
  //   var product = (
  //     <div className="product_addlist_div">
  //       <Card className="product_addlist">
  //         <div className="product_ad_list">
  //           <div>
  //             {this.state.fileUploadDatas.map((obj) => {
  //               return (
  //                 <img
  //                   src={Pink}
  //                   style={{ height: 100, width: 100, marginLeft: "25px" }}
  //                 />
  //               );
  //             })}
  //           </div>
  //           <div>
  //             <label className="product_addlist_lab">
  //               {this.state.colorlist}
  //             </label>
  //           </div>
  //         </div>
  //       </Card>
  //     </div>
  //   );
  //   var arrval = [];

  //   arrval.push(...this.state.product, product);

  //   this.setState({
  //     product: arrval,
  //   });
  


  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentWillReceiveProps() {
    console.log("check", this.props.xswidth);
  }
  changeupload = (data) => {
    console.log("uploadedData", data);
    this.setState({ fileUploadDatas: data.fileList });
  };

  render() {
    console.log("propswidth", this.props.xswidth);
    const {
      classes,
      onClose,
      cancel,
      selectedValue,
      xswidth,
      ...other
    } = this.props;
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: false,
    };
    const color = (
      <div
        style={{
          backgroundColor: "#FC478A",
          width: "50px",
          height: "20px",
          marginTop: "5px",
        }}
      />
    );
    return (
      <div></div>
      // <div>
      
      //     <div className="dialog_main_main">
      //       <div>
      //         <h4 className="product_title-shop">EDIT PRODUCT </h4>
      //       </div>
      //       <div className="product_top_button">
      //         <div className="product_upload_cancel_div">
      //           <Button
      //             className="product_upload_cancel"
      //             onClick={() => this.props.closemodal()}
      //           >
      //             Cancel
      //           </Button>
      //         </div>
      //         <div className="product_upload_submit_div">
      //           <Button className="product_upload_submit">Submit</Button>
      //         </div>
      //       </div>
      //     </div>
      //     <Grid container>
      //       <Grid item xs={12} md={4} className="product_main_grid">
      //         <div className="product_section_grid">
      //           <div className="product_section_div">
      //           <div style={{width:"100%"}}>
      //             <Labelbox
      //               className="catge_sub"
      //               type="select"
      //               labelname={"Category"}
      //               valuelabel={"sh_category"}
      //               valuebind={"id"}
      //               changeData={(data) => this.changeDynamic(data, "id")}
      //               dropdown={this.state.CategoryList}
      //               value={this.state.CategoryId}
                
      //               />
      //             </div>

      //             <div style={{width:"100%"}}>
      //             <Labelbox
      //               className="catge_sub"
      //               type="select"
      //               labelname={"Sub Category"}
      //               valuelabel={"sh_subcategory"}
      //               valuebind={"sh_sub_category_id"}
      //               changeData={(data) => this.changeDynamic(data, "sh_sub_category_id")}
      //               dropdown={this.state.SubCatList}
      //               value={this.state.SubCatId}
                
      //               />
      //               {/* <div className="validation__error_custom">{this.state.subCatIdErr && this.state.subCatIdErr}</div> */}

      //             </div>
      //           </div>
      //           <div className="product_section_div">
      //           <div style={{width:"100%"}}>
                    
      //               <Labelbox
      //               type="text"
      //               labelname="Product Code"
      //               value={this.state.productCode}
      //               changeData={(e) => this.storeValues(e,"productCode")}
      //             />
      //             {/* <div className="validation__error_custom">{this.state.prodCodeErr && this.state.prodCodeErr}</div> */}

      //             </div>

                
      //             <div style={{width:"100%"}}>
                    
      //               <Labelbox
      //               type="text"
      //               labelname="Product Name"
      //               value={this.state.productName}
      //               changeData={(e) => this.storeValues(e,"productName")}
      //             />
      //             {/* <div className="validation__error_custom">{this.state.prodNameErr && this.state.prodNameErr}</div> */}

      //             </div>

      //           </div>


      //           <div className="product_sec_price">
      //           <div style={{ marginRight: "2px" }}>
      //               <Labelbox
      //               type="number"
      //               labelname="MRP(KWD)"
      //               value={this.state.productMrp}
      //               changeData={(e) => this.storeValues(e,"productMrp")}
      //             />
      //             {/* <div className="validation__error_custom">{this.state.prodMrpErr && this.state.prodMrpErr}</div> */}

      //             </div>

      //             <div style={{ marginRight: "2px" }}>
                
      //           <Labelbox
      //           type="number"
      //           labelname="Price(KWD)"
      //           value={this.state.productPrice}
      //           changeData={(e) => this.storeValues(e,"productPrice")}
      //         />
      //         {/* <div className="validation__error_custom">{this.state.prodPriceErr && this.state.prodPriceErr}</div> */}

      //         </div>

      //         <div className="checkbox__manproduct">
      //             <lable className="labtxt">Active</lable>
      //             <div className="check__contain">
      //                   <Checkbox checked={this.state.checked} onChange={this.detectChange}></Checkbox>
      //              </div>      
      //           </div>  

      //           </div>
      //           <div style={{padding: "10px"}}>
      //             <div className="prod_descrip">Product Description</div>
      //           <CKEditor 
      //           className="description_text"
      //           editor={ClassicEditor}
      //           onChange={(e,editor) => this.handleOnChange(e,editor,"productDesc")}/>
                 
          
      //            {/* <div className="validation__error_desc">{this.state.prodDescErr }</div> */}
      //           </div>
      //         </div>
      //       </Grid>

      //       <Grid item xs={12} md={8} className="product_main_section">
      //         <Grid container>
      //           <Grid item xs={12} md={12}>
      //             <div className="product_sub_section">
      //               <div className="product_section_2">
      //                 <Labelbox
      //                   type="text"
      //                   value={this.state.colorlist}
      //                   changeData={(colorlist) => this.setState({ colorlist })}
      //                   labelname="Color"
      //                 />
      //               </div>

      //               <div className="product_section_3">
      //                 <div>
      //                   <label className="product_colorpalatte_label">
      //                     Color Palette{" "}
      //                   </label>
      //                 </div>
      //                 <Select
      //                   className="shop_colorpalatte_toggledropdown"
      //                   defaultValue={color}
      //                   style={{ width: "100px" }}
      //                   onChange={handleChange}
      //                 >
      //                   <Option
      //                     className="shop_colorpalatte_toggledropdown"
      //                     value="option 1"
      //                   >
      //                     <div
      //                       style={{
      //                         backgroundColor: "#FC478A",
      //                         width: "50px",
      //                         height: "20px",
      //                         marginTop: "5px",
      //                       }}
      //                     />
      //                   </Option>
      //                   <Option
      //                     className="shop_colorpalatte_toggledropdown"
      //                     value="option 2"
      //                   >
      //                     <div
      //                       style={{
      //                         backgroundColor: "#F6BE3E",
      //                         width: "50px",
      //                         height: "20px",
      //                         marginTop: "5px",
      //                       }}
      //                     />
      //                   </Option>
      //                   <Option
      //                     className="shop_colorpalatte_toggledropdown"
      //                     value="option 3"
      //                   >
      //                     <div
      //                       style={{
      //                         backgroundColor: "#2FD1F2",
      //                         width: "50px",
      //                         height: "20px",
      //                         marginTop: "5px",
      //                       }}
      //                     />
      //                   </Option>
      //                 </Select>
      //               </div>

      //               {/* <div className="product_section_4">
      //                 <Labelbox
      //                   type="number"
      //                   placeholder="5"
      //                   name="Quantity"
      //                   labelname="Qty"
      //                 />
      //               </div> */}
      //             </div>
      //           </Grid>
      //           <div style={{ display: "flex", padding: "20px" }}>
      //             <div className="product_section_1">
      //               <label className="upload_label">Upload Product Image</label>
      //               <Upload
      //                 renderUploadList={(data) =>
      //                   console.log("newdatalist", data)
      //                 }
      //                 multiple={true}
      //                 onChange={this.changeupload}
      //                 className="browse_files"
      //               >
      //                 <div className="span_header_shop">
      //                   {/* <div className="span_section_div">My image.jpg </div> */}
      //                   <div className="span_section_subdiv">
      //                     <Button className="button_browse">Browse</Button>
      //                   </div>
      //                 </div>
      //               </Upload>
      //             </div>

      //             <div className="product_section_5">
      //               <Button className="add_button" >
      //                 Add
      //               </Button>
      //             </div>
      //           </div>
      //         </Grid>
      //         <Grid container className="conditional_grid">
      //           ` {this.state.product}`
      //         </Grid>
      //       </Grid>
      //     </Grid>
      
      // </div>
     
    );
  }
}
