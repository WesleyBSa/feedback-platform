package controllers

import (
	"feedback-platform/models"
	"net/http"
	"strconv"

	"github.com/jung-kurt/gofpdf"
	"github.com/labstack/echo/v4"
)

// CreateFeedback creates a new feedback entry
func CreateFeedback(c echo.Context) error {
	feedback := new(models.Feedback)
	if err := c.Bind(feedback); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if result := models.DB.Create(feedback); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, result.Error.Error())
	}

	return c.JSON(http.StatusCreated, feedback)
}

// GetFeedbacks retrieves all feedback entries
func GetFeedbacks(c echo.Context) error {
	var feedbacks []models.Feedback
	if result := models.DB.Find(&feedbacks); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, result.Error.Error())
	}
	return c.JSON(http.StatusOK, feedbacks)
}

// DeleteFeedback deletes a feedback entry by ID
func DeleteFeedback(c echo.Context) error {
	id := c.Param("id")
	if result := models.DB.Delete(&models.Feedback{}, id); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, result.Error.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

// GenerateReport generates a PDF report of feedbacks
func GenerateReport(c echo.Context) error {
	var feedbacks []models.Feedback
	if result := models.DB.Find(&feedbacks); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, result.Error.Error())
	}

	pdf := gofpdf.New("P", "mm", "A4", "")

	// Adicione uma página
	pdf.AddPage()

	// Defina a fonte
	pdf.SetFont("Arial", "", 12) // Usando uma fonte padrão para testes

	// Adicione um título
	pdf.SetFont("Arial", "B", 16)
	pdf.Cell(0, 10, "Feedback Report")
	pdf.Ln(12)

	// Adicione os feedbacks
	pdf.SetFont("Arial", "", 12)
	for _, feedback := range feedbacks {
		pdf.Cell(0, 10, "User: "+feedback.User)
		pdf.Ln(6)
		pdf.Cell(0, 10, "Rating: "+strconv.Itoa(feedback.Rating))
		pdf.Ln(6)
		pdf.MultiCell(0, 10, "Content: "+feedback.Content, "", "L", false)
		pdf.Ln(6)
	}

	// Salve o arquivo PDF
	filePath := "feedback_report.pdf"
	err := pdf.OutputFileAndClose(filePath)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.Attachment(filePath, "feedback_report.pdf")
}
