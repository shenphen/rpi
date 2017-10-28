import React from 'react';

import styles from './State.css';

class State extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: {
                temperature: null,
                humidity: null,
                time: null,
            }
        }

        this.th = null;
    }

    componentDidMount() {
        this.th = setInterval(() => {
            fetch('/params?recent=true')
            .then(res => {
                res.json().then(json => {
                    
                    this.setState({
                        current: {
                            temperature: json.data[0],
                            humidity: json.data[1],
                            time: json.data[2]
                        }
                    })
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }, 2200)
    }

    componentWillUnmount() {
        clearInterval(this.th);
    }

    render() {
        return (
            <div>
                <h2>Stan</h2>

                Obecna temperatura: {this.state.temperature && this.state.temperature[0]}
                Obecna wilgoć: {this.state.humidity && this.state.humidity[0]}%
            </div>
        )
    }
}

export default State;