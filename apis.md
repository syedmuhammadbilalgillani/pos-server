Complete API Reference for Multi-Tenant Retail System

1. System & Super Admin Management
   Authentication & Authorization

POST /api/v1/super-admin/register - Create initial super admin account
POST /api/v1/super-admin/login - Authenticate super admin
POST /api/v1/super-admin/logout - End super admin session
GET /api/v1/super-admin/session/validate - Validate session token
POST /api/v1/super-admin/password/forgot - Initiate password reset
POST /api/v1/super-admin/password/reset - Complete password reset
PUT /api/v1/super-admin/password/change - Change password (authenticated)
GET /api/v1/super-admin/profile - Get super admin profile
PUT /api/v1/super-admin/profile - Update super admin profile
GET /api/v1/super-admin/permissions - List all permissions
POST /api/v1/super-admin/two-factor/enable - Enable 2FA
POST /api/v1/super-admin/two-factor/disable - Disable 2FA
POST /api/v1/super-admin/two-factor/verify - Verify 2FA code

Super Admin User Management

GET /api/v1/super-admin/users - List all super admin users
POST /api/v1/super-admin/users - Create additional super admin user
GET /api/v1/super-admin/users/{userId} - Get super admin user details
PUT /api/v1/super-admin/users/{userId} - Update super admin user
DELETE /api/v1/super-admin/users/{userId} - Delete super admin user
PATCH /api/v1/super-admin/users/{userId}/status - Enable/disable user
PUT /api/v1/super-admin/users/{userId}/roles - Assign roles to user

System Configuration

GET /api/v1/system/status - Get system status and health
GET /api/v1/system/configuration - Get system configuration
PUT /api/v1/system/configuration - Update system configuration
GET /api/v1/system/metrics - Get system performance metrics
POST /api/v1/system/maintenance/start - Schedule maintenance mode
POST /api/v1/system/maintenance/end - End maintenance mode
GET /api/v1/system/logs - Get system logs
GET /api/v1/system/version - Get current version info

2. Tenant Management
   Tenant CRUD Operations

GET /api/v1/tenants - List all tenants with pagination and filtering
POST /api/v1/tenants - Create new tenant
GET /api/v1/tenants/{tenantId} - Get tenant details
PUT /api/v1/tenants/{tenantId} - Update tenant information
DELETE /api/v1/tenants/{tenantId} - Delete tenant (with cascading option)
PATCH /api/v1/tenants/{tenantId}/status - Activate/deactivate tenant
GET /api/v1/tenants/{tenantId}/stats - Get tenant statistics

Tenant Database Management

POST /api/v1/tenant-databases - Create tenant database
GET /api/v1/tenant-databases - List all tenant databases
GET /api/v1/tenant-databases/{tenantId} - Get database for specific tenant
PUT /api/v1/tenant-databases/{tenantId}/connection - Update database connection
POST /api/v1/tenant-databases/{tenantId}/migrate - Run database migrations
POST /api/v1/tenant-databases/{tenantId}/backup - Create database backup
GET /api/v1/tenant-databases/{tenantId}/backups - List available backups
POST /api/v1/tenant-databases/{tenantId}/restore - Restore from backup
GET /api/v1/tenant-databases/{tenantId}/status - Check database health
POST /api/v1/tenant-databases/{tenantId}/test-connection - Test connection

Tenant Subscription Management

GET /api/v1/tenant-subscriptions - List all subscription plans
GET /api/v1/tenant-subscriptions/{tenantId} - Get tenant subscription
POST /api/v1/tenant-subscriptions/{tenantId} - Create tenant subscription
PUT /api/v1/tenant-subscriptions/{tenantId} - Update tenant subscription
PATCH /api/v1/tenant-subscriptions/{tenantId}/status - Change subscription status
GET /api/v1/tenant-subscriptions/{tenantId}/invoices - Get subscription invoices
POST /api/v1/tenant-subscriptions/{tenantId}/upgrade - Upgrade subscription
POST /api/v1/tenant-subscriptions/{tenantId}/downgrade - Downgrade subscription
POST /api/v1/tenant-subscriptions/{tenantId}/cancel - Cancel subscription
POST /api/v1/tenant-subscriptions/{tenantId}/renew - Renew subscription

Tenant Metrics & Analytics

GET /api/v1/tenant-metrics - List all tenant metrics
GET /api/v1/tenant-metrics/{tenantId} - Get specific tenant metrics
GET /api/v1/tenant-metrics/{tenantId}/daily - Get daily metrics
GET /api/v1/tenant-metrics/{tenantId}/weekly - Get weekly metrics
GET /api/v1/tenant-metrics/{tenantId}/monthly - Get monthly metrics
GET /api/v1/tenant-metrics/{tenantId}/quarterly - Get quarterly metrics
GET /api/v1/tenant-metrics/{tenantId}/yearly - Get yearly metrics
GET /api/v1/tenant-metrics/{tenantId}/usage - Get tenant resource usage
GET /api/v1/tenant-metrics/comparative - Compare metrics across tenants
GET /api/v1/tenant-metrics/dashboard - Get metrics dashboard data
POST /api/v1/tenant-metrics/refresh - Force metrics refresh

Super Admin Audit & Security

GET /api/v1/audit-logs - List all audit logs
GET /api/v1/audit-logs/{logId} - Get specific audit log details
GET /api/v1/audit-logs/filter - Filter logs by various parameters
GET /api/v1/audit-logs/tenant/{tenantId} - Get logs for specific tenant
GET /api/v1/audit-logs/user/{userId} - Get logs for specific user
GET /api/v1/audit-logs/action/{actionType} - Get logs for specific action
GET /api/v1/audit-logs/export - Export logs in CSV/PDF
GET /api/v1/security/login-attempts - Get failed login attempts
GET /api/v1/security/vulnerabilities - Get security vulnerability reports
POST /api/v1/security/scan - Initiate security scan

3. Tenant Administration & Authentication
   Tenant Authentication

