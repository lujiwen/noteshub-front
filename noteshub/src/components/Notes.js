import Vex from 'vexflow';

import React, {Component} from 'react';

const {
    Accidental,
    Formatter,
    Stave,
    StaveNote,
    Renderer,
} = Vex.Flow;

const SCHEME_WIDTH = 350;

const SPACE_BETWEEN_STAVES = 120;
const SPACE_BETWEEN_GRAND_STAVES = 260;
const BAR_MIN_WIDTH = 100;
const PADDING_TOP = 50;
const PADDING_LEFT = 50;
const COEFFICIENT = 1;

const SHEET_MIN_WIDTH = 600;
const FIRST_NOTE_SPACE = 10;
const LAST_NOTE_SPACE = 10;

export default class Notes extends Component {

  constructor() {
    super();
    this.scale = 100 / 100;
    this.width = window.innerWidth;
    this.svgWidth = Math.max(this.width , SHEET_MIN_WIDTH) / this.scale;
    this.sheetWidth = this.svgWidth - PADDING_LEFT * 2;

    this.beams = [];
    this.tuplets = [];

    this.openedTies = {};
    this.ties = [];

    this.rowFirstBars = [];
    this.rowLastBars = [];


    // this.signature = signature;

    // this.rowsCounter = 0;

  }

    render() {
        return <div ref="outer" style={{}}>
        </div>;
    }

    disributeValue(arr, value, precision) {
      const sum = arr.reduce((sum, value) => sum + value, 0);

      const percentages = arr.map(value => value / sum);

      const valueDistribution = percentages.map(percentage => {
        const factor = Math.pow(10, precision);
        return Math.round(value * percentage * factor) / factor;
      });

      return valueDistribution;
    }
    componentDidMount() {

      const {chord} = this.props;

      const svgContainer = document.createElement('div');
      const renderer = new Renderer(svgContainer, Renderer.Backends.SVG);
      const ctx = renderer.getContext();
      const trebleStave = new Stave(0, 0, 800);  // x, y, width
      const bassStave = new Stave(0, 100, 800);  // x, y, width
      trebleStave.addClef("treble").setContext(ctx).draw();
      bassStave.addClef("bass").setContext(ctx).draw();
      const bb = Formatter.FormatAndDraw(ctx, trebleStave, chord);

      const svg = svgContainer.childNodes[0];
      const padding = 10;
      const half = padding / 2;
      svg.style.top = -bb.y + half + Math.max(0, (100 - bb.h) * 2/3) + "px";
      svg.style.height = Math.max(100, bb.h);
      svg.style.left = "0px";
      svg.style.width = 100 + "px";
      svg.style.position = "absolute";
      svg.style.overflow = "visible";
      svgContainer.style.height = Math.max(100, bb.h + padding) + "px";
      svgContainer.style.width = 100 + "px";
      svgContainer.style.position = "relative";
      svgContainer.style.display = "inlineBlock";

        // noinspection JSUnresolvedVariable
      this.refs.outer.appendChild(svgContainer);
    }
}