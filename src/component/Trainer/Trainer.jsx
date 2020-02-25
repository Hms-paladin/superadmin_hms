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


import "./Trainer.css";

export default class Trainer extends React.Component{

    state={
        openview:false,
        insertmodalopen:false
    }

    createData=(parameter) =>{
        var keys=Object.keys(parameter)
        var values=Object.values(parameter)
  
        var returnobj={}
        
        for(var i=0;i<keys.length;i++){
        returnobj[keys[i]]=values[i]
        }
        return(returnobj)
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
            this.setState({
                insertmodalopen:true
            })
        }


    render(){
         
        return(
            <div>
               <div className="trainer_header">
                   <div className="trainer_title"><h3>TRAINER</h3></div>
                   <img className="plus" onClick={this.insertdata} src={PlusIcon} />
               </div>
                <Tablecomponent heading={[
                    { id: "", label: "S.No" },
                    { id: "training", label: "Training" },
                    { id: "category", label: "Category" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={[
                this.createData({name: "Fitness", category:"Indoor"}),
                this.createData({name: "Tennis", category:"Indoor"}),
                this.createData({name: "Chess", category:"Outdoor"}),
                this.createData({name: "Karate", category:"Self Defense"})  
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    EditIcon="close"
    alignheading="cus_wid_trainer_head"
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

        <Modalcomp customwidth_dialog="trainer_modal" visible={this.state.insertmodalopen} title={"CREATE TRAINER"} closemodal={(e)=>this.closemodal(e)}
         xswidth={"xs"}>
             <Grid container spacing={2}>
                 <Grid item xs={12} md={6}>
            <div className="create_trainer">
            <div className="trainer_dropdown">
            <Dropdownantd label="Category" className="trainer_option" option={["Indoor", "Outdoor", "Self Defense"]} placeholder="Indoor" />
            </div>
            <Inputantd label="Training" className="trainer_option" placeholder="" />
            </div>
            </Grid>
            </Grid>
            <div className="trainer_button">
            <Button className="trainer_button_cancel" onClick={this.closemodal}>Cancel</Button>
            <Button className="trainer_button_create">Create</Button>
            </div>
            
        </Modalcomp>
              

            </div>
        )
    }
}

