package models

import (
	"testing"
	"fmt"
)


func TestParseMxml(t *testing.T) {
	fmt.Print(ParseMxml("./musicxml/sample-chord.xml"))
}
