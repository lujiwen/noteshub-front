package models

import (
    "encoding/xml"
    "fmt"
    "io/ioutil"
    "os"
)

// MXLDoc holds all data for a music xml file
type MXLDoc struct {
    Score          xml.Name `xml:"score-partwise" json:"score-partwise"`
    Identification `xml:"identification" json:"identification"`
    Parts          []Part `xml:"part" json:"part"`
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
    Clef      Clef `xml:"clef" json:"clef"`
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
}

// Pitch represents the pitch of a note
type Pitch struct {
    Accidental int8   `xml:"alter" json:"accidental"`
    Step       string `xml:"step" json:"step"`
    Octave     int8   `xml:"octave" json:"octave"`
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
    case "half":
        noteType = "2"
        break
    case "quarter":
        noteType = "4"
	    break
    case "eighth":
        noteType = "8"
	    break
    default:
        noteType = "unknown type: " + note.Type
	    break
    }
    note.Type = noteType
}


// hint on loop : https://stackoverflow.com/questions/15945030/change-values-while-iterating-in-golang
func (sheet *MXLDoc)UpdateMxml() *MXLDoc  {
    newSheet := sheet
    for _, p := range newSheet.Parts {
        for _, m := range p.Measures {
            for noteIndex := range m.Notes {
                m.Notes[noteIndex].TranslateNoteType()
            }
        }
    }
    return newSheet
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
