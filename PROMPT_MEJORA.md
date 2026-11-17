# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/application/services/order.service.ts` — La pieza p1 (Validación de datos y persistencia en DynamoDB, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/repositories/dynamo-order.repository.ts` — La pieza p2 (Implementación de repositorio para DynamoDB, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/controllers/order.controller.ts` — La pieza p3 (Exposición de endpoints REST para órdenes, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/providers/dynamodb.provider.ts` — La practica elegida no tenia ningun cuerpo que implementar: este archivo alcanzable, con cuerpos, pasa a ser el ejercicio.
- `client/src/features/orders/OrderForm.tsx` — La pieza p7 (Gestión de estado local con hooks y envío de órdenes, fase f3) vive aqui: este archivo es su unico dueno (blueprint v2).
- `client/src/App.tsx` — absorbida: fuga de la pieza p7

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate` — componente `infra` (support).
3. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
4. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `PUT /orders/:id`
  - `GET /orders/:id`
  - `DELETE /orders/:id`

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD de ordenes en DynamoDB
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y creación de ordenes — objetivo: Configurar el entorno de desarrollo y permitir la creación de ordenes en DynamoDB. — entregable (NO resolver): Entorno de desarrollo configurado y endpoint para crear ordenes funcional.
- Fase 2: Actualización y eliminación de ordenes — objetivo: Implementar la lógica para actualizar y eliminar ordenes en DynamoDB. — entregable (NO resolver): Endpoints funcionales para actualizar y eliminar ordenes en DynamoDB.
- Fase 3: Pruebas de aceptación y versionado de infraestructura — objetivo: Implementar pruebas de aceptación para las operaciones CRUD y versionar la infraestructura. — entregable (NO resolver): Pruebas de aceptación funcionales para las operaciones CRUD y la infraestructura versionada con Terraform.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1170.0",
    "@aws-sdk/lib-dynamodb": "3.1170.0",
    "@nestjs/common": "10.4.22",
    "@nestjs/config": "4.0.4",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "5.3.0",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "@types/jest": "29.5.14"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/domain/models/order.model.ts ===
import { OrderItem } from './order-item.model';

export class Order {
    id: string;
    status: string;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;

    constructor(
        id: string,
        status: string,
        items: OrderItem[],
        createdAt: string = new Date().toISOString(),
        updatedAt: string = new Date().toISOString()
    ) {
        if (!id || id.trim() === '') {
            throw new Error('Order ID cannot be empty');
        }
        if (!status || status.trim() === '') {
            throw new Error('Order status cannot be empty');
        }
        if (!items || items.length === 0) {
            throw new Error('Order must contain at least one item');
        }

        this.id = id;
        this.status = status;
        this.items = items;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    updateStatus(newStatus: string): void {
        if (!newStatus || newStatus.trim() === '') {
            throw new Error('Status cannot be empty');
        }
        this.status = newStatus;
        this.updatedAt = new Date().toISOString();
    }

    calculateTotal(): number {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

export class OrderItem {
    productId: string;
    quantity: number;
    price: number;

    constructor(productId: string, quantity: number, price: number) {
        if (!productId || productId.trim() === '') {
            throw new Error('Product ID cannot be empty');
        }
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        if (price <= 0) {
            throw new Error('Price must be greater than zero');
        }

        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }
}

// === ARCHIVO: api/src/domain/models/create-order.request.ts ===
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './order.model';

export class CreateOrderRequest {
    @IsArray()
    @IsNotEmpty({ each: true })
    @ValidateNested({ each: true })
    @Type(() => OrderItem)
    items: OrderItem[];

    constructor(items: OrderItem[]) {
        if (!items || items.length === 0) {
            throw new Error('Order must contain at least one item');
        }
        this.items = items;
    }
}

// === ARCHIVO: api/src/domain/models/update-order.request.ts ===
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateOrderRequest {
    @IsString()
    @IsNotEmpty()
    status: string;

    constructor(status: string) {
        if (!status || status.trim() === '') {
            throw new Error('Status cannot be empty');
        }
        this.status = status;
    }
}

// === ARCHIVO: api/src/domain/ports/order.repository.ts ===
import { Order } from '../models/order.model';
import { CreateOrderRequest } from '../models/create-order.request';
import { UpdateOrderRequest } from '../models/update-order.request';

export interface OrderRepository {
    create(order: CreateOrderRequest): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(id: string, updateRequest: UpdateOrderRequest): Promise<Order>;
    delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/infrastructure/config/dynamodb.table.ts ===
export interface DynamoDBTableConfig {
    tableName: string;
    keySchema: Array<{
        AttributeName: string;
        KeyType: 'HASH' | 'RANGE';
    }>;
    attributeDefinitions: Array<{
        AttributeName: string;
        AttributeType: 'S' | 'N' | 'B';
    }>;
    provisionedThroughput: {
        ReadCapacityUnits: number;
        WriteCapacityUnits: number;
    };
}

export const ORDERS_TABLE_CONFIG: DynamoDBTableConfig = {
    tableName: process.env.DYNAMODB_TABLE_NAME || 'Orders',
    keySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
    ],
    attributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }
    ],
    provisionedThroughput: {
        ReadCapacityUnits: parseInt(process.env.DYNAMODB_READ_CAPACITY || '5', 10),
        WriteCapacityUnits: parseInt(process.env.DYNAMODB_WRITE_CAPACITY || '5', 10)
    }
};

// === ARCHIVO: api/src/infrastructure/providers/dynamodb.provider.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBProvider {
    private readonly client: DynamoDBDocumentClient;

    constructor(private readonly configService: ConfigService) {
        const dynamoDBClient = new DynamoDBClient({
            region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', ''),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY', ''),
            },
        });

        this.client = DynamoDBDocumentClient.from(dynamoDBClient);
    }

    getClient(): DynamoDBDocumentClient {
        return this.client;
    }

    async healthCheck(): Promise<boolean> {
      throw new Error('TODO(reto): healthCheck');
    }
}

import { ListTablesCommand } from '@aws-sdk/client-dynamodb';

// === ARCHIVO: api/src/application/services/order.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/ports/order.repository';
import { CreateOrderRequest } from '../../domain/models/create-order.request';
import { UpdateOrderRequest } from '../../domain/models/update-order.request';
import { Order } from '../../domain/models/order.model';

const VALID_STATE_TRANSITIONS: Record<string, string[]> = {
  'PENDING': ['CONFIRMED', 'CANCELLED'],
  'CONFIRMED': ['SHIPPED', 'CANCELLED'],
  'SHIPPED': ['DELIVERED'],
  'DELIVERED': [],
  'CANCELLED': []
};

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(createRequest: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async update(id: string, updateRequest: UpdateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): update');
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/dynamo-order.repository.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/ports/order.repository';
import { CreateOrderRequest } from '../../domain/models/create-order.request';
import { UpdateOrderRequest } from '../../domain/models/update-order.request';
import { Order, OrderItem } from '../../domain/models/order.model';
import { DynamoDBProvider } from '../providers/dynamodb.provider';
import { PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoOrderRepository implements OrderRepository {
  private readonly tableName: string;

  constructor(
    private readonly dynamoDBProvider: DynamoDBProvider
  ) {
    this.tableName = process.env.DYNAMODB_TABLE_NAME || 'orders';
  }

  async create(createRequest: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async findById(id: string): Promise<Order | null> {
    throw new Error('TODO(reto): findById');
  }

  async update(id: string, updateRequest: UpdateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): update');
  }

  async delete(id: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }

  private generateOrderId(): string {
    throw new Error('TODO(reto): generateOrderId');
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/order.controller.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Controller, Post, Put, Get, Delete, Body, Param, Res, HttpStatus, Req, Request } from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderRequest } from '../../domain/models/create-order.request';
import { UpdateOrderRequest } from '../../domain/models/update-order.request';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Post');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Put');
  }

  @Get(':id')
  async get(@Param('id') id: string, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Get');
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Delete');
  }
}

// === ARCHIVO: api/src/acceptance/f1.test.ts ===
import { OrderService } from '../application/services/order.service';
import { OrderRepository } from '../domain/ports/order.repository';
import { CreateOrderRequest } from '../domain/models/create-order.request';
import { UpdateOrderRequest } from '../domain/models/update-order.request';
import { Order, OrderItem } from '../domain/models/order.model';

describe('OrderService - Phase 1 Acceptance Tests', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    mockOrderRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as jest.Mocked<OrderRepository>;
    orderService = new OrderService(mockOrderRepository);
  });

  describe('should create an order with valid data', () => {
    it('given a valid CreateOrderRequest, when OrderService.create is invoked, then the order is persisted and returned', async () => {
      const validItems = [new OrderItem('PROD-001', 2, 99.99)];
      const createRequest = new CreateOrderRequest(validItems);
      const expectedOrder = new Order('ORD-123', 'PENDING', validItems);

      mockOrderRepository.create.mockResolvedValue(expectedOrder);

      const result = await orderService.create(createRequest);

      expect(mockOrderRepository.create).toHaveBeenCalledWith(createRequest);
      expect(result).toEqual(expectedOrder);
    });
  });

  describe('should reject an order with invalid data', () => {
    it('given a request with empty items, when OrderService.create is invoked, then validation error is thrown', async () => {
      const createRequest = new CreateOrderRequest([]);

      await expect(orderService.create(createRequest)).rejects.toThrow('Order must contain at least one item');
      expect(mockOrderRepository.create).not.toHaveBeenCalled();
    });

    it('given a request with empty productId, when OrderService.create is invoked, then validation error is thrown', async () => {
      const invalidItems = [new OrderItem('', 2, 99.99)];
      const createRequest = new CreateOrderRequest(invalidItems);

      await expect(orderService.create(createRequest)).rejects.toThrow('Product ID cannot be empty');
      expect(mockOrderRepository.create).not.toHaveBeenCalled();
    });

    it('given a request with zero quantity, when OrderService.create is invoked, then validation error is thrown', async () => {
      const invalidItems = [new OrderItem('PROD-001', 0, 99.99)];
      const createRequest = new CreateOrderRequest(invalidItems);

      await expect(orderService.create(createRequest)).rejects.toThrow('Quantity must be greater than zero');
      expect(mockOrderRepository.create).not.toHaveBeenCalled();
    });

    it('given a request with negative price, when OrderService.create is invoked, then validation error is thrown', async () => {
      const invalidItems = [new OrderItem('PROD-001', 2, -10)];
      const createRequest = new CreateOrderRequest(invalidItems);

      await expect(orderService.create(createRequest)).rejects.toThrow('Price must be greater than zero');
      expect(mockOrderRepository.create).not.toHaveBeenCalled();
    });
  });
});

describe('DynamoOrderRepository - Phase 1 Acceptance Tests', () => {
  let repository: any;
  let mockClient: any;
  let mockProvider: any;
  let mockTableConfig: any;

  beforeEach(() => {
    mockClient = {
      send: jest.fn()
    };
    mockProvider = {
      getClient: jest.fn().mockReturnValue(mockClient)
    };
    mockTableConfig = {
      tableName: 'orders-table'
    };

    jest.resetModules();
    const { DynamoOrderRepository } = require('../infrastructure/repositories/dynamo-order.repository');
    repository = new DynamoOrderRepository(mockProvider, mockTableConfig);
  });

  describe('should save an order in DynamoDB', () => {
    it('given a valid order, when DynamoOrderRepository.save is invoked, then the order is saved and returned', async () => {
      const validItems = [new OrderItem('PROD-001', 2, 99.99)];
      const createRequest = new CreateOrderRequest(validItems);

      mockClient.send.mockResolvedValue({});

      const result = await repository.create(createRequest);

      expect(mockClient.send).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Order);
      expect(result.status).toBe('PENDING');
    });
  });

  describe('should handle DynamoDB errors', () => {
    it('given a valid order and a failing DynamoDB client, when DynamoOrderRepository.save is invoked, then a domain error is thrown', async () => {
      const validItems = [new OrderItem('PROD-001', 2, 99.99)];
      const createRequest = new CreateOrderRequest(validItems);

      mockClient.send.mockRejectedValue(new Error('Connection timeout'));

      await expect(repository.create(createRequest)).rejects.toThrow('Failed to create order');
    });
  });
});

describe('OrderController - Phase 1 Acceptance Tests', () => {
  let controller: OrderController;
  let mockOrderService: jest.Mocked<OrderService>;

  beforeEach(() => {
    mockOrderService = {
      create: jest.fn(),
      update: jest.fn()
    } as jest.Mocked<OrderService>;
    controller = new OrderController(mockOrderService);
  });

  describe('should create an order via REST endpoint', () => {
    it('given a valid HTTP request, when POST /orders is invoked, then 201 and the created order are returned', async () => {
      const mockRequest = {
        body: {
          items: [{ productId: 'PROD-001', quantity: 2, price: 99.99 }]
        }
      } as any;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;
      const expectedOrder = new Order('ORD-123', 'PENDING', [new OrderItem('PROD-001', 2, 99.99)]);

      mockOrderService.create.mockResolvedValue(expectedOrder);

      await controller.create(mockRequest, mockResponse);

      expect(mockOrderService.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedOrder);
    });
  });

  describe('should reject invalid request with 400', () => {
    it('given an HTTP request with invalid data, when POST /orders is invoked, then 400 and error message are returned', async () => {
      const mockRequest = {
        body: {
          items: []
        }
      } as any;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;

      await controller.create(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 400
        })
      );
    });
  });
});

// === ARCHIVO: api/src/acceptance/f2.test.ts ===
import { OrderService } from '../application/services/order.service';
import { OrderController } from '../infrastructure/controllers/order.controller';
import { OrderRepository } from '../domain/ports/order.repository';
import { UpdateOrderRequest } from '../domain/models/update-order.request';
import { Order, OrderItem } from '../domain/models/order.model';

describe('OrderService.update - fase f2', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;

  const createMockOrder = (id: string, status: string): Order => {
    const item = new OrderItem('prod-1', 2, 50.0);
    return new Order(id, status, [item], new Date().toISOString(), new Date().toISOString());
  };

  beforeEach(() => {
    mockOrderRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<OrderRepository>;
    orderService = new OrderService(mockOrderRepository);
  });

  describe('should update an order with valid transition', () => {
    it('given an existing order and a valid state transition request, when OrderService.update is invoked, then the order is updated in DynamoDB and the updated order is returned', async () => {
      const existingOrder = createMockOrder('order-123', 'PENDING');
      const updateRequest = new UpdateOrderRequest('CONFIRMED');
      const updatedOrder = createMockOrder('order-123', 'CONFIRMED');

      mockOrderRepository.findById.mockResolvedValue(existingOrder);
      mockOrderRepository.update.mockResolvedValue(updatedOrder);

      const result = await orderService.update('order-123', updateRequest);

      expect(mockOrderRepository.findById).toHaveBeenCalledWith('order-123');
      expect(mockOrderRepository.update).toHaveBeenCalledWith('order-123', updateRequest);
      expect(result.status).toBe('CONFIRMED');
    });
  });

  describe('should reject invalid state transition', () => {
    it('given an existing order and an invalid state transition request, when OrderService.update is invoked, then a validation error is thrown and the order is not updated in DynamoDB', async () => {
      const existingOrder = createMockOrder('order-123', 'SHIPPED');
      const updateRequest = new UpdateOrderRequest('PENDING');

      mockOrderRepository.findById.mockResolvedValue(existingOrder);

      await expect(orderService.update('order-123', updateRequest)).rejects.toThrow('Invalid state transition');
      expect(mockOrderRepository.update).not.toHaveBeenCalled();
    });
  });
});

describe('OrderController.update - fase f2', () => {
  let controller: OrderController;
  let mockOrderService: jest.Mocked<OrderService>;

  beforeEach(() => {
    mockOrderService = {
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<OrderService>;
    controller = new OrderController(mockOrderService);
  });

  describe('should update an order via REST endpoint', () => {
    it('given a valid HTTP request to update an order, when PUT /orders/:id is invoked, then returns 200 and the updated order in the response body', async () => {
      const mockId = 'order-123';
      const mockBody = { status: 'CONFIRMED' };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;
      const updatedOrder = {
        id: 'order-123',
        status: 'CONFIRMED',
        items: [{ productId: 'prod-1', quantity: 2, price: 50 }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockOrderService.update.mockResolvedValue(updatedOrder);

      await controller.update(mockId, mockBody, mockRes);

      expect(mockOrderService.update).toHaveBeenCalledWith('order-123', expect.objectContaining({ status: 'CONFIRMED' }));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedOrder);
    });
  });

  describe('should reject invalid update with 400', () => {
    it('given an HTTP request with invalid data to update an order, when PUT /orders/:id is invoked, then returns 400 and an error message', async () => {
      const mockId = 'order-123';
      const mockBody = { status: '' };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      mockOrderService.update.mockRejectedValue(new Error('Status cannot be empty'));

      await controller.update(mockId, mockBody, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Status cannot be empty' }));
    });
  });
});

// === ARCHIVO: api/src/app.module.ts ===
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { OrderService } from './application/services/order.service';
import { OrderController } from './infrastructure/controllers/order.controller';
import { DynamoOrderRepository } from './infrastructure/repositories/dynamo-order.repository';
import { DynamoDBProvider } from './infrastructure/providers/dynamodb.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    DynamoDBProvider,
    {
      provide: 'DYNAMODB_TABLE_CONFIG',
      useFactory: (configService: ConfigService) => ({
        tableName: configService.get<string>('DYNAMODB_TABLE_NAME', 'orders'),
        region: configService.get<string>('AWS_REGION', 'us-east-1'),
      }),
      inject: [ConfigService],
    },
    DynamoOrderRepository,
    OrderService,
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const host = configService.get<string>('HOST', '0.0.0.0');

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', '*'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(port, host);
  
  const url = await app.getUrl();
  console.log(`Aplicación ejecutándose en: ${url}`);
  console.log(`Entorno: ${configService.get<string>('NODE_ENV', 'development')}`);
}

bootstrap();

// === ARCHIVO: api/src/domain/models/order-item.model.ts ===
export class OrderItem {
    productId: string;
    quantity: number;
    price: number;

    constructor(productId: string, quantity: number, price: number) {
        if (!productId || productId.trim() === '') {
            throw new Error('Product ID cannot be empty');
        }
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        if (price <= 0) {
            throw new Error('Price must be greater than zero');
        }

        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// === ARCHIVO: client/package.json ===
{
  "name": "reto-react",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && vite build"
  },
  "dependencies": {
    "axios": "1.21.1",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/react": "18.3.31",
    "@types/react-dom": "18.3.7",
    "@vitejs/plugin-react": "4.7.0",
    "typescript": "5.7.3",
    "vite": "5.4.21"
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "strictPropertyInitialization": false,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "useDefineForClassFields": true,
    "types": [
      "vite/client"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/vite-env.d.ts ===
/// <reference types="vite/client" />

// === ARCHIVO: client/src/shared/models/order.model.ts ===
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  status: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  items: OrderItem[];
}

export interface UpdateOrderRequest {
  status: string;
}

// === ARCHIVO: client/src/shared/hooks/useOrders.ts ===
import axios from 'axios';
import { Order, CreateOrderRequest, UpdateOrderRequest } from '../models/order.model';

const API_BASE_URL = 'http://localhost:3000';

export const useOrders = () => {
  const createOrder = async (orderData: CreateOrderRequest): Promise<Order | null> => {
    try {
      const response = await axios.post<Order>(`${API_BASE_URL}/orders`, orderData);
      return response.data;
    } catch (err) {
      console.error('Error creating order:', err);
      return null;
    }
  };

  const updateOrder = async (id: string, updateData: UpdateOrderRequest): Promise<Order | null> => {
    try {
      const response = await axios.put<Order>(`${API_BASE_URL}/orders/${id}`, updateData);
      return response.data;
    } catch (err) {
      console.error('Error updating order:', err);
      return null;
    }
  };

  const getOrder = async (id: string): Promise<Order | null> => {
    try {
      const response = await axios.get<Order>(`${API_BASE_URL}/orders/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching order:', err);
      return null;
    }
  };

  const deleteOrder = async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
      return true;
    } catch (err) {
      console.error('Error deleting order:', err);
      return false;
    }
  };

  const fetchOrders = async (): Promise<Order[]> => {
    try {
      const response = await axios.get<Order[]>(`${API_BASE_URL}/orders`);
      return response.data;
    } catch (err) {
      console.error('Error fetching orders:', err);
      return [];
    }
  };

  return {
    createOrder,
    updateOrder,
    getOrder,
    deleteOrder,
    fetchOrders,
  };
};

