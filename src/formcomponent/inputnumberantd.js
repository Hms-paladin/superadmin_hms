import React from 'react';
import { InputNumber } from 'antd';

class Inputnumber extends React.Component{
    render(){
        return(
            <div>
                <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>
                    {this.props.label && this.props.label}{this.props.required && <span className="text-danger">*</span>}</label><br />
                <InputNumber 
                className={`${this.props.errmsg?"borderred_num":"inputnumber"}  ${this.props.className && this.props.className}`}
                min={0} 
                max={this.props.max?this.props.max:99999} 
                defaultValue={this.props.defaultValue && this.props.defaultValue} 
                step={this.props.step && this.props.step}
                onChange={this.props.changeData && this.props.changeData }
                name={this.props.name && this.props.name}
                value={this.props.value}
                onPressEnter={this.props.onPressEnter && this.props.onPressEnter}
                />
                 <div className="texterrmsg">
                { 
                    this.props.errmsg ? this.props.errmsg
                    : <div className="min_h_static" />
                }
                </div>
            </div>
        )
    }
} 

export default Inputnumber;