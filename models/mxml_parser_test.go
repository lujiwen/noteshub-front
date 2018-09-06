package models

import (
	"encoding/xml"
	"fmt"
	"testing"
)


func TestParseMxml(t *testing.T) {
	fmt.Print(ParseMxmlFromString("./musicxml/sample-chord.xml"))
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
			Pitch{
				Accidental: 0,
				Step:       "2",
				Octave:     "C",
			},
			0,
			0,
			"",
			xml.Name{},
			xml.Name{
				Space: "",
				Local: "",
			},
			Tie{},
			"",
			xml.Name{},
			xml.Name{},
			nil,
		},
		Note {
			Pitch{
				Accidental: 0,
				Step:       "2",
				Octave:     "C",
			},
			0,
			0,
			"",
			xml.Name{},
			xml.Name{
				Space: "",
				Local: "",
			},
			Tie{},
			"",
			xml.Name{},
			xml.Name{},
			nil,
		},
		Note {
			Pitch{
				Accidental: 0,
				Step:       "2",
				Octave:     "C",
			},
			0,
			0,
			"",
			xml.Name{},
			xml.Name{
				Space: "",
				Local: "chord",
			},
			Tie{},
			"",
			xml.Name{},
			xml.Name{},
			nil,
		},
		Note {
			Pitch{
				Accidental: 0,
				Step:       "2",
				Octave:     "C",
			},
			0,
			0,
			"",
			xml.Name{},
			xml.Name{
				Space: "",
				Local: "",
			},
			Tie{},
			"",
			xml.Name{},
			xml.Name{},
			nil,
		},
	}}
	measure.ParseMeasure()
	if len(measure.Notes) == 3 {
		println(measure.Notes)
	} else {
		t.Error("measure parsing wrong, actually it is:", len(measure.Notes))

	}
}

func TestInterface(t *testing.T) {
	x := "1"
	y := "2"
	print(x+"/"+y)
}