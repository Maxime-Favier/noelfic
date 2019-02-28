import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'


const Checkbox = ({id, label, api, /*checked = false,*/ onChange}) => (
    <Form.Check defaultChecked custom inline type='checkbox' id={'custom-inline-checkbox-' + id} label={label}  onChange={onChange} api={id}/>
);

Checkbox.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

export default Checkbox;