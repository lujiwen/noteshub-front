import Vex from 'vexflow';
import React, {Component} from 'react';
import SoundFont from "soundfont-player";

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
const MEASURE_MIN_WIDTH = 100;
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

      if

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
    return [vexVoice]
  }


  drawStaveRow(rowOfMeasures, rowCounter = 0) {
    rowOfMeasures.forEach(measure => this.drawMeasure(measure, rowCounter, measure.width))
  }


  componentDidMount() {
    const svgContainer = document.createElement('div');
    const renderer = new Renderer(svgContainer, Renderer.Backends.SVG);
    const ctx = renderer.getContext();
    console.log("sheet width :" + this.sheetWidth)
    this.sheet = this.props.sheet;

    let startX = 0
    let partCount = this.sheet.part.length

    let measureCount = this.sheet.part[0].measure.length
    let trebleVoice, bassVoice
    let currentRow = []
    let currentStaveWidth = 0
    let rowCounter = 0

    for (let measureId=0; measureId < measureCount; measureId++) {
      for (let partId=0;partId < partCount; partId++) {
        if (partId === 0) {
          trebleVoice = this.buildNotesVoice(this.sheet.part[partId].measure[measureId], partId, measureId)
        } else {
          bassVoice = this.buildNotesVoice(this.sheet.part[partId].measure[measureId], partId, measureId)
        }
      }

      const formatter = new Formatter();
      formatter.joinVoices(trebleVoice).joinVoices(bassVoice);
      const allVoicesTogether = trebleVoice.concat(bassVoice);

      const minTotalWidth = Math.ceil(Math.max(formatter.preCalculateMinTotalWidth(allVoicesTogether), MEASURE_MIN_WIDTH));
      let measureWidth
      if (startX === 0) {
        measureWidth = minTotalWidth + FIRST_NOTE_SPACE + LAST_NOTE_SPACE + 40
      } else {
        measureWidth = minTotalWidth + FIRST_NOTE_SPACE + LAST_NOTE_SPACE
      }

      console.log("measureWidth: " + measureWidth)

      if (currentStaveWidth + measureWidth > this.sheetWidth) {
        console.log("current width will exceed the right boundary ")
        this.drawStaveRow(currentRow, rowCounter)

        currentRow = []
        rowCounter ++
        startX = 0
        currentStaveWidth = 0

        currentRow.push({startX, ctx, trebleVoice, bassVoice, width: measureWidth + 40})

      } else {
        console.log("add one more measure")
        currentStaveWidth += measureWidth
        currentRow.push({startX, ctx, trebleVoice, bassVoice, width: measureWidth})
        startX = currentStaveWidth
      }
    }

    if (currentRow.length > 0) {
      this.drawStaveRow(currentRow, rowCounter)
    }

    ctx.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
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
    svgContainer.style.width = 900 + "px";
    svgContainer.style.height = 2000 + "px"
    svgContainer.style.position = "relative";
    svgContainer.style.display = "inlineBlock";

    // noinspection JSUnresolvedVariable
    this.refs.outer.appendChild(svgContainer);
  }

  playSheet() {
    this.tempo = 80
    this.denominatorTime = 60 / this.tempo;
    this.nBeats = 4;

    const AudioContext = window.AudioContext || window.webkitAudioContext || false;
    if (!AudioContext) {
      alert(`Sorry, but the Web Audio API is not supported by your browser.
             Please, consider upgrading to the latest version or downloading 
             Google Chrome or Mozilla Firefox`);
    }
    const audioContext = new AudioContext();

    function localUrl(name) {
      return 'instruments/' + name + '.js'
    }

    SoundFont.instrument(audioContext, 'piano', {
      nameToUrl: localUrl,
      gain: 3,
      release: 1
    }).then((instrument) => {
      this.instrument = instrument;

      this.calculateNotesTimeAndPlay(this.instrument)

    }).catch(function (err) {
      console.log('err to load sheet', err)
    })
  }

  calculateNotesTimeAndPlay(instrument) {
    // instrument.play('C4', 0, 1)
    // instrument.play('D4',2, 1)
    let currentTime = 0
    let measureCount = this.sheet.part[0].measure.length
    let partCount = this.sheet.part.length
    for (let measureId=0; measureId < measureCount; measureId++) {
      for (let partId=0;partId < 1; partId++) {
        let note = ['C4', 'D4']
        instrument.play(note, measureId, this.denominatorTime)
      }
    }

  }

  drawMeasure(measure, rowCounter, measureWidth) {
    let {startX , ctx, trebleVoice, bassVoice} = measure
    let barOffset = PADDING_LEFT;
    let {trebleStave, bassStave} = this.drawMeasureStave(startX, barOffset, rowCounter, measureWidth, ctx);

    this.drawMeasureNotes(trebleVoice, bassVoice, ctx, trebleStave, bassStave);
  }

  drawMeasureNotes(trebleVoice, bassVoice, ctx, trebleStave, bassStave) {
    const formatter = new Formatter();

    // draw notes
    formatter.joinVoices(trebleVoice).joinVoices(bassVoice)
    formatter.format(trebleVoice.concat(bassVoice), 0);
    trebleVoice.forEach(function (v) {
      v.draw(ctx, trebleStave);
    });
    bassVoice.forEach(function (v) {
      v.draw(ctx, bassStave);
    });
  }

  drawMeasureStave(startX, barOffset, rowCounter, measureWidth, ctx) {
    let trebleStave = new Stave(0, 0)
    let bassStave = new Stave(0, 0)

    if (startX === 0) {
      trebleStave.addClef("treble").addTimeSignature("4/4").addKeySignature(this.signature);
      bassStave.addClef("bass").addTimeSignature("4/4").addKeySignature(this.signature);
    }

    trebleStave.setNoteStartX(startX)
    bassStave.setNoteStartX(startX)

    trebleStave.setX(startX);
    bassStave.setX(startX);

    trebleStave.setY(PADDING_TOP + rowCounter * SPACE_BETWEEN_GRAND_STAVES);
    bassStave.setY(PADDING_TOP + rowCounter * SPACE_BETWEEN_GRAND_STAVES + SPACE_BETWEEN_STAVES);
    trebleStave.setWidth(measureWidth)
    bassStave.setWidth(measureWidth)
    trebleStave.setContext(ctx).draw()
    bassStave.setContext(ctx).draw()
    this.connectStave(ctx, trebleStave, bassStave)
    return {trebleStave, bassStave};
  }

  connectStave(context, trebleStave, bassStave) {
    const lineLeft = new StaveConnector(trebleStave, bassStave).setType(1);
    const lineRight = new StaveConnector(trebleStave, bassStave).setType(0);
    lineLeft.setContext(context).draw()
    lineRight.setContext(context).draw()
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
}