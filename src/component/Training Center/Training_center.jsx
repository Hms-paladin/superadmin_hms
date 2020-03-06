import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import Dropdownantd from "../../formcomponent/dropdownantd";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import {apiurl} from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";
import { Spin,notification } from 'antd';

import "./Training_center.css";

const axios = require('axios');


export default class Training_center extends React.Component{

    state={
        openview:false,
        insertmodalopen:false,
        loading:true,
        props_loading:false,
        currentdata:[],
        trainining_cat_list:[],
        speciality:""
    }


    componentDidMount(){

        var self=this
      axios({
        method: 'post',
        url: `${apiurl}getTrainingList`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{
            // arrval.push(self.createData({name:value.groupname,id:value.id}))
            arrval.push({trainingName:value.trainingName,training_category:value.training_category,id:value.trainingId})
        })
        self.setState({
            currentdata:arrval,
            loading:false
        })
      })
      .catch(function (error) {
        console.log(error,"error");
      });
}


        modelopen=(data)=>{
            if(data==="view"){
                this.setState({openview:true})
            }
            else if(data==="edit"){
                this.setState({editopen:true})
            }
        }

        closemodal=()=>{
                this.setState({openview:false,editopen:false,insertmodalopen:false})
        }

        insertdata=()=>{


            var self=this
            axios({
              method: 'post',
              url: `${apiurl}getTrainingCategoryList`
            })
            .then(function (response) {
              var arrval=[]
              response.data.data.map((value)=>{
                  arrval.push({dropdown_val:value.trainingCatName,id:value.trainingCatId})
              })
              
              self.setState({
                  trainining_cat_list:arrval,
                  speciality:arrval[0].dropdown_val
      
              })
              console.log(response,"train_cat")
            })
            .catch(function (error) {
              console.log(error,"error");
            })


            this.setState({
                insertmodalopen:true,
                modeltype:"view"
            })
        }

        changeDynamic=(data)=>{
            alert(data)
            if(this.state.modeltype==="view"){
                this.setState({
                    speciality:data
                })
            }else{
                this.setState({
                    idnamedata:data
                })
            }
            
        }

    render(){
         
        return(
            <div>
               <div className="training_center_header">
                   <div className="training_center_title"><h3>TRAINING CENTER</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "trainingName", label: "Training" },
                    { id: "training_category", label: "Category" },
                    { id: "", label: "Action" }
                ]}
  

                rowdata={this.state.currentdata && this.state.currentdata}
                tableicon_align={""}
                modelopen={(e)=>this.modelopen(e)}
                EditIcon="close"
                alignheading="cus_wid_trainingcenter_head"
                props_loading={this.state.props_loading}
  />

        <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <h1>HIIIIIIIIIII</h1>
        </Modalcomp>


        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            
        </Modalcomp>

        <Modalcomp customwidth_dialog="training_center_modal" visible={this.state.insertmodalopen} title={"CREATE TRAINING CENTER"} closemodal={(e)=>this.closemodal(e)}
         xswidth={"xs"}>
             <Grid container spacing={2}>
                 <Grid item xs={12} md={6}>
            <div className="create_center">
            <div className="center_dropdown">
            
            <Dropdownantd defaultValue={6} label="Category" className="center_option" option={this.state.trainining_cat_list} 
            changeData={(data)=>this.changeDynamic(data)} 
            value={this.state.modeltype==="view"?this.state.speciality:this.state.idnamedata} 
            />

            {/* <Inputantd label="Speciality" className="spl_option" placeholder="" 
            changeData={(data)=>this.changeDynamic(data)} 
            value={this.state.modeltype==="view"?this.state.speciality:this.state.idnamedata} 
            /> */}
            </div>
            <Inputantd label="Training" className="center_option" placeholder="" />
            </div>
            </Grid>
            </Grid>
            <div className="center_button">
            <Button className="center_button_cancel" onClick={this.closemodal}>Cancel</Button>
            <Button className="center_button_create">Create</Button>
            </div>
            
        </Modalcomp>
              

            </div>
        )
    }
}

