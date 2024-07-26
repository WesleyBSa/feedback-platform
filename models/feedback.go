package models

import (
	"gorm.io/gorm"
)

// Feedback represents a feedback entry with soft delete
type Feedback struct {
	gorm.Model
	User    string `json:"user"`
	Content string `json:"content"`
	Rating  int    `json:"rating"`
}
