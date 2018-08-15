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

class App extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)

    this.state = {
      done: false
    }
  }

  submit(values) {
    console.log(values)
    this.setState({
      done: true
    })
  }

  render() {
    return (
      <div className="container">
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Contact The Great Cheese</h1>
            <p className="App-intro">
              Please send us a message and we'll get back to you as soon as possible.
            </p>
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