// === ARCHIVO: client/src/shared/hooks/useState.ts ===
import { useState as useReactState, Dispatch, SetStateAction } from 'react';

/**
 * Wrapper del hook useState de React que centraliza su uso y permite mocking en tests.
 * @template T Tipo del estado.
 * @param initialState Estado inicial.
 * @returns Tupla con el estado actual y la función para actualizarlo.
 */
export const useState = <T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useReactState(initialState);

  // Validación de invariantes para tipos primitivos
  const setStateWithValidation = (newState: SetStateAction<T>): void => {
    if (typeof newState === 'function') {
      const stateUpdater = newState as (prevState: T) => T;
      const updatedState = stateUpdater(state);
      if (typeof updatedState === 'number' && isNaN(updatedState)) {
        console.warn('Advertencia: Se intentó establecer un estado numérico como NaN');
      }
      setState(updatedState);
    } else {
      if (typeof newState === 'number' && isNaN(newState as unknown as number)) {
        console.warn('Advertencia: Se intentó establecer un estado numérico como NaN');
      }
      setState(newState);
    }
  };

  return [state, setStateWithValidation];
};

// Tipos auxiliares para manejo de estado complejo
export type StateUpdater<T> = Dispatch<SetStateAction<T>>;
export type StateTuple<T> = [T, StateUpdater<T>];

