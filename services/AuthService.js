import buffer from 'buffer';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(cb) {
    console.log("Requesting data from AsyncStorage");
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      if (err) {
        console.log("error if(err)");
        return cb(err);
      }

      if (!val) {
        console.log("error if(val)");
        return cb(); // same as cb(null);
      }

      console.log("val", val);

      var authk = val[0][1];
      var userk = val[1][1];

      if (!authk) {
        console.log("no auth key");
        return cb();
      }

      var authInfo = {
        header: {
          Authorization: `Basic ${authk}`
        },
        user: JSON.parse(userk)
      }

      console.log(authInfo);

      return cb(null, authInfo);
    })
  }

  login(creds, cb) {
    var b = new buffer.Buffer(`${creds.username}:${creds.password}`);
    var encodedAuth = b.toString('base64');

    console.log(encodedAuth);

    fetch('https://api.github.com/user',{
      headers: {
        'Authorization': `Basic ${encodedAuth}`
      }
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401,
          success: false
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        AsyncStorage.multiSet([
          [authKey, encodedAuth],
          [userKey, JSON.stringify(results)]
        ], (err) => {
          if (err) {
            throw err;
          }

          return cb({success: true});
        });
      })
      .catch((err) => {
        return cb(err);
      });
  }
}

export default AuthService;
