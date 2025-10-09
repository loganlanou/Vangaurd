-- name: GetOrder :one
SELECT * FROM orders WHERE id = ? LIMIT 1;

-- name: GetOrderByStripePaymentIntent :one
SELECT * FROM orders WHERE stripe_payment_intent_id = ? LIMIT 1;

-- name: CreateOrder :one
INSERT INTO orders (user_id, stripe_payment_intent_id, status, total_amount, shipping_address)
VALUES (?, ?, ?, ?, ?)
RETURNING *;

-- name: UpdateOrderStatus :exec
UPDATE orders
SET status = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: UpdateOrderShipping :exec
UPDATE orders
SET shipstation_order_id = ?, tracking_number = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: ListUserOrders :many
SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?;

-- name: CreateOrderItem :one
INSERT INTO order_items (order_id, design_system_id, product_type, quantity, unit_price)
VALUES (?, ?, ?, ?, ?)
RETURNING *;

-- name: ListOrderItems :many
SELECT * FROM order_items WHERE order_id = ?;
