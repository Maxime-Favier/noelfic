import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";

import Researchform from '../components/researchform';
import Resulttable from '../components/Resulttable';

class Oldfic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            titre: null,
            genres: [],
            tri: "date"
        };
        this.getfilter = this.getfilter.bind(this);

    };

    getfilter(childState) {
        //console.log(childState);
        this.setState({titre: childState.titre, genres: childState.genres, tri: childState.tri});
        //très très sale
        this.forceUpdate()
    }


    render() {
        return (<div>
            <Jumbotron>
                <h1>Chercher de vieilles fic</h1>
                <p>Recherchez les vieilles fic qui ont fait l'histoire du forum 15-18 et 18-25 de jeuxvideo.com de
                    2009 à 2017</p>

                <hr/>
                <div className='mt-4'>
                    <Researchform action={this.getfilter}/>
                </div>

                <hr/>
                <div className='mt-4'>
                    <Resulttable titre={this.state.titre} genres={this.state.genres} tri={this.state.tri}/>
                </div>
            </Jumbotron>
        </div>
    );
};
}
export default Oldfic;