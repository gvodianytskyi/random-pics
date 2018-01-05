import React, { Component } from 'react';
import './App.css';
import Post from './Post';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPics();
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    componentDidUpdate() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        if (document.body.getBoundingClientRect().bottom - window.innerHeight < 5) {
            this.props.loadMorePics();
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    render() {
        return (
          <div className="App">
              <header className="header">Reddit pics</header>
              <ul className="pic-list">
                  {this.props.pics.map((pic, index) => {
                      return (<li className="pic-list__item" key={index}>
                          <Post index={index}
                                title={pic.data.title}
                                author={pic.data.author}
                                url={pic.data.preview.images[0].source.url}
                          />
                      </li>);
                  })}
              </ul>
              <button className="btn btn_more" onClick={this.props.loadMorePics}>More pics</button>
          </div>
        );
    }
}
