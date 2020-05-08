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


var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti=dateFormat(now, "yyyy-mm-dd hh:MM:ss ")


export default class Training_center extends React.Component{

    state={
        openview:false,
        insertmodalopen:false,
        loading:true,
        props_loading:false,
        currentdata:[],
        trainining_cat_list:[],
        speciality:"",
        nochange_speciality:"",
        errmsg: null,
    }


    componentDidMount(){

        var self=this
      axios({
        method: 'get',
        url: `${apiurl}getTrainingList`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{
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
            speciality:arrval[0].dropdown_val,
            nochange_speciality:arrval[0].dropdown_val

        })
      })
      .catch(function (error) {
        console.log(error,"error");
      })


      this.setState({
      })
}


add_data=()=>{
    if (this.state.training_name === "") {
        this.setState({
            errmsg: "Training is required"
        })
    } else {
    this.setState({props_loading:true})

    var self=this

    var trainingCatId=this.state.speciality

    this.state.trainining_cat_list.map((val)=>{
      if(this.state.speciality===val.dropdown_val){
         trainingCatId=val.id
      }
    })


    axios({
        method: 'post',
        url: `${apiurl}insertTraining`,
        data:{
                "trainingName":this.state.training_name,
                "trainingCatId":trainingCatId,
                "createdBy":current_da_n_ti
            }
        })
        .then(function (response) {
            self.recall("success","added")
        })
        .catch(function (error) {
            console.log(error,"error");
        });
        this.setState({
            insertmodalopen:false,
            training_name:"",
            speciality:this.state.nochange_speciality,

        })
    }
}



recall=(type,msgdyn)=>{
    var self=this
    axios({
      method: 'get',
      url: `${apiurl}getTrainingList`
    })
    .then(function (response) {
      var arrval=[]
      response.data.data.map((value)=>{
          arrval.push({trainingName:value.trainingName,training_category:value.training_category,id:value.trainingId})
      })
      self.setState({
          currentdata:arrval,
          loading:false,
          props_loading:false
      })
      notification[type]({
        className:"show_frt",
        message: "Record" +" "+msgdyn+" "+"successfully",
      });
    })
    .catch(function (error) {
      console.log(error,"error");
    });
}

update_data=()=>{
    if (this.state.training_name === "") {
        this.setState({
            errmsg: "Training is required"
        })
    } else {
    this.setState({props_loading:true})


    var upd_trainingCatId=this.state.speciality

    this.state.trainining_cat_list.map((val)=>{
      if(this.state.speciality===val.dropdown_val){
        upd_trainingCatId=val.id
      }
    })

        var self=this
        axios({
            method: 'put',
            url: `${apiurl}updateTraining`,
            data:
                {
                    "trainingName":this.state.training_name,
                    "trainingCatId":upd_trainingCatId,
                    "trainingId":this.state.cur_edit_id,
                    "modified_by":"1",

            }

            })
            .then(function (response) {
                self.recall("success","edited")

            })
            .catch(function (error) {
                console.log(error,"error");
            });
            this.setState({
                insertmodalopen:false
            })
        }
    }

    deleterow=()=>{
        this.setState({props_loading:true})

            var self=this
            axios({
                method: 'delete',
                url: `${apiurl}deleteTraining`,
                data:{
                    "trainingId":this.state.del_iddata,
                }
            })
            .then(function (response) {
                self.recall("info","deleted")

            })
            .catch(function (error) {
                console.log(error,"error");
            });
            this.setState({
                insertmodalopen:false
            })
        }


        modelopen=(data,id)=>{

            var setdata=this.state.currentdata.filter((set_data)=>{
                return id===set_data.id
            })

            this.setState({insertmodalopen:true,modeltype:data,cur_edit_id:id,speciality:setdata[0].training_category,training_name:setdata[0].trainingName,errmsg:null})
        }

        closemodal=()=>{
                this.setState({openview:false,editopen:false,insertmodalopen:false,deleteopen:false})
        }

        insertdata=()=>{

            this.setState({
                insertmodalopen:true,
                modeltype:"view",
                training_name:"",
            speciality:this.state.nochange_speciality,

            })

        }

        changeDynamic=(data,name)=>{

            this.setState({
                        [name]:data,
                        errmsg:null
                    })
        }

        deleteopen=(type,id)=>{
            this.setState({
                deleteopen:true,
                del_iddata:id
            })
        }

    render(){
        var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[2]
        console.log(useraccess,"props")

        return(
            <div>
                {this.state.loading?<Spin className="spinner_align" spinning={this.state.loading}></Spin>:
                <div>
               <div className="training_center_header">
                   <div className="training_center_title"><h3>TRAINING CENTER</h3></div>
                   <img className={`plus ${useraccess && useraccess.allow_add==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add==="Y" && this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "trainingName", label: "Training" },
                    { id: "training_category", label: "Category" },
                    { id: "", label: "Action" }
                ]}
  

                rowdata={this.state.currentdata && this.state.currentdata}
                tableicon_align={""}
                modelopen={(e,id)=>this.modelopen(e,id)}
                VisibilityIcon="close"
                alignheading="cus_wid_trainingcenter_head"
                props_loading={this.state.props_loading}
                deleteopen={this.deleteopen}
                editpermission={useraccess && useraccess.allow_edit}
                deletepermission={useraccess && useraccess.allow_delete}
  />


        <Modalcomp customwidth_dialog="training_center_modal" visible={this.state.insertmodalopen} 
        title={this.state.modeltype==="view"?"CREATE TRAINING CENTER":"EDIT TRAINING CENTER"}
         closemodal={(e)=>this.closemodal(e)}
         xswidth={"xs"}>
             <Grid container spacing={2}>
                 <Grid item xs={12} md={6}>
            <div className="create_center">
            <div className="center_dropdown">
            
            <Dropdownantd defaultValue={6} label="Category" className="center_option" option={this.state.trainining_cat_list} 
            changeData={(data)=>this.changeDynamic(data,"speciality")} 
            value={this.state.speciality} 
            />

            </div>
            <Inputantd label="Training" className="center_option" placeholder="" 
            changeData={(data)=>this.changeDynamic(data,"training_name")} 
            value={this.state.training_name}
            errmsg={this.state.errmsg}
            autoFocus={true}
            onPressEnter={this.state.modeltype === "edit" ?this.update_data:this.add_data}
            />
            </div>
            </Grid>
            </Grid>
            <div className="center_button">
            <Button className="center_button_cancel" onClick={this.closemodal}>Cancel</Button>
            {this.state.modeltype==="view"?
            <Button className="group_button_create" onClick={this.add_data}>Create</Button>:
            <Button className="group_button_create" onClick={this.update_data}>Update</Button>
    }
            </div>
            
        </Modalcomp>
        <Modalcomp  visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
                <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal}/> 
           </Modalcomp> 
           </div>
    }
              
            </div>
        )
    }
}



