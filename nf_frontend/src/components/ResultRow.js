import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link'
//import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';


const ResultRow = ({titre, auteur, genre, maj, note, oldid}) => (

    <tr>

        <td><Link to={`/oldfic/${oldid}/1`}>{titre} </Link></td>
        <td>{auteur}</td>
        <td>{genre}</td>
        <td>{maj}</td>
        <td>{note}</td>
    </tr>

);

ResultRow.propTypes = {
    titre: PropTypes.string.isRequired,
    auteur: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    maj: PropTypes.string.isRequired,
    note: PropTypes.number,
    oldid: PropTypes.number
};

export default ResultRow;