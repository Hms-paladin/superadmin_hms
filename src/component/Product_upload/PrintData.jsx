import React from 'react';
import './PrintData.css';

class PrintData extends React.Component {
    render() {
        var printBodyData = this.props.printtableData.map((printdata, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{printdata.sh_product_name}</td>
                    <td>{printdata.created_on}</td>
                    <td>{printdata.sh_mrp}</td>
                    <td>{printdata.sh_is_active}</td>

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
                        <th>Created Date </th>
                        <th>Cost(KWD) </th>
                        <th>Status </th>

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