import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import {apiurl} from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";
import { Spin,notification } from 'antd';


import "./Vendor_master.css";

const axios = require('axios');



var dateFormat = require('dateformat');
var now = new Date();
var current_da_n_ti=dateFormat(now, "yyyy-mm-dd hh:MM:ss ")

export default class Vendor_master extends React.Component{

    state={
        openview:false,
        insertmodalopen:false,
        currentdata:[],
        vendor:"",
        deleteopen:false,
        loading:true,
        props_loading:false,
    }


    componentDidMount(){

        var self=this
      axios({
        method: 'get',
        url: `${apiurl}get_mas_vendor_master`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{
            arrval.push({vendor:value.vendor,id:value.id})
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

    add_data=()=>{
        this.setState({props_loading:true})

        var self=this
        axios({
        method: 'post',
        url: `${apiurl}insert_mas_vendor_master`,
        data:{
            "vendor": this.state.vendor,
            "active_flag": "1",
            "created_by": "1",
            "created_on": current_da_n_ti,
            "modified_by": "1",
            "modified_on": current_da_n_ti
            },
        })
        .then(function (response) {
            console.log(response,"responsed");
            self.recall("success","added")
        })
        .catch(function (error) {
        console.log(error,"error");
        });

        this.setState({
            insertmodalopen:false,
            // create_group:""
        })
    }

    recall=(type,msgdyn)=>{
        var self=this
        axios({
            method: 'get',
            url: `${apiurl}get_mas_vendor_master`
        })
        .then(function (response) {
            var arrval=[]
            response.data.data.map((value)=>{
                arrval.push({vendor:value.vendor,id:value.id})
            })
            self.setState({
                currentdata:arrval,
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

    deleterow=()=>{
        this.setState({props_loading:true})

        var self=this
        axios({
            method: 'delete',
            url: `${apiurl}deletemas_vendor_master`,
            data:{
                "id":this.state.iddata.toString(),
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
            insertmodalopen:false
        })
    }

    deleteopen=(type,id)=>{
        this.setState({
            deleteopen:true,
            iddata:id
        })
    }

    changeDynamic=(data)=>{
        if(this.state.modeltype==="view"){
            this.setState({
                vendor:data
            })
        }else{
            this.setState({
                idnamedata:data
            })
        }
        
    }

    update_data=()=>{
        this.setState({props_loading:true})

        var self=this
        axios({
            method: 'put',
            url: `${apiurl}edit_mas_vendor_master`,
            data:{
                "id":this.state.iddata,
                "vendor": this.state.idnamedata,
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
                insertmodalopen:false
            })
    }

    modelopen=(data,id)=>{
        if(data==="view"){
            this.setState({insertmodalopen:true,modeltype:data})
        }
        else if(data==="edit"){
            var iddata=this.state.currentdata.filter((value)=>
            value.id===id 
        )
            this.setState({insertmodalopen:true,modeltype:data,iddata:iddata[0].id,idnamedata:iddata[0].vendor})
        }
    }


    closemodal=()=>{
            this.setState({openview:false,editopen:false,insertmodalopen:false,deleteopen:false})
    }

    insertdata=()=>{
        this.setState({
            insertmodalopen:true,
            modeltype:"view"
        })
    }


    render(){
        return(
            <div>
                {this.state.loading?<Spin className="spinner_align" spinning={this.state.loading}></Spin>:
                <div>
               <div className="vendor_master_header">
                   <div className="vendor_master_title"><h3>VENDOR MASTER</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "vendor", label: "Vendor" },
                    { id: "", label: "Action" }
                ]}

                rowdata={this.state.currentdata && this.state.currentdata}
                tableicon_align={""}
                modelopen={(e,id)=>this.modelopen(e,id)}
                VisibilityIcon="close"
                alignheading="cus_wid_vendor_head"
                deleteopen={this.deleteopen}
                props_loading={this.state.props_loading}

  />


        <Modalcomp className="vendor_master_modal" visible={this.state.insertmodalopen} title={this.state.modeltype==="view"?"CREATE VENDOR":"EDIT DETAILS"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <div className="create_master">
            <Inputantd label="Vendor Name" className="master_option" placeholder="" 
            changeData={(data)=>this.changeDynamic(data)} 
            value={this.state.modeltype==="view"?this.state.vendor:this.state.idnamedata} 
            />
            <div className="master_button">
            <Button className="master_button_cancel" onClick={this.closemodal}>Cancel</Button>
            {this.state.modeltype==="view"?
            <Button className="master_button_create" onClick={this.add_data}>Create</Button>:
            <Button className="group_button_create" onClick={this.update_data}>Update</Button>}
            </div>
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

