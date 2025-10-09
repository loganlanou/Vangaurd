-- name: GetDesignSystem :one
SELECT * FROM design_systems WHERE id = ? LIMIT 1;

-- name: CreateDesignSystem :one
INSERT INTO design_systems (user_id, name, description, palette_data, config_data, is_public)
VALUES (?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: UpdateDesignSystem :exec
UPDATE design_systems
SET name = ?, description = ?, palette_data = ?, config_data = ?, is_public = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ? AND user_id = ?;

-- name: DeleteDesignSystem :exec
DELETE FROM design_systems WHERE id = ? AND user_id = ?;

-- name: ListUserDesignSystems :many
SELECT * FROM design_systems WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?;

-- name: ListPublicDesignSystems :many
SELECT * FROM design_systems WHERE is_public = TRUE ORDER BY created_at DESC LIMIT ? OFFSET ?;
