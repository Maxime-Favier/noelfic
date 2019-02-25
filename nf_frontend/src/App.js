import React from 'react';
import Navbar from './components/navbar';
import {Route, Switch} from 'react-router-dom';

import Index from './pages/index'

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
                        <Route exact path={'/'} component={Index}/>
                        {/*<Switch>
                            <Route path={'/v'} component=/>
                            <Route path={'/v'} component/>
                        </Switch>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;