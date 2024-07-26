package main

import (
	"feedback-platform/models"
	"feedback-platform/routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	models.ConnectDB()
	routes.RegisterRoutes(e)

	// Rota para servir o frontend
	e.Static("/", "frontend")

	// Rota para servir a página do admin
	e.File("/admin", "frontend/admin.html")

	e.Logger.Fatal(e.Start(":1313"))
}
