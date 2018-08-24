import Vex from 'vexflow';
import React, {Component} from 'react';

const {
    Accidental,
    Formatter,
    Stave,
    StaveNote,
    Renderer,
    StaveConnector,
    Voice,
    RESOLUTION,
    Tuplet,
    Beam
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


     this.signature = 'C';
  }

    render() {
        return <div ref="outer" style={{}}>
        </div>;
    }

  buildNotesVoice(measure, partId, measureId) {

    const vexVoice = new Voice({
      num_beats: measure.attributes.time.beats,
      beat_value: measure.attributes.time.beatType,
      resolution: RESOLUTION
    });

    const vexNotes = measure.note.filter(note => note.pitch.step !== "").map(function (note, noteId) {
      let keys = [note.pitch.step + "/" + note.pitch.octave]
      // let duration = note.duration.toString()
      let duration = "2"

      const staveNote = new StaveNote({ keys: keys, duration});

      staveNote.setAttribute('id', `${partId}-${measureId}-${noteId}`);

      return staveNote;
    }.bind(this));

    vexVoice.addTickables(vexNotes);
    return vexVoice
  }


  componentDidMount() {

      const svgContainer = document.createElement('div');
      const renderer = new Renderer(svgContainer, Renderer.Backends.SVG);
      const ctx = renderer.getContext();

      const sheet = this.props.sheet;
      console.log(sheet)

      const trebleStave = new Stave(0, 0, 800);  // x, y, width
      const bassStave = new Stave(0, SPACE_BETWEEN_STAVES, 800);  // x, y, width
      let key = []
      var duration
      let partCount = sheet.part.length
      console.log("total part number: " + partCount)
      let currentWidth = 0;

      let measureCount = sheet.part[0].measure.length
      console.log("total measures number: " + measureCount)
      let firstRow = true;

      let rowsCounter = 0;
      // let currentWidth = 0;
      let currentRowMeasures = [];
      const widthArray = [];

      sheet.part.forEach( (part, partId) => {
        part.measure.forEach((measure, measureId) => {
            let isFirstMeasure = measureId === 0
            let isLastMeasure = measureId === (measureCount - 1)
            let voices = [this.buildNotesVoice(measure, partId, measureId)]
            const formatter = new Formatter();
            formatter.joinVoices(voices)

            const stave = new Stave(0,0)
            var startX = this.unifyNotesStartX(stave, stave);

            stave.setNoteStartX(startX)
            stave.setX(0)
            stave.setY(0)
            let minTotalWidth = Math.ceil(Math.max(formatter.preCalculateMinTotalWidth(voices), BAR_MIN_WIDTH) * COEFFICIENT);

          const measureWidth = minTotalWidth + (startX - 0) + FIRST_NOTE_SPACE + LAST_NOTE_SPACE;


          if (currentWidth + measureWidth < this.sheetWidth) {
            currentWidth += measureWidth;

            currentRowMeasures.push({
              measure,
              measureWidth: measureWidth,
              minTotalWidth,
              stave,
              formatter,
              voices,
              isLastMeasure,
              measureId: `${partId}-${measureId}`
            })

            widthArray.push(measureWidth)
            } else {
              // new stave row
              // draw current row and begin new row
              const widthRest = this.sheetWidth - currentWidth;
              // this.drawStaveRow(currentRowMeasures, widthArray, rowsCounter, widthRest);
              //newRow = true;

              stave.addClef("treble").addTimeSignature("4/4").addKeySignature(this.signature);

              const startX = Math.max(stave.getNoteStartX(), stave.getNoteStartX());
              stave.setNoteStartX(startX);
              // bStave.setNoteStartX(startX);

              const measureWidth = minTotalWidth + (startX - 0) + FIRST_NOTE_SPACE + LAST_NOTE_SPACE;

              rowsCounter++;
              currentWidth = measureWidth;
              currentRowMeasures.length = 0;
              widthArray.length = 0;
              widthArray.push(measureWidth);
              currentRowMeasures.push({
                measure,
                measureWidth: measureWidth,
                minTotalWidth,
                stave,
                formatter,
                voices,
                isLastMeasure: isLastMeasure,
                barId: `${partId}-${measureId}`
              });

            }

            // Add a clef and time signature.
            if (firstRow) {
              stave.addClef("treble").addTimeSignature("4/4").addKeySignature(this.signature);
              firstRow = false;
            }


            stave.setWidth(400)
            formatter.format(voices,0)

            stave.setContext(ctx).draw()
            voices.forEach(function (v) { v.draw(ctx, stave); }.bind(this));
        })
      })

      ctx.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");



      const sectionsLength = 10;
      //
      // trebleStave.addClef("treble").addTimeSignature("4/4").addKeySignature(this.signature).setContext(ctx).draw();
      // bassStave.addClef("bass").addTimeSignature("4/4").addKeySignature(this.signature).setContext(ctx).draw();


      // var barWidth = minTotalWidth + (startX - 0) + FIRST_NOTE_SPACE + LAST_NOTE_SPACE;

      // const lineLeft = new StaveConnector(trebleStave, bassStave).setType(1);
      // const lineRight = new StaveConnector(trebleStave, bassStave).setType(0);
      //
      // lineLeft.setContext(ctx).draw();
      // lineRight.setContext(ctx).draw();

      // const bb = Formatter.FormatAndDraw(ctx, trebleStave, chord);
      const svg = svgContainer.childNodes[0];
      const padding = 10;
      const half = padding / 2;
      // svg.style.top = -bb.y + half + Math.max(0, (100 - bb.h) * 2/3) + "px";
      // svg.style.height = Math.max(100, bb.h);
      svg.style.top = 10
      svg.style.height = 1000
      svg.style.left = PADDING_LEFT;
      svg.style.width = 100 + "px";
      svg.style.position = "absolute";
      svg.style.overflow = "visible";
      // svgContainer.style.height = Math.max(100, bb.h + padding) + "px";
      svgContainer.style.width = 100 + "px";
      svgContainer.style.height = 1000 + "px"
      svgContainer.style.position = "relative";
      svgContainer.style.display = "inlineBlock";

        // noinspection JSUnresolvedVariable
      this.refs.outer.appendChild(svgContainer);
    }

      unifyNotesStartX(trebleStave, bassStave) {
      const startX = Math.max(trebleStave.getNoteStartX(), bassStave.getNoteStartX());
      trebleStave.setNoteStartX(startX);
      bassStave.setNoteStartX(startX);
      return startX
    }


    calculateMeasureWidthRatio(arr, value, precision) {
      const sum = arr.reduce((sum, value) => sum + value, 0);

      const percentages = arr.map(value => value / sum);

      const valueDistribution = percentages.map(percentage => {
        const factor = Math.pow(10, precision);
        return Math.round(value * percentage * factor) / factor;
      });

      return valueDistribution;
    }

    // draw a single row of stave with full parts(tacks)
    drawStaveRow(currentRowMeasures, sectionWidthArray, currentRowIndex, widthRest = 0) {

        this.rowFirstBars.push(currentRowMeasures[0].barId);
        this.rowLastBars.push(currentRowMeasures[currentRowMeasures.length - 1].barId);

        let barOffset = PADDING_LEFT;

        const widthRestArray = this.calculateMeasureWidthRatio(sectionWidthArray, widthRest, 0);

        currentRowMeasures.forEach((b, index) => {

          const barWidth = b.barWidth + (widthRest !== 0 ? widthRestArray[index] : 0)

          const trebleStave = b.tStave;
          const bassStave = b.bStave;

          trebleStave.setX(barOffset);
          bassStave.setX(barOffset);
          trebleStave.setY(PADDING_TOP + currentRowIndex * SPACE_BETWEEN_GRAND_STAVES);
          bassStave.setY(PADDING_TOP + currentRowIndex * SPACE_BETWEEN_GRAND_STAVES + SPACE_BETWEEN_STAVES);

          trebleStave.setWidth(barWidth);
          bassStave.setWidth(barWidth);

          barOffset += barWidth;

          if (b.text) {
            // trebleStave.setText(b.text[0], VF.Modifier.Position.ABOVE, { shift_y: 0, justification: VF.TextNote.Justification.LEFT });
            trebleStave.setSection(b.text[0], 0);
          }

          const lineLeft = new StaveConnector(trebleStave, bassStave).setType(1);
          const lineRight = new StaveConnector(trebleStave, bassStave).setType(b.isLastBar ? 6 : 0);

          trebleStave.setContext(this.context).draw();
          bassStave.setContext(this.context).draw();

          lineLeft.setContext(this.context).draw();
          lineRight.setContext(this.context).draw();

          b.formatter.format(b.trebleStaveVoices.concat(b.bassStaveVoices), b.minTotalWidth + (widthRest !== 0 ? widthRestArray[index] : 0));

          // Render voices
          b.trebleStaveVoices.forEach(function (v) { v.draw(this.context, trebleStave); }.bind(this));
          b.bassStaveVoices.forEach(function (v) { v.draw(this.context, bassStave); }.bind(this));

    });
  }
}