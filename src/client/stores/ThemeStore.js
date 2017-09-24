import { observable } from 'mobx';

class ThemeStore {
  @observable timer = 0;
  @observable darkTheme = false;

  constructor() {
    // setInterval(() => {
    //   this.timer += 1;
    // }, 1000);

    this.changeTheme = this.changeTheme.bind(this);
  }

  resetTimer() {
    this.timer = 0;
  }

  changeTheme() {
    this.darkTheme = !this.darkTheme;
  }

  set darkTheme(value) {
    this.darkTheme = value;
  }
}

export default ThemeStore;
