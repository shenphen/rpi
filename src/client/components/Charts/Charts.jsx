import React from 'react';

import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, styler } from "react-timeseries-charts";

import series from './data';

const styles = styler([
    {key: "humidity", color: "steelblue", width: 1, dashed: true},
    {key: "precip", color: "#F68B24", width: 2}
]);

class ChartsComponent extends React.Component {
    render() {
        return (
            <Resizable>
                <ChartContainer timeRange={series.range()} >
                    <ChartRow height="300">
                        <YAxis
                            id="rain"
                            label="Rainfall (inches/hr)"
                            min={0}
                            max={1.5}
                            format=".2f"
                            width="70"
                            type="linear"
                        />
                        <Charts>
                            <LineChart
                                axis="rain"
                                columns={["precip"]}
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