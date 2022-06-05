import React, { Component, Fragment } from 'react';
import Link from 'react-router-dom/Link';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';
import Notifications from './Notifications';
//MUI stuff

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "@material-ui/core/Button";

//icon
// import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
// import TelegramIcon from '@material-ui/icons/Telegram';


export class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (
           <AppBar position="fixed">
               <Toolbar className="nav-container">
               {authenticated ? <Fragment>
                                    {/* <MyButton tip="Post a Scream!">
                                        <AddIcon  ></AddIcon>
                                    </MyButton> */}
                                    <PostScream />
                                    <Link to="/">
                                    <MyButton tip="home">
                                        <HomeIcon  ></HomeIcon>
                                    </MyButton>
                                    </Link>
                                    <Notifications ></Notifications>

                                    {/* <Link to="/chat">
                                     <MyButton tip="Chat">
                                         <TelegramIcon/>
                                     </MyButton>
                                    </Link> */}
                                    

                                </Fragment>:
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                        </Fragment>
                       
                   
               }
                   
               </Toolbar>
           </AppBar>
        )
    }
}
Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
