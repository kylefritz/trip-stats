import React, { Component } from 'react'
import {BarChart} from 'react-d3-basic'
import * as _ from 'underscore'

export default class Histogram extends Component {
  render() {
    const chartSeries = [{
      field: 'count',
      name: 'Count'
    }]

    return (
      <BarChart
        data={this.props.data}
        width={370}
        height={200}
        chartSeries={chartSeries}
        x={(row) => this.props.xFunction(row.date_part)}
        margins={{left: 40, right: 0, top: 10, bottom: 20}}
        legend={false}
        xLabel={this.props.xLabel}
        xScale="ordinal"
        showXGrid={false}
        showYGrid={false}
        showLegend={false}
      />
    )
  }
}
