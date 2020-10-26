import React from "react";
import Tablecomponent from "../../helper/ShopTableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import axios from "axios";
import { apiurl } from "../../App";
import dateformat from 'dateformat';

import "./RevenueDetails.css";

export default class RevenueDetails extends React.Component {
  state = {
        openview:false
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
    console.log(this.props,"propscheck")

    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "sno", label: "S.no" },
            { id: "bookeddate", label: "Booked Date" },

            { id: "customer", label: "Customer" },

            { id: "card", label: "Card" },
            { id: "wallet", label: "Wallet" },
            { id: "totalcharge", label: "Total Charge (KWD)" },
          ]}
          rowdata={this.props.searchData}

          tableicon_align={"cell_eye"}
          modelopen={(e) => this.modelopen(e)}
          VisibilityIcon="close"
          EditIcon="close"
          DeleteIcon="close"
          // grandtotal="total"
          Workflow="close"
          add="close"
          modeprop={true}

        />

        <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>

        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
    );
  }
}
