import React from "react";
import Tablecomponent from "../../helper/ShopTableComponent/altTableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./Total_orders_table.css";
import dateFormat from "dateformat";
import OrderView from "./OrderView";
const current_date = dateFormat(new Date(), "dd mmm yyyy");

class Total_orders_table extends React.Component {
  state = {
    openview: false,
    showData:[]
  };

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  
  modelopen=(data,id)=>{
    
    if(data==="view"){
        this.setState({openview:true})
        console.log("sdfskdhfkjsdhfkjsdfh",this.props.viewData)
     
        this.setState({
          showData:this.props.viewData.find(val => val.id === id)
        },() => console.log("sdfkdsfkjshderjre",this.state.showData))
     
     
    }
  }
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  render() {
    console.log(this.props,"propscheck")
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "phone_number", label: "Phone Number" },
            { id: "booked_on", label: "Booked Date" },
            { id: "price", label: "Price (KWD)" },

            { id: "", label: "Action" },
          ]}
       
          rowdata={this.props.searchData }

          tableicon_align={"cell_eye"}
          modelopen={(e,id) => this.modelopen(e,id)}
          EditIcon="close"
          DeleteIcon="close"
          Workflow="close"
          add="close"
        />

     
        <OrderView
         open={this.state.openview}
         onClose={this.closemodal}
        showData={this.state.showData} 
        history={this.props.history} 

         />

        <Modalcomp
          visible={this.state.editopen}
          title={"EDIT DETAILS"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
    );
  }
}

export default Total_orders_table;
