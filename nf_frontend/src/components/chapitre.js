import React from 'react';
import API from '../backendConfig/api';
import DOMPurify from 'dompurify';
import propTypes from 'prop-types'


class Chapitre extends React.Component {

    state = {
        chapTitle: null,
        auteur: null,
        content: null
    };

    getchapter(ficid, chapitre) {
        API.get(`/oldfic/${ficid}/${chapitre}`)
            .then(response => {
                //console.log(response.data[0]);
                this.setState({
                    content: response.data[0].content,
                    auteur: response.data[0].auteur,
                    chapTitle: response.data[0].title
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getchapter(this.props.ficid, this.props.chapitre);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ficid !== this.props.ficid || prevProps.chapitre !== this.props.chapitre) {
            this.getchapter(this.props.ficid, this.props.chapitre);
        }
    }

    render() {
        return (<div>
            <div className="text-center">
                <h2>{this.state.chapTitle}</h2>
            </div>
            <div className="container" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.content)}}/>
        </div>)
    }
}

Chapitre.propTypes = {
    ficid: propTypes.string,
    chapitre: propTypes.number.isRequired
};

export default Chapitre;