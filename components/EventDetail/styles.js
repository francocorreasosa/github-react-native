'use strict';

import React, {
  StyleSheet,
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  actorImage: {
    height: 120,
    width: 120,
    borderRadius: 15
  },
  createdAt: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  }
});