POST /api/v1/{tenantId}/auth/login - Tenant user login
POST /api/v1/{tenantId}/auth/logout - Tenant user logout
GET /api/v1/{tenantId}/auth/session/validate - Validate tenant session
POST /api/v1/{tenantId}/auth/password/forgot - Initiate password reset
POST /api/v1/{tenantId}/auth/password/reset - Complete password reset
PUT /api/v1/{tenantId}/auth/password/change - Change password
POST /api/v1/{tenantId}/auth/two-factor/enable - Enable 2FA
POST /api/v1/{tenantId}/auth/two-factor/disable - Disable 2FA
POST /api/v1/{tenantId}/auth/two-factor/verify - Verify 2FA code
GET /api/v1/{tenantId}/auth/permissions - Get user permissions

Tenant User Management

GET /api/v1/{tenantId}/users - List all users with pagination and filtering
POST /api/v1/{tenantId}/users - Create user
GET /api/v1/{tenantId}/users/{userId} - Get user details
PUT /api/v1/{tenantId}/users/{userId} - Update user
DELETE /api/v1/{tenantId}/users/{userId} - Delete user
PATCH /api/v1/{tenantId}/users/{userId}/status - Activate/deactivate user
PUT /api/v1/{tenantId}/users/{userId}/roles - Assign roles to user
GET /api/v1/{tenantId}/users/{userId}/permissions - Get user permissions
PUT /api/v1/{tenantId}/users/{userId}/permissions - Update user permissions
GET /api/v1/{tenantId}/users/{userId}/activity - Get user activity log
POST /api/v1/{tenantId}/users/import - Bulk import users
GET /api/v1/{tenantId}/users/export - Export users list

Role & Permission Management

GET /api/v1/{tenantId}/roles - List all roles
POST /api/v1/{tenantId}/roles - Create role
GET /api/v1/{tenantId}/roles/{roleId} - Get role details
PUT /api/v1/{tenantId}/roles/{roleId} - Update role
DELETE /api/v1/{tenantId}/roles/{roleId} - Delete role
GET /api/v1/{tenantId}/roles/{roleId}/permissions - Get role permissions
PUT /api/v1/{tenantId}/roles/{roleId}/permissions - Update role permissions
GET /api/v1/{tenantId}/roles/{roleId}/users - List users with specific role

4. Store Management
   Store Operations

GET /api/v1/{tenantId}/stores - List all stores with filtering and pagination
POST /api/v1/{tenantId}/stores - Create store
GET /api/v1/{tenantId}/stores/{storeId} - Get store details
PUT /api/v1/{tenantId}/stores/{storeId} - Update store
DELETE /api/v1/{tenantId}/stores/{storeId} - Delete store
PATCH /api/v1/{tenantId}/stores/{storeId}/status - Activate/deactivate store
GET /api/v1/{tenantId}/stores/{storeId}/metrics - Get store metrics
POST /api/v1/{tenantId}/stores/import - Bulk import stores
GET /api/v1/{tenantId}/stores/export - Export stores list

Store Configuration

GET /api/v1/{tenantId}/stores/{storeId}/settings - Get store settings
PUT /api/v1/{tenantId}/stores/{storeId}/settings - Update store settings
GET /api/v1/{tenantId}/stores/{storeId}/business-hours - Get business hours
PUT /api/v1/{tenantId}/stores/{storeId}/business-hours - Update business hours
GET /api/v1/{tenantId}/stores/{storeId}/tax-settings - Get tax settings
PUT /api/v1/{tenantId}/stores/{storeId}/tax-settings - Update tax settings
GET /api/v1/{tenantId}/stores/{storeId}/payment-methods - Get payment methods
PUT /api/v1/{tenantId}/stores/{storeId}/payment-methods - Update payment methods
GET /api/v1/{tenantId}/stores/{storeId}/receipt-templates - Get receipt templates
PUT /api/v1/{tenantId}/stores/{storeId}/receipt-templates - Update receipt templates

Store Personnel

GET /api/v1/{tenantId}/stores/{storeId}/staff - List store staff
POST /api/v1/{tenantId}/stores/{storeId}/staff - Assign user to store
DELETE /api/v1/{tenantId}/stores/{storeId}/staff/{userId} - Remove user from store
GET /api/v1/{tenantId}/stores/{storeId}/managers - List store managers
POST /api/v1/{tenantId}/stores/{storeId}/managers - Assign manager to store
DELETE /api/v1/{tenantId}/stores/{storeId}/managers/{userId} - Remove manager from store
GET /api/v1/{tenantId}/stores/{storeId}/schedules - Get staff schedules
PUT /api/v1/{tenantId}/stores/{storeId}/schedules - Update staff schedules

5. Product Management
   Product Category Management

GET /api/v1/{tenantId}/product-categories - List all categories
POST /api/v1/{tenantId}/product-categories - Create category
GET /api/v1/{tenantId}/product-categories/{categoryId} - Get category details
PUT /api/v1/{tenantId}/product-categories/{categoryId} - Update category
DELETE /api/v1/{tenantId}/product-categories/{categoryId} - Delete category
GET /api/v1/{tenantId}/product-categories/tree - Get category hierarchy
POST /api/v1/{tenantId}/product-categories/reorder - Reorder categories
POST /api/v1/{tenantId}/product-categories/import - Bulk import categories
GET /api/v1/{tenantId}/product-categories/export - Export categories

Product Management

GET /api/v1/{tenantId}/products - List products with filtering and pagination
POST /api/v1/{tenantId}/products - Create product
GET /api/v1/{tenantId}/products/{productId} - Get product details
PUT /api/v1/{tenantId}/products/{productId} - Update product
DELETE /api/v1/{tenantId}/products/{productId} - Delete product
PATCH /api/v1/{tenantId}/products/{productId}/status - Activate/deactivate product
GET /api/v1/{tenantId}/products/search - Search products
GET /api/v1/{tenantId}/products/barcode/{barcode} - Get product by barcode
GET /api/v1/{tenantId}/products/sku/{sku} - Get product by SKU
POST /api/v1/{tenantId}/products/import - Bulk import products
GET /api/v1/{tenantId}/products/export - Export products
GET /api/v1/{tenantId}/products/{productId}/history - Get product history
POST /api/v1/{tenantId}/products/{productId}/image - Upload product image
DELETE /api/v1/{tenantId}/products/{productId}/image - Delete product image

