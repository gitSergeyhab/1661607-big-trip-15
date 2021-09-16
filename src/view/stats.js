import Abstract from './abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {getPriceFormat, getCountFormat, getTimeFormat, getSumPrice, getCountType, getSumTime, getGraphData, getLabels} from '../utils/stat-utils.js';


const BAR_HEIGHT = 55;
const ChartName = {
  MONEY: 'money',
  TYPE: 'type',
  TIME: 'time-spend',
};

const renderChart = (ctx, points, countFunction, formatFunction, chartName) => {
  const {labels, counts} = getGraphData(points, countFunction);
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        data: counts,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: formatFunction,
        },
      },
      title: {
        display: true,
        text: chartName.toUpperCase(),
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createItemStatsTemplate = (item, height) => `<div class="statistics__item">
  <canvas class="statistics__chart" id="${item}" width="900" height=${height}></canvas>
</div>`;


const createStatsTemplate = (height) => `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>
  ${Object.values(ChartName).map((chart) => createItemStatsTemplate(chart, height)).join('\n')}
</section>`;


export default class Stats extends Abstract {
  constructor(points) {
    super();
    this._points = points;
    this._moneyCtx = null;
    this._typeCtx = null;
    this._timeCtx = null;
    this._height = getLabels(points).length * BAR_HEIGHT;

    this._setCharts();
  }

  getTemplate() {
    return createStatsTemplate(this._height);
  }

  _createChartCtx(countFunction, formatFunction, chartName) {
    const container = this.getElement().querySelector(`#${chartName}`);
    return renderChart(container, this._points, countFunction, formatFunction, chartName);
  }

  _setCharts() {
    this._moneyCtx = this._createChartCtx(getSumPrice, getPriceFormat, ChartName.MONEY);
    this._typeCtx = this._createChartCtx(getCountType, getCountFormat, ChartName.TYPE);
    this._timeCtx = this._createChartCtx(getSumTime, getTimeFormat, ChartName.TIME);


    // const moneyContainer = this.getElement().querySelector(`#${ChartName.MONEY}`);
    // this._moneyCtx = renderChart(moneyContainer, this._points, getSumPrice, getPriceFormat, ChartName.MONEY);

    // const typeContainer = this.getElement().querySelector(`#${ChartName.TYPE}`);
    // this._typeCtx = renderChart(typeContainer, this._points, getCountType, getCountFormat, ChartName.TYPE);

    // const timeContainer = this.getElement().querySelector(`#${ChartName.TIME}`);
    // this._timeCtx = renderChart(timeContainer, this._points, getSumTime, getTimeFormat, ChartName.TIME);
  }
}
