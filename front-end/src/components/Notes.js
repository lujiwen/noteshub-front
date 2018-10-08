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
  StaveTie,
  Beam
} = Vex.Flow;

const SCHEME_WIDTH = 350;

const SPACE_BETWEEN_STAVES = 120;
const SPACE_BETWEEN_GRAND_STAVES = 260;
const MEASURE_MIN_WIDTH = 200;
const PADDING_TOP = 0;
const PADDING_LEFT = 100;
const COEFFICIENT = 1;

const SHEET_MIN_WIDTH = 600;
const FIRST_NOTE_SPACE = 10;
const LAST_NOTE_SPACE = 10;

const StaveType = {
  GRAND: "grand",
  PIANO: "piano",
  TREBLE: "treble",
  BASS: "bass",
  CHORAL: "choral",
}


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

    this.tieStart
    this.stopStart

    this.signature = 'C';
    this.staveType = 'choral'
  }

  render() {
    return <div ref="outer" style={{}}>
    </div>;
  }

  buildVexNotes(measure, partId, measureId) {
    return measure.note.map(function (note, noteId) {
      let keys = []
      let duration = note.type

      // if (note.grace.Local === "grace") {
      //   return
      // }


      if (this.isChord(note)) {
        keys = note.keys
      } else {
        keys = [note.pitch.step + "/" + note.pitch.octave]
      }

      if (this.isRest(note)) {
        duration = "qr"
        keys = ["B/4"]  // temporary solution: in the middle of treble
      }
      const staveNote = new StaveNote({keys: keys, duration: duration, clef: "bass"});


      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (key.includes("#")) {
          staveNote.addAccidental(i, new Accidental("#"))
        } else if (key.includes("n")) {
          staveNote.addAccidental(i, new Accidental("n"))
        }
      }

      staveNote.setAttribute('id', `${partId}-${measureId}-${noteId}`);
      if (this.isDot(note)) {
        staveNote.addDotToAll()
      }

      if (this.isTieStartNote(note)) {
        console.log("tie start !")
        this.tieStart = staveNote

      } else if (this.isTieEndNote(note)) {
        console.log("tie stop")
        this.tieStop = staveNote
        this.ties.push(new StaveTie({
          first_note: this.tieStart,
          last_note: this.tieStop,
          first_indices: [0],
          last_indices: [0]
        }))
      }

      return staveNote;
    }.bind(this));
  }


  isTieEndNote(note) {
    return note.tie.type === "stop";
  }

  isTieStartNote(note) {
    return note.tie.type === "start";
  }

  isDot(note) {
    return note.dot.Local === "dot";
  }

  isRest(note) {
    return note.rest.Local === "rest";
  }

  isChord(note) {
    return note.chord.Local === "chord";
  }

  buildNotesVoice(measure, partId, measureId) {

    let vexVoice = new Voice({
      num_beats: this.beats,
      beat_value: this.beatType,
      resolution: RESOLUTION
    });


    // let vexVoice = new Voice({num_beats: "4", beat_value: "4"});


    const vexNotes = this.buildVexNotes(measure, partId, measureId)

    const autoBeams = Beam.generateBeams(vexNotes);
    this.beams.push(...autoBeams);
    vexVoice.addTickables(vexNotes);
    return vexVoice
  }


  drawStaveRow(rowOfMeasures, rowCounter = 0) {
    rowOfMeasures.forEach(measure => this.drawMeasure(measure, rowCounter, measure.width, measure, measure.formatter))
  }

  getStaveType = (sheet) => {
    switch (sheet.type) {
      case 1:
        return StaveType.GRAND
      case 2:
        return StaveType.PIANO
      case 3:
        return StaveType.TreeNode
      case 4:
        return StaveType.BASS
      case 5:
        return StaveType.CHORAL
      default:
        return StaveType.GRAND
    }
  }

  drawBassStave(sheet, ctx) {
    let bassVoice

    let startX = 0
    let partCount = this.sheet.part.length

    let measureCount = this.sheet.part[0].measure.length
    let currentRow = []
    let currentStaveWidth = 0
    let rowCounter = 0

    for (let measureId=0; measureId < measureCount; measureId++) {
      bassVoice = this.buildNotesVoice(this.sheet.part[0].measure[measureId], 0, measureId)

      const formatter = new Formatter();

      // const minTotalWidth = Math.ceil(Math.max(formatter.preCalculateMinTotalWidth([bassVoice]), MEASURE_MIN_WIDTH));
      const minTotalWidth = MEASURE_MIN_WIDTH
      let measureWidth
      if (startX === 0) {
        measureWidth = minTotalWidth + FIRST_NOTE_SPACE + LAST_NOTE_SPACE + 50
      } else {
        measureWidth = minTotalWidth + FIRST_NOTE_SPACE + LAST_NOTE_SPACE
      }

      console.log("measureWidth: " + measureWidth)

      if (currentStaveWidth + measureWidth > this.sheetWidth) {  // measures which have already been pushed to currentRow can be a complete row of stave
        console.log("current width will exceed the right boundary ")
       this.drawStaveRow(currentRow, rowCounter)

        currentRow = []
        rowCounter ++
        startX = 0
        currentStaveWidth = 0

        currentRow.push({startX, ctx, trebleVoice: {}, bassVoice: bassVoice, width: measureWidth + 50, formatter: formatter})
        startX = measureWidth + 50
        currentStaveWidth = startX

      } else {
        console.log("add one more measure")
        currentStaveWidth += measureWidth
        currentRow.push({startX, ctx, trebleVoice: {}, bassVoice: bassVoice, width: measureWidth, formatter: formatter})
        startX = currentStaveWidth
      }
    }

    if (currentRow.length > 0) {
      this.drawStaveRow(currentRow, rowCounter)
    }
  }

  componentDidMount() {
    const svgContainer = document.createElement('div');
    const renderer = new Renderer(svgContainer, Renderer.Backends.SVG);
    const ctx = renderer.getContext();
    console.log("sheet width :" + this.sheetWidth)
    this.sheet = this.props.sheet;
    this.staveType = this.getStaveType(this.sheet)
    this.beats = this.sheet.part[0].measure[0].attributes.time.beats
    this.beatType = this.sheet.part[0].measure[0].attributes.time.beatType
    this.timeSignature = this.beats+ "/" + this.beatType

    let startX = 0
    let partCount = this.sheet.part.length

    let measureCount = this.sheet.part[0].measure.length
    let trebleVoice, bassVoice
    let currentRow = []
    let currentStaveWidth = 0
    let rowCounter = 0

    if (this.staveType === StaveType.BASS) {
      console.log("this is a bass stave")
      // only bass staff
      this.drawBassStave(this.sheet, ctx)
    }

    // for (let measureId=0; measureId < measureCount; measureId++) {
    //   for (let partId=0;partId < partCount; partId++) {
    //     if (partId === 0) {
    //       trebleVoice = this.buildNotesVoice(this.sheet.part[partId].measure[measureId], partId, measureId)
    //     } else {
    //       bassVoice = this.buildNotesVoice(this.sheet.part[partId].measure[measureId], partId, measureId)
    //     }
    //   }
    //
    //   const formatter = new Formatter();
    //   formatter.joinVoices(trebleVoice).joinVoices(bassVoice);
    //   const allVoicesTogether = trebleVoice.concat(bassVoice);
    //
    //   const minTotalWidth = Math.ceil(Math.max(formatter.preCalculateMinTotalWidth(allVoicesTogether), MEASURE_MIN_WIDTH));
    //   let measureWidth
    //   if (startX === 0) {
    //     measureWidth = minTotalWidth + FIRST_NOTE_SPACE + LAST_NOTE_SPACE + 50
    //   } else {
    //     measureWidth = minTotalWidth + FIRST_NOTE_SPACE + LAST_NOTE_SPACE
    //   }
    //
    //   console.log("measureWidth: " + measureWidth)
    //
    //   if (currentStaveWidth + measureWidth > this.sheetWidth) {  // measures which have already been pushed to currentRow can be a complete row of stave
    //     console.log("current width will exceed the right boundary ")
    //    // this.drawStaveRow(currentRow, rowCounter)
    //
    //     currentRow = []
    //     rowCounter ++
    //     startX = 0
    //     currentStaveWidth = 0
    //
    //     currentRow.push({startX, ctx, trebleVoice, bassVoice, width: measureWidth + 50, formatter: formatter})
    //     startX = measureWidth + 50
    //     currentStaveWidth = startX
    //
    //   } else {
    //     console.log("add one more measure")
    //     currentStaveWidth += measureWidth
    //     currentRow.push({startX, ctx, trebleVoice, bassVoice, width: measureWidth, formatter: formatter})
    //     startX = currentStaveWidth
    //   }
    // }
    //
    // if (currentRow.length > 0) {
    //   //this.drawStaveRow(currentRow, rowCounter)
    // }

    //draw tie
    this.ties.forEach(tie => tie.setContext(ctx).draw())

    // draw beams
    this.beams.forEach(b  => b.setContext(ctx).draw())

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
    let {startX, ctx, trebleVoice, bassVoice, formatter} = measure
    let barOffset = PADDING_LEFT;
    let {trebleStave, bassStave} = this.drawMeasureStave(startX, barOffset, rowCounter, measureWidth, ctx);

    this.drawMeasureNotes(trebleVoice, bassVoice, ctx, trebleStave, bassStave, formatter);
  }

  drawMeasureNotes(trebleVoice, bassVoice, ctx, trebleStave, bassStave, formatter) {
    // Format and justify the notes to 400 pixels.
    // formatter.joinVoices(bassVoice).format(bassVoice, MEASURE_MIN_WIDTH);
    formatter.joinVoices([bassVoice]).format([bassVoice], MEASURE_MIN_WIDTH);

    // Render voice
    bassVoice.draw(ctx, bassStave);
  }

  drawMeasureStave(startX, barOffset, rowCounter, measureWidth, ctx) {
    let trebleStave = new Stave(0, 0)
    let bassStave = new Stave(0, 0)

    if(this.staveType == StaveType.BASS) {
      if (startX === 0 && rowCounter === 0) {
        bassStave.addClef("bass").addTimeSignature(this.timeSignature).addKeySignature(this.signature);
      }

      bassStave.setNoteStartX(startX)

      bassStave.setX(startX);

      bassStave.setY(PADDING_TOP + rowCounter * SPACE_BETWEEN_STAVES );
      bassStave.setWidth(measureWidth)
      bassStave.setContext(ctx).draw()
      // this.connectStave(ctx, trebleStave, bassStave)
      return {trebleStave, bassStave};
    }
    // } else if (this.staveType instanceof StaveType.TREBLE) {
    //   if (startX === 0 && rowCounter === 0) {
    //     trebleStave.addClef("treble").addTimeSignature("4/4").addKeySignature(this.signature);
    //   }
    //
    //   trebleStave.setNoteStartX(startX)
    //   trebleStave.setX(startX);
    //   trebleStave.setY(PADDING_TOP + rowCounter * SPACE_BETWEEN_GRAND_STAVES);
    //   trebleStave.setWidth(measureWidth)
    //   trebleStave.setContext(ctx).draw()
    //   // this.connectStave(ctx, trebleStave, bassStave)
    //   return bassStave;
    // } else {
    //   if (startX === 0 && rowCounter === 0) {
    //     trebleStave.addClef("treble").addTimeSignature("4/4").addKeySignature(this.signature);
    //     bassStave.addClef("bass").addTimeSignature("4/4").addKeySignature(this.signature);
    //   }
    //
    //   trebleStave.setNoteStartX(startX)
    //   bassStave.setNoteStartX(startX)
    //
    //   trebleStave.setX(startX);
    //   bassStave.setX(startX);
    //
    //   trebleStave.setY(PADDING_TOP + rowCounter * SPACE_BETWEEN_GRAND_STAVES);
    //   bassStave.setY(PADDING_TOP + rowCounter * SPACE_BETWEEN_GRAND_STAVES + SPACE_BETWEEN_STAVES);
    //   trebleStave.setWidth(measureWidth)
    //   bassStave.setWidth(measureWidth)
    //   trebleStave.setContext(ctx).draw()
    //   bassStave.setContext(ctx).draw()
    //   this.connectStave(ctx, trebleStave, bassStave)
    //   return {trebleStave, bassStave};
    // }
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