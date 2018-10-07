package models

import (
	"encoding/xml"
	"fmt"
	"testing"
)


func TestParseMxml(t *testing.T) {
	fmt.Print(ParseMxmlFromString("./musicxml/sample-chord.xml"))
}

func TestParseBass(t *testing.T) {
	mxml:= ParseMxmlFromString("../resources/bass-example.xml")
	attributes := mxml.Parts[0].Measures[0].Atters
	if attributes.Clef[0].Sign == "F" && attributes.Clef[0].Line == 4 {
		t.Log("only bass staff!")
	} else {
		t.Error("not a bass staff")
	}
}

func TestParseTreble(t *testing.T) {
	mxml:= ParseMxmlFromString("../resources/treble-example.musicxml")
	attributes := mxml.Parts[0].Measures[0].Atters
	if attributes.Clef[0].Sign == "G" && attributes.Clef[0].Line == 2 {
		t.Log("only treble staff!")
	} else {
		t.Error("not a treble staff")
	}
}

func TestParseGrand(t *testing.T) {
	mxml:= ParseMxmlFromString("../resources/grand-example.xml")
	clefs := mxml.Parts[0].Measures[0].Atters.Clef

	if len(clefs) == 2 && clefs[0].Sign == "G" && clefs[0].Line == 2 && clefs[1].Sign == "F" && clefs[1].Line == 4 {
		t.Log("this a grand sheet " , clefs)
	} else {
		t.Error("this is not grand sheet!")
	}

}

func TestParsePiano(t *testing.T) {
		mxml:= ParseMxmlFromString("../resources/piano.xml")
		clefs := mxml.Parts[0].Measures[0].Atters.Clef

		if len(clefs) == 2 && clefs[0].Sign == "G" && clefs[0].Line == 2 && clefs[1].Sign == "F" && clefs[1].Line == 4 {
			t.Log("this a piano sheet " , clefs)
		} else {
			t.Error("this is not piano sheet!")
		}
}


func TestUpdatePianoStave(t *testing.T) {
	trebleNote := Note{Staff:1}
	bassNote   := Note{Staff:2}
	notes := []Note {trebleNote, bassNote}
	measure := Measure{
		0,
		Attributes{
			Key: Key{
				Fifths: 0,
				Mode:   "",
			},
			Time: Time{
				Beats:    0,
				BeatType: 0,
			},
			Divisions: 0,
			Clef:      nil,
		},
		notes,
	}
	measures := []Measure {measure}
	part := Part{Measures : measures}
	parts := []Part{part}
	doc := MXLDoc{
		Score: xml.Name{
			Space: "",
			Local: "",
		},
		Identification: Identification{
			Composer: "",
			Encoding: Encoding{
				Software: "",
				Date:     "",
			},
			Rights: "",
			Source: "",
			Title:  "",
		},
		Parts: parts,
		Type:  PIANO,
	}
	Parts := doc.UpdateMxml().Parts
	if len(Parts) == 2 &&
		len(Parts[0].Measures[0].Notes) == 1 &&
		len(Parts[1].Measures[0].Notes) == 1 {
		t.Log("update Piano succeed! ")
	} else {
		t.Error("update piano failed !")
	}
}

func TestUpdateMxml(t *testing.T)  {
	note := Note{}
	note.Type = "eighth"
	notes := []Note {note}
	measure := Measure{}
	measure.Notes = notes
	measures := []Measure {measure}

	part := Part{}
	part.Measures = measures
	parts := []Part{part}

	sheet := MXLDoc{}
	sheet.Parts = parts
	newSheet := sheet.UpdateMxml()

	noteType := newSheet.Parts[0].Measures[0].Notes[0].Type


	if noteType != "8" {
		t.Error("sheet parsing worng, actually it is:", noteType)
	}
}

func TestTranslateNoteType(t *testing.T) {
	note := Note{}
	note.Type = "eighth"
	note.TranslateNoteType()

	if note.Type != "8" {
		t.Error("note translating worng, actually it is:", note.Type)
	}
}

func TestMeasure_ParseMeasure(t *testing.T) {
	var att Attributes
	measure := Measure{3, att,[]Note{
		Note {
			Pitch: Pitch{
				Accidental: 0,
				Step:       "2",
				Octave:     "C",
			},
			Chord: xml.Name{
				Space: "",
				Local: "",
			},
		},
		Note {
			Pitch: Pitch{
				Accidental: 0,
				Step:       "2",
				Octave:     "C",
			},
			Chord: xml.Name{
				Space: "",
				Local: "",
			},
		},
		Note {
			Pitch: Pitch{
				Accidental: 0,
				Step:       "2",
				Octave:     "C",
			},
			Chord: xml.Name{
				Space: "",
				Local: "chord",
			},
		},
		Note {
			Pitch: Pitch{
				Accidental: 0,
				Step:       "2",
				Octave:     "C",
			},
			Chord: xml.Name{
				Space: "",
				Local: "",
			},
		},
	}}
	measure.ParseMeasure()
	if len(measure.Notes) == 3 {
		println(measure.Notes)
	} else {
		t.Error("measure parsing wrong, actually it is:", len(measure.Notes))

	}
}

func TestNote_AddAccidental(t *testing.T) {
	note1 := Note{
		Pitch: Pitch{
			Accidental: 1,
			Step:       "C",
			Octave:     "2",
		},
		Chord: xml.Name{
			Space: "",
			Local: "",
		},
	}

	note1.AddAccidental()

	if note1.Pitch.Step != "C#" {
		t.Error("accidental parsing wrong !")
	}

	note2 := Note{
		Pitch: Pitch{
			Accidental: -1,
			Step:       "C",
			Octave:     "2",
		},
		Chord: xml.Name{
			Space: "",
			Local: "",
		},
	}

	note2.AddAccidental()

	if note2.Pitch.Step != "Cn" {
		t.Error("accidental parsing wrong !")
	}
}