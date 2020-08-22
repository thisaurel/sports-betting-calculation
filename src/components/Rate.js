import React, { Component } from 'react';

class Rate extends Component {
    render() {
        let value = this.props.value;
        let className = '';
        
        if (value < 80) {
            className = 'lose'
        } else if (value > 100) {
            className = 'win';
        }
        
        return (
            <span className={className}>{value}</span>
        );
    }
}

export default Rate;