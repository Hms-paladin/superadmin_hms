import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import './View_Product.css'
import Axios from "axios";
import { apiurl } from "../../App";
import { Spin, notification, Input } from "antd";
import Product_UploadModal from "./Product_UploadModal"


export default class ViewProduct extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        spinner: false,
        productInfo:[],
        productImages:[],
        productColor:[],
        productView:this.props.viewData,
        rgbaColor:"",
        colors:[]
        };
    
      }

componentWillMount (){
    this.getproductInfo()
    
      
}

    getproductInfo = () => {
        this.setState({ spinner: true });
        var self=this;
               Axios({
          method:'POST',
          url:apiurl + 'getShProductInfoById',
          data:{
              "product_id":this.state.productView.product_id
            }
        }).then((response) => {
           console.log("proddetails",response)
             this.setState({
                productInfo:response.data.data,
                productImages:response.data.data[0].product_image,
                productColor:response.data.data[0].colors_pallete_id,
             })
        })
        self.setState({
            spinner:false,

        })
       
        }
       
      


    render() {
            return (
            <Spin className="spinner_align" spinning={this.state.spinner}>
             
            <Grid container spacing={2}>
           {this.state.productImages&&this.state.productImages.length>0 && this.state.productImages.map((productImages) => {
                return(  
               <Grid item xs={12} md={7} className="img_grid"> 
                <div className="product_img">
                       <div className="yellow">
                           <img src={productImages.sh_filename}  className="imgsizing"/>
                        
                       </div>
                </div> 
             </Grid>
             )})}

              {this.state.productInfo&&this.state.productInfo.length>0 && this.state.productInfo.map((productInfo) => {
                  var desc={ __html:productInfo.sh_product_description}
                return(
                   
                <Grid item xs={12} md={5}  className="content_grid" > 
               
                   <Grid container className="grid_item_one" >
                 
       
                       <Grid item xs={6} md={6} >
                           <div className="product_content">
                               <h5 className="product_title">Category</h5></div>
                           
                           <div className="product_content">
                               <h5 className="product_title">Sub Category</h5></div>
                           
                               <div className="product_content">
                               <h5 className="product_title">Product Code</h5></div>

                           <div className="product_content">
                               <h5 className="product_title">Product</h5></div>
                           
                           <div className="product_content">
                               <h5 className="product_title">Status</h5></div>
                          
                           <div className="product_content">
                               <h5 className="product_title">MRP</h5></div>

                            <div className="product_content">
                               <h5 className="product_title">PRICE</h5></div>
                          
                          <div className="product_content">
                               <h5 className="product_title">Colors</h5></div>
                       </Grid>
                       
                     
           
                       <Grid item item xs={6} md={6}>
                       <div className="product_content">
                               <h5 className="Product_para">{productInfo.sh_category}</h5></div>
                           
                           <div className="product_content">
                               <h5 className="Product_para">{productInfo.sh_subcategory}</h5></div>
                           
                               <div className="product_content">
                               <h5 className="Product_para">{productInfo.sh_product_code}</h5></div>

                           <div className="product_content">
                               <h5 className="Product_para">{productInfo.sh_product_name}</h5></div>

                            <div className="product_content">
                               <h5 className="Product_para">{productInfo.sh_is_active == 1? "Active" :"Inactive"}</h5></div>

                            <div className="product_content">
                               <h5 className="Product_para">{productInfo.sh_mrp}</h5></div>
                           
                           <div className="product_content">
                               <h5 className="Product_para">{productInfo.sh_price}</h5></div>
                          
                      <div style={{display: "flex"}}>
                        {this.state.productColor&&this.state.productColor.length>0 && this.state.productColor.map((productColor) => {
                        console.log(productColor,"productColor")
                        return(
                            <div className="colorFlex">
                                <div style={{backgroundColor:`${productColor}`,height:"20px", width:"20px"}}/>
                             
                            </div>
                        )})}</div>
                       </Grid>
                   
                   <Grid item> 
                    
                    <div><h4 className="product_description">Product Description</h4>
                       <p className="Product_para">
                           <ul className="description">
                               <li dangerouslySetInnerHTML={desc} />
                           
                           </ul>
                       </p>
                   </div>
               </Grid>
              
                   
              
               </Grid>
            
           </Grid>
                   )})}    
        </Grid>    
      
        </Spin>
       )
           
  }
  }






















      