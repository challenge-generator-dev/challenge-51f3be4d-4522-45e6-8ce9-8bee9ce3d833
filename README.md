# Implementación de operaciones CRUD de ordenes en DynamoDB

El sistema debe permitir la gestión de ordenes a través de operaciones CRUD en DynamoDB. Los actores involucrados son el Cliente (que realiza las solicitudes) y el Servicio de Ordenes (que gestiona las operaciones en DynamoDB). El sistema debe manejar el estado local con hooks y usar Vite 5 como herramienta de build. Las pruebas de aceptación deben cubrir la creación de una orden y el cambio de su estado.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm · Terraform 1.5+.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Configuración inicial y creación de ordenes

**Objetivo:** Configurar el entorno de desarrollo y permitir la creación de ordenes en DynamoDB.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el proyecto React con Vite 5.
- Implementar la lógica para crear una orden en DynamoDB.
- Asegurar que el estado local se maneje con hooks.

**Entregable:** Entorno de desarrollo configurado y endpoint para crear ordenes funcional.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Vite 5 para la configuración del proyecto.
- Implementación de hooks para manejar el estado local.

</details>

### Fase 2: Actualización y eliminación de ordenes

**Objetivo:** Implementar la lógica para actualizar y eliminar ordenes en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar endpoints para actualizar y eliminar ordenes en DynamoDB.
- Asegurar que los cambios de estado de las ordenes se reflejen correctamente.

**Entregable:** Endpoints funcionales para actualizar y eliminar ordenes en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de métodos HTTP adecuados para las operaciones de actualización y eliminación.
- Manejo de errores y validaciones en las operaciones CRUD.

</details>

### Fase 3: Pruebas de aceptación y versionado de infraestructura

**Objetivo:** Implementar pruebas de aceptación para las operaciones CRUD y versionar la infraestructura.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa pruebas de aceptación que cubran los casos de éxito y error para crear, actualizar y eliminar órdenes.
- Versiona la infraestructura de DynamoDB en Terraform, incluyendo la tabla de órdenes y sus índices.
- Asegúrate de que las pruebas validen la persistencia en DynamoDB y el manejo de errores.

**Entregable:** Pruebas de aceptación funcionales para las operaciones CRUD y la infraestructura versionada con Terraform.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de herramientas de testing para implementar pruebas de aceptación.
- Configuración y uso de Terraform para versionar la infraestructura.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en DynamoDB?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en el contexto de gestión de ordenes?
- **comoSeUsa**: ¿Cómo se usan las operaciones CRUD para gestionar ordenes en DynamoDB?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de operaciones CRUD en DynamoDB y cómo se toman?

## Criterios de Evaluacion

- Configuración correcta del entorno de desarrollo con Vite 5.
- Implementación funcional de endpoints para crear, actualizar y eliminar ordenes en DynamoDB.
- Manejo correcto del estado local con hooks.
- Implementación de pruebas de aceptación para crear una orden y cambiar su estado.
- Versionado correcto de la infraestructura con Terraform.

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Configuración inicial y creación de ordenes | Validación de datos y persistencia en DynamoDB | `api/src/application/services/order.service.ts:OrderService` | El entorno de desarrollo está configurado con DynamoDB local.; Existe un endpoint funcional para crear órdenes que persiste en DynamoDB.; La orden creada incluye todos los campos requeridos y un estado inicial válido. | `api/src/acceptance/f1.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f1 — Configuración inicial y creación de ordenes | Implementación de repositorio para DynamoDB | `api/src/infrastructure/repositories/dynamo-order.repository.ts:DynamoOrderRepository` | El entorno de desarrollo está configurado con DynamoDB local.; Existe un endpoint funcional para crear órdenes que persiste en DynamoDB.; La orden creada incluye todos los campos requeridos y un estado inicial válido. | `api/src/acceptance/f1.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f1 — Configuración inicial y creación de ordenes | Exposición de endpoints REST para órdenes | `api/src/infrastructure/controllers/order.controller.ts:OrderController` | El entorno de desarrollo está configurado con DynamoDB local.; Existe un endpoint funcional para crear órdenes que persiste en DynamoDB.; La orden creada incluye todos los campos requeridos y un estado inicial válido. | `api/src/acceptance/f1.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f2 — Actualización y eliminación de ordenes | Validación de transiciones de estado y actualización | `api/src/application/services/order.service.ts:OrderService.update` | Existen endpoints funcionales para actualizar y eliminar órdenes en DynamoDB.; Las operaciones de actualización y eliminación manejan casos de error (ej. orden no encontrada).; La actualización de una orden valida las transiciones de estado permitidas. | `api/src/acceptance/f2.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Actualización y eliminación de ordenes | Exposición de endpoints REST para actualizar órdenes | `api/src/infrastructure/controllers/order.controller.ts:OrderController.update` | Existen endpoints funcionales para actualizar y eliminar órdenes en DynamoDB.; Las operaciones de actualización y eliminación manejan casos de error (ej. orden no encontrada).; La actualización de una orden valida las transiciones de estado permitidas. | `api/src/acceptance/f2.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f3 — Pruebas de aceptación y versionado de infraestructura | Definición de infraestructura para DynamoDB con Terraform | — | Las pruebas de aceptación cubren todos los escenarios CRUD (crear, leer, actualizar, eliminar) con casos de éxito y error.; La infraestructura está versionada en Terraform y es reproducible.; Las pruebas validan la persistencia en DynamoDB y el manejo de errores. | — | — |
| f3 — Pruebas de aceptación y versionado de infraestructura | Gestión de estado local con hooks y envío de órdenes | `client/src/features/orders/OrderForm.tsx:OrderForm` | Las pruebas de aceptación cubren todos los escenarios CRUD (crear, leer, actualizar, eliminar) con casos de éxito y error.; La infraestructura está versionada en Terraform y es reproducible.; Las pruebas validan la persistencia en DynamoDB y el manejo de errores. | — | — |

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar Vite 5 como herramienta de build del cliente React (dependencia vite en package.json) | chequeo estatico (manifest): exige `vite` | Verificada |
| No usar Redux Toolkit; el estado local se maneja con hooks | chequeo estatico (manifest): prohibe `@reduxjs/toolkit`, `redux-toolkit` | Verificada |
| Las pruebas de aceptacion cubren crear una orden y cambiar su estado | sin ubicar | Restriccion no verificada en sin ubicar |

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
