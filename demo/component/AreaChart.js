import React from 'react';
import { changeNumberOfData } from './utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Brush,
  ReferenceLine, ReferenceDot } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E',  pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 1220, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 2300, pv: 4300, amt: 2100 },
];
const data02 = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
];

const data03 = [
  {"today": 388085.8, "offline": 532724.8, "date": 0},
  {"today":553276.3,"offline":765888,"date":1},
  {"today":635559.1,"offline":887238.2,"date":2},
  {"today":686320,"offline":954904,"date":3},
  {"today":727945.5,"offline":989444.1,"date":4},
  {"today":782391.7,"offline":1048854.4,"date":5},
  {"today":920114.7,"offline":1194713.6,"date":6},
  {"today":1153627.2,"offline":1561516.4,"date":7},
  {"today":1625349.5,"offline":2234697.5,"date":8},
  {"today":3608223.6,"offline":3365376,"date":9},
  {"today":5219551.6,"offline":5820587.5,"date":10},
  {"today":6238297.6,"offline":7243728.9,"date":11},
  {"today":7233577.9,"offline":10023517.3,"date":12},
  {"today":8179879.1,"offline":11383026,"date":13},
  {"today":9096577.6,"offline":12522850,"date":14},
  {"today":9915164.4,"offline":16611556.3,"date":15},
  {"today":null,"offline":17881602.4,"date":16},
  {"today":null,"offline":18952052.9,"date":17},
  {"today":null,"offline":20062353.7,"date":18},
  {"today":null,"offline":21172548.2,"date":19},
  {"today":null,"offline":22425981.5,"date":20},
  {"today":null,"offline":23724919.7,"date":21},
  {"today":null,"offline":24911034.6,"date":22},
  {"today":null,"offline":25763200.4,"date":23}
];

const initilaState = { data, data02 };

const CustomTooltip = React.createClass({
  render() {
    const { active, payload, external, label } = this.props;

    if (active) {
      const style = {
        padding: 6,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
      };

      const currData = external.filter(entry => (entry.name === label))[0];

      return (
        <div className="area-chart-tooltip" style={style}>
          <p>{payload[0].name + ' : '}<em>{payload[0].value}</em></p>
          <p>{'uv : '}<em>{currData.uv}</em></p>
        </div>
      );
    }

    return null;
  },
});

const renderCustomizedActiveDot = (props) => {
  const { cx, cy, stroke, index, dataKey } = props;

  return <path d={`M${cx - 2},${cy - 2}h4v4h-4Z`} fill={stroke} key={`dot-${dataKey}`}/>;
};

const renderLabel = (props) => {
  const { x, y, textAnchor, value, index } = props;

  return <text x={x} y={y} dy={-10} textAnchor={textAnchor} key={`label-${index}`}>{value[1]}</text>
};

const RenderRect = (props) => {
  return <rect x={20} y={20} width={100} height={20} stroke="#000"/>;
};

