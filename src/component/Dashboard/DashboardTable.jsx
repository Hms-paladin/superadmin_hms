import React from "react";
import Tablecomponent from "../../helper/ShopTableComponent/TableComp";
import Modalcomp from "../../helper/Modalcomp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./DashboardTable.css";
import dateFormat from "dateformat";
import dateformat from "dateformat";

import ProfileView from "./ProfileView";
import axios from "axios";
import { apiurl } from "../../App";
const current_date = dateFormat(new Date(), "dd mmm yyyy");


class DashboardTable extends React.Component {
  
 state = {
    date: "rrr",

    openview: false,
    tabledata: [],
    today_orders: [],
    viewData: [],
    showData:[],

    manage:'',
    total:'',
    // cancellation:'',
    total_revenue:''
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
        console.log("sdfskdhfkjsdhfkjsdfh",this.state.viewData)
     
        this.setState({
          showData:this.state.viewData.find(val => val.id === id)
        },() => console.log("sdfkdsfkjshderjre",this.state.showData))
     
     
    }
  }
  componentDidMount() {
   
  this.getTableData();
  }
  getTableData = (data) =>{
    this.setState({spinner:true})
    var self = this

    
    axios({
      method:"POST",
      url:apiurl + 'getShDashboard',
      data:{
        "search_date":dateFormat(new Date(),"yyyy-mm-dd")
        }
          
    })
    .then((res)=>{
      const CardData = res.data.data[0].dashboard_count;
      this.setState({
      
          total:CardData.total_orders,
        manage:CardData.product_count,
        // cancellation:CardData.cancel_count,
        totalrevenue:CardData.total_revenue,
     
    
    })
      
      
        console.log(res.data.data[0].dashboard_count,"response_order")
        console.log(this.state.cancellation,"cancellation")
       
        var todaysData=[];
        var viewData = [];
        
        res.data.data[0].today_transaction.map((val,index)=>{
          console.log(val,"valeded")
          todaysData.push({
            customer:val.customer,
            
            cost:val.price,
            id:val.order_id

            })
  
  viewData.push({
    customer:val.customer,
    product:val.product_name,
    address:val.delivery_address,
    
    profile_image:val.profile_image,
    bookeddate:dateformat(val.booked_date,"dd mmm yyyy"),
    cost:val.price,
    id:val.order_id
  })
  this.setState({
    todaysData:todaysData,
      viewData:viewData,
      tabledata:todaysData,
      props_loading: false,
      spinner:false,
     
  },() => console.log("viewdatacheck",this.state.todaysData))

})
           
      })
   
  }
  
 

 

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
              <p className="shopping_dash_numeric_value">{this.state.total}</p>
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
              <p className="shopping_dash_numeric_value">{this.state.manage}</p>
            </div>
          </Card>
          {/* <Card
            className="shopping_button3 shopping_button_common_styles"
            component={NavLink}
            to="/Home/cancelorders"
          >
            <p className="shopping_button_text">Total Cancelled</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="shopping_dash_numeric_wrap">
              <p className="shopping_dash_numeric_value">{this.state.cancellation}</p>
            </div>
          </Card> */}
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
              <p className="shopping_dash_numeric_value">{this.state.totalrevenue}</p>
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
            
            { id: "cost", label: "Cost(KWD)" },

            { id: "", label: "Action" },
          ]}
          rowdata={this.state.tabledata && this.state.tabledata}
        
          tableicon_align={"cell_eye"}
          modelopen={(e,id) => this.modelopen(e,id)}
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
        <ProfileView 
         open={this.state.openview}
         onClose={this.closemodal}
         showData={this.state.showData} 
         history={this.props.history} 
 
          />

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
