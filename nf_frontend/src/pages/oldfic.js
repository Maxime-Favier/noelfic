import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";

import Researchform from '../components/researchform';
import Resulttable from '../components/Resulttable';

class Oldfic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            titre: null,
            genres: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            tri: "date"
        };
        this.getfilter = this.getfilter.bind(this);
    };

    OldficConfig = {
        title: "Chercher de vieilles fic",
        paragraphe: "Recherchez les vieilles fic qui ont fait l'histoire du forum 15-18 et 18-25 de jeuxvideo.com de 2009 à 2017"

    };

    getfilter(childState) {
        // get the states from the research form onButtonClick
        this.setState({titre: childState.titre, genres: childState.genres, tri: childState.tri});
    }


    render() {
        return (<div>
                <Jumbotron>
                    <h1>{this.OldficConfig.title}</h1>
                    <p>{this.OldficConfig.paragraphe}</p>
                    <hr/>
                    <div className='mt-4'>
                        <Researchform action={this.getfilter}/>
                    </div>
                    <hr/>
                    <div className='mt-4 container'>
                        <Resulttable titre={this.state.titre} genre={this.state.genres} tri={this.state.tri}/>
                    </div>
                </Jumbotron>
            </div>
        );
    };
}

export default Oldfic;