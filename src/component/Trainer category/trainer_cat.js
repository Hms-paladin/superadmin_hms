import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import {apiurl} from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";


import "./trainer_cat.css";

const axios = require('axios');


export default class Training_cat extends React.Component{

    state={
        insertmodalopen:false,
        currentdata:[],
        idname:"",
        modeltype:"",
        cur_id:"",
        deleteopen:false,


    }


    componentDidMount(){

        var self=this
      axios({
        method: 'post',
        url: `${apiurl}getTrainerCategoryList`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{
            arrval.push({trainerCatName:value.trainerCatName,id:value.trainerCatId})
        })
        self.setState({
            currentdata:arrval
        })
        console.log(response,"train_cat")
      })
      .catch(function (error) {
        console.log(error,"error");
      });
}

recall=()=>{
    var self=this
      axios({
        method: 'post',
        url: `${apiurl}getTrainerCategoryList`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{
            arrval.push({trainerCatName:value.trainerCatName,id:value.trainerCatId})
        })
        self.setState({
            currentdata:arrval
        })
        console.log(response,"train_cat")
      })
      .catch(function (error) {
        console.log(error,"error");
      });
}

add_data=()=>{

    var self=this
    axios({
    method: 'post',
    url: `${apiurl}insertTrainerCategory`,
    data:{
        "trainerCatName":this.state.create_group,
        "createdBy":"1"
    },
    })
    .then(function (response) {
        console.log(response,"responsed");
        self.recall()
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
    var self=this
    axios({
        method: 'post',
        url: `${apiurl}updateTrainerCategory`,
        data:{
            "trainerCatName":this.state.idname,
            "updatedBy":"1",
            "trainerCatId":this.state.cur_id
        }
        })
        .then(function (response) {
            self.recall()
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
        this.setState({insertmodalopen:true,modeltype:data,idname:iddata[0].trainerCatName,cur_id:id})
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
            var self=this
            axios({
                method: 'post',
                url: `${apiurl}deleteTrainerCategory`,
                data:{
                    "updatedBy":"1",
	                "trainerCatId":this.state.cur_id.toString()
                }
            })
            .then(function (response) {
                console.log(response,"deleteres")
                self.recall()
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
               <div className="training_category_header">
                   <div className="training_category_title"><h3>TRAINER CATEGORY</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "trainerCatName", label: "Training Category" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={this.state.currentdata && this.state.currentdata}

            tableicon_align={""}
            modelopen={(e,id)=>this.modelopen(e,id)}
            VisibilityIcon="close"
            alignheading="cus_wid_trainingcategory_head"
            deleteopen={this.deleteopen}
        />


        <Modalcomp className="training_category_modal" visible={this.state.insertmodalopen} title={this.state.modeltype==="view"?"CREATE TRAINER CATEGORY":"EDIT TRAINER CATEGORY"} closemodal={(e)=>this.closemodal(e)}
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
              

            </div>
        )
    }
}

