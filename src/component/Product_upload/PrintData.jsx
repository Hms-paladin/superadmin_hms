import React from 'react';
import './PrintData.css';

class PrintData extends React.Component {
    render() {
        var printBodyData = this.props.printtableData.map((printdata, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{printdata.product_name}</td>
                    <td>{printdata.stocknumber}</td>
                    
                </tr>
            )
        })
        return (
            <div className="printtabledata">
                <div className="printDataTitle">Stock List</div>
                <table>
                    <thead>
                        <th>S.No</th>
                        <th>Product Name</th>
                        <th>Stock Quantity</th>
                  
                    </thead>
                    <tbody>
                        {printBodyData}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PrintData;