import React from "react";
import Tablecomponent from "../../helper/TableComponent/TableComp";
import Modalcomp from "../../helper/Modalcomp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./DashboardTable.css";
import dateFormat from "dateformat";
import ProfileView from "./ProfileView";
const current_date = dateFormat(new Date(), "dd mmm yyyy");

class DashboardTable extends React.Component {
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
        <div className="shopping_dashboard_buttons_wrap">
          <Card
            component={NavLink}
            to="/Home/totalorders"
            className="shopping_button5 shopping_button_common_styles"
          >
            <p className="shopping_button_text">Total Order's</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="shopping_dash_numeric_wrap">
              <p className="shopping_dash_numeric_value">118</p>
            </div>
          </Card>
          <Card
            className="shopping_button1 shopping_button_common_styles"
            component={NavLink}
            to="/Home/productupload"
          >
            <p className="shopping_button_text">Manage Product</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="shopping_dash_numeric_wrap">
              <p className="shopping_dash_numeric_value">4</p>
            </div>
          </Card>
          <Card
            className="shopping_button3 shopping_button_common_styles"
            component={NavLink}
            to="/Home/cancelorders"
          >
            <p className="shopping_button_text">Total Cancelled</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="shopping_dash_numeric_wrap">
              <p className="shopping_dash_numeric_value">5</p>
            </div>
          </Card>
          <Card
            className="shopping_button2 shopping_button_common_styles"
            component={NavLink}
            to="/Home/revenue"
          >
            <p className="shopping_button_text">Total Revenue(KWD)</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="shopping_dash_numeric_wrap">
              <p className="shopping_dash_numeric_value">10050</p>
            </div>
          </Card>
        </div>
        <div className="today_orders">
          <span>Today's Order</span>
          <span className="current_date">{current_date}</span>
        </div>

        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "product", label: "Product" },
            { id: "quantity", label: "Quantity" },
            { id: "cost", label: "Cost(KWD)" },

            { id: "", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              customer: "Aamina",
              product: "Rolling Giraffe Cycle",
              quantity: "1",
              cost: "80",
            }),
            this.createData({
              customer: "Mohammed",
              product: "Suite",
              quantity: "1",
              cost: "80",
            }),
            this.createData({
              customer: "Abla",
              product: "Deluxe",
              quantity: "1",
              cost: "80",
            }),
          ]}
          tableicon_align={""}
          modelopen={(e) => this.modelopen(e)}
          EditIcon="close"
          DeleteIcon="close"
          Workflow="close"
          add="close"
        />
        <div className="shopdash_buttons_container">
          <div>
            {/* <Button
              component={NavLink}
              to="/Home/productupload"
              className="shopping_dash_bottom_buttons shopping_dash_bottom1"
            >
              Product Upload
            </Button> */}
            <Button
              className="shopping_dash_bottom_buttons shopping_dash_bottom2"
              component={NavLink}
              to="/Home/mediaupload"
            >
              Media Upload
            </Button>
            {/* <Button
              className="shopping_dash_bottom_buttons shopping_dash_bottom3"
              component={NavLink}
              to="/Home/advertise"
            >
              Advertisement Booking
            </Button> */}
          </div>
        </div>

        {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}
        <ProfileView open={this.state.openview} onClose={this.closemodal} />

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

export default DashboardTable;
