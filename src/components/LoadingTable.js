import React from "react";
import {Spinner} from "react-bootstrap";

const LoadingTable = ({ outOfRange }) => {

    return (
        <div data-test="datatable-table" className="col-sm-12">
            <div data-test="table" className="">
                <table entries="10" className="table table-striped dataTable">
                    <thead data-test="datatable-head">
                    <tr>
                        <th className="">Block</th>
                        <th className="">Timestamp</th>
                        <th className="">Orders</th>
                        <th className="">Fees</th>
                        <th className="">Reward</th>
                        <th className="">Duration</th>
                        <th className="">Block Creator</th>
                    </tr>
                    </thead>
                    <tbody data-test="table-body">
                    <tr>
                        <td colSpan="7">
                            {
                                outOfRange ? "Page is out of range" : <Spinner animation="border" variant="secondary" />
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LoadingTable;