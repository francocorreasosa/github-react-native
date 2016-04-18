'use strict';

import React, {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';
import styles from './styles';
import AuthService from '../../services/AuthService';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showProgress: false
    }
  }

  render() {
    var errorCtrl = (<View />);

    if (!this.state.success && this.state.badCredentials) {
      errorCtrl = (<Text style={styles.error}>
        That username and password combination did not work
      </Text>);
    }

    if (!this.state.success && this.state.unknownError) {
      errorCtrl = (<Text style={styles.error}>
        We experienced an unexpected issuefrabc
      </Text>);
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('image!Octocat')}
        />
        <Text style={styles.heading}>
          GitHub Browser
        </Text>
        {/* This only will shown if there is an error */}
        {errorCtrl}
        <TextInput
          style={styles.input}
          placeholder="GitHub username"
          onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="GitHub password"
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          size="large"
          style={styles.loader}
        />

      </View>
    );
  }

  onLoginPressed() {
    console.log("pressed");
    console.log(this.state);

    this.setState({showProgress: true});

    new AuthService().login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if (results.success && this.props.onLogin) {
        this.props.onLogin();
      }
    });
  }
}

export default Login;
