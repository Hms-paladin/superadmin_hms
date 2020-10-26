import React from 'react';
import './PrintData.css';

class PrintData extends React.Component {
    render() {
        var printBodyData = this.props.printtableData.map((printdata, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{printdata.customer}</td>
                    <td>{printdata.phone_number}</td>
                    <td>{printdata.booked_on}</td>
                    <td>{printdata.price}</td>
                </tr>
            )
        })
        return (
            <div className="printtabledata">
                <div className="printDataTitle">Total Orders</div>
                <table>
                    <thead>
                        <th>S.No</th>
                        <th>Customer</th>
                        <th>Phone Number</th>
                        <th>Booked On</th>
                        <th>Price(KWD)</th>
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