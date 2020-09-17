import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import Yellow1 from '../../images/yellow1.png'
import Yellow2 from '../../images/yellow2.png'
import Yellow3 from '../../images/yellow3.png'
import Yellow4 from '../../images/yellow4.png'
import Yellow5 from '../../images/yellow5.png'
import Pink1 from '../../images/pink1.png'
import Pink2 from '../../images/pink2.png'
import Pink3 from '../../images/pink3.png'
import Pink4 from '../../images/pink4.png'
import Pink5 from '../../images/pink5.png'
import './View_Product.css'


export default class ViewProduct extends Component {
    render() {
        return (
        
            <Grid container spacing={5}>
               <Grid item xs={12} md={7} className="img_grid"> 
                <div className="product_img">
                       <div className="yellow">
                           <img src={Yellow1}  className="yellow1"/>
                           <img src={Yellow2} className="yellow2" />
                          <img src={Yellow3} className="yellow3" />
                           <img src={Yellow4} className="yellow4" />
                           <img src={Yellow5}className="yellow5"  />
                       </div>
  
                      <div className="pink">
                           <img src={Pink1} className="pink1" />
                           <img src={Pink2} className="pink2" />
                           <img src={Pink3} className="pink3" />
                           <img src={Pink4} className="pink4" />
                           <img src={Pink5} className="pink5" />
                       </div>
                </div> 
             </Grid>

                <Grid item xs={12} md={5}  className="content_grid" > 

                   <Grid container className="grid_item_one" >

                       <Grid item xs={6} md={6} >
                           <div className="product_content">
                               <h5 className="product_title">Catagory</h5></div>
                           
                           <div className="product_content">
                               <h5 className="product_title">Sub Catagory</h5></div>
                           
                           <div className="product_content">
                               <h5 className="product_title">Product</h5></div>
                           
                           <div className="product_content">
                               <h5 className="product_title">Price</h5></div>
                          
                           <div className="product_content">
                               <h5 className="product_title">Stock</h5></div>
                          
                          <div className="product_content">
                               <h5 className="product_title">Colors</h5></div>
                       </Grid>
                       
                     
                      
                       <Grid item item xs={6} md={6}>
                       <div className="product_content">
                               <h5 className="Product_para">Kids</h5></div>
                           
                           <div className="product_content">
                               <h5 className="Product_para">Toys</h5></div>
                           
                           <div className="product_content">
                               <h5 className="Product_para">Rolline Giraffe Cycle</h5></div>
                           
                           <div className="product_content">
                               <h5 className="Product_para">80 KWD</h5></div>
                          
                           <div className="product_content">
                               <h5 className="Product_para">12</h5></div>
                          
                          <div className="colorFlex">
                               <div className="square_pink"></div>
                               <div className="square_yellow"></div></div>
                       </Grid>
                   
                     
                  
                 
                   { /* <div className="Content product_content_base"> */}

               
                   
                   <Grid item> 
                    
                    <div><h4 className="product_description">Product Description</h4>
                       <p className="Product_para">
                           <ul className="description">
                               <li>Good quality stylish tricycle
                                   with looks of a sports bike Pedal drive action.</li>
                               <li>LED  lights and music buttons for nursery rhymes
                                   to keep your little entertained for hours</li>
                               <li>Rugged tread wheels for easy maneuvering wide
                                   wheel base provides stability,
                                   comfortable and curvy seat with strong space for toys</li>
                           </ul>
                       </p>
                   </div>
               </Grid>
                 
              
               </Grid>
           </Grid>
                    
        </Grid>    
           
       )
           
  }
  }






















      