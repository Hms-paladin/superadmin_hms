import React from "react";
import Tablecomponent from "../../helper/TableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Checkbox from "@material-ui/core/Checkbox";
import AddCategory from "./AddCategory";

import "./ManageCatagoryTable.css";
import ManageCatagoryModal from "./ManageCatagoryModal";

export default class ManageCatagoryTable extends React.Component {
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
            { id: "catagory", label: "Category" },
            { id: "subcatagory", label: "Sub Category" },

            { id: "created_date", label: "Created Date" },
            { id: "active", label: "Active" },
            { id: "", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              catagory: "Kids",
              subcatagory: "Toys",
              created_date: "18 Sep 2019",
              active: <Checkbox />,
            }),
            this.createData({
              catagory: "Kids",
              subcatagory: "Toys",

              created_date: "18 Sep 2019",
              active: <Checkbox />,
            }),
            this.createData({
              catagory: "Kids",
              subcatagory: "Toys",

              created_date: "17 Sep 2019",
              active: <Checkbox />,
            }),
          ]}
          tableicon_align={"cell_eye"}
          modelopen={(e) => this.modelopen(e)}
          VisibilityIcon="close"
          Workflow="close"
          add="close"
        />

        <Modalcomp
          clrchange="text_color"
          visible={this.state.openview}
          title={"VIEW DETAILS"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>

        <Modalcomp
          clrchange="text_color"
          visible={this.state.editopen}
          title={"EDIT CATEGORY"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"md"}
        >
          <ManageCatagoryModal closemodal={(e) => this.closemodal(e)} />
        </Modalcomp>
      </div>
    );
  }
}