export default React.createClass({
  displayName: 'AreaChartDemo',

  getInitialState() {
    return initilaState;
  },

  handleChangeData() {
    this.setState(() => _.mapValues(initilaState, changeNumberOfData));
  },

  render() {
    const { data, data02 } = this.state;

    return (
      <div className="area-charts">
        <a
          href="javascript: void(0);"
          className="btn update"
          onClick={this.handleChangeData}
        >
          change data
        </a>
        <br/>

        <p>Stacked AreaChart</p>
        <div className="area-chart-wrapper">
          <AreaChart width={800} height={400} data={this.state.data}
            margin={{ top: 20, right: 80, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" label="province" />
            <YAxis />
            <Tooltip />
            <Area stackId="0"
              type="monotone"
              dataKey="uv"
              stroke="#ff7300"
              fill="#ff7300"
              dot
              activeDot={renderCustomizedActiveDot}
            />
            <Area stackId="0"
              type="monotone"
              dataKey="pv"
              stroke="#387908"
              fill="#387908"
              animationBegin={1300}
              label={renderLabel}
              dot
              activeDot={renderCustomizedActiveDot}
            />
          </AreaChart>
        </div>

        <p>Stacked AreaChart | Stack Offset Expand</p>
        <div className="area-chart-wrapper">
          <AreaChart width={800} height={400} data={this.state.data}
            margin={{ top: 20, right: 80, left: 20, bottom: 5 }}
            stackOffset="expand"
          >
            <XAxis dataKey="name" label="province" />
            <YAxis />
            <Tooltip />
            <Area stackId="0"
              type="monotone"
              dataKey="uv"
              stroke="#ff7300"
              fill="#ff7300"
              dot
              activeDot={renderCustomizedActiveDot}
            />
            <Area stackId="0"
              type="monotone"
              dataKey="pv"
              stroke="#387908"
              fill="#387908"
              animationBegin={1300}
              label={renderLabel}
              dot
              activeDot={renderCustomizedActiveDot}
            />
          </AreaChart>
        </div>

        <p>Stacked AreaChart | Stack Offset Silhouette</p>
        <div className="area-chart-wrapper">
          <AreaChart width={800} height={400} data={this.state.data}
            margin={{ top: 20, right: 80, left: 20, bottom: 5 }}
            stackOffset="silhouette"
          >
            <XAxis dataKey="name" label="province" />
            <YAxis />
            <Tooltip />
            <Area stackId="0"
              type="monotone"
              dataKey="uv"
              stroke="#ff7300"
              fill="#ff7300"
              dot
              activeDot={renderCustomizedActiveDot}
            />
            <Area stackId="0"
              type="monotone"
              dataKey="pv"
              stroke="#387908"
              fill="#387908"
              animationBegin={1300}
              label={renderLabel}
              dot
              activeDot={renderCustomizedActiveDot}
            />
          </AreaChart>
        </div>

        <p>Tiny AreaChart</p>
        <div className="area-chart-wrapper">
          <AreaChart width={100}
            height={50}
            data={data.slice(0, 1)}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <Area type="monotone" dataKey="uv" stroke="#ff7300" fill="#ff7300" />
          </AreaChart>
        </div>

        <p>AreaChart with three y-axes</p>
        <div className="area-chart-wrapper">
          <AreaChart width={600}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <YAxis label="uv" type="number" yAxisId={0} stroke="#ff7300" />
            <YAxis label="pv" type="number" orientation="right" yAxisId={1} stroke="#387908" />
            <YAxis label="amt"
              type="number"
              orientation="right"
              yAxisId={2}
              stroke="#38abc8"
            />
            <XAxis dataKey="name" interval={0}/>
            <Area dataKey="uv" stroke="#ff7300" fill="#ff7300" strokeWidth={2} yAxisId={0} />
            <Area dataKey="pv" stroke="#387908" fill="#387908" strokeWidth={2} yAxisId={1} />
            <Area dataKey="amt" stroke="#38abc8" fill="#38abc8" strokeWidth={2} yAxisId={2} />
          </AreaChart>
        </div>

        <p>AreaChart of vertical layout </p>
        <div className="area-chart-wrapper" style={{ margin: 40 }}>
          <AreaChart width={400} height={400} data={data} layout="vertical"
            margin={{ top: 5, right: 30, bottom: 5, left: 5 }}
          >
            <YAxis type="category" dataKey="name" />
            <XAxis type="number" xAxisId={0} orientation="top" />
            <XAxis type="number" xAxisId={1} orientation="bottom" />
            <Area dataKey="uv"
              type="monotone"
              stroke="#ff7300"
              fill="#ff7300"
              strokeWidth={2}
              xAxisId={0}
            />
            <Area dataKey="pv"
              type="monotone"
              stroke="#387908"
              fill="#387908"
              strokeWidth={2}
              xAxisId={1}
            />
            <Tooltip />
          </AreaChart>
        </div>

        <p>AreaChart with custom tooltip</p>
        <div className="area-chart-wrapper">
          <AreaChart width={900}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, bottom: 10, left: 10 }}
          >
            <XAxis dataKey="name" hasTick />
            <YAxis tickCount={7} hasTick />
            <Tooltip content={<CustomTooltip external={data} />} />
            <CartesianGrid stroke="#f5f5f5" />
            <ReferenceLine y={7500} stroke="#387908"/>
            <ReferenceDot x="Page C" y={1398} r={10} fill="#387908" isFront/>
            <Area type="monotone"
              dataKey="pv"
              stroke="#ff7300"
              fill="#ff7300"
              fillOpacity={0.9}
            />
          </AreaChart>
        </div>

        <p>AreaChart filled with linear gradient</p>
        <div>
          <AreaChart width={800} height={400} data={this.state.data}
            margin={{ top: 20, right: 80, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="MyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(0, 136, 254, 0.8)" />
                <stop offset="95%" stopColor="rgba(0, 136, 254, 0)" />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" label="province" />
            <YAxis />
            <Tooltip />
            <Area stackId="0"
              type="monotone"
              dataKey="uv"
              stroke="#0088FE"
              strokeWidth="2"
              fillOpacity="1"
              fill="url(#MyGradient)"
              dot={{ fill: '#fff' }}
              activeDot={renderCustomizedActiveDot}
            />
          </AreaChart>
        </div>

      </div>
    );
  },
});
