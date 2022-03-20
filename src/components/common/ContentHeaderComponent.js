import React from 'react'
import PropTypes from 'prop-types';

class ContentHeaderComponent extends React.Component
{
    static defaultProps = {
        mainTitle        : "ND"
    };

    render ()
    {
        return (
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>{this.props.mainTitle}</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item active">{this.props.mainTitle}</li>
                    </ol>
                </div>
            </div>
        )
    }
}

ContentHeaderComponent.propTypes = {
    mainTitle      : PropTypes.string.isRequired,
};

export default ContentHeaderComponent;
