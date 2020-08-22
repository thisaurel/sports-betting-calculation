import React, { Component } from 'react';
import * as calc from'../helpers/calc.js';

class Profit extends Component {
    render() {
        let sum = calc.round2(this.props.sum);
        let sign = sum < 0 ? '-' : '+';
        let className = sum < 0 ? 'text-danger' : 'text-success';
        sum = Math.abs(sum);
        return (
            <span className={className}>{sign}{sum} €</span>
        );
    };
}

export default Profit; 