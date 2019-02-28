import React from 'react';
import PropTypes from 'prop-types';


const ResultRow = ({titre, auteur, genre, maj, note}) => (
    <tr>
        <td>{titre}</td>
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
    note: PropTypes.number
};

export default ResultRow;