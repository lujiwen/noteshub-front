package models

import (
    "encoding/xml"
    "fmt"
    "io/ioutil"
    "os"
)

type StaveType int
const (
	_ StaveType  = iota
	GRAND // start from 1
	PIANO
	TREBLE
	BASS
	CHORAL
)

// MXLDoc holds all data for a music xml file
type MXLDoc struct {
    Score          xml.Name `xml:"score-partwise" json:"score-partwise"`
    Identification `xml:"identification" json:"identification"`
    Parts          []Part `xml:"part" json:"part"`
    Type           StaveType `json:"type"`  // grand treble piano
}

// Identification holds all of the ident information for a music xml file
type Identification struct {
    Composer string `xml:"creator" json:"creator"`
    Encoding `xml:"encoding" json:"encoding"`
    Rights   string `xml:"rights" json:"rights"`
    Source   string `xml:"source" json:"source"`
    Title    string `xml:"movement-title" json:"movement-title"`
}

// Encoding holds encoding info
type Encoding struct {
    Software string `xml:"software" json:"software"`
    Date     string `xml:"encoding-date" json:"encoding-date"`
}

// Part represents a part in a piece of music
type Part struct {
    Id       string    `xml:"id,attr" json:"id,attr"`
    Measures []Measure `xml:"measure" json:"measure"`
    IsTreble bool      `json:"isTreble"`
}

// Measure represents a measure in a piece of music
type Measure struct {
    Number int        `xml:"number,attr" json:"number,attr"`
    Atters Attributes `xml:"attributes" json:"attributes"`
    Notes  []Note     `xml:"note" json:"note"`
}

// Attributes represents
type Attributes struct {
    Key       Key  `xml:"key" json:"key"`
    Time      Time `xml:"time" json:"time"`
    Divisions int  `xml:"divisions" json:"divisions"`
    Clef      []Clef `xml:"clef" json:"clef"`
}

// Clef represents a clef change
type Clef struct {
    Sign string `xml:"sign" json:"sign"`
    Line int    `xml:"line" json:"line"`
}

// Key represents a key signature change
type Key struct {
    Fifths int    `xml:"fifths" json:"fifths"`
    Mode   string `xml:"mode" json:"mode"`
}

// Time represents a time signature change
type Time struct {
    Beats    int `xml:"beats" json:"beats"`
    BeatType int `xml:"beat-type" json:"beatType"`
}

// Note represents a note in a measure
type Note struct {
    Pitch    Pitch    `xml:"pitch" json:"pitch"`
    Duration int      `xml:"duration" json:"duration"`
    Voice    int      `xml:"voice" json:"voice"`
    Type     string   `xml:"type" json:"type"`
    Rest     xml.Name `xml:"rest" json:"rest"`
    Chord    xml.Name `xml:"chord" json:"chord"`
    Tie      Tie      `xml:"tie" json:"tie"`
    Beam     string   `xml:"beam" json:"beam"`
    Dot      xml.Name `xml:"dot" json:"dot"`
    Grace    xml.Name `xml:"grace" json:"grace"`
    Keys     []string `json:"keys"`
	Staff    int      `xml:"staff" json:"staff"`
}

// Pitch represents the pitch of a note
type Pitch struct {
    Accidental int8   `xml:"alter" json:"accidental"`
    Step       string `xml:"step" json:"step"`
    Octave     string   `xml:"octave" json:"octave"`
}

// Tie represents whether or not a note is tied.
type Tie struct {
    Type string `xml:"type,attr" json:"type,attr"`
}


//path start from the root directory of project
func ParseMxmlFromString(path string) MXLDoc {
    file, err := os.Open(path) // For read access.
    if err != nil {
        fmt.Printf("error: %v", err)
    }
    defer file.Close()
    data, err := ioutil.ReadAll(file)
    if err != nil {
        fmt.Printf("error: %v", err)
    }
    return ParseMxmlFromDataByte(data)
}

func (note *Note)TranslateNoteType() {
    noteType := ""

    switch note.Type {
    case "whole":
	    noteType = "1"
	    break
    case "half":
        noteType = "2"
        break
    case "quarter":
        noteType = "4"
	    break
    case "eighth":
        noteType = "8"
	    break
    case "16th":
    noteType = "16"
    break
    case "":
    noteType = "1"
    break

    default:
        noteType = note.Type
	    break
    }
    note.Type = noteType
}

func (measure *Measure)parseBeats() {
	measure.
}

