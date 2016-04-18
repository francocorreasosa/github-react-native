'use strict';

import React, {
  Text,
  View,
  Image
} from 'react-native';
import moment from 'moment';

import styles from './styles';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.event
    }
  }
  render() {

    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.state.event.actor.avatar_url}}
          style={styles.actorImage}
        />

        <Text style={styles.createdAt}>
          {moment(this.state.event.created_at).format('ll')}
        </Text>

        <Text style={styles.createdAt}>{this.state.event.actor.login}</Text>
        <Text>created {this.state.event.repo.name}</Text>
      </View>
    );
  }
}

export default EventDetail;
