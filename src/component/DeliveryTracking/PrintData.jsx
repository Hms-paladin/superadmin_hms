import React from 'react';
import './PrintData.css';

class PrintData extends React.Component {
    render() {
        var printBodyData = this.props.printtableData.map((printdata, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{printdata.customer}</td>
                    <td>{printdata.product_name}</td>
                    <td>{printdata.phone_no}</td>
                    <td>{printdata.status}</td>
                </tr>
            )
        })
        return (
            <div className="printtabledata">
                <div className="printDataTitle">Delivery Tracking</div>
                <table>
                    <thead>
                        <th>S.No</th>
                        <th>Customer</th>
                        <th>Product Name</th>
                        <th>Phone Number</th>
                        <th>Status</th>
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