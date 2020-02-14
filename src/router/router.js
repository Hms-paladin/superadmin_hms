import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from '../drawerpage/drawerpage.js';

export default class Routes extends Component {
    render() {
        return (
            <Router basename="/hms">
                <Route path="/Home" component={Homepage} />
            </Router>
        );
    }
}