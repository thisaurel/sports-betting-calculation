import React, { Component } from 'react';
import * as calc from'../helpers/calc.js';
import Profit from './Profit';
import Rate from './Rate';

class ProfitBreakdown extends Component { 

    renderFreeBet() {
        return (
            <span><Profit sum={this.props.breakdown.layWins.back}/> and <Profit sum={this.props.breakdown.layWins.free}/> worth of Free Bet</span>
        );
    }

    render() {
        let breakdown = this.props.breakdown;

        if (calc.isNumber(breakdown.backWins.back) && calc.isNumber(breakdown.backWins.lay) &&
            calc.isNumber(breakdown.layWins.back) && calc.isNumber(breakdown.layWins.lay)) {

            return (
                <div className="container">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th colSpan={6}>
                                Profit Breakdown<br/>
                                Rate: <Rate value={breakdown.rate}/><br/>
                                Total bet: {breakdown.totalBet} €
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td></td>
                            <td>Back</td>
                            <td>Lay</td>
                            <td></td>
                            <td>Total</td>
                            <td>Profits</td>
                        </tr>

                        <tr>
                            <td>If Back Bet wins</td>
                            <td><Profit sum={breakdown.backWins.back}/></td>
                            <td><Profit sum={breakdown.backWins.lay}/></td>
                            <td>=</td>
                            <td><Profit sum={breakdown.backWins.back + breakdown.backWins.lay}/></td>
                            <td><Profit sum={breakdown.backWins.back - breakdown.totalBet}/></td>
                        </tr>

                        <tr>
                            <td>If Lay Bet wins</td>
                            <td>{isNaN(breakdown.layWins.free) ? <Profit sum={breakdown.layWins.back}/> : this.renderFreeBet()}</td>
                            <td><Profit sum={breakdown.layWins.lay}/></td>
                            <td>=</td>
                            <td><Profit sum={breakdown.layWins.back + breakdown.layWins.lay + (breakdown.layWins.free || 0)}/></td>
                            <td><Profit sum={breakdown.layWins.lay - breakdown.totalBet}/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default ProfitBreakdown;