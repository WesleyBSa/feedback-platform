package models

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("feedbacks.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate the Feedback model
	if err := DB.AutoMigrate(&Feedback{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
}
