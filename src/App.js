import React, { Component } from 'react';
import './App.css';
import * as calc from'./helpers/calc.js';
import ProfitBreakdown from './components/ProfitBreakdown';

class App extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      data: {
          b1: '', o1: '', f: '', r: 80, b2: '', o2: '', c: 0
      },
      liability: 0,
      calculate: true,
      breakdown: {backWins: {}, layWins: {}}
    };
    this.calculate();
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCalculate = this.handleChangeCalculate.bind(this);
    this.invertOdds = this.invertOdds.bind(this);
}

  componentDidMount() {
    this._isMounted = true;
    this.calculate();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInitialState() {
      return JSON.parse(sessionStorage.getItem('calculator')) || {
          data: {
              b1: '', o1: '', f: '', r: 80, b2: '', o2: '', c: 0
          },
          liability: 0,
          calculate: true,
          breakdown: {backWins: {}, layWins: {}}
      };
  }

  calculate() {
    if (this._isMounted) {
      this.setState({
        liability: false,
        breakdown: {backWins: {}, layWins: {}}
      });
    }

    sessionStorage.setItem('calculator', JSON.stringify(this.state));

    let calculate = this.state.calculate;

    let b1 = parseFloat(this.state.data.b1);
    let o1 = parseFloat(this.state.data.o1);

    let b2 = parseFloat(this.state.data.b2);
    let o2 = parseFloat(this.state.data.o2);
    
    let c = parseFloat(this.state.data.c);

    if (isNaN(c)) {
      c = 0;
    }

    let liability = (b2 && o2) ? b2 * (o2 - 1) : 0;

    if (this._isMounted) {
      this.setState({
        liability: liability
      });
    }
    if (b1 && o1 && o2) {
      
      if (calculate) {
        b2 = calc.round2(b1 * o1 / (o2 - c / 100));
      }
      
      liability = calc.round2(b2 * (o2 - 1));
      let data = this.state.data;
      data.b2 = b2;

      let breakdown = {
        backWins: {back: b1 * (o1), lay: -b2},
        layWins: {back: -b1, lay: b2 * (o2)},
        rate: calc.round2(100 * o1 * (2 - c / 100) / (o1 + o2 - c / 100)),
        totalBet: b1 + b2
      };

      if (this._isMounted) {
        this.setState({
          data: data,
          liability: liability,
          breakdown: breakdown
        });
      }
    }  
  }

  handleChange(e) {
      let id = e.target.id;
      let value = e.target.value;

      let data = this.state.data;
      data[id] = value;

      if (this._isMounted) {
        this.setState({
          data: data
        }, this.calculate);
      }
  }

  handleChangeCalculate() {
    let calculate = document.getElementById('calculate').checked;
    if (this._isMounted) {
      this.setState({
        calculate: calculate
      }, () => {
          sessionStorage.setItem('calculator', JSON.stringify(this.state));
          if (calculate) {
              this.calculate();
          }
      });
    }
  }

  invertOdds() {
    let data = this.state.data;
    const odd1 = this.state.data.o1;
    data.o1 = this.state.data.o2;
    data.o2 = odd1;
    if (this._isMounted) {
      this.setState({
        data: data
      }, this.calculate);
    }
  }

  render () {
    let data = this.state.data;
    let breakdown = this.state.breakdown;
    var calculate = this.state.calculate;

    return (
        <div>
            <div className="container">
                {data.o1 < data.o2 &&
                  <div className="alert alert-warning mb-4" role="alert">
                    You reversed the odds. To invert them to maximize your winnings, <a href="#invert" onClick={this.invertOdds} className="stretched-link">click here.</a>
                  </div>
                }
                <div className="row form-body">
                    <div className="col-lg">
                        <div className="form-column">
                            <h3>Back Bet</h3>
                            <label htmlFor="b1">Bet:</label>
                            <div className="input-group mb-3">
                              <input id="b1" className="form-control" type="text" value={data.b1} onChange={ this.handleChange }/>
                              <div className="input-group-append">
                                <span className="input-group-text">€</span>
                              </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="o1">Odds: (the higher)</label>
                                <input id="o1" className="form-control" type="text" value={data.o1} onChange={ this.handleChange }/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg">
                        <div className="form-column">
                            <h3>Lay Bet</h3>
                            <label htmlFor="b1">Bet:</label>
                            <div className="input-group mb-3">
                                <input disabled={calculate} id="b2" className="form-control" type="text" value={data.b2} onChange={ this.handleChange }/>
                              <div className="input-group-append">
                                <span className="input-group-text">€</span>
                              </div>
                            </div>
                            <div className="form-group form-check">
                              <input type="checkbox" className="form-check-input" id="calculate" checked={calculate} onChange={ this.handleChangeCalculate } />
                              <label className="form-check-label" htmlFor="calculate">Calculate</label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="o2">Odds: (the lowest)</label>
                                <input id="o2" className="form-control" type="text" value={data.o2} onChange={ this.handleChange }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="c">Commission: %</label>
                                <input id="c" className="form-control" type="text" value={data.c} onChange={ this.handleChange }/>
                            </div>
                            <div className="form-group">
                                <label>Total bet: </label>
                                <span id="t">{ breakdown.totalBet != null ? breakdown.totalBet + ' €' : '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProfitBreakdown breakdown={breakdown}/>
        </div>
    );
}
}

export default App;