Product Variant Management

GET /api/v1/{tenantId}/products/{productId}/variants - List variants for product
POST /api/v1/{tenantId}/products/{productId}/variants - Create variant
GET /api/v1/{tenantId}/product-variants/{variantId} - Get variant details
PUT /api/v1/{tenantId}/product-variants/{variantId} - Update variant
DELETE /api/v1/{tenantId}/product-variants/{variantId} - Delete variant
GET /api/v1/{tenantId}/product-variants/barcode/{barcode} - Get variant by barcode
GET /api/v1/{tenantId}/product-variants/sku/{sku} - Get variant by SKU
POST /api/v1/{tenantId}/product-variants/import - Bulk import variants
GET /api/v1/{tenantId}/product-variants/export - Export variants
POST /api/v1/{tenantId}/product-variants/{variantId}/image - Upload variant image
DELETE /api/v1/{tenantId}/product-variants/{variantId}/image - Delete variant image

Product Attributes & Options

GET /api/v1/{tenantId}/product-attributes - List all attributes
POST /api/v1/{tenantId}/product-attributes - Create attribute
GET /api/v1/{tenantId}/product-attributes/{attributeId} - Get attribute details
PUT /api/v1/{tenantId}/product-attributes/{attributeId} - Update attribute
DELETE /api/v1/{tenantId}/product-attributes/{attributeId} - Delete attribute
GET /api/v1/{tenantId}/product-attributes/{attributeId}/values - Get attribute values
POST /api/v1/{tenantId}/product-attributes/{attributeId}/values - Add attribute value
DELETE /api/v1/{tenantId}/product-attributes/{attributeId}/values/{valueId} - Delete attribute value

6. Inventory Management
   Inventory Operations

GET /api/v1/{tenantId}/inventory - List inventory with filtering and pagination
GET /api/v1/{tenantId}/inventory/store/{storeId} - Get inventory for specific store
GET /api/v1/{tenantId}/inventory/product/{productId} - Get inventory for specific product
GET /api/v1/{tenantId}/inventory/variant/{variantId} - Get inventory for specific variant
POST /api/v1/{tenantId}/inventory/adjust - Adjust inventory quantity
POST /api/v1/{tenantId}/inventory/transfer - Transfer inventory between stores
GET /api/v1/{tenantId}/inventory/low-stock - Get low stock items
GET /api/v1/{tenantId}/inventory/out-of-stock - Get out of stock items
GET /api/v1/{tenantId}/inventory/expiring - Get expiring inventory
POST /api/v1/{tenantId}/inventory/import - Bulk import inventory
GET /api/v1/{tenantId}/inventory/export - Export inventory data
GET /api/v1/{tenantId}/inventory/history - Get inventory transaction history
GET /api/v1/{tenantId}/inventory/history/{productId} - Get history for specific product

Stocktake Management

POST /api/v1/{tenantId}/stocktakes - Create stocktake
GET /api/v1/{tenantId}/stocktakes - List stocktakes
GET /api/v1/{tenantId}/stocktakes/{stocktakeId} - Get stocktake details
PUT /api/v1/{tenantId}/stocktakes/{stocktakeId} - Update stocktake
PATCH /api/v1/{tenantId}/stocktakes/{stocktakeId}/status - Update stocktake status
DELETE /api/v1/{tenantId}/stocktakes/{stocktakeId} - Delete stocktake
POST /api/v1/{tenantId}/stocktakes/{stocktakeId}/submit - Submit stocktake
POST /api/v1/{tenantId}/stocktakes/{stocktakeId}/items - Add items to stocktake
PUT /api/v1/{tenantId}/stocktakes/{stocktakeId}/items/{itemId} - Update stocktake item
DELETE /api/v1/{tenantId}/stocktakes/{stocktakeId}/items/{itemId} - Remove item from stocktake
POST /api/v1/{tenantId}/stocktakes/{stocktakeId}/commit - Commit stocktake adjustments

7. Supplier & Purchase Order Management
   Supplier Management

GET /api/v1/{tenantId}/suppliers - List suppliers with filtering and pagination
POST /api/v1/{tenantId}/suppliers - Create supplier
GET /api/v1/{tenantId}/suppliers/{supplierId} - Get supplier details
PUT /api/v1/{tenantId}/suppliers/{supplierId} - Update supplier
DELETE /api/v1/{tenantId}/suppliers/{supplierId} - Delete supplier
GET /api/v1/{tenantId}/suppliers/{supplierId}/products - Get products from supplier
GET /api/v1/{tenantId}/suppliers/{supplierId}/orders - Get orders for supplier
POST /api/v1/{tenantId}/suppliers/import - Bulk import suppliers
GET /api/v1/{tenantId}/suppliers/export - Export suppliers list
GET /api/v1/{tenantId}/suppliers/{supplierId}/contacts - Get supplier contacts
POST /api/v1/{tenantId}/suppliers/{supplierId}/contacts - Add supplier contact
PUT /api/v1/{tenantId}/suppliers/{supplierId}/contacts/{contactId} - Update supplier contact
DELETE /api/v1/{tenantId}/suppliers/{supplierId}/contacts/{contactId} - Delete supplier contact

Purchase Order Management

GET /api/v1/{tenantId}/purchase-orders - List purchase orders
POST /api/v1/{tenantId}/purchase-orders - Create purchase order
GET /api/v1/{tenantId}/purchase-orders/{orderId} - Get purchase order details
PUT /api/v1/{tenantId}/purchase-orders/{orderId} - Update purchase order
DELETE /api/v1/{tenantId}/purchase-orders/{orderId} - Delete purchase order
PATCH /api/v1/{tenantId}/purchase-orders/{orderId}/status - Update order status
POST /api/v1/{tenantId}/purchase-orders/{orderId}/approve - Approve purchase order
POST /api/v1/{tenantId}/purchase-orders/{orderId}/cancel - Cancel purchase order
POST /api/v1/{tenantId}/purchase-orders/{orderId}/send - Send order to supplier
POST /api/v1/{tenantId}/purchase-orders/{orderId}/receive - Receive order (full)
POST /api/v1/{tenantId}/purchase-orders/{orderId}/receive-partial - Receive order (partial)
GET /api/v1/{tenantId}/purchase-orders/{orderId}/history - Get order history
POST /api/v1/{tenantId}/purchase-orders/export - Export purchase orders
GET /api/v1/{tenantId}/purchase-orders/pdf/{orderId} - Generate PO PDF

