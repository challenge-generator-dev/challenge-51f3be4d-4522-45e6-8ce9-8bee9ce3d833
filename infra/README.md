# Módulo de Infraestructura - Entorno de Desarrollo

Este directorio contiene la configuración de infraestructura para el entorno de desarrollo del sistema de gestión de órdenes.

## Estructura del Directorio

```
environments/
└── dev/
    ├── main.tf          # Configuración principal del entorno
    ├── terraform.tfvars # Variables específicas del entorno
    └── README.md        # Este archivo
```

## Recursos Definidos

### Tabla de Órdenes en DynamoDB

El módulo crea y configura una tabla de DynamoDB para almacenar las órdenes del sistema:

- **Nombre de tabla**: Configurable via `orders_table_name` en tfvars
- **Clave primaria**: `order_id` (partition key) + `created_at` (sort key)
- **Modo de facturación**: On-demand (PAY_PER_REQUEST) por defecto para desarrollo
- **Streams**: Habilitados para capturar cambios en la tabla
- **TTL**: Configurado para eliminación automática de registros antiguos
- **Índices secundarios**: 
  - Índice de cliente para búsquedas por `customer_id`
  - Índice de estado para búsquedas por `status`
- **Point-in-time recovery**: Habilitado para recuperación ante desastres

## Uso del Módulo

### Prerrequisitos

1. Terraform >= 1.9.0 instalado
2. Credenciales de AWS configuradas (AWS CLI o variables de entorno)
3. Acceso a la región `us-east-1` (o la región configurada)

### Inicialización

```bash
cd environments/dev
terraform init
```

### Validación de Configuración

```bash
terraform validate
```

### Plan de Ejecución

Para ver los cambios que se aplicarán:

```bash
terraform plan -var-file=terraform.tfvars
```

### Aplicar Cambios

Para crear los recursos:

```bash
terraform apply -var-file=terraform.tfvars
```

### Destruir Recursos

Para eliminar todos los recursos creados:

```bash
terraform destroy -var-file=terraform.tfvars
```

## Variables de Configuración

Las principales variables configurables están en `terraform.tfvars`:

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `environment` | Nombre del entorno | `dev` |
| `orders_table_name` | Nombre de la tabla | `dev-orders-table` |
| `billing_mode` | Modo de facturación | `PAY_PER_REQUEST` |
| `enable_point_in_time_recovery` | PITR habilitado | `true` |
| `enable_dynamodb_local` | Usar DynamoDB local | `false` |

## Outputs Disponibles

Después de aplicar la configuración, los siguientes valores están disponibles:

- `orders_table_name`: Nombre de la tabla creada
- `orders_table_arn`: ARN de la tabla
- `orders_table_stream_arn`: ARN del stream de la tabla
- `orders_table_endpoint`: Endpoint de la tabla
- `customer_index_name`: Nombre del índice de cliente
- `status_index_name`: Nombre del índice de estado

## Integración con el Frontend

El frontend (desarrollado en React con Vite) consumirá esta tabla de DynamoDB a través de:

1. **API Gateway + Lambda**: Endpoints REST para operaciones CRUD
2. **AWS SDK**: Cliente directo a DynamoDB (solo en entorno local/dev)

La variable de entorno `VITE_DYNAMODB_TABLE` debe configurarse con el valor de `orders_table_name` output.

## Desarrollo Local

Para desarrollo local con DynamoDB Local:

1. Establecer `enable_dynamodb_local = true` en tfvars
2. Configurar `dynamodb_endpoint` con la URL del contenedor local
3. Ejecutar `docker-compose up -d dynamodb` desde la raíz del proyecto

## Notas de Costos

- **DynamoDB en modo on-demand**: Sin costo por capacidad provisionada, pagar por solicitud
- **DynamoDB Streams**: Costo adicional por GB de datos procesados
- **PITR**: Costo adicional por GB de backup
- **CloudWatch Logs**: Costo por GB de logs almacenados

Para desarrollo, los costos deberían ser mínimos (< $1/mes para uso típico).