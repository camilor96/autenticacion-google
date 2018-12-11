import React, { Component } from 'react';
import firebase from 'firebase';
//import StyledFirebaseAuth from 'react-firebaseui/StyleFirebaseAuth';
import './autenticacion.css';
import logo from './logo.png';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { userInfo } from 'os';


class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  handleAuthf(){
    const provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha Salido`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }


  renderLoginButton(){
    const styles={
      text: {
        color: 'white'
      },
      facebook: {
        margin: '0px 0px 0px 20px',
        width:"155px",
        backgroundColor:"#475993"
      },
      google: {
        margin: '0px 0px 0px -25px',
        width:"155px",
        backgroundColor:"#F34A38"
      }

  }
    
    //Si el usuario esta logeado
    if(this.state.user){
      return (
        <div>
          <br></br>
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>¡Hola {this.state.user.displayName}!</p>
          <Button variant="contained" color="primary" onClick={this.handleLogout}>Salir</Button>
        </div>
      );
    }else {
      //Si no lo esta
      return(
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <img src={logo} className="App-logo" alt="logo" />
          </Grid>
          <main className="main">
            <form className="form">
                <FormControl margin="normal" required fullWidth>
                  <InputLabel style={styles.text} htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel style={styles.text} htmlFor="password">Password</InputLabel>
                  <Input  name="password" type="password" id="password" autoComplete="current-password" />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="acceder1"
                >
                  Sign in
                </Button>
                <Grid item xs={12}>
                  <br></br>
                  <a
                      className="App-link"
                      href="www.grupoasistencia.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                </Grid>
            </form>
          </main>
          <br></br>
          <Grid item xs={6} sm={3} >
            <Button style={styles.facebook} variant="contained" color="primary" onClick={this.handleAuthf}><i style={{paddingRight:10}} class="fab fa-facebook-square"></i> Acceder</Button>
          </Grid>
          <Grid item xs={6} sm={3} >
            <Button style={styles.google} variant="contained" color="secondary" onClick={this.handleAuth}><i style={{paddingRight:10}} class="fab fa-google-plus-g"></i> Acceder</Button>
          </Grid>
          <Grid item xs={12}>
            <span>¿Aún no tienes cuenta? <a
                className="App-link"
                href="www.grupoasistencia.com"
                target="_blank"
                rel="noopener noreferrer">
                Registrate</a></span>
          </Grid>
          <Grid item xs={12}> 
            <a
              className="App-link"
              href="www.grupoasistencia.com"
              target="_blank"
              rel="noopener noreferrer">
              Términos y condiciones</a>
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    const style={
      container:{
          color: '#44546b',
          cursor: 'pointer',
          width: 260,
          border: '1px solid red'
      }
  }
    return (
      <div className="App">       
          { this.renderLoginButton() }
      </div>
    );
  }
}

export default App;