Purchase Order Items

POST /api/v1/{tenantId}/purchase-orders/{orderId}/items - Add item to order
GET /api/v1/{tenantId}/purchase-orders/{orderId}/items - Get order items
PUT /api/v1/{tenantId}/purchase-orders/{orderId}/items/{itemId} - Update order item
DELETE /api/v1/{tenantId}/purchase-orders/{orderId}/items/{itemId} - Remove item from order
POST /api/v1/{tenantId}/purchase-orders/{orderId}/items/import - Bulk import order items
POST /api/v1/{tenantId}/purchase-orders/{orderId}/items/{itemId}/receive - Receive specific item

8. Register & POS Operations
   Register Management

GET /api/v1/{tenantId}/registers - List registers
POST /api/v1/{tenantId}/registers - Create register
GET /api/v1/{tenantId}/registers/{registerId} - Get register details
PUT /api/v1/{tenantId}/registers/{registerId} - Update register
DELETE /api/v1/{tenantId}/registers/{registerId} - Delete register
PATCH /api/v1/{tenantId}/registers/{registerId}/status - Activate/deactivate register
GET /api/v1/{tenantId}/registers/{registerId}/configuration - Get register configuration
PUT /api/v1/{tenantId}/registers/{registerId}/configuration - Update register configuration

Shift Management

POST /api/v1/{tenantId}/shifts/start - Start new shift
PUT /api/v1/{tenantId}/shifts/{shiftId}/end - End shift
GET /api/v1/{tenantId}/shifts - List shifts with filtering
GET /api/v1/{tenantId}/shifts/{shiftId} - Get shift details
GET /api/v1/{tenantId}/shifts/active - Get active shifts
GET /api/v1/{tenantId}/shifts/user/{userId} - Get shifts by user
GET /api/v1/{tenantId}/shifts/register/{registerId} - Get shifts by register
PUT /api/v1/{tenantId}/shifts/{shiftId}/notes - Update shift notes
POST /api/v1/{tenantId}/shifts/{shiftId}/cash-adjustment - Record cash adjustment
GET /api/v1/{tenantId}/shifts/{shiftId}/sales - Get sales during shift
GET /api/v1/{tenantId}/shifts/{shiftId}/transactions - Get transactions during shift
POST /api/v1/{tenantId}/shifts/{shiftId}/count-reconciliation - Record cash count

Cash Management

POST /api/v1/{tenantId}/cash-management/float/add - Add float to register
POST /api/v1/{tenantId}/cash-management/float/remove - Remove float from register
POST /api/v1/{tenantId}/cash-management/cash-in - Record cash in
POST /api/v1/{tenantId}/cash-management/cash-out - Record cash out
GET /api/v1/{tenantId}/cash-management/register/{registerId}/balance - Get register balance
GET /api/v1/{tenantId}/cash-management/history - Get cash management history
POST /api/v1/{tenantId}/cash-management/petty-cash - Record petty cash transaction

9. Sales & Transaction Management
   Sale Operations

POST /api/v1/{tenantId}/sales - Create new sale
GET /api/v1/{tenantId}/sales - List sales with filtering
GET /api/v1/{tenantId}/sales/{saleId} - Get sale details
PUT /api/v1/{tenantId}/sales/{saleId} - Update sale
DELETE /api/v1/{tenantId}/sales/{saleId} - Delete draft sale
PATCH /api/v1/{tenantId}/sales/{saleId}/status - Update sale status
POST /api/v1/{tenantId}/sales/{saleId}/void - Void sale
POST /api/v1/{tenantId}/sales/{saleId}/complete - Complete sale
POST /api/v1/{tenantId}/sales/{saleId}/hold - Place sale on hold
POST /api/v1/{tenantId}/sales/{saleId}/resume - Resume held sale
GET /api/v1/{tenantId}/sales/{saleId}/receipt - Generate receipt
GET /api/v1/{tenantId}/sales/{saleId}/invoice - Generate invoice
POST /api/v1/{tenantId}/sales/{saleId}/email-receipt - Email receipt to customer
GET /api/v1/{tenantId}/sales/held - Get all held sales
GET /api/v1/{tenantId}/sales/recent - Get recent sales
GET /api/v1/{tenantId}/sales/search - Search sales by various criteria

Sale Items

POST /api/v1/{tenantId}/sales/{saleId}/items - Add item to sale
GET /api/v1/{tenantId}/sales/{saleId}/items - Get sale items
PUT /api/v1/{tenantId}/sales/{saleId}/items/{itemId} - Update sale item
DELETE /api/v1/{tenantId}/sales/{saleId}/items/{itemId} - Remove item from sale
POST /api/v1/{tenantId}/sales/{saleId}/items/{itemId}/discount - Apply discount to item
DELETE /api/v1/{tenantId}/sales/{saleId}/items/{itemId}/discount - Remove item discount
PUT /api/v1/{tenantId}/sales/{saleId}/items/{itemId}/price - Override item price
PUT /api/v1/{tenantId}/sales/{saleId}/items/{itemId}/quantity - Update item quantity
POST /api/v1/{tenantId}/sales/{saleId}/items/bulk - Add multiple items to sale

Payment Processing

POST /api/v1/{tenantId}/sales/{saleId}/payments - Process payment
GET /api/v1/{tenantId}/sales/{saleId}/payments - List payments for sale
DELETE /api/v1/{tenantId}/sales/{saleId}/payments/{paymentId} - Void payment
POST /api/v1/{tenantId}/sales/{saleId}/payments/cash - Process cash payment
POST /api/v1/{tenantId}/sales/{saleId}/payments/card - Process card payment
POST /api/v1/{tenantId}/sales/{saleId}/payments/mobile - Process mobile payment
POST /api/v1/{tenantId}/sales/{saleId}/payments/gift-card - Process gift card payment
POST /api/v1/{tenantId}/sales/{saleId}/payments/split - Process split payment
POST /api/v1/{tenantId}/sales/{saleId}/payments/{paymentId}/refund - Process refund
GET /api/v1/{tenantId}/payments - List all payments with filtering
GET /api/v1/{tenantId}/payments/{paymentId} - Get payment details
GET /api/v1/{tenantId}/payments/methods - Get available payment methods

