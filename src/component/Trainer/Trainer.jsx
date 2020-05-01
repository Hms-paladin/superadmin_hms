import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import Dropdownantd from "../../formcomponent/dropdownantd";
import Grid from '@material-ui/core/Grid';
import {apiurl} from "../../../src/App.js";
import { Spin,notification } from 'antd';
import DeleteMedia from "../../helper/deletemodel";


import "./Trainer.css";


const axios = require('axios');


var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti=dateFormat(now, "yyyy-mm-dd hh:MM:ss ")


export default class Trainer extends React.Component{

    state={
        openview:false,
        insertmodalopen:false,
        currentdata:[],
        props_loading:false,
        Trainer_cat:[],
        trainner_cat_select:"",
        trainner_name:"",
        edit_namedata_sel:"",
        edit_namedata_trainner:"",
        iddate:"",
        deleteopen:false,
        loading:true,
        errmsg: null,
    }

    componentDidMount(){

        var self=this

      axios({
        method: 'get',
        url: `${apiurl}get_mas_trainer`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{
            arrval.push({training:value.training,training_category:value.training_category,id:value.id})
        })
        self.setState({
            currentdata:arrval,
            trainner_cat_select:arrval[0].training_category,
            loading:false
        })
        console.log(response.data.data,"responsedata")
      })
      .catch(function (error) {
        console.log(error,"error");
      });
}

recall=(type,msgdyn)=>{
    var self=this

      axios({
        method: 'get',
        url: `${apiurl}get_mas_trainer`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{
            arrval.push({training:value.training,training_category:value.training_category,id:value.id})
        })
        self.setState({
            currentdata:arrval,
            trainner_cat_select:arrval[0].training_category,
            props_loading:false
        })
        notification[type]({
            className:"show_frt",
            message: "Record" +" "+msgdyn+" "+"sucessfully",
          });
      })
      .catch(function (error) {
        console.log(error,"error");
      });
}

