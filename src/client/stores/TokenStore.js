import { observable } from 'mobx';

const EXPIRATION_TIME_IN_SECONDS = 180;

class tokenStore {
    @observable secondsLeft = EXPIRATION_TIME_IN_SECONDS;
    @observable token = '';

    constructor() {
        this.token = sessionStorage.token || '';
        this.timer = null;

        this.handleLeave = this.handleLeave.bind(this);
        this.setToken = this.setToken.bind(this);
        this.refreshTimer = this.refreshTimer.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
    }

    refreshTimer() {
        this.secondsLeft = EXPIRATION_TIME_IN_SECONDS;
    }

    setToken(token) {
        this.token = sessionStorage.token = token;

        if(!this.timer) {
            this.timer = setInterval(() => {
                this.secondsLeft > 0 ? this.secondsLeft-- : this.handleLeave();
            }, 1000);
        }
    }

    get timeLeftInSeconds() {
        return this.secondsLeft;
    }

    handleLeave() {
        this.token = sessionStorage.token = '';
        clearInterval(this.timer);
        this.setInitialState();
    }

    setInitialState() {
        this.timer = null;
        this.secondsLeft = EXPIRATION_TIME_IN_SECONDS;
    }
}

export default tokenStore;
