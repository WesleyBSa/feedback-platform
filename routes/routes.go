package routes

import (
	"feedback-platform/controllers"

	"github.com/labstack/echo/v4"
)

// RegisterRoutes registers all the routes
func RegisterRoutes(e *echo.Echo) {
	e.POST("/feedbacks", controllers.CreateFeedback)
	e.GET("/admin/feedbacks", controllers.GetFeedbacks)
	e.DELETE("/admin/feedbacks/:id", controllers.DeleteFeedback)
	e.GET("/admin/report", controllers.GenerateReport)
}
