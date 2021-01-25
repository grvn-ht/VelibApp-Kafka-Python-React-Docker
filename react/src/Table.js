import React, {Component} from 'react';
import "./Table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

export default class TableComponent extends Component {
  render() {
    const name = this.props.name || 0;
    const meca = this.props.meca || 0;
    const elec = this.props.elec || 0;
    const ava = this.props.ava || 0;
    const libre = this.props.libre || 0;
    const broke_m = this.props.broke_m || 0;
    const broke_e = this.props.broke_e || 0;
    return (
            <body>
                <div className="table-title">
                <h3>{name}</h3>
                </div>

                <table className="table-fill">
                    <thead>
                        <tr>
                        <th className="text-title">Vélib'</th>
                        <th> <FontAwesomeIcon icon={faCheck} size="2x"/> </th>
                        <th> <FontAwesomeIcon icon={faTimes} size="2x"/> </th>
                        </tr>
                    </thead>

                    <tbody className="table-hover">
                        <tr>
                        <td className="ava"> <FontAwesomeIcon icon={faBicycle} size="2x" color="green" /> méca </td>
                        <td className="text-left">{meca}</td>
                        <td className="text-left">{broke_m}</td>
                        </tr>
                        <tr>
                        <td className="ava"> <FontAwesomeIcon icon={faBicycle} size="2x" color="blue"/> élec</td>
                        <td className="text-left">{elec}</td>
                        <td className="text-left">{broke_e}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="table-subtitle">
                    <h4>Il reste <b className="ava">{libre}</b> places disponibles!</h4>
                </div>

            </body>
    );
  }
}