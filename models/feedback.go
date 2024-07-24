package models

import "gorm.io/gorm"

type Feedback struct {
	gorm.Model
	User    string `json:"user"`
	Content string `json:"content"`
}
