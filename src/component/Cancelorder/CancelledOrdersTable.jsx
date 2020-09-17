import React from "react";
import Tablecomponent from "../../helper/TableComponent/TableComp";
// import Modalcomp from "../../helpers/ModalComp/Modalcomp";

import "./CancelledOrdersTable.css";

export default class CancelledOrderTable extends React.Component {
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
            { id: "name", label: "Name" },
            { id: "phone_number", label: "Phone Number" },
            { id: "cancelled_date", label: "Cancelled Date" },
            { id: "time", label: "Time" },
          ]}
          rowdata={[
            this.createData({
              name: "Aamina",
              phone_number: "978940215",
              cancelled_date: "19 Sep 2019",
              time: "09:00 Am",
            }),
            this.createData({
              name: "Mohammed",
              phone_number: "836974255",
              cancelled_date: "19 Oct 2019",
              time: "09:15 Am",
            }),
            this.createData({
              name: "Abrar",
              phone_number: "897358487",
              cancelled_date: "9 Sep 2019",
              time: "09:30 Am",
            }),
            this.createData({
              name: "Uzair",
              phone_number: "789635871",
              cancelled_date: "19 Sep 2019",
              time: "09:50 Am",
            }),
          ]}
          tableicon_align={""}
          modelopen={(e) => this.modelopen(e)}
          actionclose="close"
          alignheading="cus_wid_trainer_head"
        />

        {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp>


        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}
      </div>
    );
  }
}
