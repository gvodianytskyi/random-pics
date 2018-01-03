import { connect } from 'react-redux';
import Post from './Post';

const mapStateToProps = (state, ownProps) => ({
    pic: ownProps.pic,
    index: ownProps.index
});

const PostContainer = connect(mapStateToProps)(Post);
export default PostContainer;

