variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

variable "orders_table_name" {
  description = "Name of the DynamoDB table for orders"
  type        = string
}

variable "orders_table_billing_mode" {
  description = "Billing mode for the DynamoDB table (PROVISIONED or PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "orders_table_read_capacity" {
  description = "Read capacity units for the DynamoDB table (only used if billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "orders_table_write_capacity" {
  description = "Write capacity units for the DynamoDB table (only used if billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "orders_table_hash_key" {
  description = "Hash key for the DynamoDB orders table"
  type        = string
  default     = "order_id"
}

variable "orders_table_range_key" {
  description = "Range key for the DynamoDB orders table (optional)"
  type        = string
  default     = null
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}