/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

// components
import Login from './components/Login';
import AppContainer from './components/AppContainer';

// Services
import AuthService from './services/AuthService';

class GithubExplorer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      checkingAuth: true
    };
  }

  componentDidMount() {
    new AuthService().getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        loggedIn: authInfo != null
      });
    });
  }

  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={true}
            size='large'
            style={styles.loader} />
        </View>
      )
    }

    if (!this.state.loggedIn) {
      console.log(this.state.loggedIn);
      return (
        <Login
          onLogin={this.onLogin.bind(this)}
        />
      );
    } else {
      return (
        <AppContainer />
      );
    }
  }

  onLogin() {
    console.log('successfully logged in');
    this.setState({loggedIn: true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('GithubExplorer', () => GithubExplorer);
