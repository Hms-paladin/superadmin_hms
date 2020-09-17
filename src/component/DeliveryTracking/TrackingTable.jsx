import React from "react";
import Tablecomponent from "../../helper/TableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./TrackingTable.css";
import crowngold from "../../images/crown-golden.png";
import dateFormat from "dateformat";
import Greenwalk from "../../images/greenwalk.png";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeliveryView from "./DeliveryView";
const current_date = dateFormat(new Date(), "dd mmm yyyy");
class DashboardTable extends React.Component {
  state = {
    openview: false,
    open: false,
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
    } else if (data === "workflow") {
      this.setState({ workflowopen: true });
    }
  };
  openmodal = () => {
    this.setState({ open: true });
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false, workflowopen: false });
  };
  iconclick = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "sno", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "product_name", label: "Product Name" },
            { id: "phone_number", label: "Phone Number" },
            { id: "status", label: "Status" },
            { id: "action", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              customer: "Amla",
              product_name: "Rollin-Giraffe Cycle",
              phone_number: "987654321",
              status: <span>Packed</span>,
              // action: (
              //   <span className="add_icon">
              //     <VisibilityIcon
              //       className="Delivery_icon"
              //       onClick={this.openmodal}
              //     />
              //   </span>
              // ),
            }),
            this.createData({
              customer: "Mohammed",
              product_name: "Rollin-Giraffe Cycle",
              phone_number: "321654987",
              status: <span style={{ color: "#2B97F2" }}> Delivered</span>,
              // action: (
              //   <span
              //     className="add_icon"
              //     onClick={() => this.iconclick("eye")}
              //   >
              //     <VisibilityIcon className="eye_view_icon" />
              //   </span>
              // ),
            }),
            this.createData({
              customer: "Asma",
              product_name: "Wollen Boot",
              phone_number: "147852369",
              status: <span>Packed</span>,
              // action: (
              //   <span className="add_icon">
              //     <VisibilityIcon className="Delivery_icon" />
              //   </span>
              // ),
            }),
          ]}
          tableicon_align={"cell_eye"}
          modelopen={(e) => this.modelopen(e)}
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          add="close"
          // Workflow="close"
        />

        {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}
        {/* <DeliveryView open={this.state.open} onClose={this.handleClose} xswidth={"xs"} /> */}
        {/* <PerscriptionModal open={this.state.open} onClose={this.handleClose}/> */}
        <Modalcomp
          visible={this.state.workflowopen}
          title={"DELIVERY TRACKING"}
          closemodal={this.closemodal}
          xswidth={"lg"}
          clrchange="text_color"
        >
          <DeliveryView closemodal={this.handleClose} />
        </Modalcomp>
      </div>
    );
  }
}

export default DashboardTable;
