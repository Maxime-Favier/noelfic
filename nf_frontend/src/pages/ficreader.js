import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Chapitre from "../components/chapitre";
import Pageswitch from "../components/pagination";

class Ficreader extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            title: "Loading",
            auteur: "Loading",
            genre: "Loading",
            currentPage: 1,
            totalPages: 130,
            ficid: 1
        };

        this.getficinfo = this.getficinfo.bind(this)
    }


    //TODO: 2309 - 73
    componentDidMount() {
        this.setState({ficid: this.props.match.params.ficid});
        this.getficinfo();
    }

    getficinfo(){
        //console.log(this.props.match.params.ficid);
        //this.setState({ficid: this.props.match.params.ficid})
    }

    onPageChanged = data => {
        const { currentPage, totalPages } = data;

        //const offset = (currentPage - 1) * pageLimit;

        this.setState({ currentPage, totalPages });
    };

    render() {
        return(<div>
            <Jumbotron>
                <h1 className="text-center">Hello World</h1>
                <hr/>
                <p className="text-center">
                    Par: <br/>
                    Genre: <br/>
                </p>
                <hr/>
                <div>
                    <Pageswitch totalRecords={this.state.totalPages} pageLimit={1} pageNeighbours={2} onPageChanged={this.onPageChanged}/>
                    <Chapitre ficid={this.state.ficid} chapitre={this.state.currentPage}/>
                </div>
            </Jumbotron>
        </div>);
    }
}
export default Ficreader;