Returns & Exchanges

POST /api/v1/{tenantId}/returns - Create return
GET /api/v1/{tenantId}/returns - List returns
GET /api/v1/{tenantId}/returns/{returnId} - Get return details
PATCH /api/v1/{tenantId}/returns/{returnId}/status - Update return status
POST /api/v1/{tenantId}/returns/{returnId}/approve - Approve return
POST /api/v1/{tenantId}/returns/{returnId}/reject - Reject return
POST /api/v1/{tenantId}/returns/{returnId}/items - Add items to return
DELETE /api/v1/{tenantId}/returns/{returnId}/items/{itemId} - Remove item from return
POST /api/v1/{tenantId}/exchanges - Create exchange
GET /api/v1/{tenantId}/exchanges - List exchanges
GET /api/v1/{tenantId}/exchanges/{exchangeId} - Get exchange details

Discounts & Promotions

GET /api/v1/{tenantId}/discounts - List all discounts
POST /api/v1/{tenantId}/discounts - Create discount
GET /api/v1/{tenantId}/discounts/{discountId} - Get discount details
PUT /api/v1/{tenantId}/discounts/{discountId} - Update discount
DELETE /api/v1/{tenantId}/discounts/{discountId} - Delete discount
PATCH /api/v1/{tenantId}/discounts/{discountId}/status - Activate/deactivate discount
GET /api/v1/{tenantId}/discounts/validate/{code} - Validate

<!-- # Complete Multi-Tenant POS System APIs

## Core POS Functionality

### Tenant Management

- `GET /api/tenants` - List all tenants (admin only)
- `GET /api/tenants/:id` - Get tenant details
- `POST /api/tenants` - Create new tenant
- `PUT /api/tenants/:id` - Update tenant information
- `DELETE /api/tenants/:id` - Deactivate tenant
- `GET /api/tenants/:id/settings` - Get tenant settings
- `PUT /api/tenants/:id/settings` - Update tenant settings
- `GET /api/tenants/:id/stats` - Get tenant statistics
- `POST /api/tenants/:id/restore` - Restore deactivated tenant
- `GET /api/tenants/:id/subscription` - Get subscription details
- `PUT /api/tenants/:id/subscription` - Update subscription plan

### Store Management

- `GET /api/stores` - List stores for current tenant
- `GET /api/stores/:id` - Get store details
- `POST /api/stores` - Create new store
- `PUT /api/stores/:id` - Update store information
- `DELETE /api/stores/:id` - Deactivate store
- `GET /api/stores/:id/settings` - Get store-specific settings
- `PUT /api/stores/:id/settings` - Update store-specific settings
- `GET /api/stores/:id/stats` - Get store statistics
- `GET /api/stores/:id/hours` - Get store hours
- `PUT /api/stores/:id/hours` - Update store hours
- `GET /api/stores/:id/layout` - Get store layout configuration
- `PUT /api/stores/:id/layout` - Update store layout

### User Management

- `GET /api/users` - List users for current tenant
- `GET /api/users/:id` - Get user details
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user information
- `DELETE /api/users/:id` - Deactivate user
- `GET /api/users/:id/permissions` - Get user permissions
- `PUT /api/users/:id/permissions` - Update user permissions
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh authentication token
- `POST /api/auth/reset-password` - Password reset
- `PUT /api/users/profile` - Update current user profile
- `GET /api/users/:id/activity` - Get user activity log
- `POST /api/users/:id/suspend` - Suspend user account
- `POST /api/users/:id/unsuspend` - Unsuspend user account
- `PUT /api/users/:id/role` - Update user role

### Product Category Management

- `GET /api/product-categories` - List all categories
- `GET /api/product-categories/:id` - Get category details
- `POST /api/product-categories` - Create new category
- `PUT /api/product-categories/:id` - Update category
- `DELETE /api/product-categories/:id` - Delete category
- `PUT /api/product-categories/reorder` - Reorder categories
- `GET /api/product-categories/:id/products` - List products in category
- `POST /api/product-categories/:id/image` - Upload category image

### Product Management

- `GET /api/products` - List all products (with filtering)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product information
- `DELETE /api/products/:id` - Deactivate product
- `GET /api/products/:id/variants` - Get product variants
- `POST /api/products/bulk-upload` - Bulk import products
- `GET /api/products/search` - Search products
- `GET /api/products/barcode/:code` - Get product by barcode
- `POST /api/products/:id/images` - Upload product images
- `DELETE /api/products/:id/images/:imageId` - Delete product image
- `GET /api/products/:id/price-history` - Get product price history
- `GET /api/products/export` - Export products
- `GET /api/products/low-stock` - Get low stock products
- `POST /api/products/duplicate/:id` - Duplicate existing product

### Product Variant Management

- `GET /api/product-variants/:id` - Get variant details
- `POST /api/product-variants` - Create new variant
- `PUT /api/product-variants/:id` - Update variant
- `DELETE /api/product-variants/:id` - Delete variant
- `POST /api/product-variants/:id/image` - Upload variant image
- `PUT /api/product-variants/:id/stock` - Update variant stock

### Inventory Management

- `GET /api/inventory` - List inventory items (with filtering)
- `GET /api/inventory/:id` - Get inventory item details
- `PUT /api/inventory/update-stock` - Update stock levels
- `POST /api/inventory/stock-adjustment` - Record stock adjustment
- `GET /api/inventory/low-stock` - List low stock items
- `POST /api/inventory/transfer` - Transfer inventory between stores
- `GET /api/inventory/history` - Get inventory history
- `GET /api/inventory/stock-take` - Generate stock take sheet
- `POST /api/inventory/stock-take/complete` - Complete stock take
- `GET /api/inventory/expiring` - List soon-to-expire items
- `GET /api/inventory/movement-report` - Generate inventory movement report
- `POST /api/inventory/write-off` - Record inventory write-off

