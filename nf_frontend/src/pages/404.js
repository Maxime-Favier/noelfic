import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';


class NotFound extends React.Component {
    constructor(props) {
        super(props);

        this.state={};
    }

    render() {
        return (<div>
            <Jumbotron>
                <Alert variant="secondary">
                    <Alert.Heading>404 Not Found</Alert.Heading>
                    <p>La page que vous avez demandé n'existe pas</p>
                    <LinkContainer to={'/'}><Button variant="primary" size="lg" type="button">Retour à la page d'accueil</Button></LinkContainer>

                <hr/>
                <img src="https://http.cat/404.jpg" alt="funny cat - 404 not found" className="mx-auto d-block"/>
                </Alert>
            </Jumbotron>

        </div>);
    }
}

export default NotFound;