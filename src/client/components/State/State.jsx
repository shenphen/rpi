import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, styler } from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";

//import styles from './State.css';

const styles = styler([
    {key: "humidity", color: "steelblue", width: 1, dashed: true},
    {key: "precip", color: "#F68B24", width: 2}
]);

class State extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: {
                temperature: null,
                humidity: null,
                time: null,
            },
            series: null
        }

        this.th = null;
    }

    componentDidMount() {
        this.th = setInterval(() => {
            fetch('/api/params?recent=true')
            .then(res => {
                res.json().then(json => {

                    const temperature = json.data[0],
                          humidity = json.data[1],
                          time = json.data[2];

                    this.setState({
                        current: { temperature, humidity, time },
                        series: new TimeSeries({
                            name: "current_temp_hum",
                            columns: ["index", "temperature", "humidity"],
                            points: time ? time.map((date, index) => [
                                Index.getIndexString("1s", new Date(date*1000+7200000)),
                                temperature[index],
                                humidity[index]
                            ]) : []
                        })
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

        const { time, temperature, humidity } = this.state.current;
        const { series } = this.state;

        return (
            <div>
                <h2>Stan</h2>

                <div>
                    <p>Parametry procesu z czasu: {time && new Date(time[0]*1000 + 7200000).toDateString()}</p>
                    <p>Temperatura: {temperature && temperature[temperature.length - 1] + '℃'}</p>
                    <p>Wilgoć: {humidity && humidity[humidity.length - 1] + '%'}</p>
                </div>

                {series && <Resizable>
                    <ChartContainer timeRange={series.range()} >
                        <ChartRow height="800">
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
                                    style={styles}
                                />
                                <LineChart
                                    axis="humidity"
                                    columns={["humidity"]}
                                    series={series}
                                    style={styles}
                                />
                            </Charts>
                            <YAxis
                                id="humidity"
                                label="Humidity (%)"
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
}

export default State;