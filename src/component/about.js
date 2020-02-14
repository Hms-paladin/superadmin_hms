import React from "react";
import Inputantd from "../formcomponent/inputantd";
import Dropdownantd from "../formcomponent/dropdownantd";

class About extends React.Component{
    render(){
        return(
            <div>
                <Inputantd label="Name" required="required" className="w-25" placeholder="Name" />

                <Dropdownantd label="Department" required="required" className="w-25" option={["test1","test2"]} placeholder="Department" />
            </div>
        )
    }
}

export default About;