// =====================================================
// NINE DATABASE - ENHANCED SCHEMA
// =====================================================
// Version: 2.1 (Workshop MVP Optimized)
// Date: 2026-01-23
// Based on: holistic_product_analysis.md + product_context.md
// Changes: Simplified for workshop operations, added returns
// =====================================================

project nine_db {
  database_type: 'PostgreSQL 18+'
  note: '''
    Nine Garage Database Architecture
    Workshop MVP schema covering:
    - Product catalog with operational relationships
    - Context-dependent pricing (variant-service pricing)
    - Workshop order management (walk-in + booking conversion)
    - Simplified promotion system
    - Service & installation tracking
    - Workshop returns
  '''
}

// =====================================================
// ORGANIZATION LAYER
// =====================================================

table company {
  id int [pk, increment]
  name varchar(100) [not null]
  created_at timestamptz [default: `now()`]
}

table divisions {
  id int [pk, increment]
  company_id int [not null, ref: > company.id]
  name varchar(100) [not null]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

// =====================================================
// EMPLOYEES LAYER
// =====================================================

table employees {
  id int [pk, increment]
  directus_user_id varchar(36) [note: 'Link to directus_users UUID for auth']
  division_id int [not null, ref: > divisions.id]
  full_name varchar(100) [not null]
  date_of_birth date [not null]
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

enum assignment_type {
  warehouse
  workshop
  online_shop
}

enum assignment_level {
  manager
  operator
  viewer
}

table employee_assignments {
  id bigint [pk, increment]
  employee_id int [not null, ref: > employees.id]
  assignment_type assignment_type [not null]
  assignment_id bigint [not null, note: 'Polymorphic: warehouse_id, workshop_id, or online_shop_id']
  level assignment_level [default:'operator']
  role varchar(50) [not null]
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
}

// =====================================================
// PRODUCT & CATALOG LAYER
// =====================================================

table brands {
  id int [pk, increment]
  company_id int [not null, ref: > company.id]
  parent_id int [ref: > brands.id, note: 'Self-referencing for sub-brands']
  name varchar(100) [not null]
  slug varchar(100) [not null, unique]
  desc text
  logo_url varchar(255)
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

table categories {
  id int [pk, increment]
  parent_id int [ref: > categories.id, note: 'Self-referencing for hierarchy']
  name varchar(100) [not null]
  slug varchar(100) [not null, unique]
  created_at timestamptz [default: `now()`]
}

table products {
  id bigint [pk, increment]
  brand_id int [not null, ref: > brands.id]
  category_id int [not null, ref: > categories.id]
  name varchar(255) [not null]
  slug varchar(255) [not null, unique]
  short_desc text
  desc text
  meta_title varchar(255)
  meta_desc text
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

table product_variants {
  id bigint [pk, increment]
  product_id bigint [not null, ref: > products.id]
  sku varchar(100) [unique]
  name varchar(255) [not null]
  specs jsonb [default: '{}', note: 'Specifications: voltage, power, material, etc.']
  warranty_months int [default: 0, note: 'Product warranty duration (3, 6, 12 months)']
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

table product_media {
  id bigint [pk, increment]
  product_id bigint [ref: > products.id]
  variant_id bigint [ref: > product_variants.id]
  file_type varchar(50) [note: 'image, video, pdf']
  file_url varchar(500) [not null, note: 'Directus File ID (UUID)']
  is_thumbnail boolean [default: false]
  sort_order int [default: 0]
  created_at timestamptz [default: `now()`]

  indexes {
    (product_id, is_thumbnail)
  }
}

// =====================================================
// SERVICES LAYER
// =====================================================

table services {
  id bigint [pk, increment]
  name varchar(100) [not null]
  short_desc varchar(255)
  vehicle_type varchar(20) [note: 'car, motorcycle, both']
  estimated_minutes int [note: 'Estimated installation time']
  warranty_months int [note: 'Warranty period in days']
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

// Operational relationship: variant requires service
table variant_required_services {
  id bigint [pk, increment]
  variant_id bigint [not null, ref: > product_variants.id]
  service_id bigint [not null, ref: > services.id]
  is_mandatory boolean [default: true, note: 'Is this service mandatory for this variant?']
  created_at timestamptz [default: `now()`]

  indexes {
    (variant_id, service_id) [unique]
  }
}

// =====================================================
// PRODUCT PACKAGES LAYER
// =====================================================

table product_packages {
  id bigint [pk, increment]
  name varchar(255) [not null]
  description text
  benefits jsonb [note: 'Array of benefits: free items, discount terms, etc.']
  terms jsonb [note: 'Terms and conditions']
  valid_from timestamptz
  valid_until timestamptz
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

table package_variant_items {
  id bigint [pk, increment]
  package_id bigint [not null, ref: > product_packages.id]
  variant_id bigint [not null, ref: > product_variants.id]
  qty int [default: 1]
  created_at timestamptz [default: `now()`]
}

table package_service_items {
  id bigint [pk, increment]
  package_id bigint [not null, ref: > product_packages.id]
  service_id bigint [not null, ref: > services.id]
  created_at timestamptz [default: `now()`]
}

// =====================================================
// PRICING LAYER (CONTEXT-DEPENDENT)
// =====================================================

// Standalone variant pricing
table pricing_variants {
  id bigint [pk, increment]
  variant_id bigint [not null, ref: > product_variants.id]
  price bigint [not null, note: 'Price in smallest currency unit (rupiah)']
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]

  indexes {
    (variant_id, created_at)
  }
}

// Standalone service pricing
table pricing_services {
  id bigint [pk, increment]
  service_id bigint [not null, ref: > services.id]
  price bigint [not null]
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]

  indexes {
    (service_id, created_at)
  }
}

// Service pricing per variant (context-dependent)
table pricing_variant_services {
  id bigint [pk, increment]
  variant_id bigint [not null, ref: > product_variants.id]
  service_id bigint [not null, ref: > services.id]
  price bigint [not null, note: 'Special price when service applied to this specific variant']
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]

  indexes {
    (variant_id, service_id, created_at)
  }

  note: '''
    Business logic: Install MP3 PRO might cost 150K,
    but Install Q9 ULTRA might cost 200K (different complexity)
  '''
}

// Package pricing (all-in bundled price)
table pricing_packages {
  id bigint [pk, increment]
  package_id bigint [not null, ref: > product_packages.id]
  price bigint [not null, note: 'All-inclusive package price']
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]

  indexes {
    (package_id, created_at)
  }
}

// =====================================================
// PROMOTION LAYER (SIMPLIFIED)
// =====================================================

enum promotion_type {
  voucher
  direct
}

enum discount_type {
  percentage
  fixed_amount
}

table promotions {
  id bigint [pk, increment]
  code varchar(50) [unique, note: 'Only required for voucher type']
  name varchar(255) [not null]
  description text
  promotion_type promotion_type [not null]
  discount_type discount_type [not null]
  discount_value decimal(10,2) [not null]
  min_purchase_amount bigint
  max_discount_amount bigint
  valid_from timestamptz [not null]
  valid_until timestamptz [not null]
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

// =====================================================
// WAREHOUSE & WORKSHOP LAYER
// =====================================================

table warehouses {
  id bigint [pk, increment]
  parent_id bigint [ref: > warehouses.id, note: 'Hierarchy: regional warehouse']
  name varchar(100) [not null]
  city varchar(100) [not null]
  address varchar(255)
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

table workshops {
  id bigint [pk, increment]
  warehouse_id bigint [not null, ref: > warehouses.id]
  name varchar(100) [not null]
  address varchar(255) [not null]
  geo_coordinates varchar(255)
  maps_url text
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

// =====================================================
// ONLINE SHOP LAYER (Future - API Integration)
// =====================================================

table platforms {
  id smallint [pk, increment]
  name varchar(50) [not null, note: 'Tokopedia, Shopee, Lazada, TikTok Shop, etc.']
  created_at timestamptz [default: `now()`]
}

table online_shops {
  id bigint [pk, increment]
  platform_id smallint [not null, ref: > platforms.id]
  warehouse_id bigint [not null, ref: > warehouses.id]
  name varchar(100) [not null]
  city varchar(100)
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

// =====================================================
// BOOKING LAYER (Appointment/Arrangement Only)
// =====================================================

enum booking_status {
  pending
  confirmed
  in_progress
  completed
  cancelled
  no_show
}

enum booking_source {
  online
  offline
}

table bookings {
  id bigint [pk, increment]
  booking_ticket int [unique]
  customer_id bigint [ref: > customers.id, note: 'Nullable - customer may not have account']
  workshop_id bigint [not null, ref: > workshops.id]
  customer_name varchar(255) [not null]
  customer_phone varchar(20) [not null]
  vehicle_plat varchar(30)
  vehicle_model varchar(255)
  vehicle_color varchar(100)
  booking_date date [not null]
  hour time [not null]
  source booking_source [default: 'website']
  status booking_status [default: 'pending']
  notes text
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]

  indexes {
    (workshop_id, booking_date)
    (customer_phone)
  }

  note: '''
    Booking is purely for scheduling/arrangement.
    No transaction happens here.
    Link to order is only for analytics (conversion tracking).
  '''
}

table booking_variant_items {
  id bigint [pk, increment]
  booking_id bigint [not null, ref: > bookings.id]
  variant_id bigint [not null, ref: > product_variants.id]
  qty int [default: 1]
  created_at timestamptz [default: `now()`]
}

table booking_package_items {
  id bigint [pk, increment]
  booking_id bigint [not null, ref: > bookings.id]
  package_id bigint [not null, ref: > product_packages.id]
  created_at timestamptz [default: `now()`]
}

// =====================================================
// ORDER LAYER (Workshop Transactions Only)
// =====================================================

enum order_status {
  pending
  completed
  cancelled
  refunded
}

enum payment_method {
  cash
  bank_transfer
  qris
  debit_card
  credit_card
  e_wallet
}

enum order_type {
  online
  offline
}

table orders {
  id bigint [pk, increment]
  booking_id bigint [ref: > bookings.id, note: 'For analytics: track conversion from booking']
  customer_id bigint [ref: > customers.id, note: 'Nullable - walk-in customer may not have account']
  
  // Source Identification (Directus Best Practice: Separate Nullable FKs)
  workshop_id bigint [ref: > workshops.id, note: 'Filled if type is offline/workshop']
  online_shop_id bigint [ref: > online_shops.id, note: 'Filled if type is online']
  
  order_type order_type [default: 'offline', note: 'Determines which source ID to use']
  
  customer_name varchar(255) [not null]
  customer_phone varchar(20)
  order_number varchar(50) [unique, not null]
  payment_method payment_method [not null]
  status order_status [default: 'completed']
  subtotal bigint [not null]
  discount_amount bigint [default: 0]
  total_amount bigint [not null]
  notes text
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]

  indexes {
    (workshop_id, created_at)
    (online_shop_id, created_at)
    (order_number) [unique]
  }

  note: '''
    All transactions happen here.
    Single table approach allows unified reporting and customer 360 view.
    Use Directus Display Conditions to show/hide workshop_id vs online_shop_id based on order_type.
  '''
}

table order_items {
  id bigint [pk, increment]
  order_id bigint [not null, ref: > orders.id]
  variant_id bigint [ref: > product_variants.id]
  package_id bigint [ref: > product_packages.id]
  service_id bigint [ref: > services.id]
  qty int [default: 1]
  price_snapshot bigint [not null]
  subtotal bigint [not null, note: 'qty * price_snapshot']
  created_at timestamptz [default: `now()`]

  note: 'One of variant_id, package_id, or service_id should be filled'
}

table order_promotions {
  id bigint [pk, increment]
  order_id bigint [not null, ref: > orders.id]
  promotion_id bigint [not null, ref: > promotions.id]
  discount_amount bigint [not null]
  created_at timestamptz [default: `now()`]
}

// =====================================================
// PAYMENT LAYER (Simplified - Cash Business)
// =====================================================

enum payment_status {
  success
  refunded
}

table payments {
  id bigint [pk, increment]
  order_id bigint [not null, ref: > orders.id]
  payment_method payment_method [not null]
  amount bigint [not null]
  status payment_status [default: 'success']
  transaction_id varchar(255) [note: 'For non-cash payments']
  paid_at timestamptz [default: `now()`]
  created_at timestamptz [default: `now()`]

  indexes {
    (order_id)
  }
}

// =====================================================
// WORKSHOP RETURNS LAYER (NEW)
// =====================================================

enum return_status {
  pending
  approved
  rejected
  completed
}

table workshop_returns {
  id bigint [pk, increment]
  order_id bigint [not null, ref: > orders.id]
  workshop_id bigint [not null, ref: > workshops.id]
  return_number varchar(50) [unique, not null]
  reason text [not null]
  status return_status [default: 'pending']
  refund_amount bigint [not null]
  processed_by_id int [ref: > employees.id]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]

  indexes {
    (workshop_id, created_at)
    (return_number) [unique]
  }
}

table workshop_return_items {
  id bigint [pk, increment]
  return_id bigint [not null, ref: > workshop_returns.id]
  variant_id bigint [not null, ref: > product_variants.id]
  qty int [not null, default: 1]
  unit_price bigint [not null]
  subtotal bigint [not null]
  created_at timestamptz [default: `now()`]
}

// =====================================================
// INSTALLATION LAYER (OPERATIONAL)
// =====================================================

table installations {
  id bigint [pk, increment]
  workshop_id bigint [not null, ref: > workshops.id]
  order_id bigint [ref: > orders.id]
  booking_id bigint [ref: > bookings.id]
  technician_id int [not null, ref: > employees.id]
  started_at timestamptz
  finished_at timestamptz
  notes text
  created_at timestamptz [default: `now()`]

  note: '''
    Installation is execution record.
    Stock decreases when installation is completed.
  '''
}

table installation_items {
  id bigint [pk, increment]
  installation_id bigint [not null, ref: > installations.id]
  variant_id bigint [ref: > product_variants.id]
  service_id bigint [ref: > services.id]
  notes text
  created_at timestamptz [default: `now()`]

  note: 'What was actually installed/performed'
}

// =====================================================
// CUSTOMER & COMMUNITY LAYER
// =====================================================

table communities {
  id int [pk, increment]
  brand_id int [ref: > brands.id]
  name varchar(255) [not null]
  address varchar(255)
  city varchar(100) [not null]
  logo_url text
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

table customers {
  id bigint [pk, increment]
  community_id int [ref: > communities.id]
  name varchar(255) [not null]
  phone varchar(20) [not null, unique]
  email varchar(255) [unique]
  password varchar(255)
  image_url text
  referral_code varchar(20) [unique, not null]
  referring_to varchar(20) [ref: > customers.referral_code]
  is_active boolean [default: true]
  current_points int [default: 0]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]

  indexes {
    (phone) [unique]
    (email) [unique]
    (referral_code) [unique]
  }
}

enum vehicle_category {
  car
  motorcycle
}

table vehicles {
  id bigint [pk, increment]
  customer_id bigint [not null, ref: > customers.id]
  plat varchar(30) [not null, unique]
  model varchar(255)
  year int
  color varchar(100)
  category vehicle_category [not null]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

// =====================================================
// REVIEW & RATING LAYER
// =====================================================

enum review_type {
  sticker
  google review
  tag social media
}

table reviews {
  id bigint [pk, increment]
  customer_id bigint [not null, ref: > customers.id]
  order_id bigint [ref: > orders.id]
  review_type review_type [not null]
  rating int [not null, note: '1-5 stars']
  review_text text
  photos jsonb [note: 'Array of photo URLs']
  is_approved boolean [default: false]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]

  indexes {
    (customer_id, created_at)
    (rating, is_approved)
  }
}

// =====================================================
// LOYALTY & POINTS LAYER
// =====================================================

enum point_action_type {
  purchase
  review
  referral
  social_media_share
}

table point_ledger {
  id bigint [pk, increment]
  customer_id bigint [not null, ref: > customers.id]
  action point_action_type [not null]
  points_amount int [not null, note: 'Positive for earn]
  reference_id bigint [note: 'order_id, review_id, etc.']
  reference_type varchar(50) [note: 'order, review, referral, etc.']
  description varchar(255)
  created_at timestamptz [default: `now()`]

  indexes {
    (customer_id, created_at)
  }
}

enum redemption_status {
  pending
  approved
  rejected
  completed
}

table reward_catalog {
  id bigint [pk, increment]
  name varchar(255) [not null]
  description text
  points_required int [not null]
  stock_quota int [default: 0]
  image_url varchar(500)
  is_active boolean [default: true]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

table redemptions {
  id bigint [pk, increment]
  customer_id bigint [not null, ref: > customers.id]
  reward_id bigint [not null, ref: > reward_catalog.id]
  points_spent int [not null]
  status redemption_status [default: 'pending']
  redeemed_at timestamptz [default: `now()`]
  approved_at timestamptz
  completed_at timestamptz
  notes text
  updated_at timestamptz [default: `now()`]
}

// =====================================================
// INVENTORY LAYER
// =====================================================

table warehouse_stock {
  id bigint [pk, increment]
  warehouse_id bigint [not null, ref: > warehouses.id]
  variant_id bigint [not null, ref: > product_variants.id]
  stock_qty int [not null, default: 0]
  updated_at timestamptz [default: `now()`]

  indexes {
    (warehouse_id, variant_id) [unique]
  }
}

table workshop_stock {
  id bigint [pk, increment]
  workshop_id bigint [not null, ref: > workshops.id]
  variant_id bigint [not null, ref: > product_variants.id]
  stock_qty int [not null, default: 0]
  updated_at timestamptz [default: `now()`]

  indexes {
    (workshop_id, variant_id) [unique]
  }
}

enum stock_request_status {
  pending
  approved
  rejected
  completed
}

table stock_requests {
  id bigint [pk, increment]
  request_number varchar(50) [unique, not null]
  workshop_id bigint [not null, ref: > workshops.id]
  warehouse_id bigint [not null, ref: > warehouses.id]
  requested_by_id int [not null, ref: > employees.id]
  approved_by_id int [ref: > employees.id]
  status stock_request_status [default: 'pending']
  notes text
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]
}

table stock_request_items {
  id bigint [pk, increment]
  request_id bigint [not null, ref: > stock_requests.id]
  variant_id bigint [not null, ref: > product_variants.id]
  qty_requested int [not null]
  qty_approved int [default: 0]
  created_at timestamptz [default: `now()`]
}

// =====================================================
// WARRANTY LAYER (SEPARATED)
// =====================================================

enum warranty_status {
  active
  claimed
  expired
  void
}

// 1. PRODUCT WARRANTY (Physical Goods)
// Duration based on product_variants.warranty_months (3, 6, 12)
table product_warranties {
  id bigint [pk, increment]
  order_id bigint [not null, ref: > orders.id]
  variant_id bigint [not null, ref: > product_variants.id]
  serial_number varchar(100) [note: 'Unique SN for the physical item']
  warranty_number varchar(50) [unique, not null]
  start_date date [not null]
  end_date date [not null, note: 'Calculated from variant warranty_months']
  status warranty_status [default: 'active']
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]

  indexes {
    (warranty_number) [unique]
    (serial_number)
  }
}

// 2. INSTALLATION WARRANTY (Service/Workmanship)
// Default 3 months. Extended +1 month if conditions met.
table installation_warranties {
  id bigint [pk, increment]
  installation_id bigint [not null, ref: > installations.id]
  warranty_number varchar(50) [unique, not null]
  start_date date [not null]
  end_date date [not null, note: 'Base 3 months + 1 month if extended']
  status warranty_status [default: 'active']
  
  // Extension Logic
  is_extended boolean [default: false, note: 'True if customer met requirements (review, sticker)']
  extension_proofs jsonb [note: 'Links to screenshots/photos of review/sticker']
  
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]

  indexes {
    (warranty_number) [unique]
    (installation_id)
  }
}

table warranty_claims {
  id bigint [pk, increment]
  // Polymorphic: link to either product OR installation warranty
  product_warranty_id bigint [ref: > product_warranties.id]
  installation_warranty_id bigint [ref: > installation_warranties.id]
  
  claim_date timestamptz [not null, default: `now()`]
  issue_description text [not null]
  resolution text
  resolved_at timestamptz
  resolved_by_id int [ref: > employees.id]
  created_at timestamptz [default: `now()`]
  updated_at timestamptz [default: `now()`]

  note: 'Must verify which warranty type is being claimed'
}
