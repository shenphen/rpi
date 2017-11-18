import React from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, styler } from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";
import RadioButton from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import io from 'socket.io-client';
import styles from './State.css';

const socket = io(window.location.origin);

const chartStyles = styler([
    {key: "humidity", color: "steelblue", width: 1, dashed: true},
    {key: "temperature", color: "#F68B24", width: 2}
]);

const Diode = ({ label, color, active }) => {
    return (
        <div className={styles.state}>
            {label} 
            <div className={styles.diodeWrapper}>
                <div className={`${styles.diode} ${styles[color]}`}></div>
            </div>
        </div>
    )
}

@inject('currentStateStore')
@observer
class State extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            manualControl: false,
            manualControlState: {
                heater: false,
                cooler: false,
                humiditifier: false
            },
            autoControl: null,
        }

        this.onToggle = this.onToggle.bind(this);

        socket.on('connect', () => console.log('connect'));
        socket.on('control', this.onControl.bind(this));
        socket.on('disconnect', () => {this.setState({manualControl: false}); console.log('disconnect')});

    }

    render() {

        const [ temperature, humidity, time ] = this.props.currentStateStore.data;
        const { manualControl, autoControl } = this.state;

        const series = new TimeSeries({
            name: "current_temp_hum",
            columns: ["index", "temperature", "humidity"],
            points: time ? time.map((date, index) => [
                Index.getIndexString("2s", new Date(date*1000)),
                temperature[index],
                humidity[index]
            ]) : []
        })

        return (
            <div>
                <h2>Stan</h2>

                <div className={styles.info}>
                    <div>
                        <p>Parametry procesu z czasu: {time && moment.unix(time[time.length - 1]).format('DD.MM.Y HH:mm:ss')}</p>
                        <p>Temperatura: {temperature && temperature[temperature.length - 1] + '℃'}</p>
                        <p>Wilgoć: {humidity && humidity[humidity.length - 1] + '%'}</p>
                    </div>
                    <div>
                        <span>Rodzaj sterowania</span>
                        <RadioButton
                            label="Ręczne" checked={manualControl}
                            onClick={() => {
                                this.setState({manualControl: true});
                                socket.emit('control', {
                                    manualControl: true,
                                    state: autoControl
                                });
                            }}
                        />
                        <RadioButton
                            label="Automatyczne" checked={!manualControl}
                            onClick={() => {
                                this.setState({manualControl: false});
                                socket.emit('control', {
                                    manualControl: false,
                                });
                            }}
                        />
                    </div>

                    {manualControl ?
                        <div>
                            <Toggle
                            name="heater"
                            label="Ogrzewanie"
                            defaultToggled={autoControl && autoControl.heater}
                            style={{marginBottom: 16}}
                            thumbStyle={{backgroundColor: '#ffcccc'}}
                            thumbSwitchedStyle={{backgroundColor: 'red'}}
                            trackSwitchedStyle={{backgroundColor: '#ff9d9d'}}
                            onToggle={(e, value) => this.onToggle(e, value)}
                            />
                            <Toggle
                            name="cooler"
                            label="Klimatyzacja"
                            defaultToggled={autoControl && autoControl.cooler}
                            style={{marginBottom: 16}}
                            thumbStyle={{backgroundColor: '#1A99FF'}}
                            thumbSwitchedStyle={{backgroundColor: '#006DC4'}}
                            trackSwitchedStyle={{backgroundColor: '#7AC4FF'}}
                            onToggle={(e, value) => this.onToggle(e, value)}
                            />
                            <Toggle
                            name="humiditifier"
                            label="Zraszacz"
                            defaultToggled={autoControl && autoControl.humiditifier}
                            style={{marginBottom: 16}}
                            thumbStyle={{backgroundColor: '#91FF70'}}
                            thumbSwitchedStyle={{backgroundColor: '#34E300'}}
                            trackSwitchedStyle={{backgroundColor: '#99FF7A'}}
                            onToggle={(e, value) => this.onToggle(e, value)}
                            />
                        </div>
                        :
                        <div>
                            <Diode label="Ogrzewanie" color={autoControl && autoControl.heater ? "red" : "disabled"} />
                            <Diode label="Klimatyzacja" color={autoControl && autoControl.cooler ? "blue" : "disabled"} />
                            <Diode label="Zraszacz" color={autoControl && autoControl.humiditifier ? "green" : "disabled"} />
                        </div>
                    }
                </div>

                {series.length && <Resizable>
                    <ChartContainer timeRange={series.range()} >
                        <ChartRow height="450">
                            <YAxis
                                id="temperature"
                                label="Temperature [℃]"
                                min={0}
                                max={40}
                                format=".2f"
                                width="70"
                                type="linear"
                            />
                            <Charts>
                                <LineChart
                                    axis="temperature"
                                    columns={["temperature"]}
                                    series={series}
                                    style={chartStyles}
                                />
                                <LineChart
                                    axis="humidity"
                                    columns={["humidity"]}
                                    series={series}
                                    style={chartStyles}
                                />
                            </Charts>
                            <YAxis
                                id="humidity"
                                label="Humidity [%]"
                                min={0}
                                max={100}
                                format=".2f"
                                width="70"
                                type="linear"
                            />
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
                }
            </div>
        )
    }

    onToggle(e, value) {
        let state = {...this.state.manualControlState};
        state[e.target.name] = value;

        this.setState({manualControlState: state});

        socket.emit('control', {
            manualControl: true,
            state
        });
    }

    onControl(data) {
        console.log('data', data);
        if(data.autoControl && data.state) {
            const { cooler, heater, humiditifier } = data.state;
            this.setState({
                autoControl: {
                    cooler,
                    heater,
                    humiditifier
                }
            });
        }
        else {
            this.setState({
                autoControl: null
            })
        }
    }
}

export default State;