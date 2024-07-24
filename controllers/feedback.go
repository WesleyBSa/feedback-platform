package controllers

import (
	"feedback-platform/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetFeedbacks retorna todos os feedbacks
func GetFeedbacks(c echo.Context) error {
	var feedbacks []models.Feedback
	if result := models.DB.Find(&feedbacks); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, result.Error.Error())
	}
	return c.JSON(http.StatusOK, feedbacks)
}

// CreateFeedback cria um novo feedback
func CreateFeedback(c echo.Context) error {
	feedback := new(models.Feedback)
	if err := c.Bind(feedback); err != nil {
		return err
	}
	if result := models.DB.Create(feedback); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, result.Error.Error())
	}
	return c.JSON(http.StatusCreated, feedback)
}

// UpdateFeedback atualiza um feedback existente
func UpdateFeedback(c echo.Context) error {
	id := c.Param("id")
	var feedback models.Feedback
	if result := models.DB.First(&feedback, id); result.Error != nil {
		return c.JSON(http.StatusNotFound, result.Error.Error())
	}

	if err := c.Bind(&feedback); err != nil {
		return err
	}

	if result := models.DB.Save(&feedback); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, result.Error.Error())
	}
	return c.JSON(http.StatusOK, feedback)
}

// DeleteFeedback exclui um feedback existente
func DeleteFeedback(c echo.Context) error {
	id := c.Param("id")
	if result := models.DB.Delete(&models.Feedback{}, id); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, result.Error.Error())
	}
	return c.NoContent(http.StatusNoContent)
}
