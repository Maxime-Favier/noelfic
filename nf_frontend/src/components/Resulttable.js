import React from 'react'
import Table from "react-bootstrap/Table";

//import axios from 'axios';
import API from '../backendConfig/api'
import ResultRow from '../components/ResultRow';


class Resulttable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            result: []
        };

        this.getResult = this.getResult.bind(this);
    }

    ResulttableConfig = [
        {classname : "col-4", label: "Titre"},
        {classname : "col-2", label: "Auteur"},
        {classname : "col-2", label: "Genre"},
        {classname : "col-1", label: "date de maj"},
        {classname : "col-1", label: "Note"}
    ];

    componentDidMount() {
        // call result on mount
        this.getResult();
    }

    componentDidUpdate(prevProps) {
        // update when states changes
        if(prevProps.titre !== this.props.titre || prevProps.tri !== this.props.tri){
            this.getResult();
        }
    }

    getResult() {
        // send request to the api
        API.get('/oldfic/search', {
            params: {
                page: this.state.page,
                sorting: this.props.tri,
                q: this.props.titre
            }
        })
            .then(response => {
                // On success
                this.setState({result: response.data});
            })
            .catch(error => {
                // On error
                console.log(error);
            });
    }

    render() {
        return (
            <div className="mr-5 ml-5 mt-5 ">
                <Table size="sm" responsive="true" >
                    <thead>
                    <tr>
                        {
                            this.ResulttableConfig.map((config, key) =>(
                                <th className={config.classname} key={key}>{config.label}</th>
                            ))
                        }
                    </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.result.map((row, key) => (
                                <ResultRow titre={row.titre} auteur={row.auteurs} genre={row.genre} maj={row.date} note={row.note} key={key}/>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Resulttable;