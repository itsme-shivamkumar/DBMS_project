export default {
  
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
  invisibleSeparator:{
    border:'none',
    margin: 4
},


paper: {
  padding: 20
},
profile: {
  '& .image-wrapper': {
    textAlign: 'center',
    position: 'relative',
    '& button': {
      position: 'absolute',
      top: '80%',
      left: '70%'
    }
  },
  '& .profile-image': {
    width: 200,
    height: 200,
    objectFit: 'cover',
    maxWidth: '100%',
    borderRadius: '50%'
  },
  '& .profile-details': {
    textAlign: 'center',
    '& span, svg': {
      verticalAlign: 'middle'
    },
    '& a': {
      color: '#f57f17'
    }
  },
  '& hr': {
    border: 'none',
    margin: '0 0 10px 0'
  },
  '& svg.button': {
    '&:hover': {
      cursor: 'pointer'
    }
  }
},
buttons: {
  textAlign: 'center',
  '& a': {
    margin: '20px 10px'
  }
}


}