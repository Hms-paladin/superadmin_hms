import React from "react";
import Tablecomponent from "../../helper/TableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";

import "./RevenueDetails.css";

export default class RevenueDetails extends React.Component {
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
            { id: "sno", label: "S.no" },
            { id: "bookeddate", label: "Booked Date" },

            { id: "customer", label: "Customer" },

            { id: "Card", label: "Card" },
            { id: "wallet", label: "Wallet" },
            { id: "totalcharge", label: "Total Charge (KWD)" },
          ]}
          rowdata={[
            this.createData({
              bookeddate: "19 sep 2019",
              customer: "AAMINA",

              card: "1600",
              wallet: "200",
              totalcharge: "1800",
            }),
            this.createData({
              bookeddate: "19 sep 2019",

              customer: "MOHAMED",

              card: "200",
              wallet: "100",
              totalcharge: "300",
            }),
            this.createData({
              bookeddate: "19 sep 2019",

              customer: "MOHAMED",

              card: "200",
              wallet: "100",
              totalcharge: "300",
            }),
            this.createData({
              bookeddate: "19 sep 2019",

              customer: "MOHAMED",

              card: "200",
              wallet: "100",
              totalcharge: "300",
            }),
          ]}
          tableicon_align={"cell_eye"}
          modelopen={(e) => this.modelopen(e)}
          VisibilityIcon="close"
          EditIcon="close"
          DeleteIcon="close"
          grandtotal="total"
          Workflow="close"
          add="close"
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
