import { TimeSeries, Index } from "pondjs";

import { data as temperature } from './temperature.json';
import { data as humidity } from './humidity.json';

const series = new TimeSeries({
    name: "hilo_rainfall",
    columns: ["index", "temperature", "humidity"],
    points: temperature.map(([d, value], index) => [
        Index.getIndexString("1s", new Date(d*1000+7200000)),
        value,
    ])
});
  
export default series;