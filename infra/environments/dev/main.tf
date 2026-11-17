# Configuración del entorno de desarrollo
# Este archivo define los recursos de infraestructura para el entorno dev

terraform {
  # Hereda la configuración de versiones del archivo raíz versions.tf
  # required_version y required_providers están definidos en versions.tf

  # Configuración del backend para almacenar el estado de Terraform
  # En desarrollo se usa local para simplificar, en producción usar S3
  backend "local" {
    path = "terraform.tfstate"
  }
}

# Proveedor AWS con configuración específica del entorno
# Hereda la configuración base de providers.tf
provider "aws" {
  alias  = "dev"
  region = var.aws_region

  # Configuración de retries para operaciones que pueden fallar temporalmente
  default_tags {
    tags = var.tags
  }

  # Endpoints personalizados para desarrollo (opcional)
  # Útil para testing con DynamoDB local o servicios mockeados
  dynamic "endpoints" {
    for_each = var.enable_dynamodb_local ? ["dynamodb"] : []
    content {
      dynamodb = var.dynamodb_endpoint
    }
  }
}

# ============================================
# MÓDULO: Tabla de Órdenes en DynamoDB
# ============================================

module "orders_dynamodb" {
  # Se referencia el módulo local desde la raíz del proyecto
  source = "../../modules/dynamodb"

  # Nombre de la tabla - único en la cuenta y región
  table_name = var.orders_table_name

  # Configuración de capacidad y facturación
  billing_mode       = var.billing_mode
  read_capacity      = var.orders_table_read_capacity
  write_capacity     = var.orders_table_write_capacity

  # Point-in-time recovery para recuperación ante desastres
  enable_point_in_time_recovery = var.enable_point_in_time_recovery

  # Habilitar cifrado del lado del servidor
  enable_server_side_encryption = var.enable_server_side_encryption

  # Índices secundarios globales
  customer_gsi_name = var.create_customer_index ? var.customer_index_name : null
  status_gsi_name   = var.create_status_index ? var.status_index_name : null

  # Tags específicos del módulo
  tags = merge(var.tags, {
    Name        = "${var.environment}-orders-table"
    Environment = var.environment
  })
}

# ============================================
# Variables del entorno
# ============================================

variable "aws_region" {
  description = "Región de AWS donde se crearán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Nombre del entorno (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "orders_table_name" {
  description = "Nombre de la tabla de órdenes en DynamoDB"
  type        = string
}

variable "orders_table_read_capacity" {
  description = "Capacidad de lectura provisionada (en unidades de lectura)"
  type        = number
  default     = 5
}

variable "orders_table_write_capacity" {
  description = "Capacidad de escritura provisionada (en unidades de escritura)"
  type        = number
  default     = 5
}

variable "billing_mode" {
  description = "Modo de facturación (PAY_PER_REQUEST o PROVISIONED)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "enable_point_in_time_recovery" {
  description = "Habilitar recuperación a un punto en el tiempo"
  type        = bool
  default     = true
}

variable "enable_server_side_encryption" {
  description = "Habilitar cifrado del lado del servidor"
  type        = bool
  default     = true
}

variable "create_customer_index" {
  description = "Crear índice secundario para búsquedas por cliente"
  type        = bool
  default     = true
}

variable "customer_index_name" {
  description = "Nombre del índice secundario de cliente"
  type        = string
  default     = "customer-index"
}

variable "create_status_index" {
  description = "Crear índice secundario para búsquedas por estado"
  type        = bool
  default     = true
}

variable "status_index_name" {
  description = "Nombre del índice secundario de estado"
  type        = string
  default     = "status-index"
}

variable "backup_retention_days" {
  description = "Días de retención de backups"
  type        = number
  default     = 7
}

variable "vpc_id" {
  description = "ID de la VPC donde se crearán los recursos"
  type        = string
  default     = ""
}

variable "subnet_ids" {
  description = "IDs de las subnets donde se crearán los recursos"
  type        = list(string)
  default     = []
}

variable "tags" {
  description = "Tags estándar para todos los recursos"
  type        = map(string)
  default     = {}
}

variable "enable_cloudwatch_logs" {
  description = "Habilitar logs en CloudWatch"
  type        = bool
  default     = true
}

variable "log_retention_days" {
  description = "Días de retención de logs"
  type        = number
  default     = 7
}

variable "enable_dynamodb_local" {
  description = "Usar DynamoDB local para desarrollo"
  type        = bool
  default     = false
}

variable "dynamodb_endpoint" {
  description = "Endpoint de DynamoDB local"
  type        = string
  default     = "http://localhost:8000"
}

# ============================================
# Outputs del entorno
# ============================================

output "environment_name" {
  description = "Nombre del entorno"
  value       = var.environment
}

output "aws_region" {
  description = "Región de AWS configurada"
  value       = var.aws_region
}

output "orders_table_name" {
  description = "Nombre de la tabla de órdenes"
  value       = module.orders_dynamodb.table_name
}

output "orders_table_arn" {
  description = "ARN de la tabla de órdenes"
  value       = module.orders_dynamodb.table_arn
}

output "customer_index_name" {
  description = "Nombre del índice secundario de cliente"
  value       = var.create_customer_index ? var.customer_index_name : null
}

output "status_index_name" {
  description = "Nombre del índice secundario de estado"
  value       = var.create_status_index ? var.status_index_name : null
}

output "customer_gsi_arn" {
  description = "ARN del GSI de cliente"
  value       = module.orders_dynamodb.customer_gsi_arn
}

output "status_gsi_arn" {
  description = "ARN del GSI de estado"
  value       = module.orders_dynamodb.status_gsi_arn
}

output "kms_key_arn" {
  description = "ARN de la clave KMS usada para cifrado"
  value       = module.orders_dynamodb.kms_key_arn
}