import React from "react";
import Tablecomponent from "../../helper/TableComponent/TableComp";
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

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  render() {
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
          rowdata={[
            this.createData({
              customer: "Aamina",
              phone_number: "+965 22000001",
              booken_on: "11 Dec 2019",
              price: "80",
            }),
            this.createData({
              customer: "Mohammed",
              phone_number: "+965 22000671",
              booken_on: "11 Dec 2019",
              price: "80",
            }),
            this.createData({
              customer: "Abla",
              phone_number: "+965 22000981",
              booken_on: "11 Dec 2019",
              price: "40",
            }),
            this.createData({
              customer: "Zainab",
              phone_number: "+965 22000541",
              booken_on: "11 Dec 2019",
              price: "40",
            }),
            this.createData({
              customer: "Samrin",
              phone_number: "+965 22230003",
              booken_on: "11 Dec 2019",
              price: "80",
            }),
            this.createData({
              customer: "Rashid",
              phone_number: "+965 22780009",
              booken_on: "11 Dec 2019",
              price: "80",
            }),
            this.createData({
              customer: "Rashid",
              phone_number: "+965 22000066",
              booken_on: "11 Dec 2019",
              price: "80",
            }),
            this.createData({
              customer: "Rashid",
              phone_number: "+965 22000999",
              booken_on: "11 Dec 2019",
              price: "380",
            }),
          ]}
          tableicon_align={"cell_eye"}
          modelopen={(e) => this.modelopen(e)}
          EditIcon="close"
          DeleteIcon="close"
          Workflow="close"
          add="close"
        />

        {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}
        <OrderView open={this.state.openview} onClose={this.closemodal} />

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
