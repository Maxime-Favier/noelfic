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

    componentWillReceiveProps() {
        this.getResult();
    }

    componentDidMount() {
        this.getResult();
    }

    getResult() {
        API.get('/oldfic/search', {
            params: {
                page: this.state.page,
                sorting: this.props.tri,
                q: this.props.titre
            }
        })
            .then(response => {
                console.log(response);
                this.setState({result: response.data})
            })
            .catch(error => {
                console.log(error);
            });

        //très très sale
        this.forceUpdate()
    }

    render() {
        return (
            <div className="mr-5 ml-5 mt-5">
                <Table size="sm">
                    <thead>
                    <tr>
                        <th className='col-5'>Titre</th>
                        <th className="col-2">Auteur</th>
                        <th className="col-1">Genre</th>
                        <th className="col-1">date de maj</th>
                        <th className="col-1">Note</th>
                    </tr>

                    </thead>
                    <tbody>

                    <React.Fragment>
                        {
                            this.state.result.map((row, key) => (
                                <ResultRow titre={row.titre} auteur={row.auteurs} genre={row.genre} maj={row.date} note={row.note} key={key}/>
                            ))
                        }
                    </React.Fragment>

                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Resulttable;