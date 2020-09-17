import React from "react";
import Tablecomponent from "../../helper/TableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./MediaUploadsTable.css";
import crowngold from "../../images/crown-golden.png";
import dateFormat from "dateformat";
import Greenwalk from "../../images/greenwalk.png";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import MediaUploadsModal from "./MediaUploadsModal";
import UploadMedia from "./UploadMedia";
import Ordericon from "../../images/order.svg";
import ViewMedia from "./ViewMedia";
const current_date = dateFormat(new Date(), "dd mmm yyyy");

class DashboardTable extends React.Component {
  state = {
    openview: false,
    workflow: false,
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
      this.setState({ workflow: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false, workflow: false });
  };

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "order", label: "Order" },
            { id: "", label: "S.No" },
            { id: "media_title", label: "Media Title" },
            { id: "media_type", label: "Media Type" },
            { id: "uploaded_on", label: "Uploaded On" },
            { id: "status", label: "Status" },
            { id: "", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              order: <img src={Ordericon} />,
              media_title: "Chiken Dinner",
              media_type: "Video",
              uploaded_on: "24 Aug 2019 10:00",
              status: "Active",
            }),
            this.createData({
              order: <img src={Ordericon} />,
              media_title: "Egg,Fries,Toast",
              media_type: "Image",
              uploaded_on: "2 Aug 2019 09:00",
              status: "Active",
            }),
            this.createData({
              order: <img src={Ordericon} />,
              media_title: "Chiken Dinner",
              media_type: "Video",
              uploaded_on: "20 Aug 2019 01:00",
              status: "Active",
            }),
            this.createData({
              order: <img src={Ordericon} />,
              media_title: "Vegetable Dinner",
              media_type: "Image",
              uploaded_on: "4 Aug 2019 10:10",
              status: "Inactive",
            }),
          ]}
          tableicon_align={"cell_eye"}
          modelopen={(e) => this.modelopen(e)}
          Workflow="close"
          add="close"

        />

        <Modalcomp
          clrchange="text_color"
          custommodalsize="media_viewmedia"
          visible={this.state.workflow}
          title={"VIEW MEDIA"}
          closemodal={(e) => this.closemodal(e)}

        >
          <ViewMedia />
        </Modalcomp>

        <Modalcomp
          clrchange="text_color"
          custommodalsize="media_newmedia"
          visible={this.state.editopen}
          title={"EDIT MEDIA UPLOADS"}
          closemodal={(e) => this.closemodal(e)}
        >
          <MediaUploadsModal />
        </Modalcomp>
      </div>
    );
  }
}

export default DashboardTable;
