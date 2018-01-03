import { connect } from 'react-redux';
import App from './App';
import { getPics, clearPics, loadMorePics } from './actions';

const mapStateToProps = (state, ownProps) => ({ pics: state.pics });
const mapDispatchToProps = { getPics, clearPics, loadMorePics };
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;