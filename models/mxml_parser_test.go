package models

import (
	"testing"
	"fmt"
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