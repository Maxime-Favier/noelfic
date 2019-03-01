import React from 'react';
import API from '../backendConfig/api';
import DOMPurify from 'dompurify';


class Chapitre extends React.Component {

    state = {
        chapTitle: null,
        auteur: null,
        content: null
    };

    getchapter(ficid, chapitre) {
        API.get(`/oldfic/${ficid}/${chapitre}`)
            .then(response => {
                console.log(response.data[0]);
                this.setState({content: response.data[0].content, auteur: response.data[0].auteur, chapTitle: response.data[0].title})
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getchapter(25,1)
    }

    render() {
        return(<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.content)}}/>

            )
    }
}
export default Chapitre;