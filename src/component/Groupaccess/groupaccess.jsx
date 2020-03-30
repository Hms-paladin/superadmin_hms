import React, { Component } from "react";
import { Collapse } from 'antd';
import PropTypes from "prop-types";
import { lighten, makeStyles, fade } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import { Icon, message, Popconfirm } from "antd";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Dropdownantd from "../../formcomponent/dropdownantd";
import Green_checkBox from "../../formcomponent/Green_checkBox" 
import {apiurl} from "../../../src/App.js";

import "./groupaccess.css"

const { Panel } = Collapse;
const axios = require('axios');


// function createData(
//     vendor,
//     revenue,
//     commission,
//     topay,
//     sevendays,
//     fifteen,
//     twentyonedays,
//     stwentyeightdays,
//     ltwentyeightdays

// ) {
//   return { vendor, revenue, commission, topay, sevendays, fifteen, twentyonedays,stwentyeightdays,ltwentyeightdays };
// }
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  console.log("sort", array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    console.log("order", order);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headrows = [
//   { id: "sno", label: "S.no" },
  { id: "vendor",           label: "Vendor"     },
  { id: "revenue",          label: "Revenue"    },
  { id: "commission",       label: "Commission" },
  { id: "topay",            label: "To pay"     },
  { id: "sevendays",        label: "<7days"     },
  { id: "fifteen",          label: "<15days"    },
  { id: "twentyonedays",    label: "<21days"    },
  { id: "stwentyeightdays", label: "<28days"    },
  { id: "ltwentyeightdays", label: ">28days"    },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {/* <TableRow>
        {headrows.map(row => (
          <TableCell
            key={headrows.id}
            align={headrows.numeric ? "right" : "left"}
            padding={headrows.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headrows.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow> */}

        <div className="group_heading_size">

        <div>{"Module Name"}</div>    
        <div>{"All"}</div>   
        <div>{"View"}</div>   
        <div>{"Add"}</div>   
        <div>{"Edit"}</div>   
        <div>{"Delete"}</div>   
        <div>{"Print"}</div>   

        </div>


    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};


const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });
  
  class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
      this.props.onChangePage(event, 0);
    };
  
    handleBackButtonClick = event => {
      this.props.onChangePage(event, this.props.page - 1);
    };
  
    handleNextButtonClick = event => {
      this.props.onChangePage(event, this.props.page + 1);
    };
  
    handleLastPageButtonClick = event => {
      this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
      );
    };
  
    render() {
      const { classes, count, page, rowsPerPage, theme } = this.props;
  
      return (
        
        <div className={classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
  }
  
  TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
  );

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  function handleChange(){
    // alert("hai")
  }

class Groupaccess extends Component {
  constructor(props) {
    super(props);
    function createData(
    name, all, view, add, edit, delete_chk, print

) {
  return { name, all, view, add, edit, delete_chk, print};
}


    this.state = {
      order: "",
      orderBy: "media_title",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      view: false,
      DeleteView:false,
      EditView:false,
      group:"",
      group_arr:[],
      rows:[],
      viewdata:"",
      type:"",
      title:"",
      rotateicon:true,
      conditionalrendering:false,
      // head_a:true,
      once_open:false,
    };
  }

  handleRequestSort = (event, property) => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState({ order: isDesc ? "asc" : "desc" });
    this.setState({ orderBy: property });
  };

  closemodal = () => {
    this.setState({ view: false,DeleteView:false });
  };
  handleClickOpen=(t,title)=>
  {
    console.log("type",t,title)
    this.setState({
      type:t,
      title
    })
    this.setState({view:true,DeleteView:false})
  
  }

  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected.push(this.state.selected, name);
    } else if (selectedIndex === 0) {
      // newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      // newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // newSelected = newSelected.concat(
      //   selected.slice(0, selectedIndex),
      //   selected.slice(selectedIndex + 1),
      // );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangerowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  handleChangeDense(event) {
    this.setState({ dense: event.target.checked });
  }
  componentWillMount() {
    //this.loadrows();
  }
  ViewDetails = data => {
    console.log("viewdata", data);
    this.setState({ viewmodal: true, viewdata: data });
  };
  DeleteData = data => {
    console.log("deletedata", data);
  };
  receiveapprovaldata = (data, data1) => {
    console.log("receiveapproval", data);
    console.log("data1", data1);
    if (data1 == 1) {
      this.setState({ viewmodal: false });
      message.success("Your Leave Approved");
      this.loadVendorDetails();
    } else if (data1 == 2) {
      this.setState({ viewmodal: false });
      message.success("Your Leave Rejected");
      this.loadVendorDetails();
    }
  };
  receivedocdelete = data => {
    console.log("receivedocdelete", data);
    if (data.status == 0) {
      this.setState({ viewmodal: false });
      message.success(data.msg);
      this.loadrows();
    }
  };
  sendapprovadata = data => {
    if (data.status == 0) {
      this.setState({ viewmodal: false });
      message.success(data.msg);
      this.loadrows();
    }
  };

  rotateicon=()=>{
      this.setState({
        rotateicon:!this.state.rotateicon
      })
  }
  changeDynamic=(data,setname)=>{
    this.setState({
        [setname]:data
    })

}

