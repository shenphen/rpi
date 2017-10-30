import { observable } from 'mobx';

class CurrentState {
  @observable data = [];

  constructor() {
    setInterval(() => {
        fetch('/api/params?recent=true')
        .then(res => {
            res.json().then(json => {
              this.data = json.data;
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }, 2200);
  }
}

export default CurrentState;
