import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import logo from './cheese.png';
import './App.css';
import ContactPage from './Components/ContactPage';
import ThanksPage from './Components/ThanksPage';
import 'whatwg-fetch';

const URL = "https://a910slh7gc.execute-api.us-east-1.amazonaws.com/production/contact-us";

class App extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)

    this.state = {
      done: false
    }
  }

  submit(values) {
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then((response) => {
      // const data = response.json()
      this.setState({
        done: true
      })
    })
    .catch(() => {
      console.error('an error has occurred')
    })
  }

  render() {
    return (
      <div className="container">
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Contact The Great Cheese</h1>
          </header>
        </div>
      <Router>
        <div>
          <Route exact path="/" render={(props) => this.state.done ? <Redirect to="/thanks" />: <ContactPage {...props} onSubmit={this.submit} />} />
          <Route path="/thanks" render={(props) => this.state.done ? <ThanksPage /> : <Redirect to="/" />} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
