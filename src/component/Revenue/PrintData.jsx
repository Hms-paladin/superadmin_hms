import React from 'react';
import './PrintData.css';

class PrintData extends React.Component {
    render() {
        var printBodyData = this.props.printtableData.map((printdata, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{printdata.bookeddate}</td>
                    <td>{printdata.customer}</td>
                    <td>{printdata.card}</td>
                    <td>{printdata.wallet}</td>
                    <td>{printdata.totalcharge}</td>
                </tr>
            )
        })
        return (
            <div className="printtabledata">
                <div className="printDataTitle">Revenue</div>
                <table>
                    <thead>
                        <th>S.No</th>
                        <th>Booked On</th>
                        <th>Customer</th>
                        <th>Card</th>
                        <th>Wallet</th>
                        <th>Total Charge(KWD)</th>
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