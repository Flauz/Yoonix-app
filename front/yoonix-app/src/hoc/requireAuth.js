import React, { Component } from 'react';
import { connect } from "react-redux";
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
    class Authentication extends Component {
        componentDidMount() {
            if (!this.props.authenticated)
                this.props.history.push('/signin');
        }
        componentDidUpdate() {
            if (!this.props.authenticated)
                this.props.history.push('/signin');
        }
        render() {
            return <ComposedComponent  {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return { authenticated: state.auth.token ? true : false };
    }

    return connect(mapStateToProps)(Authentication);
}