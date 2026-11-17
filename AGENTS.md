# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de operaciones CRUD de ordenes en DynamoDB**.

| | |
|---|---|
| Tema | Persistir ordenes en DynamoDB desde la interfaz |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 10 |
| Patron arquitectonico | hexagonal/clean |
| Tiempo estimado | 8 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @aws-sdk/client-dynamodb 3.1170.0
- @aws-sdk/lib-dynamodb 3.1170.0
- @nestjs/common 10.4.22
- @nestjs/config 4.0.4
- @nestjs/core 10.4.22
- @nestjs/platform-express 10.4.22
- class-transformer 0.5.1
- class-validator 0.15.1
- express 5.3.0
- reflect-metadata 0.2.2
- rxjs 7.8.2
- @types/express 4.17.25
- @types/node 22.20.5
- typescript 5.7.3
- jest 29.7.0
- ts-jest 29.2.5
- @types/jest 29.5.14

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración inicial y creación de ordenes**: Entorno de desarrollo configurado y endpoint para crear ordenes funcional.
- **Fase 2 — Actualización y eliminación de ordenes**: Endpoints funcionales para actualizar y eliminar ordenes en DynamoDB.
- **Fase 3 — Pruebas de aceptación y versionado de infraestructura**: Pruebas de aceptación funcionales para las operaciones CRUD y la infraestructura versionada con Terraform.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `api/src/application/services/order.service.ts` — La pieza p1 (Validación de datos y persistencia en DynamoDB, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/infrastructure/repositories/dynamo-order.repository.ts` — La pieza p2 (Implementación de repositorio para DynamoDB, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/infrastructure/controllers/order.controller.ts` — La pieza p3 (Exposición de endpoints REST para órdenes, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/infrastructure/providers/dynamodb.provider.ts` — La practica elegida no tenia ningun cuerpo que implementar: este archivo alcanzable, con cuerpos, pasa a ser el ejercicio.
- [ ] `client/src/features/orders/OrderForm.tsx` — La pieza p7 (Gestión de estado local con hooks y envío de órdenes, fase f3) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `client/src/App.tsx` — absorbida: fuga de la pieza p7

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

## Pruebas de aceptacion y ubicacion de la logica

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

La logica de cada pieza va en su archivo; no la muevas a otro.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar Vite 5 como herramienta de build del cliente React (dependencia vite en package.json) | chequeo estatico (manifest): exige `vite` | Verificada |
| No usar Redux Toolkit; el estado local se maneja con hooks | chequeo estatico (manifest): prohibe `@reduxjs/toolkit`, `redux-toolkit` | Verificada |
| Las pruebas de aceptacion cubren crear una orden y cambiar su estado | sin ubicar | Restriccion no verificada en sin ubicar |

## Lo que falta y tenes que completar

No se detectaron huecos: estan los archivos declarados, el boilerplate del stack y ninguna referencia quedo colgando. Igual corre el comando de verificacion — que los archivos existan no garantiza que compilen.

### Presentes (38)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/domain/models/order.model.ts`
- `api/src/domain/models/create-order.request.ts`
- `api/src/domain/models/update-order.request.ts`
- `api/src/domain/ports/order.repository.ts`
- `api/src/infrastructure/config/dynamodb.table.ts`
- `api/src/infrastructure/providers/dynamodb.provider.ts`
- `api/src/application/services/order.service.ts`
- `api/src/infrastructure/repositories/dynamo-order.repository.ts`
- `api/src/infrastructure/controllers/order.controller.ts`
- `api/src/acceptance/f1.test.ts`
- `api/src/acceptance/f2.test.ts`
- `api/src/app.module.ts`
- `api/src/main.ts`
- `api/src/domain/models/order-item.model.ts`
- `client/src/main.tsx`
- `client/package.json`
- `client/tsconfig.json`
- `client/vite.config.ts`
- `client/index.html`
- `client/src/vite-env.d.ts`
- `client/src/shared/models/order.model.ts`
- `client/src/shared/hooks/useOrders.ts`
- `client/src/shared/hooks/useState.ts`
- `client/src/features/orders/OrderForm.tsx`
- `client/src/App.tsx`
- `infra/outputs.tf`
- `infra/variables.tf`
- `infra/versions.tf`
- `infra/providers.tf`
- `infra/environments/dev/terraform.tfvars`
- `infra/environments/dev/main.tf`
- `infra/README.md`
- `infra/modules/dynamodb/orders_table.tf`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`

### Capas del patron declarado

Son las capas que la propuesta arquitectonica plantea, marcadas segun existan hoy en el repo. Orientan donde poner el codigo nuevo; no son una condicion para compilar.

- `api` (presente)
- `api/src/application/services` (presente)
- `api/src/domain/models` (presente)
- `api/src/domain/ports` (presente)
- `api/src/infrastructure/repositories` (presente)
- `api/src/infrastructure/controllers` (presente)
- `api/src/infrastructure/config` (presente)
- `client` (presente)
- `client/src/features/orders` (presente)
- `client/src/shared/components` (ausente)
- `client/src/shared/hooks` (presente)
- `client/src/shared/models` (presente)
- `infra` (presente)
- `infra/modules/dynamodb` (presente)
- `infra/environments/dev` (presente)

## Verificacion

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **hexagonal/clean**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2
- Brecha que el reto ataca: CRUD de ordenes en DynamoDB desde la interfaz
- Mision: Gestionar ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
