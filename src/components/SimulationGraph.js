import React from 'react';
import { Line } from 'react-chartjs-2';

class SimulationGraph extends React.Component {
  static defaultProps = {
    xLabel: "Time"
  }

  constructor(props) {
    super(props)
    this.data = this.data.bind(this);
  }

  colours = [ '#34225c', '#71286b', '#aa2d6c', '#db425f', '#fc6749', '#ff9729', '#ffcb00', '#e6ff1c' ]

  // Keep arrays short so the graphs don't eat a ton of memory
  filter(arr, n_max) {
    if (arr.length < n_max)
      return arr;
    
    let stride = Math.floor(arr.length / n_max);
    let out = [];
    let i;
    for (i = 0; i < arr.length; i += stride) {
      out.push(arr[i]);
    }

    return out;
  }

  data() {
    const n = 1000;
    return {
      labels: this.filter(this.props.x, n),
      datasets: Object.keys(this.props.y).map(id => {
        return {
          label: this.props.configs[id].name,
          data: this.filter(this.props.y[id], n),
          fill: false,
          pointRadius: 0,
          borderColor: this.colours[this.props.configs[id].num % this.colours.length]
        }
      })
    };
  }

  render() {
    return <Line data={this.data()} options={{
      maintainAspectRatio: false,
      title: {
        display: true,
        text: this.props.title,
        fontSize: 16
      },
      legend: {
        display: this.props.legend ? true : false
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: { 
            callback: (v) => parseFloat(v.toFixed(5)),
            autoskip: true,
            maxTicksLimit: 10
          },
          scaleLabel: {
            display: this.props.xLabel !== undefined,
            labelString: this.props.xUnit !== undefined ? ( this.props.xLabel + " (" + this.props.xUnit.name + ")" ) : this.props.xLabel
          }
        }],
        yAxes: [{
          display: true,
          label: { callback: (v) => parseFloat(v.toFixed(3)) },
          scaleLabel: {
            display: this.props.yLabel !== undefined,
            labelString: this.props.yUnit !== undefined ? ( this.props.yLabel + " (" + this.props.yUnit.name + ")" ) : this.props.yLabel
          }
        }]
      },
      tooltips: {
        callbacks: { 
          title: (i, v) => this.props.xLabel + ": " + parseFloat(parseFloat(i[0].xLabel).toFixed(5))
        }
      }
    }} />
  }
}

export default SimulationGraph;