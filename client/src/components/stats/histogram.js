import React, { Component } from 'react'
import {BarChart} from 'react-d3-basic'

export default class Histogram extends Component {
  render() {
    if(this.props.loading){
      return <div>Loading...</div>
    }
    
    const chartSeries = [{
      field: 'count',
      name: 'Count'
    }]

    return (
      <BarChart
        data={this.props.data}
        width={450}
        height={150}
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