### Register Management

- `GET /api/registers` - List all registers
- `GET /api/registers/:id` - Get register details
- `POST /api/registers` - Create new register
- `PUT /api/registers/:id` - Update register information
- `DELETE /api/registers/:id` - Deactivate register
- `POST /api/registers/:id/open` - Open register
- `POST /api/registers/:id/close` - Close register
- `GET /api/registers/:id/status` - Get register status
- `POST /api/registers/:id/cash-in` - Record cash added to drawer
- `POST /api/registers/:id/cash-out` - Record cash removed from drawer
- `GET /api/registers/:id/transaction-history` - Get register transaction history
- `POST /api/registers/:id/pair-device` - Pair device with register

### Shift Management

- `GET /api/shifts` - List shifts (with filtering)
- `GET /api/shifts/:id` - Get shift details
- `POST /api/shifts` - Start new shift
- `PUT /api/shifts/:id` - Update shift information
- `PUT /api/shifts/:id/end` - End shift
- `GET /api/shifts/current` - Get current shift
- `GET /api/shifts/:id/transactions` - Get shift transactions
- `GET /api/shifts/:id/summary` - Get shift summary
- `POST /api/shifts/:id/cash-count` - Record cash count
- `GET /api/shifts/by-user/:userId` - Get shifts by user
- `GET /api/shifts/by-register/:registerId` - Get shifts by register

### Customer Management

- `GET /api/customers` - List all customers (with filtering)
- `GET /api/customers/:id` - Get customer details
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer information
- `DELETE /api/customers/:id` - Deactivate customer
- `GET /api/customers/search` - Search customers
- `GET /api/customers/:id/sales` - Get customer purchase history
- `PUT /api/customers/:id/loyalty` - Update loyalty points
- `GET /api/customers/:id/loyalty-history` - Get loyalty point history
- `POST /api/customers/import` - Import customers
- `GET /api/customers/export` - Export customers
- `GET /api/customers/:id/notes` - Get customer notes
- `POST /api/customers/:id/notes` - Add customer note
- `GET /api/customers/segments` - Get customer segments
- `POST /api/customers/segments` - Create customer segment

### Sales Management

- `GET /api/sales` - List all sales (with filtering)
- `GET /api/sales/:id` - Get sale details
- `POST /api/sales` - Create new sale
- `PUT /api/sales/:id` - Update sale information
- `DELETE /api/sales/:id` - Void sale
- `GET /api/sales/:id/items` - Get sale items
- `GET /api/sales/:id/payments` - Get sale payments
- `GET /api/sales/:id/receipt` - Generate receipt
- `POST /api/sales/:id/refund` - Process refund
- `GET /api/sales/by-date` - Get sales by date range
- `POST /api/sales/:id/email-receipt` - Email receipt to customer
- `GET /api/sales/:id/invoice` - Generate invoice
- `POST /api/sales/hold` - Place sale on hold
- `GET /api/sales/held` - Get held sales
- `POST /api/sales/held/:id/resume` - Resume held sale
- `POST /api/sales/:id/split` - Split payment for sale
- `POST /api/sales/:id/tip` - Add tip to sale

### Sale Item Management

- `GET /api/sale-items/:id` - Get sale item details
- `POST /api/sale-items` - Add item to sale
- `PUT /api/sale-items/:id` - Update sale item
- `DELETE /api/sale-items/:id` - Remove item from sale
- `POST /api/sale-items/:id/discount` - Apply discount to item
- `POST /api/sale-items/:id/notes` - Add notes to sale item
- `POST /api/sale-items/:id/return` - Return sale item

### Payment Management

- `GET /api/payments` - List payments (with filtering)
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments` - Process new payment
- `PUT /api/payments/:id` - Update payment information
- `DELETE /api/payments/:id` - Void payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/methods` - Get available payment methods
- `POST /api/payments/refund` - Process refund
- `GET /api/payments/batches` - Get payment batches
- `POST /api/payments/batches/:id/close` - Close payment batch
- `GET /api/payments/reconciliation` - Generate reconciliation report

### Tax Rate Management

- `GET /api/tax-rates` - List all tax rates
- `GET /api/tax-rates/:id` - Get tax rate details
- `POST /api/tax-rates` - Create new tax rate
- `PUT /api/tax-rates/:id` - Update tax rate
- `DELETE /api/tax-rates/:id` - Delete tax rate
- `GET /api/tax-rates/by-jurisdiction/:code` - Get tax rates by jurisdiction
- `GET /api/tax-rates/report` - Generate tax report

### Discount Management

- `GET /api/discounts` - List all discounts
- `GET /api/discounts/:id` - Get discount details
- `POST /api/discounts` - Create new discount
- `PUT /api/discounts/:id` - Update discount
- `DELETE /api/discounts/:id` - Delete discount
- `GET /api/discounts/validate/:code` - Validate discount code
- `GET /api/discounts/active` - Get currently active discounts
- `POST /api/discounts/:id/deactivate` - Deactivate discount
- `POST /api/discounts/:id/activate` - Activate discount
- `GET /api/discounts/usage/:id` - Get discount usage history

### Supplier Management

- `GET /api/suppliers` - List all suppliers
- `GET /api/suppliers/:id` - Get supplier details
- `POST /api/suppliers` - Create new supplier
- `PUT /api/suppliers/:id` - Update supplier information
- `DELETE /api/suppliers/:id` - Deactivate supplier
- `GET /api/suppliers/:id/purchase-orders` - Get supplier purchase orders
- `GET /api/suppliers/:id/products` - Get products from supplier
- `POST /api/suppliers/import` - Import suppliers
- `GET /api/suppliers/export` - Export suppliers
- `GET /api/suppliers/:id/contacts` - Get supplier contacts
- `POST /api/suppliers/:id/contacts` - Add supplier contact

### Purchase Order Management

