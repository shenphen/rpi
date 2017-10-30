import React from 'react';

import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, styler } from "react-timeseries-charts";

import series from './data';

const styles = styler([
    {key: "humidity", color: "steelblue", width: 1, dashed: true},
    {key: "temperature", color: "#F68B24", width: 2}
]);

class ChartsComponent extends React.Component {
    render() {
        return (
            <Resizable>
                <ChartContainer timeRange={series.range()} >
                    <ChartRow height="600">
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
        )
    }
}

export default ChartsComponent;