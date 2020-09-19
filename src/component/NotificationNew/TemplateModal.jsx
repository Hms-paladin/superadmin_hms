import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helper/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './TemplateModal.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Upload } from 'antd';
import { FiInfo } from "react-icons/fi";
import uploadimage from '../../images/upload-button.png'
import Modalcomp from '../../helper/ModalComp/ModalComp';
import { Input } from 'antd';

const { TextArea } = Input;
export default class Template extends Component {
    constructor(props){
        super(props)
        this.state={open:false}
    }
    handleOpen=()=>
    {
        this.setState({open:true})
    }
    handleClose=()=>
    {
        this.setState({open:false})
    }
    render() {
        return (
            <>
           <div>
              <TextArea rows={6}/>
              <div className="templatemodal_btn">
                  <Button>Package Name</Button>
                  <Button>Vendor Name</Button>
                  <Button>From date</Button>
                  <Button>To Date</Button>

              </div>
              <div className="templatemodal_OKbtn" >
                  <Button>OK</Button>
              </div>
           </div>
        
         </>
        )
    }
}
