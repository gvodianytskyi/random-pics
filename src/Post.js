import React from 'react';

const Post = (props) => (
    <div>
        <div className="pic-list__index"> #{props.index + 1}</div>
        <figure className="pic-list__figure">
            <a href={props.pic.data.preview.images[0].source.url}
               target="_blank"
               title={props.pic.data.title}>
                <img className="pic-list__img" src={props.pic.data.preview.images[0].source.url} />
            </a>
            <figcaption className="pic-list__caption">
                <p className="pic-list__description">&laquo; {props.pic.data.title} &raquo;</p>
                <a className="pic-list__author"
                   target="_blank"
                   href={`https://www.reddit.com/user/${props.pic.data.author}`}>
                    Author: {props.pic.data.author}
                </a>
            </figcaption>
        </figure>
    </div>
);

export default Post;