// === ARCHIVO: client/src/features/orders/OrderForm.tsx ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useState } from 'react';
import { Order, CreateOrderRequest, OrderItem } from '../../shared/models/order.model';
import { useOrders } from '../../shared/hooks/useOrders';

interface OrderFormProps {
  onSubmit: (order: Order) => void;
}

export function OrderForm({ onSubmit }: OrderFormProps): JSX.Element {
  throw new Error('TODO(reto): anonymous');
}

export default OrderForm;

// === ARCHIVO: client/src/App.tsx ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import React, { useEffect, useState } from 'react';
import { Order } from './shared/models/order.model';
import { useOrders } from './shared/hooks/useOrders';
import { OrderForm } from './features/orders/OrderForm';

const App: React.FC = () => {
  throw new Error('TODO(reto): App');
};

interface OrderListProps {
  orders: Order[];
  onUpdate: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onUpdate, onDelete }) => {
  return (
    <div>
      <h3>Órdenes Existentes</h3>
      {orders.length === 0 ? (
        <p>No hay órdenes</p>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  onUpdate: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdate, onDelete }) => {
  throw new Error('TODO(reto): anonymous');
};

export default App;

// === ARCHIVO: infra/outputs.tf ===
output "dynamodb_orders_table_arn" {
  description = "ARN of the DynamoDB orders table. This output provides the complete Amazon Resource Name for the orders table, which is required for granting cross-resource permissions, configuring backup policies, and setting up replication across regions. Use this ARN when configuring IAM policies or when referencing the table from other AWS services."
  value       = module.orders_dynamodb.table_arn
  sensitive   = false
}

output "dynamodb_orders_table_name" {
  description = "Name of the DynamoDB orders table. This is the primary identifier used in SDK calls, CLI commands, and when configuring application-level table references. The table name follows the naming convention defined in the variables and includes environment-specific prefixes."
  value       = module.orders_dynamodb.table_name
  sensitive   = false
}

output "dynamodb_orders_table_id" {
  description = "Unique identifier (UUID) of the DynamoDB orders table. This ID is automatically generated by AWS and is useful for cross-region replication setup, disaster recovery operations, and when referencing the table in AWS support cases."
  value       = module.orders_dynamodb.table_id
  sensitive   = false
}

output "dynamodb_customer_gsi_arn" {
  description = "ARN of the customer Global Secondary Index (GSI). This index enables efficient queries on the customer_id attribute, supporting use cases like retrieving all orders for a specific customer. The ARN is required for monitoring index metrics and configuring throughput settings."
  value       = module.orders_dynamodb.customer_gsi_arn
  sensitive   = false
}

output "dynamodb_status_gsi_arn" {
  description = "ARN of the status Global Secondary Index (GSI). This index enables efficient queries on the order status attribute, supporting use cases like finding all orders in a specific state (e.g., 'pending', 'completed', 'cancelled'). The ARN is required for monitoring index performance and capacity management."
  value       = module.orders_dynamodb.status_gsi_arn
  sensitive   = false
}

output "dynamodb_kms_key_arn" {
  description = "ARN of the KMS key used for server-side encryption of the DynamoDB table. This key provides encryption at rest for all table data, including items and local secondary indexes. The ARN is required for key rotation policies, cross-account key sharing, and audit logging of key usage."
  value       = module.orders_dynamodb.kms_key_arn
  sensitive   = false
}

output "environment_name" {
  description = "The environment name (dev, staging, production) as configured in the Terraform deployment. This output enables downstream modules and applications to adapt their behavior based on the target environment, such as connecting to different service endpoints or applying environment-specific configurations."
  value       = var.environment
  sensitive   = false
}

output "aws_region" {
  description = "The AWS region where resources are deployed. This output is essential for configuring SDK clients, CLI profiles, and application-level region-specific settings. It ensures consistency between Terraform-deployed resources and application-level AWS service calls."
  value       = var.aws_region
  sensitive   = false
}

// === ARCHIVO: infra/variables.tf ===
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

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.100.0"
    }
  }
}

// === ARCHIVO: infra/providers.tf ===
provider "aws" {
  region = "us-east-1"
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
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

// === ARCHIVO: infra/environments/dev/main.tf ===
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

// === ARCHIVO: infra/README.md ===
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

// === ARCHIVO: infra/modules/dynamodb/orders_table.tf ===
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

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.

Tablas de DynamoDB: `orders` (pk `id`).


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "orders" "id"

```
