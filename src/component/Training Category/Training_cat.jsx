import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import {apiurl} from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";
import { Spin,notification } from 'antd';


import "./Training_cat.css";

const axios = require('axios');


export default class Training_cat extends React.Component{

    state={
        insertmodalopen:false,
        currentdata:[],
        idname:"",
        modeltype:"",
        cur_id:"",
        deleteopen:false,
        loading:true,
        props_loading:false,

    }


    componentDidMount(){

        var self=this
      axios({
        method: 'post',
        url: `${apiurl}getTrainingCategoryList`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{
            arrval.push({trainingCatName:value.trainingCatName,id:value.trainingCatId})
        })
        self.setState({
            currentdata:arrval,
            loading:false

        })
        console.log(response,"train_cat")
      })
      .catch(function (error) {
        console.log(error,"error");
      });
}

        recall=(type,msgdyn)=>{
            var self=this
            axios({
                method: 'post',
                url: `${apiurl}getTrainingCategoryList`
            })
            .then(function (response) {
                var arrval=[]
                response.data.data.map((value)=>{
                    arrval.push({trainingCatName:value.trainingCatName,id:value.trainingCatId})
                })
                self.setState({
                    currentdata:arrval,
                    props_loading:false

                })
                notification[type]({
                    className:"show_frt",
                    message: "Record" +" "+msgdyn+" "+"sucessfully",
                });
                console.log(response,"train_cat")
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
            url: `${apiurl}insertTrainingCategory`,
            data:{
                "trainingCatName":this.state.create_group,
                "createdBy":"1"
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
                create_group:""
            })
        }


        update_data=()=>{
            this.setState({props_loading:true})

            var self=this
            axios({
                method: 'post',
                url: `${apiurl}updateTrainingCategory`,
                data:{
                    "trainingCatName":this.state.idname,
                    "updatedBy":"1",
                    "trainingCatId":this.state.cur_id
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
                this.setState({insertmodalopen:true,modeltype:data,idname:iddata[0].trainingCatName,cur_id:id})
            }

        }

        deleteopen=(type,id)=>{
            this.setState({
                deleteopen:true,
                cur_id:id
            })
        }



        closemodal=()=>{
                this.setState({insertmodalopen:false,deleteopen:false})
        }

        insertdata=()=>{
            this.setState({
                insertmodalopen:true,
                modeltype:"view"
            })
        }

        changeDynamic=(data)=>{
            if(this.state.modeltype==="view"){
                this.setState({
                    create_group:data
                })
            }else{
                this.setState({
                    idname:data
                })
            }
            
        }

        deleterow=()=>{
    this.setState({props_loading:true})

            var self=this
            axios({
                method: 'post',
                url: `${apiurl}deleteTrainingCategory`,
                data:{
                    "updatedBy":"1",
	                "trainingCatId":this.state.cur_id.toString()
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


    render(){
         
        return(
            <div>
                {this.state.loading?<Spin className="spinner_align" spinning={this.state.loading}></Spin>:
                <div>
               <div className="training_category_header">
                   <div className="training_category_title"><h3>TRAINING CATEGORY</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "trainingCatName", label: "Training Category" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={this.state.currentdata && this.state.currentdata}

            tableicon_align={""}
            modelopen={(e,id)=>this.modelopen(e,id)}
            VisibilityIcon="close"
            alignheading="cus_wid_trainingcategory_head"
            deleteopen={this.deleteopen}
            props_loading={this.state.props_loading}
        />


        <Modalcomp className="training_category_modal" visible={this.state.insertmodalopen} title={this.state.modeltype==="view"?"CREATE TRAINING CATEGORY":"EDIT TRAINING CATEGORY"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <div className="create_category">
            <Inputantd label="Category" className="category_option" placeholder="" 
            changeData={(data)=>this.changeDynamic(data)} 
            value={this.state.modeltype==="view"?this.state.create_group:this.state.idname}
            />
            <div className="category_button">
            <Button className="category_button_cancel" onClick={this.closemodal}>Cancel</Button>
            {this.state.modeltype==="view"?
            <Button className="category_button_create" onClick={this.add_data}>Create</Button>:
            <Button className="group_button_create" onClick={this.update_data}>Update</Button>
    }
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