// hint on loop : https://stackoverflow.com/questions/15945030/change-values-while-iterating-in-golang
func (sheet *MXLDoc)UpdateMxml() *MXLDoc  {
    newSheet := sheet
	newSheet.Type = sheet.TypeOfStave()
	if newSheet.Type == PIANO || newSheet.Type == GRAND {  // only has one part, but has both treble and bass
		p := newSheet.Parts[0]
		trebleStaff := Part{}
		bassStaff := Part{}
		for measureIdx, measure := range p.Measures {

			trebleMeasure := Measure{Atters: measure.Atters}
			bassMeasure   := Measure{Atters: measure.Atters}
			for noteIndex := range p.Measures[measureIdx].Notes {
				p.Measures[measureIdx].Notes[noteIndex].TranslateNoteType()
				noteStaffID := p.Measures[measureIdx].Notes[noteIndex].Staff
				if noteStaffID == 1 {
					trebleMeasure.Notes = append(trebleMeasure.Notes, p.Measures[measureIdx].Notes[noteIndex])
				} else if noteStaffID == 2 {
					bassMeasure.Notes = append(bassMeasure.Notes, p.Measures[measureIdx].Notes[noteIndex])
				}
			}

			trebleStaff.Measures = append(trebleStaff.Measures, trebleMeasure)
			trebleStaff.IsTreble = true
			bassStaff.Measures = append(bassStaff.Measures, bassMeasure)
			bassStaff.IsTreble = false
		}
		newSheet.Parts = []Part{trebleStaff, bassStaff}
		return newSheet
	} else if newSheet.Type == BASS || newSheet.Type == TREBLE {
		p := newSheet.Parts[0]
		newSheet.Parts[0].IsTreble = ( newSheet.Type == TREBLE )
		for measureIdx := range p.Measures {
			p.Measures[measureIdx].ParseMeasure()

			for noteIndex := range p.Measures[measureIdx].Notes {
				p.Measures[measureIdx].Notes[noteIndex].TranslateNoteType()
			}
		}
	} else if newSheet.Type == CHORAL {
		for partIndex, p := range newSheet.Parts {
			newSheet.Parts[partIndex].IsTreble = (p.Measures[0].Atters.TypeOfMeasure() == TREBLE)
			for measureIdx := range p.Measures {
				p.Measures[measureIdx].ParseMeasure()

				for noteIndex := range p.Measures[measureIdx].Notes {
					p.Measures[measureIdx].Notes[noteIndex].TranslateNoteType()
				}
			}
		}
	}

    return newSheet
}

func (sheet *MXLDoc)TypeOfStave() StaveType  {
	if len(sheet.Parts) == 1 {
		attributes := sheet.Parts[0].Measures[0].Atters
		clefs := attributes.Clef
		if len(clefs) == 1 {
			return attributes.TypeOfMeasure()
		} else if len(clefs) == 2 {
			if clefs[0].Sign == "G" && clefs[0].Line == 2 && clefs[1].Sign == "F" && clefs[1].Line == 4 {
				return GRAND
			}
		}
	} else {
		return CHORAL
	}
	return PIANO
}


func (attributes Attributes)TypeOfMeasure() StaveType {
	if attributes.Clef[0].Sign == "F" && attributes.Clef[0].Line == 4 {
		return BASS
	} else if attributes.Clef[0].Sign == "G" && attributes.Clef[0].Line == 2 {
		return TREBLE
	}
	return TREBLE
}


func (note *Note) AddAccidental() {
	accidental := ""

	if note.Pitch.Accidental == 1 {
		accidental = "#"
	} else if note.Pitch.Accidental == -1 {
		accidental = "n"
	}
	note.Pitch.Step += accidental
}

// need a cycle of fifth to do this
func (sheet MXLDoc)ParseKey() string {
	if sheet.Parts[0].Measures[0].Atters.Key.Fifths == 1 {
		return "G"
	}
	return "G"
}


func (measure *Measure) ParseMeasure()  {
	var notes []Note

  var keys []string
  chordStart := -1
  chordEnd   := -1

  notesSize := len(measure.Notes)
  for i, note := range measure.Notes {

	  if note.Grace.Local == "grace" { // not support grace note
		  continue
	  }

	  measure.Notes[i].AddAccidental()
	  if note.Chord.Local != "chord" && i+1 < notesSize  && measure.Notes[i+1].Chord.Local != "chord" {
	  	// normal note
		  notes = append(notes, measure.Notes[i])
	  	// in the middle of chord notes
	  	} else if i+1 < notesSize && measure.Notes[i+1].Chord.Local == "chord" && chordStart == -1  {
	  		// the start of chord
	      chordStart = i
      } else if i+1 < notesSize && measure.Notes[i+1].Chord.Local == "" && chordStart >= 0 {
      	// the end of chord , but not the end of measure
          chordEnd = i
      } else if i+1 == notesSize && measure.Notes[i].Chord.Local == "chord" && chordStart >= 0 {
      	// the end of measure, the end of chord as well
	      chordEnd = i
      } else if note.Chord.Local != "chord" && i+1 == notesSize{
      	// normal note at
		  notes = append(notes, measure.Notes[i])
	  }

      if chordEnd != -1 && chordStart != -1 && chordStart < chordEnd {
          for j := chordStart; j <= chordEnd; j++ {
              keys = append(keys, string(measure.Notes[j].Pitch.Step) +"/" + measure.Notes[j].Pitch.Octave )
          }
	      measure.Notes[chordStart].Keys = keys
	      measure.Notes[chordStart].Chord.Local = "chord"

	      notes = append(notes, measure.Notes[chordStart])
	      chordStart = -1
          chordEnd   = -1
          keys = []string{}
      }
  }
  measure.Notes = notes
}



func ParseMxmlFromDataByte(data []byte) MXLDoc {
    v := MXLDoc{}
	err := xml.Unmarshal(data, &v)

	v.UpdateMxml()

	if err != nil {
		fmt.Printf("error: %v", err)
	}
	return v
}
