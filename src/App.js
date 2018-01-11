import React, { Component } from 'react';
import './App.css';
import Post from './Post';
import ReactLoading from 'react-loading';

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
              <main className="main">
                  <ul className="pic-list">
                      {this.props.pics.map((pic, index) => {
                          const url = pic.data.preview ? pic.data.preview.images[0].source.url : pic.data.url;
                          const title = pic.data.title;
                          const author = pic.data.author;
                          return (<li className="pic-list__item" key={url}>
                              <Post index={index}
                                    title={title}
                                    author={author}
                                    url={url} />
                          </li>);
                      })}
                  </ul>

                  {this.props.loading ? <ReactLoading  type="spin" className="spinner" /> : null}
                  <button className="btn btn_more" onClick={this.props.loadMorePics}>More pics</button>
              </main>
          </div>
        );
    }
}
