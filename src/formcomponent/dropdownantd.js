import React from 'react';
import { Select } from 'antd';

const { Option } = Select;


class Dropdownantd extends React.Component{
    
    render(){
        return(
            <div className={`${this.props.divclass && this.props.divclass}`}>
                <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>  
                {this.props.label && this.props.label}{this.props.required && <span className="text-danger"> *</span>}</label><br 
                    className={`${this.props.breakclass && this.props.breakclass}`}/>
                <Select
                    showSearch
                    className={`dropdownantd ${this.props.className && this.props.className}
                    ${this.props.error && "Errorbr"}`}
                    placeholder={this.props.placeholder && this.props.placeholder}
                    // optionFilterProp={this.props.optionFilterProp && this.props.optionFilterProp}
                    onChange={(e)=>this.props.changeData&&this.props.changeData(e)}
                    // onFocus={this.props.onFocus && this.props.onFocus}
                    // onBlur={this.props.onBlur && this.props.onBlur}
                    // onSearch={this.props.onSearch && this.props.onBlur}
                    // name={this.props.name && this.props.name}
                    // defaultValue={this.props.defaultValue && this.props.defaultValue}
                    defaultValue={{ key: '1' }}
                    dropdownStyle={{ zIndex: 2000 }}
                    value={this.props.value}
                >

                 {(this.props.option).map((val,index)=>{
                        return(
                            <Option value={val.id}>
                                {val.dropdown_val}
                            </Option>
                        )
                    })}
                </Select>
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

export default Dropdownantd;