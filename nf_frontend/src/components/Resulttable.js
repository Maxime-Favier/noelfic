import React from 'react'
import Table from "react-bootstrap/Table";
import propTypes from 'prop-types'

import Pageswitch from "../components/pagination";
import Searchtablebody from './searchtablebody';


class Resulttable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPages: 100
        };

    }

    ResulttableConfig = [
        {classname: "col-4", label: "Titre"},
        {classname: "col-2", label: "Auteur"},
        {classname: "col-2", label: "Genre"},
        {classname: "col-1", label: "date de maj"},
        {classname: "col-1", label: "Note"}
    ];


    onPageChanged = data => {
        const {currentPage, totalPages} = data;
        //console.log("on page changed " + currentPage);
        this.setState({currentPage, totalPages});
    };

    render() {
        return (
            <div className="mt-5">
                <div className="ml-auto mr-auto">
                    <Pageswitch totalRecords={this.state.totalPages} pageLimit={1} pageNeighbours={2}
                                onPageChanged={this.onPageChanged}/>
                </div>
                <Table size="sm" responsive="true" striped>
                    <thead>
                    <tr>
                        {
                            this.ResulttableConfig.map((config, key) => (
                                <th className={config.classname} key={key}>{config.label}</th>
                            ))
                        }
                    </tr>
                    </thead>

                    <Searchtablebody page={this.state.currentPage} sorting={this.props.tri} genre={this.props.genre}
                                     q={this.props.titre}/>

                </Table>
            </div>
        )
    }
}

Resulttable.propTypes = {
    titre: propTypes.string,
    genre: propTypes.array.isRequired,
    tri: propTypes.string.isRequired,
};

export default Resulttable;