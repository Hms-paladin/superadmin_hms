import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from '../drawerpage/drawerpage.js';
import Advertise_manage from '../component/Advertisement Management/Advertise_Manage.jsx';
import Media_upload from '../component/Media Upload/Media_upload.jsx';

export default class Routes extends Component {
    render() {
        return (
            
            <Router basename="/hms">
                <Route path="/Home" component={Homepage} />
                <Route path="/advertising" component={Advertise_manage} />
                <Route path="/mediaupload" component={Media_upload} />
            </Router>
        );
    }
}