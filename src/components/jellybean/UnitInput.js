import React from 'react';
import { Form, Col } from 'react-bootstrap';
import HelpIcon from './HelpIcon';
import * as Units from '../../framework/Units';
import UnitSelector from './UnitSelector';

class UnitInput extends React.PureComponent {
  static defaultProps = {
    md_lab: "5",
    md_input: "3",
    md_tooltip: "1",
    md_unit: "2",
    unit: undefined,
    parse: parseFloat,
    round: 3
  };

  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  changeValue(e) {
    let val = e.target.value;
    let n = this.props.parse(val);

    if (this.props.unit) {
      this.props.onChange(new Units.Measurement(this.props.value.unit, n));
    } else {
      this.props.onChange(n);
    }
  }

  getValue() {
    let val = this.props.unit ? this.props.value.value : this.props.value;
    if (this.props.parse === parseFloat)
      val = parseFloat(val.toFixed(this.props.round))   // Parsing again is a little trick to remove trailing zeros
    return val
  }

  render() {
    var { className, md_lab, label, md_input, md_unit, md_tooltip, tooltip, unit, parse, value, onChange, ...controlProps } = this.props;
    return <Form.Row className={className}>
      {
        label ? 
          <Form.Label column="sm" md={ md_lab }>
            { label }:
          </Form.Label> : <React.Fragment />
      }
      <Col md={ md_input }>
        <Form.Control size="sm" value={ this.getValue() } onChange={ this.changeValue } {...controlProps} />
      </Col>
      <Col md={md_unit}>
        {
          unit ? 
            <UnitSelector unit={ unit } value={ value.unit } onChange={ u => onChange(value.to(u)) } />
            : <React.Fragment />
        }
      </Col>
      <Col md={ md_tooltip }>
        {
          tooltip ? 
            <HelpIcon tooltip={ tooltip } /> : <React.Fragment />
        }
      </Col>
    </Form.Row>
  }
}

export { Units };
export default UnitInput;