package main

import (
	"time"
	"go/types"
)

type MeasureAttributes struct {
	divisions int
	key Key
	time time.Time
	clef Clef
}



//ME : Measure Element, compelled to add this prefix, Note is a duplicated name with struct Note, looking forward to solution
type MeasureElementType  int

const (
	_ MeasureElementType = iota
	MENote
	MEBackup
	MEForward
)

type MeasureElement struct {
	METype MeasureElementType
	types.Object
}

type Measure struct {
	width float64
	measureElements MeasureElement
	measureAttributes MeasureAttributes
}

type Part struct {
	Id string 
	Name string
	measures []Measure
}



type Syllabic int

const(
	_ Syllabic = iota
	None
	Begin
	Single
	End
	Middle
)

type Lyric struct {
	syllabic Syllabic
	text string
}


type Clef struct {
	line int
	sign string
}

type Forward struct {
	duration int
}

type Key struct{
	fifths int
	mode string
}

type Encoding struct {
	software     string
	description  string
	encodingTime time.Time
}

type Pitch struct {
	alter int
	octave int
	step string
}

type Note struct {
	noteType string
	voice int
	duration int
	lyric Lyric
	pitch Pitch
	staff int
	isChordTone bool
	isRest bool
	accidental string
}