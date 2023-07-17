import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorHandler({ error }) {
    return (
        <div role="alert">
            <p>An error occurred:</p>
            <pre>{error.message}</pre>
        </div>
    );
}

ErrorHandler.propTypes = {
    error: PropTypes.instanceOf(Error).isRequired,
};
