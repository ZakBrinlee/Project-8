import SendBird from 'sendbird';
import {
    Platform,
    AsyncStorage
} from 'react-native';

// const APP_ID = '078105E7-BD8C-43C9-A583-59E334353965'; // test
const APP_ID = '0B7E1CDE-5B22-4850-8BC5-4F1B109CFD91'; // sample

export const sbConnect = (userId, nickname) => {
    return new Promise((resolve, reject) => {
        const sb = new SendBird({ 'appId': APP_ID });
        sb.connect(userId, (user, error) => {
            if (error) {
                reject('SendBird Login Failed.');
            } else {
                sb.updateCurrentUserInfo(nickname, null, (user, error) => {
                    if (error) {
                        reject('Update User Failed.');
                    } else {
                        resolve(user);
                    }
                })
            }
        })
    })
};

export const sbUpdateProfile = (nickname) => {
    return new Promise((resolve, reject) => {
        if (!nickname) {
            reject('Nickname is required.');
            return;
        }
        let sb = SendBird.getInstance();
        if(!sb) sb = new SendBird({'appId': APP_ID});
        sb.updateCurrentUserInfo(nickname, null, (user, error) => {
            if (error) {
                reject('Update profile failed.')
            } else {
                AsyncStorage.setItem('user', JSON.stringify(user), () => {
                    resolve(user);
                });
            }
        })
    })
}

export const sbDisconnect = () => {
    return new Promise((resolve, reject) => {
        const sb = SendBird.getInstance();
        if (sb) {
            AsyncStorage.removeItem('user', () => {
                sb.disconnect(() => {
                    resolve(null);
                });
            });
        } else {
            resolve(null);
        }
    })
}
