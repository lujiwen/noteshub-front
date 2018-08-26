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
      let duration = note.type
      // let type = 'r'

      // const { keys, dur: duration, grace, ...options } = note;

      // const noteKeysAccidentals = [];
      //
      // const noteTies = [];
      //
      // let graceNotes = [];

      // const transposedKeys = keys.map(function ({ ties, ...key }, keyIndex) {
      //
      //   const { trStep, trAccidental, trOctave, trPitch: pitch } = this.transposer.transpose(key, duration);
      //
      //   noteKeysAccidentals[keyIndex] = trAccidental;
      //
      //   if (ties) {
      //     noteTies[keyIndex] = { pitch, ties };
      //   }
      //
      //   return `${trStep}${trAccidental || ''}/${trOctave}`
      //
      // }.bind(this))

      const staveNote = new StaveNote({ keys: keys, duration});

      staveNote.setAttribute('id', `${partId}-${measureId}-${noteId}`);

      return staveNote;
    }.bind(this));



    //
    // if (measure.beams) {
    //   measure.beams.forEach(beam => {
    //     const { from, to } = beam;
    //     this.beams.push(new Beam(vexNotes.slice(from, to)));
    //   })
    // } else {
    //   const autoBeams = Beam.generateBeams(vexNotes);
    //   this.beams.push(...autoBeams);
    // }

    // if (measure.tuplets) {
    //   voice.tuplets.forEach(tuplet => {
    //     const { from, to, ...options } = tuplet;
    //     this.tuplets.push(new Tuplet(vexNotes.slice(from, to), options));
    //   })
    // }

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

    let measureCount = sheet.part[0].measure.length
    console.log("total measures number: " + measureCount)

    // for(let i in measure.note) {
    //   let note = measure.note[i];
    //   let pitch = note.pitch;
    //   if(pitch.step != "" && pitch.step != null){
    //     key.push(pitch.Step + "/"+pitch.octave);
    //     duration = note.duration
    //   }
    // }
    //
    //
    sheet.part.forEach( (part, partId) => {
      part.measure.forEach((measure, measureId) => {
        let isFirstMeasure = measureId === 0
        let isLastMeasure = measureId === (measureCount - 1)
        let voices = [this.buildNotesVoice(measure, partId, measureId)]
        const formatter = new Formatter();
        formatter.joinVoices(voices)

        const stave = new Stave(0,0)
        stave.addClef("treble").addTimeSignature("4/4").addKeySignature(this.signature);
        stave.setNoteStartX(startX)
        stave.setX(0)
        stave.setY(0)
        stave.setWidth(400)
        formatter.format(voices,0)
        stave.setContext(ctx).draw()
        voices.forEach(function (v) { v.draw(ctx, stave); }.bind(this));
      })
    })





    //
    //
    // let chord = [new StaveNote({
    //   keys: key,
    //   duration: duration.toString(),
    // })];



    ctx.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    let rowsCounter = 0;
    let currentWidth = 0;
    const currentRowBars = [];
    const widthArray = [];
    let firstRow = true;

    const sectionsLength = 10;
    //
    // trebleStave.addClef("treble").addTimeSignature("4/4").addKeySignature(this.signature).setContext(ctx).draw();
    // bassStave.addClef("bass").addTimeSignature("4/4").addKeySignature(this.signature).setContext(ctx).draw();

    var startX = this.unifyNotesStartX(trebleStave, bassStave);

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