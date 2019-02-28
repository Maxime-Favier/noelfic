import React from 'react';
import Navbar from './components/navbar';
import {Route, Switch} from 'react-router-dom';

import Index from './pages/index';
import Oldfic from './pages/oldfic';
import NotFound from './pages/404'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <Navbar/>

                <div>
                    <div className={"body"}>

                        <Switch>
                            <Route exact path={'/'} component={Index}/>
                            <Route path={'/oldfic'} component={Oldfic}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;