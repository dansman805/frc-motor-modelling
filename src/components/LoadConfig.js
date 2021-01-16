import React from 'react';
import { Form } from 'react-bootstrap';
import RowInput from './RowInput';

class LoadConfig extends React.PureComponent {
  render() {
    return <Form>
      <RowInput
        label='Load Mass'
        type='number'
        min={0}
        value={this.props.load.mass}
        onChange={ e => { this.props.update({ mass: parseFloat(e.target.value) }) } }
        unit='kg'
      />
      <RowInput
        className='mt-2'
        label='Load Angle (from horizon)'
        type='number'
        min={0} max={360} step={1}
        value={ this.props.load.angle }
        onChange={ e => this.props.update({ angle: parseFloat(e.target.value) }) }
        unit='deg'
        tooltip='Load angle from the horizon, to calculate effective weight of the load.
        For example, a drivebase will have 0 load angle (horizontal), while an elevator will be 90 (vertical).'
      />
    </Form>
  }
}

export default LoadConfig;