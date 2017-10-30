import React from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, styler } from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";

const styles = styler([
    {key: "humidity", color: "steelblue", width: 1, dashed: true},
    {key: "temperature", color: "#F68B24", width: 2}
]);

@inject('currentStateStore')
@observer
class State extends React.Component {

    render() {

        const [ temperature, humidity, time ] = this.props.currentStateStore.data;
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

                <div>
                    <p>Parametry procesu z czasu: {time && moment.unix(time).format('DD.MM.Y HH:mm:ss')}</p>
                    <p>Temperatura: {temperature && temperature[temperature.length - 1] + '℃'}</p>
                    <p>Wilgoć: {humidity && humidity[humidity.length - 1] + '%'}</p>
                </div>

                {series && <Resizable>
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
}

export default State;