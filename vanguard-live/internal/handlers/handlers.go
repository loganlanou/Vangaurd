package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/loganlanou/vanguard-live/internal/database"
	"github.com/loganlanou/vanguard-live/web/templates"
)

type Handler struct {
	queries *database.Queries
}

func New(queries *database.Queries) *Handler {
	return &Handler{queries: queries}
}

// Page Handlers
func (h *Handler) HandleHome(c echo.Context) error {
	return templates.Home().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) HandleStudio(c echo.Context) error {
	return templates.Studio().Render(c.Request().Context(), c.Response().Writer)
}

func (h *Handler) HandleGallery(c echo.Context) error {
	// TODO: Implement gallery page
	return c.String(200, "Gallery - Coming Soon")
}

func (h *Handler) HandleShop(c echo.Context) error {
	// TODO: Implement shop page
	return c.String(200, "Shop - Coming Soon")
}

// API Handlers
func (h *Handler) HandleCreateDesign(c echo.Context) error {
	// TODO: Implement design creation
	return c.JSON(200, map[string]string{"status": "ok"})
}

func (h *Handler) HandleListDesigns(c echo.Context) error {
	// TODO: Implement design listing
	return c.JSON(200, map[string]string{"status": "ok"})
}

func (h *Handler) HandleGetDesign(c echo.Context) error {
	// TODO: Implement get design
	return c.JSON(200, map[string]string{"status": "ok"})
}

func (h *Handler) HandleUpdateDesign(c echo.Context) error {
	// TODO: Implement design update
	return c.JSON(200, map[string]string{"status": "ok"})
}

func (h *Handler) HandleDeleteDesign(c echo.Context) error {
	// TODO: Implement design deletion
	return c.JSON(200, map[string]string{"status": "ok"})
}

// Webhook Handlers
func (h *Handler) HandleStripeWebhook(c echo.Context) error {
	// TODO: Implement Stripe webhook
	return c.JSON(200, map[string]string{"status": "ok"})
}

func (h *Handler) HandleClerkWebhook(c echo.Context) error {
	// TODO: Implement Clerk webhook
	return c.JSON(200, map[string]string{"status": "ok"})
}
