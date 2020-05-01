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
        errmsg: null,
        category:"",
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
            if (this.state.category === "") {
                this.setState({
                    errmsg: "Category is required"
                })
            } else {
            this.setState({props_loading:true})

            var self=this
            axios({
            method: 'post',
            url: `${apiurl}insertTrainingCategory`,
            data:{
                "trainingCatName":this.state.category,
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
                category:""
            })
        }
        }


        update_data=()=>{
            if (this.state.idname === "") {
                this.setState({
                    errmsg: "Category is required"
                })
            } else{
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
        }


        modelopen=(data,id)=>{
            if(data==="view"){
                this.setState({insertmodalopen:true,modeltype:data})
            }
            else if(data==="edit"){
                var iddata=this.state.currentdata.filter((value)=>
                value.id===id 
            )
                this.setState({insertmodalopen:true,modeltype:data,idname:iddata[0].trainingCatName,cur_id:id,errmsg:null})
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
                    category:data,
                    errmsg:null
                })
            }else{
                this.setState({
                    idname:data,
                    errmsg:null
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
        var useraccess=this.props.uservalue && this.props.uservalue[0].item[0].item[9]
        return(
            <div>
                {this.state.loading?<Spin className="spinner_align" spinning={this.state.loading}></Spin>:
                <div>
               <div className="training_category_header">
                   <div className="training_category_title"><h3>TRAINING CATEGORY</h3></div>
                   <img className={`plus ${useraccess && useraccess.allow_add==="N" && "disablebtn"}`} onClick={useraccess && useraccess.allow_add==="Y" && this.insertdata} src={PlusIcon} />
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
            editpermission={useraccess && useraccess.allow_edit}
            deletepermission={useraccess && useraccess.allow_delete}
        />


        <Modalcomp className="training_category_modal" visible={this.state.insertmodalopen} title={this.state.modeltype==="view"?"CREATE TRAINING CATEGORY":"EDIT TRAINING CATEGORY"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <div className="create_category">
            <Inputantd label="Category" className="category_option" placeholder="" 
            changeData={(data)=>this.changeDynamic(data)} 
            value={this.state.modeltype==="view"?this.state.category:this.state.idname}
            autoFocus={true} 
            errmsg={this.state.errmsg}
            onPressEnter={this.state.modeltype === "edit" ?this.update_data:this.add_data}
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

