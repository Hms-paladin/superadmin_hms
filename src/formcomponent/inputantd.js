import React from "react";
import { Input } from 'antd';



class Inputantd extends React.Component{
    render(){
        return(
            <div>
                <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>
        {this.props.label && this.props.label}{this.props.required==="required" && <span className="text-danger"> * </span>}</label><br />
                <Input 
                className={`inputantdstyle ${this.props.className && this.props.className}
                ${this.props.error && "Errorbr"}`}
                placeholder={this.props.placeholder && this.props.placeholder} 
                onChange={(e)=>this.props.changeData&&this.props.changeData(e.target.value)}
                name={this.props.name && this.props.name}
                prefix={this.props.prefix && this.props.prefix}
                value={this.props.value}
                />
                {/* <div className="texterrmsg">
                {
                    this.props.errmsg ? this.props.errmsg
                    : <div className="min_h_static" />
                }
                </div> */}
                    
            </div>
        )
    }
}

export default Inputantd;