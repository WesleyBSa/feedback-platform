package routes

import (
	"feedback-platform/controllers"

	"github.com/labstack/echo/v4"
)

func RegisterRoutes(e *echo.Echo) {
	// Rotas para a aplicação pública
	e.Static("/", "frontend")

	// Rotas para feedbacks (público)
	e.POST("/feedbacks", controllers.CreateFeedback)

	// Rotas para administração
	adminGroup := e.Group("/admin")
	adminGroup.GET("/feedbacks", controllers.GetFeedbacks)
	adminGroup.DELETE("/feedbacks/:id", controllers.DeleteFeedback)
	adminGroup.GET("/report", controllers.GenerateReport)
}
