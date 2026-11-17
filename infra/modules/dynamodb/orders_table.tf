# Módulo de Terraform para la tabla de DynamoDB de órdenes
# Proporciona persistencia para el servicio de gestión de órdenes
# Este módulo crea la tabla con los índices necesarios para consultas eficientes

variable "table_name" {
  description = "Nombre de la tabla de DynamoDB para órdenes"
  type        = string
  default     = "orders"
}

variable "billing_mode" {
  description = "Modo de facturación de la tabla (PAY_PER_REQUEST o PROVISIONED)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "read_capacity" {
  description = "Capacidad de lectura para modo PROVISIONED"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura para modo PROVISIONED"
  type        = number
  default     = 5
}

variable "enable_point_in_time_recovery" {
  description = "Habilitar recuperación a punto en el tiempo"
  type        = bool
  default     = true
}

variable "enable_server_side_encryption" {
  description = "Habilitar cifrado del lado del servidor"
  type        = bool
  default     = true
}

variable "customer_gsi_name" {
  description = "Nombre del índice global secundario por cliente"
  type        = string
  default     = "CustomerIdIndex"
}

variable "status_gsi_name" {
  description = "Nombre del índice global secundario por estado"
  type        = string
  default     = "StatusIndex"
}

variable "tags" {
  description = "Etiquetas para la tabla"
  type        = map(string)
  default     = {}
}

locals {
  common_tags = merge(
    var.tags,
    {
      Environment = "dev"
      Project     = "orders-management"
      ManagedBy   = "terraform"
    }
  )
}

resource "aws_dynamodb_table" "orders" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = "orderId"
  range_key      = "createdAt"

  attribute {
    name = "orderId"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  attribute {
    name = "customerId"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  global_secondary_index {
    name            = var.customer_gsi_name
    hash_key        = "customerId"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
    write_capacity  = var.billing_mode == "PROVISIONED" ? var.write_capacity : null
  }

  global_secondary_index {
    name            = var.status_gsi_name
    hash_key        = "status"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
    write_capacity  = var.billing_mode == "PROVISIONED" ? var.write_capacity : null
  }

  point_in_time_recovery {
    enabled = var.enable_point_in_time_recovery
  }

  server_side_encryption {
    enabled     = var.enable_server_side_encryption
    kms_key_arn = aws_kms_key.dynamodb_kms_key[0].arn
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = local.common_tags

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_kms_key" "dynamodb_kms_key" {
  count = var.enable_server_side_encryption ? 1 : 0

  description             = "Clave KMS para cifrado de la tabla de órdenes"
  deletion_window_in_days = 10
  enable_key_rotation     = true

  tags = local.common_tags
}

resource "aws_kms_alias" "dynamodb_kms_alias" {
  count = var.enable_server_side_encryption ? 1 : 0

  name          = "alias/orders-dynamodb"
  target_key_id = aws_kms_key.dynamodb_kms_key[0].key_id
}

output "table_name" {
  description = "Nombre de la tabla de DynamoDB"
  value       = aws_dynamodb_table.orders.name
}

output "table_arn" {
  description = "ARN de la tabla de DynamoDB"
  value       = aws_dynamodb_table.orders.arn
}

output "table_id" {
  description = "ID de la tabla de DynamoDB"
  value       = aws_dynamodb_table.orders.id
}

output "customer_gsi_arn" {
  description = "ARN del índice global secundario por cliente"
  value       = aws_dynamodb_table.orders.global_secondary_index[0].arn
}

output "status_gsi_arn" {
  description = "ARN del índice global secundario por estado"
  value       = aws_dynamodb_table.orders.global_secondary_index[1].arn
}

output "kms_key_arn" {
  description = "ARN de la clave KMS utilizada para el cifrado"
  value       = var.enable_server_side_encryption ? aws_kms_key.dynamodb_kms_key[0].arn : null
}