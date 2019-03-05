import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Chapitre from "../components/chapitre";
import Pageswitch from "../components/pagination";
import API from '../backendConfig/api'

class Ficreader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Loading",
            auteur: "Loading",
            genre: "Loading",
            currentPage: 1,
            totalPages: null,
        };

        this.getficinfo = this.getficinfo.bind(this)
    }

    //TODO: 2309 - 73
    //TODO dernier chap cisla bdd

    componentDidMount() {
        this.getficinfo();
    }

    getficinfo() {
        //console.log(this.props.match.params.ficid);
        //this.setState({ficid: this.props.match.params.ficid})
        API.get('/oldfic/search', {params: {id: this.props.match.params.ficid}})
            .then(response => {
                //console.log(response.data[0].chapitres);
                this.setState({
                    title: response.data[0].titre,
                    auteur: response.data[0].auteurs,
                    genre: response.data[0].genre,
                    totalPages: response.data[0].chapitres
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    onPageChanged = data => {
        const {currentPage, totalPages} = data;
        this.setState({currentPage, totalPages});
    };

    render() {
        return (<div>
            <Jumbotron>
                <h1 className="text-center">{this.state.title}</h1>
                <hr/>
                <p className="text-center">
                    Par: {this.state.auteur}<br/>
                    Genre: {this.state.genre}<br/>
                </p>
                <hr/>
                <div>
                    {this.state.totalPages === null ? <br/> :
                        <Pageswitch totalRecords={this.state.totalPages} pageLimit={1} pageNeighbours={2}
                                    onPageChanged={this.onPageChanged}/>
                    }

                    <Chapitre ficid={this.props.match.params.ficid} chapitre={this.state.currentPage}/>
                </div>
            </Jumbotron>
        </div>);
    }
}

export default Ficreader;