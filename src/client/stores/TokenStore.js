import { observable } from 'mobx';

const EXPIRATION_TIME_IN_SECONDS = 180;

class tokenStore {
    @observable secondsLeft = EXPIRATION_TIME_IN_SECONDS;
    @observable token = '';

    constructor() {
        this.token = sessionStorage.token || '';
        this.timer = null;

        this.removeToken = this.removeToken.bind(this);
        this.setToken = this.setToken.bind(this);
        this.refreshTimer = this.refreshTimer.bind(this);
    }

    refreshTimer() {
        this.secondsLeft = EXPIRATION_TIME_IN_SECONDS;
    }

    setToken(token) {
        this.token = sessionStorage.token = token;

        if(!this.timer) {
            this.timer = setInterval(() => {
                this.secondsLeft > 0 ? this.secondsLeft-- : this.removeToken();
            }, 1000);
        }
    }

    get timeLeftInSeconds() {
        return this.secondsLeft;
    }

    removeToken() {
        this.token = sessionStorage.token = '';
        clearInterval(this.timer);
    }
}

export default tokenStore;
