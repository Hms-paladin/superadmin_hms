import React from 'react';
import './PrintData.css';

class PrintData extends React.Component {
    render() {
        var printBodyData = this.props.printtableData.map((printdata, index) => {
            // console.log(printdata.sh_is_active.props.checked,"jhfbj")
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{printdata.sh_product_name}</td>
                    <td>{printdata.expected_date}</td>
                    <td>{printdata.expected_quantity}</td>
                    <td>{printdata.booked}</td>

                </tr>
            )
        })
        return (
            <div className="printtabledata">
                <div className="printDataTitle">Pre Orders</div>
                <table>
                    <thead>
                        <th>S.No</th>
                        <th>Product Name</th>
                        <th>Expected Date </th>
                        <th>Expected Quantity </th>
                        <th>Booked </th>

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