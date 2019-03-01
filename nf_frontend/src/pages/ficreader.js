import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Chapitre from "../components/chapitre";

class Ficreader extends React.Component{

    state = {
        title: "Loading",
        auteur: "Loading",
        genre: "Loading",
        currentchap : 1,
        maxchapter: null,
        ficid: 42
    };

    componentDidMount() {
        this.getficinfo();
    }

    getficinfo(){

    }

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
                <Chapitre ficid={this.state.ficid}/>
            </Jumbotron>
        </div>);
    }
}
export default Ficreader;