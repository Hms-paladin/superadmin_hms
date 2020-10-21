import React, { Component } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { lighten, makeStyles, fade } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Preorderlist from "./Preorderlist";
import { Icon, message, Popconfirm } from "antd";
import "./Preorder_table.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Tablecomponent from "../../helper/ShopTableComponent/TableComp";
import Modalcomp from "../../helper/ModalComp/ModalComp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import dateFormat from "dateformat";
import Editorder from "./Editorder";
import axios from "axios";
import { apiurl } from "../../App";

class Preorder_table extends React.Component {
  state = {
    date: "rrr",

    openview: false,
    tabledata: [],
    preorderdata: [],
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
  componentDidMount() {
   
    this.getTableData();
    }
    getTableData = (data) =>{
      this.setState({spinner:true})
      var self = this
  
      
      axios({
        method:"GET",
        url:apiurl + 'getPreOrders',
        data:{
          }
            
      })
      .then((res)=>{
       
          var preorderdata=[];
             console.log(res,"res")
          res.data.data.map((val,index)=>{
            console.log(val,"valeded")
            preorderdata.push({
              product_name:val.sh_product_name,
              
              expected_date:val.expected_date,
              expected_quantity:val.expected_quantity,
              booked:val.booked,
              id:val.product_id
  
              })
    
  
    this.setState({
      preorderdata:preorderdata,
        tabledata:preorderdata,
        props_loading: false,
        spinner:false,
       
    },() => console.log("viewdatacheck",this.state.preorderdata))
  
  })
             
        })
     
    }
    
   
  
   
  
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "product_name", label: "Product Name" },
            { id: "expected_date", label: "Expected Date" },
            { id: "expected_quantity", label: "Expected Qty" },
            { id: "booked", label: "Booked" },

            { id: "", label: "Action" },
          ]}
          rowdata={this.state.tabledata && this.state.tabledata}
          tableicon_align={"cell_eye"}
          modelopen={(e) => this.modelopen(e)}
          Workflow="close"
          // EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          EditIcon="close"
        />

        {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
      xswidth={"xs"}
      >
      </Modalcomp> */}
        {/* <StockView open={this.state.openview} onClose={this.closemodal} /> */}
       
        <Modalcomp
          visible={this.state.editopen}
          title={"ADD EXPECTED STOCK"}
          closemodal={(e) => this.closemodal(e)}
        >
          <Editorder />
        </Modalcomp>
      </div>
    );
  }
}

export default Preorder_table;

// function createData(
//   product_name,
//   stockout_date,
//   total_stock,

// ) {
//   return { product_name, stockout_date, total_stock  };
// }

// function desc(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function stableSort(array, cmp) {
//   console.log("sort", array);
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = cmp(a[0], b[0]);
//     console.log("order", order);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }

// function getSorting(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => desc(a, b, orderBy)
//     : (a, b) => -desc(a, b, orderBy);
// }

// const headRows = [
//   { id: "sno", label: "S.No" },

//   { id: "product_name", label: "Product Name" },
//   { id: "stockout_date", label: "Total Sale" },
//   { id: "total_stock", label: "Total Stock" },
//   { id: "action", label: "Action" }
// ];

// function EnhancedTableHead(props) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort
//   } = props;
//   const createSortHandler = property => event => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         {headRows.map(row => (
//           <TableCell
//             key={row.id}
//             align={row.numeric ? "right" : "left"}
//             padding={row.disablePadding ? "none" : "default"}
//             sortDirection={orderBy === row.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === row.id}
//               direction={order}
//               onClick={createSortHandler(row.id)}
//             >
//               {row.label}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.string.isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired
// };

// const useToolbarStyles = makeStyles(theme => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1)
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85)
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark
//         },
//   spacer: {
//     flex: "1 1 100%"
//   },
//   actions: {
//     color: theme.palette.text.secondary
//   },
//   title: {
//     flex: "0 0 auto"
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25)
//     },
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto"
//     }
//   },
//   searchIcon: {
//     width: theme.spacing(7),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer"
//   },
//   inputRoot: {
//     color: "inherit"
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 7),
//     // backgroundColor:'white',
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       // width: 120,
//       "&:focus": {
//         width: 200
//       }
//     }
//   }
// }));
// // const Trainer_viewWrapped = Profilepage;

