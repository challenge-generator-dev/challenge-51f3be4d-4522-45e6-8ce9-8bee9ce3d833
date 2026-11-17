# Configuración del entorno de desarrollo
# Valores por defecto para pruebas locales y desarrollo

environment = "dev"

# Configuración de la tabla de órdenes en DynamoDB
orders_table_name = "dev-orders-table"
orders_table_stream_enabled = true
orders_table_stream_view_type = "NEW_AND_OLD_IMAGES"

# Capacidad de lectura/escritura en modo bajo demanda (on-demand)
# Para desarrollo se usan valores bajos para optimizar costos
orders_table_read_capacity  = 5
orders_table_write_capacity = 5
billing_mode                = "PAY_PER_REQUEST"

# Configuración de capacidad provisionada (alternativo)
# Descomenta si prefieres capacidad fija en lugar de on-demand
# billing_mode              = "PROVISIONED"
# orders_table_read_capacity  = 10
# orders_table_write_capacity = 10

# Configuración de TTL para limpieza automática de órdenes antiguas
orders_table_ttl_enabled = true
orders_table_ttl_attribute_name = "expires_at"

# Configuración de índices secundarios
# Índice para buscar órdenes por cliente
create_customer_index = true
customer_index_name   = "customer-index"
customer_index_partition_key = "customer_id"
customer_index_sort_key     = "created_at"

# Índice para buscar órdenes por estado
create_status_index = true
status_index_name   = "status-index"
status_index_partition_key = "status"
status_index_sort_key     = "updated_at"

# Configuración de backups
enable_point_in_time_recovery = true
backup_retention_days         = 7

# Configuración de red (VPC donde se crearán los recursos)
vpc_id     = "vpc-xxxxxxxx"  # Reemplazar con VPC existente
subnet_ids = ["subnet-xxxxxxxx", "subnet-yyyyyyyy"]  # Subnets privadas

# Tags estándar para todos los recursos
tags = {
  Environment = "dev"
  Project     = "orders-management"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
}

# Configuración de logging
enable_cloudwatch_logs = true
log_retention_days     = 7

# Habilitar características de desarrollo
enable_dynamodb_local = false  # Usar DynamoDB local para testing
dynamodb_endpoint     = "http://localhost:8000"  # Endpoint de DynamoDB local