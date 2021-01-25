import React, {Component} from 'react';
import "./App.css";

export default class SVGIconComponent extends Component {
  render() {
    const perc = this.props.perc || 0;
    const percc = this.props.percc || 0;
    const perccc = this.props.perccc || 0;

    return (
      <svg width="80px" height="80px" viewBox="0 0 50 50" className="donut" aria-labelledby="beers-title beers-desc" role="img">
        <circle className="donut-hole" cx="12" cy="8" r="4" fill="white" role="presentation"></circle>
        <circle className="donut-ring" cx="12" cy="8" r="5" fill="transparent" stroke="#d2d3d4" strokeWidth="5" role="presentation"></circle>
        <circle className="donut-segment" cx="12" cy="8" r="5" fill="transparent" stroke="#ce4b99" strokeWidth="5" strokeDasharray={`${percc}, ${perccc}`} strokeDashoffset="0" aria-labelledby="donut-segment-1-title donut-segment-1-desc">
        </circle>
        <g className="chart-text">
          <text className="chart-number" x="40%" y="25%">
            {perc}
          </text>
        </g>
        <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/>
      </svg>
    );
  }
}
