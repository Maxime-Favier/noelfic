import React from 'react';
import propTypes from 'prop-types'

import ResultRow from './ResultRow';
import API from "../backendConfig/api";


class searchtablebody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {result: []};
        this.getResult = this.getResult.bind(this);
    }

    componentDidMount() {
        this.getResult();
    }

    componentDidUpdate(prevProps) {
        // update when states changes
        if (prevProps.q !== this.props.q || prevProps.sorting !== this.props.sorting || prevProps.genre !== this.props.genre || prevProps.page !== this.props.page) {
            //this.setState({page: 0});
            //console.log("reset to 1");
            this.getResult();
        }
    }

    getResult() {
        console.log("get the page number "+ this.props.page);
        API.get(`/oldfic/search?genre=[${this.props.genre}]`, {
            params: {
                page: this.props.page -1,
                sorting: this.props.sorting,
                q: this.props.q
            }
        })
            .then(response => {
                // On success
                this.setState({result: response.data});
            })
            .catch(error => {
                // On error
                console.log(error);
            });
    }


    render() {
        return (
            <tbody>
            {
                this.state.result.map((row, key) => (
                    <ResultRow titre={row.titre} auteur={row.auteurs} genre={row.genre} maj={row.date}
                               note={row.note} key={key} oldid={row.oldid}/>
                ))
            }
            </tbody>
        );
    }

}

searchtablebody.propTypes = {
    page: propTypes.number.isRequired,
    sorting: propTypes.string.isRequired,
    genre: propTypes.array.isRequired,
    q: propTypes.string
};
export default searchtablebody;