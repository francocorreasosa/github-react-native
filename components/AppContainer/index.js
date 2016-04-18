'use strict';

import React, {
  Text,
  View,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';
import styles from './styles';
import Feed from '../Feed';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'feed'
    }
  }
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab == 'feed'}
          icon={require('image!inbox')}
          onPress={() => this.setState({selectedTab: 'feed'})}>

          <NavigatorIOS
            style={{
              flex: 1
            }}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }}
          />

        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab == 'search'}
          icon={require('image!search')}
          onPress={() => this.setState({selectedTab: 'search'})}>

          <View style={styles.container}>
            <Text>Tab 2</Text>
          </View>

        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

export default AppContainer;
