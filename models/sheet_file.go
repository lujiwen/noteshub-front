package models

import (
	"time"
)

type SheetType int

const (
	_ SheetType  = iota
	Stave
	GuitarSpectrum
	ukeleleSpectrum
)


type SheetFile struct {
	SheetTp SheetType
	FilePath string
	Filename string
	UploadTime time.Time
	Uploader string
}

func SaveSheetToDB(file SheetFile) (int64, error)  {
	if code, err := x.Insert(file); err != nil {
		return code, err
	}
	return 1, nil
}