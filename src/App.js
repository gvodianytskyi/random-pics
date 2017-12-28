import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';

import { getPics, clearPics } from './actions';


export class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPics();
    }

    render() {
        return (
          <div className="App">
              <header className="header">Reddit pics</header>
              <ul className="pic-list">
                  {this.props.pics.map((pic, index) => (
                      <li className="pic-list__item" key={index}>
                          <div className="pic-list__index"> #{index + 1}</div>
                          <figure className="pic-list__figure">
                              <img className="pic-list__img" src={pic.data.url} />
                              <figcaption className="pic-list__caption">
                                  <p className="pic-list__description">&laquo; {pic.data.title} &raquo;</p>
                                  <div className="pic-list__author">Author: {pic.data.author}</div>
                              </figcaption>
                          </figure>
                      </li>
                  ))}
              </ul>
          </div>
        );
    }
}

// AppContainer.js
const mapStateToProps = (state, ownProps) => ({ pics: state.pics });
const mapDispatchToProps = { getPics, clearPics };
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;