// export default class Stocklist_table extends Component {
//   constructor(props) {
//     super(props);
//     function createData( product_name, stockout_date, total_stock )
//        {
//       return { product_name, stockout_date, total_stock };
//     }

//     this.state = {
//       order: "",
//       open: false,
//       orderBy: "media_title",
//       selected: [],
//       page: 0,
//       dense: false,
//       rowsPerPage: 5,
//       viewmodal: false,
//       stockdetails: [
//         createData(
//           "Rollin Giraffe Cycle",
//           "5",
//           "20",
//         ),
//         createData(
//           "Rollin Giraffe Cycle",
//           "8",
//           "12",
//           ),
//           createData(
//             "Wollen Boot",
//             "7",
//             "8",
//           ),
//           createData(
//             "Wollen Boot",
//             "5",
//             "20",
//           ),
//           createData(
//             "Rollin Giraffe Cycle",
//             "3",
//             "5",
//           ),
//           createData(
//             "Rollin Giraffe Cycle",
//             "2",
//             "2",
//           ),
//       ],
//       viewdata: null
//     };
//   }

//   handleRequestSort = (event, property) => {
//     const isDesc =
//       this.state.orderBy === property && this.state.order === "desc";
//     this.setState({ order: isDesc ? "asc" : "desc" });
//     this.setState({ orderBy: property });
//   };

//   closemodal = () => {
//     this.setState({ viewmodal: false });
//   };

//   // loadstockDetails(){
//   //   fetch(Config.api_url+'getstockDetails', {
//   //             method: 'POST',
//   //             headers: {
//   //               Accept: 'application/json',
//   //               'Content-Type': 'application/json',
//   //             },
//   //             body: JSON.stringify({}),
//   //           }).then((response) => response.json())
//   //           .then((responseJson) => {
//   //             // console.log("stock",responseJson);
//   //             this.setState({stockdetails:responseJson.data})
//   //           })
//   // }

//   handleClick = (event, name) => {
//     const selectedIndex = this.state.selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected.push(this.state.selected, name);
//     } else if (selectedIndex === 0) {
//       // newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === this.state.selected.length - 1) {
//       // newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       // newSelected = newSelected.concat(
//       //   selected.slice(0, selectedIndex),
//       //   selected.slice(selectedIndex + 1),
//       // );
//     }
//     this.setState({ selected: newSelected });
//   };

//   handleChangePage = (event, newPage) => {
//     this.setState({ page: newPage });
//   };

//   handleChangeRowsPerPage = event => {
//     this.setState({ rowsPerPage: +event.target.value });
//     this.setState({ page: 0 });
//   };

//   handleChangeDense(event) {
//     this.setState({ dense: event.target.checked });
//   }
//   componentWillMount() {
//     //this.loadstockDetails();
//   }
//   ViewDetails = data => {
//     console.log("viewdata", data);
//     this.setState({ viewmodal: true, viewdata: data });
//   };
//   DeleteData = data => {
//     console.log("deletedata", data);
//   };
//   receiveapprovaldata = (data, data1) => {
//     console.log("receiveapproval", data);
//     console.log("data1", data1);
//     if (data1 == 1) {
//       this.setState({ viewmodal: false });
//       message.success("Your Leave Approved");
//       this.loadVendorDetails();
//     } else if (data1 == 2) {
//       this.setState({ viewmodal: false });
//       message.success("Your Leave Rejected");
//       this.loadVendorDetails();
//     }
//   };
//   receivestockdelete = data => {
//     console.log("receivestockdelete", data);
//     if (data.status == 0) {
//       this.setState({ viewmodal: false });
//       message.success(data.msg);
//       this.loadstockDetails();
//     }
//   };
//   sendapprovadata = data => {
//     if (data.status == 0) {
//       this.setState({ viewmodal: false });
//       message.success(data.msg);
//       this.loadstockDetails();
//     }
//   };
//   // handleClickopenicon = () => {
//   //     this.setState({ open: true });
//   // };
//   // handleclose = value => {
//   //     this.setState({ open: false });
//   // };
//   //   handleClickcloseicon = () => {
//   //     this.setState({ open: false });
//   //   };
//   //   confirm=(data)=> {
//   //   console.log("dekte",data);
//   //   message.loading('Action in progress..')
//   //          fetch(Config.api_url+'deletestockDetails', {
//   //             method: 'POST',
//   //             headers: {
//   //               Accept: 'application/json',
//   //               'Content-Type': 'application/json',
//   //             },
//   //             body: JSON.stringify({
//   //               "stockId":data.stockId
//   //             }),
//   //           }).then((response) => response.json())
//   //           .then((responseJson) => {
//   //             if(responseJson.status==0){
//   //             this.loadstockDetails();
//   //         message.success(responseJson.msg)

