import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import {GoSearch} from "react-icons/go/index";

import genre from '../components/genres';
import Checkbox from '../components/checkbox';

class Researchform extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            titre: null,
            tri: "date",
            genres: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        };

        this.setgenre = this.setgenre.bind(this);
        this.handleTexte = this.handleTexte.bind(this);
        this.settri = this.settri.bind(this);
    }


    handleTexte = e => {
        this.setState({titre: e.target.value});
        //console.log(e.target.value)
    };

    settri = e => {
        this.setState({tri: e.target.attributes.api.nodeValue});
        //console.log(event.target.attributes.api.nodeValue);
    };


    setgenre(e) {
        // code salle à simplifier
        const options = this.state.genres;
        let index;
        if (e.target.checked) {
            options.push(+e.target.attributes.api.nodeValue)
        } else {
            index = options.indexOf(+e.target.attributes.api.nodeValue);
            options.splice(index, 1)
        }
        this.setState({genres: options});
        //console.log(options);
    }

    render() {
        return (
            <Form onSubmit={e => this.props.action.bind(this, this.state)}>
                <Form.Group as={Row} controlId="formHorizontalSearch">
                    <Form.Label column sm={1}>Rechercher</Form.Label>
                    <Col sm={8}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><GoSearch/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Recherche par titre" aria-label="Recherche par titre"
                                         aria-describedby="basic-addon1" onChange={this.handleTexte} type="text"/>
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={1}>Genres</Form.Label>
                    <Row sm={8}>
                        <div key='custom-inline-checkbox' className="mt-2 ml-4">
                            <React.Fragment>
                                {
                                    genre.map(item => (
                                        <Checkbox id={item.id} label={item.label} key={item.id}
                                                  onChange={this.setgenre.bind(this)}/>
                                    ))
                                }
                            </React.Fragment>

                        </div>
                    </Row>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={1}>Tri</Form.Label>
                    <Row sm={8}>
                        <div key='custom-inline-checkbox' className="mt-2 ml-4" onChange={event => this.settri(event)}>
                            <Form.Check defaultChecked custom inline label={"date"} type={"radio"}
                                        id={"custom-inline-radio-1"}
                                        name="tri" api="date"/>
                            <Form.Check custom inline label={"note"} type={"radio"} id={"custom-inline-radio-2"}
                                        name="tri" api="grade"/>
                        </div>
                    </Row>
                </Form.Group>

                <Button variant="primary" onClick={this.props.action.bind(this, this.state)}>Rechercher</Button>
            </Form>
        );
    };
}

export default Researchform;