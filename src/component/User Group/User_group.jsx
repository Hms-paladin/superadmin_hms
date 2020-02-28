import React from "react";
import Tablecomponent from "../tablecomponent/tablecomp";
import Modalcomp from "../../helper/Modalcomp";
import PlusIcon from '../../images/plus.png';
import Button from '@material-ui/core/Button';
import Inputantd from "../../formcomponent/inputantd";
import {apiurl} from "../../../src/App.js";
import DeleteMedia from "../../helper/deletemodel";


import "./User_group.css";


const axios = require('axios');


export default class User_group extends React.Component{

    constructor(props){
        super(props)
        this.state={
            openview:false,
            insertmodalopen:false,
            currentdata:[],
            modeltype:"",
            create_group:"",
            iddata:"",
            idnamedata:"",
            deleteopen:false
        }
    }


    
    componentDidMount(){

        var self=this
      axios({
        method: 'get',
        url: `${apiurl}getGroup`
      })
      .then(function (response) {
        var arrval=[]
        response.data.data.map((value)=>{
            // arrval.push(self.createData({name:value.groupname,id:value.id}))
            arrval.push({name:value.groupname,id:value.id})
        })
        self.setState({
            currentdata:arrval
        })
      })
      .catch(function (error) {
        console.log(error,"error");
      });
}

    add_data=()=>{

        var self=this
        axios({
        method: 'post',
        url: `${apiurl}insertGroup`,
        data:{
            "groupname":this.state.create_group,
            "created_by":"1"
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
            method: 'put',
            url: `${apiurl}editGroup`,
            data:{
                "groupname":this.state.idnamedata,
                "modified_by":"1",
                "id":this.state.iddata
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


    deleterow=()=>{
        var self=this
        axios({
            method: 'delete',
            url: `${apiurl}deleteGroup`,
            data:{
                "id":this.state.iddata.toString(),
                "modified_by":"1"
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
            insertmodalopen:false
        })
    }

        recall=()=>{
            var self=this
              axios({
                method: 'get',
                url: `${apiurl}getGroup`
              })
              .then(function (response) {
                var arrval=[]
                response.data.data.map((value)=>{
                    // arrval.push(self.createData({name:value.groupname,id:value.id}))
                    arrval.push({name:value.groupname,id:value.id})
                })
                self.setState({
                    currentdata:arrval
                })
              console.log(arrval,"recall")

              })
              .catch(function (error) {
                console.log(error,"error");
              });
        }


        changeDynamic=(data)=>{
            if(this.state.modeltype==="view"){
                this.setState({
                    create_group:data
                })
            }else{
                this.setState({
                    idnamedata:data
                })
            }
            
        }

        deleteopen=(type,id)=>{
            this.setState({
                deleteopen:true,
                iddata:id
            })
        }

            
        modelopen=(data,id)=>{
            // if(data==="view"){
            //     this.setState({openview:true,modeltype:data})
            // }
            // else if(data==="edit"){
            //     this.setState({openview:true,modeltype:data})
            // }

            var iddata=this.state.currentdata.filter((value)=>
                value.id===id 
            )
            this.setState({insertmodalopen:true,modeltype:data,iddata:iddata[0].id,idnamedata:iddata[0].name})
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


        // createData=(parameter) =>{
        //     var keys=Object.keys(parameter)
        //     var values=Object.values(parameter)
          
        //     var returnobj={}
            
        //     for(var i=0;i<keys.length;i++){
        //     returnobj[keys[i]]=values[i]
        //     }
        //     console.log(returnobj,"returnobj")
        //     return(returnobj)
        //     }



    render(){
        console.log(this.state.iddata,"iddata")
         
        return(
            <div>
               <div className="user_group_header">
                   <div className="user_group_title"><h3>USER GROUP</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "name", label: "Group Name" },
                    { id: "", label: "Action" }
                ]}
            rowdata={this.state.currentdata && this.state.currentdata}
            tableicon_align={""}
            modelopen={(e,id)=>this.modelopen(e,id)}
            VisibilityIcon="close"
            alignheading="cus_wid_usergroup_head"
            endpoint="deleteGroup"
            deleteopen={this.deleteopen}
            
  />

        {/* <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            
        </Modalcomp> */}

        <Modalcomp className="user_group_modal" visible={this.state.insertmodalopen} title={this.state.modeltype==="view"?"ADD USER GROUP":"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
            <div className="create_group">
            <Inputantd label="Group Name" className="group_option" placeholder="" 
            changeData={(data)=>this.changeDynamic(data)} 
            value={this.state.modeltype==="view"?this.state.create_group:this.state.idnamedata} 
            />
            <div className="group_button">
            <Button className="group_button_cancel" onClick={this.closemodal}>Cancel</Button>
            {this.state.modeltype==="view"?
            <Button className="group_button_create" onClick={this.add_data}>Create</Button>:
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