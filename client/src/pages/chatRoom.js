// import React, { Component } from 'react'

// class chatRoom extends Component {
//     render() {
//         return (
//             <div>
//                 welcom to the chat
//             </div>
//         )
//     }
// }

// export default chatRoom

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import withStyles from '@material-ui/core/styles/withStyles'
import {getChats} from '../redux/actions/chatAction'
import ChatCard from '../components/ChatCard'
//MUI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
//redux
import {connect} from 'react-redux'
// import {submitComment} from '../../redux/actions/dataAction'

//icon
import SendIcon from '@material-ui/icons/Send';

//socket io

import io from 'socket.io-client';

const styles = {
    palette: {
        primary: {
          light: '#33c9dc',
          main: '#f57f17',
          dark: '#008394',
          contrastText: '#fff'
        },
        secondary: {
          main:'#ffa733',
          light: '#ff6333',
          dark: '#b22a00',
          contrastText: '#fff'
          
        },
        typography: {
          useNextVariants: true
        } 
      },
      form: {
        textAlign: 'center'
      },
      pageTitle: {
          margin: '10px auto 10px auto'
      },
      textField: {
          margin: '10px auto 10px auto'
      },
      button: {
          marginTop: 20,
          marginLeft: "95%"
      },
      customError: {
          color: 'red',
          fontSize: '0.8rem',
          marginTop: 10
      },
      progress: {
          position: 'absolute'
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    invisibleSeparator:{
      border:'none',
      margin: 4
  }
}

class chatRoom extends Component {
    // state = {
    //     body: '',
    //     errors: {}
    // }

    state = {
        chatMessage: "",
    }
    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.UI.errors){
    //         this.setState({errors: nextProps.UI.errors})
    //     }
    //     if(!nextProps.UI.errors && !nextProps.UI.loading){
    //         this.setState({body: ''});
    //     }
    // }
    componentDidMount() {
        let server = "http://localhost:5000";
        this.props.dispatch(getChats());
        this.socket = io(server);
        
        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log(messageFromBackEnd);
        })

    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.UI.errors){
    //         this.setState({errors: nextProps.UI.errors})
    //     }
    //     if(!nextProps.UI.errors && !nextProps.UI.loading){
    //         this.setState({body: ''});
    //     }
    // }
    handleSearchChange = (event) => {
        this.setState(
            {
               chatMessage: event.target.value 
            }
        )
    }
    renderCards = () =>{ 
        console.log(this.props.chats)
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => (
            <ChatCard key={chat._id} {...chat} />
        ));
    }
        
        // let chats = this.props.chats.chats;
        // let chatCard = this.props.chats.chats ? (chats.map((chat,i) => (<h1>hello</h1>))) : (<div>Loading</div>);
        
        // if(chats){
        //     chats.forEach(chat => {
        //         chatCard = <div>hello</div>
        //     });
        // }
        // let chatCard = this.props.chats.chats ? (chats.map(chat=>(<div></div>))) : (<div>Loading</div>);
            
        
        // console.log("1")
        // console.log(chats[0])
        // console.log("2")
        // this.props.chats.chats &&
        // this.props.chats.chats &&
        //     this.props.chats.chats.map((chat)=>(
        //         // <ChatCard />
        //          <div>akakakak</div> 
        //     ))
    //     console.log("hello ye hai card render")
    //    return (<div>
    //         <h1>Hello</h1>
    //     </div>)
    
    
    submitChatMessage = (event) => {
        event.preventDefault();
        // this.props.submitComment(this.props.screamId, { body: this.state.body})
        let chatMessage =  this.state.chatMessage;
        let userId = this.props.user.credential._id;
        let userHandle = this.props.user.credential.handle;
        let userImage = this.props.user.credential.imageUrl;
        let nowTime = moment()._d;
        let type = "text";
        console.log(nowTime);
        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userHandle,
            userImage,
            nowTime,
            type
        });
        this.setState({chatMessage: ""})
        

    }
    render() {
        const {classes} =this.props;
        
        // const commentFormMarkup = authenticated ? (
            
        // ):null
        return (
            <Fragment>
                <Grid item sm={12} style={{textAlign: 'center'}}>
                <div style={{maxWidth: '800px',margin: '0 auto'}}>
                
                <form onSubmit={this.submitChatMessage}>
                    <TextField
                        name="body"
                        type="text"
                        label="Write your message"
                        value = {this.state.chatMessage}
                        onChange = {this.handleSearchChange}
                        fullWidth
                        className={classes.textField}
                        >
                            
                    </TextField>
                    <Button type = "submit"
                            variant="contained" 
                            color="primary"
                            className={classes.button}
                            onClick={this.submitChatMessage}
                    ><SendIcon></SendIcon>
                    </Button>
                    
                </form>
                
                <div styles={{maxWidth: '800px', margin: '0 auto'}}>
                    {this.props.chats && (
                        <div>{this.renderCards}</div>
                    )}

                    <div
                        ref={el=>{
                            this.messagesEnd = el;
                        }}
                    />    
                </div>
                </div>
                {/* <hr className={classes.visibleSeparator} /> */}
            </Grid>
            </Fragment>
        )
    }
}

// CommentForm.propTypes = {
//     submitComment: PropTypes.func.isRequired,
//     UI:PropTypes.object.isRequired,
//     classes:PropTypes.object.isRequired,
//     screamId:PropTypes.string.isRequired,
//     authenticated:PropTypes.bool.isRequired
// }
chatRoom.protoTypes={
    chats: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    user: state.user,
    chats: state.chats
})

// export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
export default connect(mapStateToProps)(withStyles(styles)(chatRoom))