componentDidMount(){

  var self=this
axios({
  method: 'get',
  url: `${apiurl}getGroup`
})
.then(function (response) {
  var arrval=[]
  response.data.data.map((value)=>{
      arrval.push({dropdown_val:value.groupname,id:value.id})
  })
  self.setState({
    group:arrval[0].dropdown_val,
      group_arr:arrval,
      loading:false
  })
})
.catch(function (error) {
  console.log(error,"error");
});



var data1= [
  {
      "id": 1,
      "module_name": "Super Admin",
      "item": [
          {
              "id": null,
              "submodule_name": null,
              "item": [
                  {
                      "id": 2,
                      "screen_name": "Media Upload",
                      "allow_add": "Y",
                      "allow_edit": "Y",
                      "allow_delete": "Y",
                      "allow_view": "N",
                      "allow_print": "N"
                  }
              ]
          }
      ]
  }
]



var data3= [
  {
      "id": 6,
      "module_name": "Doctor",
      "item": [
          {
              "id": 7,
              "submodule_name": "sub_module1",
              "item": [
                  {
                      "id": 8,
                      "screen_name": " sub1_data1",
                      "allow_add": "Y",
                      "allow_edit": "Y",
                      "allow_delete": "Y",
                      "allow_view": "Y",
                      "allow_print": "Y"
                  },{
                    "id": 11,
                    "screen_name": "sub1_data2",
                    "allow_add": "Y",
                    "allow_edit": "Y",
                    "allow_delete": "Y",
                    "allow_view": "Y",
                    "allow_print": "Y"
                }
              ]
          },
          {
            "id": 9,
            "submodule_name": "sub_module2",
            "item": [
                {
                    "id": 10,
                    "screen_name": "sub2_data1",
                    "allow_add": "N",
                    "allow_edit": "Y",
                    "allow_delete": "Y",
                    "allow_view": "Y",
                    "allow_print": "N"
                },{
                  "id": 11,
                  "screen_name": "sub2_data2",
                  "allow_add": "Y",
                  "allow_edit": "Y",
                  "allow_delete": "Y",
                  "allow_view": "Y",
                  "allow_print": "N"
              }
            ]
        } 
      ]
  }
]




var data4=[
  {
      "id": 6,
      "module_name": "Doctor",
      "item": [
          {
              "id": 7,
              "submodule_name": "Doctor_Submodule_1",
              "item": [
		{

               "id": 8,
              "submodule_name": "Doctor1_Submodule_2",
              "item": [
                  {
                      "id": 0,
                      "screen_name": " img_Upload",
                      "allow_add": "Y",
                      "allow_edit": "Y",
                      "allow_delete": "Y",
                      "allow_view": "N",
                      "allow_print": "Y"
                  }
		]
		}
              ]
          },
          {
            "id": 9,
            "submodule_name": "Doctor2",
            "item": [
              {
                "id": 7,
                "submodule_name": "test",
                "item": [
                    {
                        "id": 8,
                        "screen_name": " img_Upload1",
                        "allow_add": "Y",
                        "allow_edit": "Y",
                        "allow_delete": "Y",
                        "allow_view": "Y",
                        "allow_print": "N"
                    },
                    ,{
                      "id": 11,
                      "screen_name": "img_Upload2",
                      "allow_add": "Y",
                      "allow_edit": "Y",
                      "allow_delete": "Y",
                      "allow_view": "Y",
                      "allow_print": "Y"
                  }
                ]
            }
            ]
        } ,

              {
                  "id": 4,
                  "submodule_name": "vid_Upload",
                  "item": [
                      {
                          "id": 5,
                          "screen_name": "vid_Upload1",
                          "allow_add": "Y",
                          "allow_edit": "Y",
                          "allow_delete": "N",
                          "allow_view": "Y",
                          "allow_print": "Y"
                      },{
                        "id": 11,
                        "screen_name": "vid_Upload2",
                        "allow_add": "Y",
                        "allow_edit": "Y",
                        "allow_delete": "Y",
                        "allow_view": "Y",
                        "allow_print": "Y"
                    }
                  ]
            }
        //   {
        //     "id": 9,
        //     "submodule_name": "Doctor3",
        //     "item": [
        //       {
        //         "id": 4,
        //         "submodule_name": null,
        //         "item": [
        //             {
        //                 "id": 5,
        //                 "screen_name": " img_Upload",
        //                 "allow_add": "Y",
        //                 "allow_edit": "Y",
        //                 "allow_delete": "Y",
        //                 "allow_view": "N",
        //                 "allow_print": "N"
        //             },{
        //               "id": 11,
        //               "screen_name": "vid_Upload2",
        //               "allow_add": "Y",
        //               "allow_edit": "Y",
        //               "allow_delete": "Y",
        //               "allow_view": "N",
        //               "allow_print": "N"
        //           }
        //         ]
        //     }
        //     ]
        // } 
   
      ]
  }
]

var data2= [
  {
      "id": 3,
      "module_name": "Doctor",
      "item": [
          {
              "id": 4,
              "submodule_name": null,
              "item": [
                  {
                      "id": 5,
                      "screen_name": " img_Upload",
                      "allow_add": "Y",
                      "allow_edit": "Y",
                      "allow_delete": "Y",
                      "allow_view": "Y",
                      "allow_print": "Y"
                  },
                  {
                    "id": 5,
                    "screen_name": " img_Upload",
                    "allow_add": "Y",
                    "allow_edit": "N",
                    "allow_delete": "Y",
                    "allow_view": "Y",
                    "allow_print": "Y"
                },
                {
                  "id": 5,
                  "screen_name": " img_Upload",
                  "allow_add": "N",
                  "allow_edit": "Y",
                  "allow_delete": "Y",
                  "allow_view": "Y",
                  "allow_print": "N"
              },
              {
                "id": 5,
                "screen_name": " img_Upload",
                "allow_add": "Y",
                "allow_edit": "Y",
                "allow_delete": "Y",
                "allow_view": "N",
                "allow_print": "Y"
            }
              ]
          }]
        }]


var stroe_table_arr=data4.map((val,index)=>{
  console.log(val,"firstval")
  console.log(this.state.head_a,"this.state.head_a")
  var head_all=val.item[0].item.map((ck_1)=>{
    // if(val.item[0].submodule_name===null){
      return([ck_1.allow_view==="Y",ck_1.allow_add==="Y",ck_1.allow_edit==="Y",ck_1.allow_delete==="Y",ck_1.allow_print==="Y"])
    // }
    })





    
    var head_all_concat=head_all

    if(head_all.length>1){
      var head_all_concat=[]

    for(let m=0;m<head_all.length;m++){
      head_all_concat.push(...head_all[m])
      
    }

    var head_view=[]
    var head_add=[]
    var head_edit=[]
    var head_delete=[]
    var head_print=[]


    for(let n=0;n<head_all.length;n++){
      head_view.push(head_all_concat[n*5])
      head_add.push(head_all_concat[n*5+1])
      head_edit.push(head_all_concat[n*5+2])
      head_delete.push(head_all_concat[n*5+3])
      head_print.push(head_all_concat[n*5+4])
    }


    }else{

      var head_view=[]
      var head_add=[]
      var head_edit=[]
      var head_delete=[]
      var head_print=[]
      
      var head_all_concat=head_all[0]
      head_view.push(head_all[0][0])
      head_add.push(head_all[0][1])
      head_edit.push(head_all[0][2])
      head_delete.push(head_all[0][3])
      head_print.push(head_all[0][4])
    }




    if(val.item[0].submodule_name!==null){
      var subdata_ch_arr=[]
      val.item.map((ck_sub,index)=>{
      subdata_ch_arr.push(ck_sub)        
      })

      var sub_data_arr=[]
      var inside_sub=[]

      for(let x=0;x<subdata_ch_arr.length;x++){
        sub_data_arr.push(...subdata_ch_arr[x].item)
      }
      console.log(sub_data_arr,"sub_data_arr")
      var head_all_concat=[]
      for(let y=0;y<sub_data_arr.length;y++){
      if(sub_data_arr[y].screen_name){
        head_all_concat.push(sub_data_arr[y].allow_view==="Y",sub_data_arr[y].allow_add==="Y",sub_data_arr[y].allow_edit==="Y",sub_data_arr[y].allow_delete==="Y",sub_data_arr[y].allow_print==="Y")
      }else if(sub_data_arr[y].item){
        console.log(sub_data_arr[y].item,"sub_data_arr[y].submodule_name")
        for(let z=0;z<sub_data_arr[y].item.length;z++){
          sub_data_arr[y].item[z]&& inside_sub.push(sub_data_arr[y].item[z])
        }

        for(let a=0;a<inside_sub.length;a++){
          head_all_concat.push(inside_sub[a].allow_view==="Y",inside_sub[a].allow_add==="Y",inside_sub[a].allow_edit==="Y",inside_sub[a].allow_delete==="Y",inside_sub[a].allow_print==="Y")

        }



      }
    }
    console.log(inside_sub,"inside_sub")

    console.log(head_all_concat,"head_all_concat")


      var head_view=[]
      var head_add=[]
      var head_edit=[]
      var head_delete=[]
      var head_print=[]
  
  
      for(let z=0;z<(head_all_concat.length/5);z++){
        head_view.push(head_all_concat[z*5])
        head_add.push(head_all_concat[z*5+1])
        head_edit.push(head_all_concat[z*5+2])
        head_delete.push(head_all_concat[z*5+3])
        head_print.push(head_all_concat[z*5+4])
      }

      console.log(head_all_concat,"head_all")
      console.log(head_view,"head_view")
      console.log(head_add,"head_add")
      console.log(head_edit,"head_edit")
      console.log(head_delete,"head_delete")
      console.log(head_print,"head_print")
        

    }

    // console.log(head_all_concat,"head_all_concat")



          return this.setobject(<div>
            <Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
              <Panel header={<div className="grp_expanse_firstdata">
              <div className="grp_firstdata_clr firstname_grpaccs module_name_top">{
                val.module_name}</div>   
                <div>{<Green_checkBox checked={head_all_concat.every((val)=>{return(val===true)})} change_checkbox={()=>this.change_checkbox("head_a",false)} value={this.state.head_a} />
                    }</div>          
                  <div>{
                    <Green_checkBox checked={head_view.every((val)=>{return(val===true)})} change_checkbox={()=>this.change_checkbox()} />
                    }
                  </div>         
                  <div>{
                    <Green_checkBox checked={head_add.every((val)=>{return(val===true)})} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>           
                  <div>{
                    <Green_checkBox checked={head_edit.every((val)=>{return(val===true)})} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>        
                  <div>{
                    <Green_checkBox checked={head_delete.every((val)=>{return(val===true)})} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>  
                  <div>{
                    <Green_checkBox checked={head_print.every((val)=>{return(val===true)})} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>  
              
              </div>} key="1">
                {val.item.map((first_item)=>{
        console.log(first_item,"first_item")
          if(first_item.submodule_name===null){

            return(first_item.item.map((first_item_insidedata,index)=>{
              console.log(first_item_insidedata.allow_add,"allow_add")
                  var alltrue_enable_row=[first_item_insidedata.allow_view==="Y",first_item_insidedata.allow_add==="Y",first_item_insidedata.allow_edit==="Y",first_item_insidedata.allow_delete==="Y",first_item_insidedata.allow_print==="Y"]

                  console.log(alltrue_enable_row.every((val)=>{return(val===true)}),"alltrue_enable_row")

                  return(
                    <p>
              <div className="grp_expanse_data">
              <div className="firstname_grpaccs sub_module_name_top">{first_item_insidedata.screen_name}</div>
              <div>{
                    <Green_checkBox checked={alltrue_enable_row.every((val)=>{return(val===true)})} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>   
                  <div>{
                    <Green_checkBox checked={first_item_insidedata.allow_view==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>      
                  <div>{
                    <Green_checkBox checked={first_item_insidedata.allow_add==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>           
                  <div>{
                    <Green_checkBox checked={first_item_insidedata.allow_edit==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>        
                  <div>{
                    <Green_checkBox checked={first_item_insidedata.allow_delete==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div> 
                  <div>{
                    <Green_checkBox checked={first_item_insidedata.allow_print==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div> 
              </div> 
              </p>
                  )
            }
            )
            )
            }else if(first_item.submodule_name){

              console.log(first_item.item,"submodule_first")

              return(<Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
              <Panel header={<div className="grp_expanse_firstdata">
              <div className="grp_firstdata_clr firstname_grpaccs module_name_top">{
                first_item.submodule_name}</div>   
                {/* <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>          
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>         
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>           
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>        
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>  
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>   */}
              
              </div>} key="1">

              {first_item.item.map((second_item)=>{
          if(second_item.screen_name){
            var second_module_row=[second_item.allow_view==="Y",second_item.allow_add==="Y",second_item.allow_edit==="Y",second_item.allow_delete==="Y",second_item.allow_print==="Y"].every((val)=>{return(val===true)})


                  return(
                    <p>
              <div className="grp_expanse_data">
              <div className="firstname_grpaccs sub_module_name_top">{second_item.screen_name}</div>
              <div>{
                    <Green_checkBox checked={second_module_row} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>   
                  <div>{
                    <Green_checkBox checked={second_item.allow_view==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>         
                  <div>{
                    <Green_checkBox checked={second_item.allow_add==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>           
                  <div>{
                    <Green_checkBox checked={second_item.allow_edit==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>        
                  <div>{
                    <Green_checkBox checked={second_item.allow_delete==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>  
                  <div>{
                    <Green_checkBox checked={second_item.allow_print==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>  
              </div> 
              </p>
                  )
            
            }
          else if(second_item.submodule_name){
              return(<Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
              <Panel header={<div className="grp_expanse_firstdata">
              <div className="grp_firstdata_clr firstname_grpaccs module_name_top">{
                second_item.submodule_name}</div>   
                {/* <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>          
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>         
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>           
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>        
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>  
                  <div>{
                    <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>   */}
              
              </div>} key="1">

              {second_item.item.map((third_item)=>{
        console.log(third_item,"third_item")
          if(third_item.screen_name){

            var third_module_row=[third_item.allow_view==="Y",third_item.allow_add==="Y",third_item.allow_edit==="Y",third_item.allow_delete==="Y",third_item.allow_print==="Y"].every((val)=>{return(val===true)})

        console.log(third_module_row,"third_module_row")
            


                  return(
                    <p>
              <div className="grp_expanse_data">
              <div className="firstname_grpaccs sub_module_name_top">{third_item.screen_name}</div>
              <div>{
                    <Green_checkBox checked={third_module_row} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>   
                  <div>{
                    <Green_checkBox checked={third_item.allow_view==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>      
                  <div>{
                    <Green_checkBox checked={third_item.allow_add==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>           
                  <div>{
                    <Green_checkBox checked={third_item.allow_edit==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div>        
                  <div>{
                    <Green_checkBox checked={third_item.allow_delete==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div> 
                  <div>{
                    <Green_checkBox checked={third_item.allow_print==="Y" && true} change_checkbox={()=>this.change_checkbox()} value={""}/>
                    }
                  </div> 
              </div> 
              </p>
                  )
            
            }
          // else if(third_item.submodule_name){
          //     return(<Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
          //     <Panel header={<div className="grp_expanse_firstdata">
          //     <div className="grp_firstdata_clr firstname_grpaccs">{
          //       third_item.submodule_name}</div>   
          //       <div>{
          //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
          //           }
          //         </div>          
          //         <div>{
          //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
          //           }
          //         </div>         
          //         <div>{
          //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
          //           }
          //         </div>           
          //         <div>{
          //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
          //           }
          //         </div>        
          //         <div>{
          //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
          //           }
          //         </div>  
          //         <div>{
          //           <Green_checkBox checked={""} change_checkbox={()=>this.change_checkbox()} value={""}/>
          //           }
          //         </div>  
              
          //     </div>} key="1">


          //       </Panel>
          //       </Collapse>
          //     )

          //   }
            })}


                </Panel>
                </Collapse>
              )

            }

                })}


                </Panel>
                </Collapse>
              )

            }

                })}
              </Panel>
              </Collapse>
          </div>
          )

})

console.log(stroe_table_arr,"stroe_table_arr")

this.setState({
rows:stroe_table_arr
})

}

change_checkbox=(name,val)=>{
  // alert(name)
  // alert(val)
  // var enable_val="y"
  // if(this.state[name]===true){
  //   enable_val="n"
  // }

  // alert(enable_val)


//  this.setState({
//    [name]:enable_val,
//    once_open:true
//  })
 
}

setobject=(name)=>{
  return name
}
  
check_recall=()=>{

 
}


  render() {
    const isSelected = name => this.state.selected.indexOf(name) !== -1;
    const { rows, rowsPerPage, page } = this.state;
    const { classes } = this.props;
console.log(rows[0],"rows")
//  if(this.state.once_open){
//   this.check_recall()
//   this.setState({
//     once_open:false
//   })
//  }




    return (
      <div className="VendorDetailsDiv grp_dropdown_tble">
         <div className="group_accessrights_header">
          <div className="group_accessrights_titleuser"><h3>GROUP ACCESS RIGHTS</h3></div>

          <div className="group_accessrights_dropdown">
          <h4>Group</h4>
          <Dropdownantd className="accessrights-option" breakclass="drop_down_br" option={this.state.group_arr} changeData={(data)=>this.changeDynamic(data,"Group")} 
          value={this.state.group} />
          </div>
          
          
          <div className="btn_group_acceess_flex">
          <Button className="accessrights_button_cancel">Cancel</Button>
          <Button className="accessrights_button_save">Save</Button></div>
          </div>
        <Paper className="paper">
          <div className="tableWrapper">
            <Table
              className="table"
              aria-labelledby="tableTitle"
              size={this.state.dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderBy}
                // onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={this.state.rows.length}
              />
              <TableBody>
                {stableSort(
                  this.state.rows,
                  getSorting(this.state.order, this.state.orderBy)
                )
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map((row, index, item) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    console.log("rendering", row);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, row.name)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}

                      >
                        <TableCell padding={'none'} colSpan={12} className="grp_dropdown_datahead">
                        <div>{row}</div> 
                          {/* {this.state.stroe_table_arr} */}
                        {/* <Collapse 
                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                        
                        >
                            <Panel header={<div className="grp_expanse_firstdata"><div className="grp_firstdata_clr firstname_grpaccs">
                                {row.name}</div>   
                        <div>{row.all}</div>          
                        <div>{row.view}</div>         
                        <div>{row.add}</div>           
                        <div>{row.edit}</div>        
                        <div>{row.delete_chk}</div>
                        <div>{row.print}</div>
                        </div>} key="1">

                        <Collapse 
                        expandIcon={({ isActive }) => <Icon type="caret-right" className="nested_iconclr" rotate={isActive ? 90 : 0} />}
                        
                        > 
                        <Panel header={
                          <div className="grp_expanse_nested">
                          <div className="firstname_grpaccs">{row.name}</div>   
                          <div>{row.all}</div>          
                          <div>{row.view}</div>         
                          <div>{row.add}</div>           
                          <div>{row.edit}</div>        
                          <div>{row.delete_chk}</div>
                          <div>{row.print}</div>       
                          </div>

                        } key="1">

                            <p >
                        

                        <div className="grp_expanse_data">
                        <div className="firstname_grpaccs">{row.name}</div>   
                        <div>{row.all}</div>          
                        <div>{row.view}</div>         
                        <div>{row.add}</div>           
                        <div>{row.edit}</div>        
                        <div>{row.delete_chk}</div>
                        <div>{row.print}</div>      
                        </div>

                        <div className="grp_expanse_data">
                        <div className="firstname_grpaccs">{row.name}</div>   
                        <div>{row.all}</div>          
                        <div>{row.view}</div>         
                        <div>{row.add}</div>           
                        <div>{row.edit}</div>        
                        <div>{row.delete_chk}</div>
                        <div>{row.print}</div>     
                        </div>
                        </p>
                        </Panel>
                      </Collapse>
                            </Panel>
                        </Collapse> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  component="div"
                  onChangePage={this.handleChangePage}
                  onChangerowsPerPage={this.handleChangerowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
        </Paper>
      </div>
    );
  }
}

export default Groupaccess;