//   //            }else{
//   //               message.error(responseJson.msg);
//   //             }

//   //           })
//   // }
//   render() {
//     const isSelected = name => this.state.selected.indexOf(name) !== -1;

//     return (
//       <div className="VendorDetailsDiv">
//         <Paper className="paper">
//           <div className="tableWrapper">
//             <Table
//               className="table"
//               aria-labelledby="tableTitle"
//               size={this.state.dense ? "small" : "medium"}
//             >
//               <EnhancedTableHead
//                 numSelected={this.state.selected.length}
//                 order={this.state.order}
//                 orderBy={this.state.orderBy}
//                 // onSelectAllClick={this.handleSelectAllClick}
//                 onRequestSort={this.handleRequestSort}
//                 rowCount={this.state.stockdetails.length}
//               />
//               <TableBody>
//                 {stableSort(
//                   this.state.stockdetails,
//                   getSorting(this.state.order, this.state.orderBy)
//                 )
//                   .slice(
//                     this.state.page * this.state.rowsPerPage,
//                     this.state.page * this.state.rowsPerPage +
//                       this.state.rowsPerPage
//                   )
//                   .map((row, index, item) => {
//                     const isItemSelected = isSelected(row.name);
//                     const labelId = `enhanced-table-checkbox-${index}`;
//                     console.log("rendering", row);
//                     return (
//                       <TableRow
//                         hover
//                         onClick={event => this.handleClick(event, row.name)}
//                         role="checkbox"
//                         tabIndex={-1}
//                         key={row.name}
//                       >
//                         <TableCell
//                           component="th"
//                           id={labelId}
//                           scope="row"
//                           padding="none"
//                         >
//                           {this.state.rowsPerPage * this.state.page -
//                             1 +
//                             index +
//                             2}
//                         </TableCell>

//                         <TableCell align="right">{row.product_name}</TableCell>
//                         <TableCell align="right">{row.stockout_date}</TableCell>
//                         <TableCell align="right">{row.total_stock}</TableCell>

//                         <TableCell className="cell_eye" align="right">
//                         <VisibilityIcon className="action-eye"
//                             onClick={this.ViewDetails} />
//                         <EditIcon className="mediaedit_icon" onClick={this.ViewDetails}/>
//                           <DeleteIcon className="mediadelete_icon" />
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//               </TableBody>
//             </Table>
//           </div>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={this.state.stockdetails.length}
//             rowsPerPage={this.state.rowsPerPage}
//             page={this.state.page}
//             backIconButtonProps={{
//               "aria-label": "Previous Page"
//             }}
//             nextIconButtonProps={{
//               "aria-label": "Next Page"
//             }}
//             onChangePage={this.handleChangePage}
//             onChangeRowsPerPage={this.handleChangeRowsPerPage}
//           />
//         </Paper>

//       <StockView
//           open={this.state.viewmodal}
//           onClose={this.closemodal}
//           title={"VIEW STOCK DETAILS"}
//         />

//       </div>
//     );
//   }
// }