- `GET /api/purchase-orders` - List all purchase orders
- `GET /api/purchase-orders/:id` - Get purchase order details
- `POST /api/purchase-orders` - Create new purchase order
- `PUT /api/purchase-orders/:id` - Update purchase order
- `DELETE /api/purchase-orders/:id` - Cancel purchase order
- `PUT /api/purchase-orders/:id/status` - Update purchase order status
- `GET /api/purchase-orders/:id/items` - Get purchase order items
- `POST /api/purchase-orders/:id/receive` - Receive purchase order
- `GET /api/purchase-orders/:id/history` - Get purchase order history
- `POST /api/purchase-orders/:id/email` - Email purchase order to supplier
- `GET /api/purchase-orders/:id/pdf` - Generate purchase order PDF
- `POST /api/purchase-orders/:id/partial-receive` - Receive partial order
- `GET /api/purchase-orders/suggested` - Get suggested purchase orders

### Purchase Order Item Management

- `GET /api/purchase-order-items/:id` - Get purchase order item details
- `POST /api/purchase-order-items` - Add item to purchase order
- `PUT /api/purchase-order-items/:id` - Update purchase order item
- `DELETE /api/purchase-order-items/:id` - Remove item from purchase order
- `POST /api/purchase-order-items/:id/receive` - Receive purchase order item

## Extended Functionality

### Reporting & Analytics

- `GET /api/reports/sales` - Sales reports
- `GET /api/reports/inventory` - Inventory reports
- `GET /api/reports/employees` - Employee performance reports
- `GET /api/reports/customers` - Customer reports
- `GET /api/reports/products` - Product performance reports
- `GET /api/reports/taxes` - Tax reports
- `GET /api/reports/custom` - Custom reports
- `POST /api/reports/save` - Save report configuration
- `GET /api/reports/saved` - List saved reports
- `GET /api/reports/saved/:id` - Get saved report
- `GET /api/reports/export/:id` - Export report
- `GET /api/reports/scheduled` - List scheduled reports
- `POST /api/reports/schedule` - Schedule report generation
- `GET /api/analytics/sales-forecast` - Get sales forecast
- `GET /api/analytics/customer-retention` - Customer retention analysis
- `GET /api/analytics/product-performance` - Product performance analysis
- `GET /api/analytics/employee-performance` - Employee performance analysis
- `GET /api/analytics/inventory-turnover` - Inventory turnover analysis
- `GET /api/analytics/profit-margins` - Profit margin analysis

### Dashboard

- `GET /api/dashboard/summary` - Dashboard summary statistics
- `GET /api/dashboard/sales-chart` - Sales chart data
- `GET /api/dashboard/inventory-status` - Inventory status
- `GET /api/dashboard/top-products` - Top selling products
- `GET /api/dashboard/recent-activity` - Recent activity log
- `GET /api/dashboard/alerts` - System alerts
- `GET /api/dashboard/revenue-trends` - Revenue trends
- `GET /api/dashboard/customer-insights` - Customer insights
- `GET /api/dashboard/staff-performance` - Staff performance metrics
- `GET /api/dashboard/upcoming-deliveries` - Upcoming deliveries
- `GET /api/dashboard/customize` - Get dashboard customization
- `PUT /api/dashboard/customize` - Update dashboard customization

### Notification System

- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/:id` - Get notification details
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete notification
- `GET /api/notifications/settings` - Get notification preferences
- `PUT /api/notifications/settings` - Update notification preferences
- `POST /api/notifications/send` - Send notification to users
- `GET /api/notifications/templates` - Get notification templates
- `POST /api/notifications/templates` - Create notification template
- `PUT /api/notifications/templates/:id` - Update notification template

### Webhooks & Integration

- `GET /api/webhooks` - List webhooks
- `GET /api/webhooks/:id` - Get webhook details
- `POST /api/webhooks` - Create webhook
- `PUT /api/webhooks/:id` - Update webhook
- `DELETE /api/webhooks/:id` - Delete webhook
- `GET /api/webhooks/:id/logs` - View webhook delivery logs
- `POST /api/webhooks/:id/test` - Test webhook
- `GET /api/integrations` - List available integrations
- `GET /api/integrations/:id` - Get integration details
- `POST /api/integrations/:id/connect` - Connect integration
- `PUT /api/integrations/:id/settings` - Update integration settings
- `DELETE /api/integrations/:id/disconnect` - Disconnect integration
- `GET /api/integrations/:id/status` - Check integration status
- `POST /api/integrations/accounting/export` - Export to accounting software
- `POST /api/integrations/ecommerce/sync` - Sync with e-commerce platform
- `POST /api/integrations/payment-gateway/process` - Process payment through gateway

### Audit & Activity Logs

- `GET /api/audit-logs` - List audit logs
- `GET /api/audit-logs/:id` - Get audit log details
- `GET /api/audit-logs/filter` - Filter audit logs
- `GET /api/audit-logs/export` - Export audit logs
- `GET /api/activity` - List system activity
- `GET /api/activity/user/:userId` - Get user activity
- `GET /api/activity/resource/:resourceType/:resourceId` - Get resource activity
- `GET /api/activity/export` - Export activity logs

### File Management

- `POST /api/files/upload` - Upload file
- `GET /api/files/:id` - Get file
- `DELETE /api/files/:id` - Delete file
- `GET /api/files/types` - Get supported file types
- `GET /api/files/by-resource/:resourceType/:resourceId` - Get files for resource
- `POST /api/files/image/resize` - Resize image
- `POST /api/files/image/crop` - Crop image
- `POST /api/files/bulk-upload` - Bulk upload files
- `GET /api/files/limits` - Get file storage limits

### Device Management

- `GET /api/devices` - List devices
- `GET /api/devices/:id` - Get device details
- `POST /api/devices` - Register new device
- `PUT /api/devices/:id` - Update device information
- `DELETE /api/devices/:id` - Deregister device
- `GET /api/devices/:id/status` - Get device status
- `POST /api/devices/:id/commands` - Send command to device
- `GET /api/devices/types` - Get supported device types
- `PUT /api/devices/:id/settings` - Update device settings
- `GET /api/devices/printers` - List printers
- `POST /api/devices/printers/test-print` - Send test print
- `GET /api/devices/scanners` - List barcode scanners
- `GET /api/devices/payment-terminals` - List payment terminals

### Backup & Recovery

- `POST /api/backups/create` - Create backup
- `GET /api/backups` - List backups
- `GET /api/backups/:id` - Get backup details
- `POST /api/backups/:id/restore` - Restore from backup
- `DELETE /api/backups/:id` - Delete backup
- `GET /api/backups/settings` - Get backup settings
- `PUT /api/backups/settings` - Update backup settings
- `POST /api/backups/schedule` - Schedule automatic backups
- `GET /api/backups/download/:id` - Download backup file

### Localization

- `GET /api/localization/languages` - Get available languages
- `GET /api/localization/translations/:lang` - Get translations for language
- `PUT /api/localization/translations/:lang` - Update translations
- `GET /api/localization/tenant-settings` - Get tenant localization settings
- `PUT /api/localization/tenant-settings` - Update tenant localization settings
- `GET /api/localization/timezones` - Get available timezones
- `GET /api/localization/currencies` - Get available currencies
- `GET /api/localization/number-formats` - Get available number formats
- `GET /api/localization/date-formats` - Get available date formats

### Marketing & Promotion

- `GET /api/marketing/campaigns` - List marketing campaigns
- `GET /api/marketing/campaigns/:id` - Get campaign details
- `POST /api/marketing/campaigns` - Create marketing campaign
- `PUT /api/marketing/campaigns/:id` - Update marketing campaign
- `DELETE /api/marketing/campaigns/:id` - Delete marketing campaign
- `GET /api/marketing/campaigns/:id/performance` - Get campaign performance
- `POST /api/marketing/email/send` - Send marketing email
- `GET /api/marketing/email/templates` - Get email templates
- `POST /api/marketing/email/templates` - Create email template
- `PUT /api/marketing/email/templates/:id` - Update email template
- `GET /api/marketing/coupons` - List coupons
- `POST /api/marketing/coupons` - Create coupon
- `GET /api/marketing/sms` - List SMS campaigns
- `POST /api/marketing/sms/send` - Send SMS campaign

### Employee Management

- `GET /api/employees` - List employees
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee information
- `DELETE /api/employees/:id` - Deactivate employee
- `GET /api/employees/:id/performance` - Get employee performance
- `GET /api/employees/:id/sales` - Get employee sales
- `GET /api/employees/:id/commission` - Get employee commission
- `POST /api/employees/:id/commission` - Update employee commission
- `GET /api/employees/schedule` - Get employee schedule
- `POST /api/employees/schedule` - Update employee schedule
- `GET /api/employees/time-clock` - Get time clock entries
- `POST /api/employees/time-clock/clock-in` - Clock in employee
- `POST /api/employees/time-clock/clock-out` - Clock out employee
- `GET /api/employees/time-clock/report` - Generate time clock report

### Loyalty Program

- `GET /api/loyalty/programs` - List loyalty programs
- `GET /api/loyalty/programs/:id` - Get loyalty program details
- `POST /api/loyalty/programs` - Create loyalty program
- `PUT /api/loyalty/programs/:id` - Update loyalty program
- `DELETE /api/loyalty/programs/:id` - Delete loyalty program
- `GET /api/loyalty/tiers` - List loyalty tiers
- `POST /api/loyalty/tiers` - Create loyalty tier
- `PUT /api/loyalty/tiers/:id` - Update loyalty tier
- `GET /api/loyalty/customers` - List loyalty customers
- `GET /api/loyalty/transactions` - List loyalty transactions
- `POST /api/loyalty/transactions` - Add loyalty transaction
- `GET /api/loyalty/rewards` - List loyalty rewards
- `POST /api/loyalty/rewards` - Create loyalty reward
- `PUT /api/loyalty/rewards/:id` - Update loyalty reward
- `POST /api/loyalty/rewards/:id/redeem` - Redeem loyalty reward

### Gift Cards

- `GET /api/gift-cards` - List gift cards
- `GET /api/gift-cards/:id` - Get gift card details
- `POST /api/gift-cards` - Create gift card
- `PUT /api/gift-cards/:id` - Update gift card
- `DELETE /api/gift-cards/:id` - Deactivate gift card
- `GET /api/gift-cards/validate/:code` - Validate gift card
- `POST /api/gift-cards/:id/reload` - Reload gift card
- `GET /api/gift-cards/:id/transactions` - Get gift card transactions
- `POST /api/gift-cards/:id/deactivate` - Deactivate gift card
- `POST /api/gift-cards/:id/activate` - Activate gift card
- `GET /api/gift-cards/report` - Generate gift card report

### Mobile App Support

- `GET /api/mobile/config` - Get mobile app configuration
- `GET /api/mobile/version` - Check app version
- `POST /api/mobile/login` - Mobile app login
- `POST /api/mobile/register-device` - Register mobile device
- `GET /api/mobile/dashboard` - Get mobile dashboard data
- `POST /api/mobile/push-token` - Register push notification token
- `GET /api/mobile/offline-data` - Get data for offline mode
- `POST /api/mobile/sync` - Sync offline transactions
- `GET /api/mobile/products` - Get optimized product list for mobile

### Offline Mode Support

- `GET /api/offline/data` - Get data for offline operation
- `POST /api/offline/sync` - Sync offline transactions
- `GET /api/offline/status` - Check sync status
- `GET /api/offline/required-data` - Get minimum required data
- `POST /api/offline/validate` - Validate offline transactions
- `GET /api/offline/sync-history` - Get sync history
- `POST /api/offline/resolve-conflicts` - Resolve sync conflicts

### System Configuration

- `GET /api/config/currencies` - Available currencies
- `GET /api/config/payment-methods` - Available payment methods
- `GET /api/config/roles` - Available user roles
- `GET /api/config/permissions` - Available permissions
- `GET /api/config/system-settings` - System settings
- `PUT /api/config/system-settings` - Update system settings
- `GET /api/config/receipt-templates` - Get receipt templates
- `PUT /api/config/receipt-templates` - Update receipt templates
- `GET /api/config/email-templates` - Get email templates
- `PUT /api/config/email-templates` - Update email templates
- `GET /api/config/tax-settings` - Get tax configuration
- `PUT /api/config/tax-settings` - Update tax configuration
- `GET /api/config/backup-settings` - Get backup configuration
- `PUT /api/config/backup-settings` - Update backup configuration -->
