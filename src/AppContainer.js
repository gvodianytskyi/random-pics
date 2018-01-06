import { connect } from 'react-redux';
import App from './App';
import { getPics, clearPics, loadMorePics, showSpinner, hideSpinner } from './actions';

const mapStateToProps = (state, ownProps) => ({ pics: state.pics, loading: state.loading });
const mapDispatchToProps = { getPics, clearPics, loadMorePics, showSpinner, hideSpinner };
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;