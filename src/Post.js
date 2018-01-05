import React from 'react';

const Post = (props) => (
    <div>
        <div className="pic-list__index"> #{props.index + 1}</div>
        <figure className="pic-list__figure">
            <a href={props.url} target="_blank" title={props.title}>
                <img className="pic-list__img" src={props.url} />
            </a>
            <figcaption className="pic-list__caption">
                <p className="pic-list__description">&laquo; {props.title} &raquo;</p>
                <a className="pic-list__author"
                   target="_blank"
                   href={`https://www.reddit.com/user/${props.author}`}>
                    Author: {props.author}
                </a>
            </figcaption>
        </figure>
    </div>
);

export default Post;
