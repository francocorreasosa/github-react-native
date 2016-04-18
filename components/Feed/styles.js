'use strict';

import React, {
  StyleSheet,
} from 'react-native';

module.exports = StyleSheet.create({
  listViewContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 60
  },
  listRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#d7d7d7',
    borderBottomWidth: 1
  },
  listRowImage: {
    height: 36,
    width: 36,
    borderRadius: 5
  },
  listRowContent: {
    paddingLeft: 20
  },
  preloadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  strongText: {
    fontWeight: 'bold'
  }
});
