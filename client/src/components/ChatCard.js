import React, {  Fragment } from 'react'
// import PropTypes from 'prop-types'
// import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
//MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const classes = {
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
          marginTop: 20
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
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData:{
        marginLeft: 20
    },
    invisibleSeparator:{
        border:'none',
        margin: 4
    }
}

function ChatCard(props) {
    return (
        <Fragment key={props.createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={props.sender.imageUrl} alt="comment" className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography variant = "h5" component={Link} to={`/users/${props.sender.userHandle}`} color="primary">
                                                {props.sender.userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(props.createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/>
                                            <Typography variant="body1">{props.message}</Typography>

                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
        </Fragment>
        

    )
}

export default ChatCard