add_data=()=>{
    if (this.state.trainner_name === "") {
        this.setState({
            errmsg: "Training is required"
        })
    } else {
    this.setState({props_loading:true})

    var self=this

    var cat_sel_id=this.state.trainner_cat_select

    if(this.state.trainner_cat_select===this.state.Trainer_cat[0].dropdown_val){
        var cat_sel_id=this.state.Trainer_cat[0].id

    }

    console.log(cat_sel_id,"cat_sel_id")
    axios({
        method: 'post',
        url: `${apiurl}insert_mas_trainer`,
        data:{
            "training": this.state.trainner_name,
            "trainer_trainingcategory_id": cat_sel_id,
            "active_flag": "1",
            "created_by": "1",
            "created_on": current_da_n_ti,
            "modified_by": "1",
            "modified_on": current_da_n_ti,
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
            trainner_name:"",
            trainner_cat_select:this.state.Trainer_cat[0].dropdown_val,

        })
    }
}



update_data=()=>{
    if (this.state.trainner_name === "") {
        this.setState({
            errmsg: "Training is required"
        })
    } else{
    this.setState({props_loading:true})

    var cat_sel_id=this.state.trainner_cat_select
    if(this.state.trainner_cat_select.length>2){
        this.state.Trainer_cat.filter((val)=>{
            if(val.dropdown_val===this.state.trainner_cat_select){
                return cat_sel_id=val.id
            }
        })
    
    }

    var self=this
    axios({
        method: 'put',
        url: `${apiurl}edit_mas_trainer`,
        data:{
            "id":this.state.iddata,
            "training": this.state.trainner_name,
            "trainer_trainingcategory_id": cat_sel_id,
            "active_flag": "1",
            "created_by": "1",
            "created_on": current_da_n_ti,
            "modified_by": "1",
            "modified_on": current_da_n_ti,
            }
        })
        .then(function (response) {

            self.recall("success","edited")
        })
        .catch(function (error) {
            console.log(error,"error");
        });
        this.setState({
            insertmodalopen:false,
            trainner_name:"",
            trainner_cat_select:this.state.Trainer_cat[0].dropdown_val,
        })
    }
}


deleterow=()=>{
    this.setState({props_loading:true})

    var self=this
    axios({
        method: 'delete',
        url: `${apiurl}deletemas_trainer`,
        data:{
            "id":this.state.iddata.toString(),
            "modified_by":"1"
        }
    })
    .then(function (response) {
        console.log(response,"deleteres")

        self.recall("info","deleted")
    })
    .catch(function (error) {
        console.log(error,"error");
    });
    this.setState({
        insertmodalopen:false,
        deleteopen:false
    })
}



    modelopen=(data,id)=>{
        if(data==="view"){
            this.setState({openview:true})
        }
        else if(data==="edit"){
            var self=this
            axios({
                method: 'post',
                url: `${apiurl}getTrainerCategoryList`
            })
            .then(function (response) {
                var arrval=[]
                response.data.data.map((value)=>{
                    arrval.push({dropdown_val:value.trainerCatName,id:value.trainerCatId})
                })
                self.setState({
                    Trainer_cat:arrval,
                })
            })


            var iddata=this.state.currentdata.filter((value)=>
            value.id===id 
        )
            this.setState({insertmodalopen:true,modeltype:data,iddata:iddata[0].id,trainner_name:iddata[0].training,
                trainner_cat_select:iddata[0].training_category,errmsg:null})

        }
    }

    closemodal=()=>{
            this.setState({openview:false,editopen:false,insertmodalopen:false,deleteopen:false})
    }

    insertdata=()=>{
        var self=this
    axios({
    method: 'post',
    url: `${apiurl}getTrainerCategoryList`
    })
    .then(function (response) {
    var arrval=[]
    response.data.data.map((value)=>{
        arrval.push({dropdown_val:value.trainerCatName,id:value.trainerCatId})
    })
    self.setState({
        Trainer_cat:arrval,
        trainner_cat_select:arrval[0].dropdown_val,
        loading:false

    })
    console.log(arrval,"Trainer_cat")
    })
    .catch(function (error) {
    console.log(error,"error");
    });
        this.setState({
            insertmodalopen:true,
            modeltype:"view",
            trainner_name:"",
        })
    }

    changeDynamic=(setname,data)=>{
            this.setState({
                [setname]:data,errmsg:null
            })
        
    }

    deleteopen=(type,id)=>{
        this.setState({
            deleteopen:true,
            iddata:id
        })
    }

    render(){
        var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[8]
        return(
            <div>
            {this.state.loading?<Spin className="spinner_align" spinning={this.state.loading}></Spin>:
            <div>
               <div className="trainer_header">
                   <div className="trainer_title"><h3>TRAINER</h3></div>
                   <img className={`plus ${useraccess && useraccess.allow_add==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add==="Y" && this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "training", label: "Training" },
                    { id: "category", label: "Category" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={this.state.currentdata && this.state.currentdata}

            tableicon_align={""}
            modelopen={(e,id)=>this.modelopen(e,id)}
            alignheading="cus_wid_trainer_head"
            props_loading={this.state.props_loading}
            VisibilityIcon="close"
            deleteopen={this.deleteopen}
            editpermission={useraccess && useraccess.allow_edit}
            deletepermission={useraccess && useraccess.allow_delete}
  />

        <Modalcomp customwidth_dialog="trainer_modal" visible={this.state.insertmodalopen} title={this.state.modeltype==="view"?"CREATE TRAINNER":"EDIT DETAILS"} closemodal={(e)=>this.closemodal(e)}
         xswidth={"xs"}>
             <Grid container spacing={2}>
                 <Grid item xs={12} md={6}>
            <div className="create_trainer">
            <div className="trainer_dropdown">

            <Dropdownantd label="Category" className="trainer_option" 
            option={this.state.Trainer_cat} 
            changeData={(data)=>this.changeDynamic("trainner_cat_select",data)} 
            value={this.state.trainner_cat_select} 
             />

            </div>
            <Inputantd label="Training" className="trainer_option" placeholder="" 
            changeData={(data)=>this.changeDynamic("trainner_name",data)} 
            value={this.state.trainner_name}
            autoFocus={true} 
            errmsg={this.state.errmsg}
            onPressEnter={this.state.modeltype === "edit" ?this.update_data:this.add_data}
            />
            </div>
            </Grid>
            </Grid>
            <div className="trainer_button">
            <Button className="trainer_button_cancel" onClick={this.closemodal}>Cancel</Button>
            {this.state.modeltype==="view"?
            <Button className="group_button_create" onClick={this.add_data}>Create</Button>:
            <Button className="group_button_create" onClick={this.update_data}>Update</Button>
    }
            </div>
            
        </Modalcomp>

        <Modalcomp  visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
                <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal}/> 
           </Modalcomp>
              

            </div>}
            </div>
        )
    }
}

