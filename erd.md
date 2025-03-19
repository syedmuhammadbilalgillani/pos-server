erDiagram
%% Super Admin Section
SUPER_ADMIN ||--o{ TENANT : "manages"
SUPER_ADMIN {
uuid id PK
string username
string email
string passwordHash
string firstName
string lastName
string phone
timestamp lastLogin
boolean isActive
jsonb permissions
timestamp createdAt
timestamp updatedAt
}

    %% Tenant Management
    TENANT ||--o{ STORE : "has"
    TENANT {
        uuid id PK
        string name
        string contactEmail
        string contactPhone
        string subscriptionPlan
        date subscriptionStartDate
        date subscriptionEndDate
        boolean isActive
        string databaseConnectionString
        jsonb settings
        timestamp createdAt
        timestamp updatedAt
    }

    TENANT_DATABASE {
        uuid id PK
        uuid tenantId FK
        string connectionName
        string host
        string port
        string username
        string passwordHash
        string databaseName
        timestamp lastBackupDate
        string status
        timestamp createdAt
        timestamp updatedAt
    }

    TENANT ||--|| TENANT_DATABASE : "owns"

    SUPER_ADMIN_AUDIT_LOG {
        uuid id PK
        uuid superAdminId FK
        uuid tenantId FK
        string action
        jsonb changes
        string ipAddress
        timestamp performedAt
        timestamp createdAt
    }

    SUPER_ADMIN ||--o{ SUPER_ADMIN_AUDIT_LOG : "generates"
    TENANT ||--o{ SUPER_ADMIN_AUDIT_LOG : "subject_of"

    TENANT_METRICS {
        uuid id PK
        uuid tenantId FK
        decimal monthlyRevenue
        int totalStores
        int totalUsers
        int totalProducts
        int totalCustomers
        int activeUsers
        timestamp lastUpdated
        timestamp createdAt
    }

    TENANT ||--|| TENANT_METRICS : "has"

    %% Store Management
    STORE ||--o{ USER : "employs"
    STORE ||--o{ INVENTORY : "stocks"
    STORE ||--o{ SALE : "processes"
    STORE ||--o{ REGISTER : "contains"
    STORE {
        uuid id PK
        uuid tenantId FK
        string name
        string address
        string city
        string state
        string zipCode
        string phone
        string email
        string timezone
        jsonb settings
        timestamp createdAt
        timestamp updatedAt
    }

    %% User Management
    USER ||--o{ SALE : "processes"
    USER ||--o{ SHIFT : "works"
    USER {
        uuid id PK
        uuid storeId FK
        string firstName
        string lastName
        string email
        string passwordHash
        string phone
        enum role
        boolean isActive
        timestamp lastLogin
        jsonb permissions
        timestamp createdAt
        timestamp updatedAt
    }

    %% Product Management
    PRODUCT_CATEGORY ||--o{ PRODUCT : "classifies"
    PRODUCT_CATEGORY {
        uuid id PK
        uuid tenantId FK
        string name
        string description
        string color
        int sortOrder
        timestamp createdAt
        timestamp updatedAt
    }

    PRODUCT ||--o{ INVENTORY : "defined_as"
    PRODUCT ||--o{ SALE_ITEM : "sold_as"
    PRODUCT ||--o{ PRODUCT_VARIANT : "has"
    PRODUCT {
        uuid id PK
        uuid tenantId FK
        uuid categoryId FK
        string name
        string description
        string sku
        string barcode
        decimal basePrice
        decimal costPrice
        boolean taxable
        string imagePath
        boolean isActive
        jsonb attributes
        timestamp createdAt
        timestamp updatedAt
    }

    PRODUCT_VARIANT ||--o{ INVENTORY : "tracked_as"
    PRODUCT_VARIANT ||--o{ SALE_ITEM : "sold_as"
    PRODUCT_VARIANT {
        uuid id PK
        uuid productId FK
        string name
        string sku
        string barcode
        decimal priceAdjustment
        jsonb attributes
        timestamp createdAt
        timestamp updatedAt
    }

    %% Inventory Management
    INVENTORY {
        uuid id PK
        uuid storeId FK
        uuid productId FK
        uuid variantId FK
        int quantity
        decimal costPrice
        timestamp lastRestockDate
        timestamp createdAt
        timestamp updatedAt
    }

    %% Register and Shift Management
    REGISTER ||--o{ SHIFT : "hosts"
    REGISTER ||--o{ SALE : "processes"
    REGISTER {
        uuid id PK
        uuid storeId FK
        string name
        string ipAddress
        string deviceId
        boolean isActive
        timestamp createdAt
        timestamp updatedAt
    }

    SHIFT {
        uuid id PK
        uuid registerId FK
        uuid userId FK
        timestamp startTime
        timestamp endTime
        decimal startingCash
        decimal endingCash
        decimal cashSales
        decimal creditSales
        decimal totalSales
        jsonb notes
        timestamp createdAt
        timestamp updatedAt
    }

    %% Customer Management
    CUSTOMER ||--o{ SALE : "makes"
    CUSTOMER {
        uuid id PK
        uuid tenantId FK
        string firstName
        string lastName
        string email
        string phone
        date birthdate
        int loyaltyPoints
        timestamp lastVisit
        jsonb notes
        timestamp createdAt
        timestamp updatedAt
    }

    %% Sales Management
    SALE ||--o{ SALE_ITEM : "includes"
    SALE ||--o{ PAYMENT : "paid_by"
    SALE {
        uuid id PK
        uuid storeId FK
        uuid customerId FK
        uuid userId FK
        uuid registerId FK
        timestamp saleTime
        decimal subtotal
        decimal taxAmount
        decimal discountAmount
        decimal total
        enum status
        string receiptNumber
        jsonb notes
        timestamp createdAt
        timestamp updatedAt
    }

    SALE_ITEM {
        uuid id PK
        uuid saleId FK
        uuid productId FK
        uuid variantId FK
        decimal quantity
        decimal unitPrice
        decimal discountAmount
        boolean taxable
        decimal taxRate
        decimal taxAmount
        decimal total
        jsonb notes
        timestamp createdAt
        timestamp updatedAt
    }

    PAYMENT {
        uuid id PK
        uuid saleId FK
        enum method
        decimal amount
        string reference
        boolean isApproved
        string transactionId
        timestamp processedAt
        jsonb metadata
        timestamp createdAt
        timestamp updatedAt
    }

    %% Tax and Discount Management
    TAX_RATE {
        uuid id PK
        uuid tenantId FK
        string name
        decimal rate
        string jurisdiction
        boolean isActive
        timestamp createdAt
        timestamp updatedAt
    }

    DISCOUNT {
        uuid id PK
        uuid tenantId FK
        string name
        string code
        enum type
        decimal value
        date startDate
        date endDate
        boolean isActive
        timestamp createdAt
        timestamp updatedAt
    }

    %% Supplier and Purchase Order Management
    SUPPLIER ||--o{ PURCHASE_ORDER : "receives"
    SUPPLIER {
        uuid id PK
        uuid tenantId FK
        string name
        string contactPerson
        string email
        string phone
        string address
        string notes
        timestamp createdAt
        timestamp updatedAt
    }

    PURCHASE_ORDER ||--o{ PURCHASE_ORDER_ITEM : "contains"
    PURCHASE_ORDER {
        uuid id PK
        uuid storeId FK
        uuid supplierId FK
        uuid userId FK
        string poNumber
        date orderDate
        date expectedDeliveryDate
        date actualDeliveryDate
        enum status
        decimal total
        jsonb notes
        timestamp createdAt
        timestamp updatedAt
    }

    PURCHASE_ORDER_ITEM {
        uuid id PK
        uuid purchaseOrderId FK
        uuid productId FK
        uuid variantId FK
        int quantity
        decimal unitCost
        decimal total
        jsonb notes
        timestamp createdAt
        timestamp updatedAt
    }

    %% Report Management
    REPORT {
        uuid id PK
        uuid tenantId FK
        uuid storeId FK
        string name
        string type
        date reportDate
        jsonb parameters
        jsonb data
        timestamp createdAt
        timestamp updatedAt
    }
