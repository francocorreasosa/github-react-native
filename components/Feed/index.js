'use strict';

import React, {
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight
} from 'react-native';

// node modules
import moment from 'moment';

// components
import EventDetail from '../EventDetail';

// styles
import styles from './styles';

// services
import AuthService from '../../services/AuthService';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(['a','b','c']),
      showProgress: true

    }
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    new AuthService().getAuthInfo((err, authInfo) => {
      var url = `https://api.github.com/users/${authInfo.user.login}/received_events`;

      fetch(url, {
        headers: authInfo.header
      })
      .then((response) => response.json())
      .then((responseData) => {
        // var feedItems = responseData.filter((ev) => {
          // ev.type == 'PushEvent'
        // });
        var feedItems = responseData;
        console.log('feedItems', feedItems);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        })
      })
    });
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Event',
      component: EventDetail,
      passProps: {
        event: rowData
      }
    });
  }

  renderRow(rowData) {
    // TODO: Support more event types
    switch (rowData.type) {
      case 'CreateEvent':
        return (
          <TouchableHighlight
            onPress={() => this.pressRow(rowData)}
            underlayColor='#eee'>
            <View style={styles.listRow}>
              <Image
                source={{uri: rowData.actor.avatar_url}}
                style={styles.listRowImage}
              />

              <View style={styles.listRowContent}>
                <Text>
                  {rowData.actor.login}
                </Text>
                <Text>
                created <Text style={styles.strongText}>{rowData.repo.name}</Text>
                </Text>
                <Text style={{color: '#777'}}>
                  {moment(rowData.created_at).fromNow()}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        );
        break;
      default:
        return (<View></View>);
    }

  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={styles.preloadingContainer}>
          <ActivityIndicatorIOS
            size="large"
            animating={true}
          />
        </View>
      )
    }

    return (
      <View style={styles.listViewContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

export default Feed;
