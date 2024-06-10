# ICP Hello World Motoko

Este proyecto es una aplicación web que interactúa con el backend de ICP (Internet Computer Protocol) utilizando el lenguaje de programación Motoko. La aplicación permite a los usuarios registrarse e iniciar sesión mediante Internet Identity, registrar clientes, dispositivos y consumo de energía, así como visualizar y eliminar registros.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos previos antes de comenzar:

- Node.js (v14 o superior)
- DFX SDK de DFINITY
- NPM (normalmente incluido con Node.js)

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Inicia el servidor de desarrollo de DFINITY:

    ```bash
    dfx start --background
    ```

4. Despliega el backend del proyecto en el servidor de desarrollo:

    ```bash
    dfx deploy
    ```

5. Inicia la aplicación frontend:

    ```bash
    npm start
    ```

6. Abre tu navegador y navega a `http://localhost:8080` para ver la aplicación en funcionamiento.

## Uso

### Inicio de Sesión

- Haz clic en el botón "Login" para iniciar sesión utilizando Internet Identity. Una vez autenticado, verás tu principal ID en la interfaz.

### Registro de Cliente

- Completa el campo "Client ID" (prellenado con tu principal ID) y haz clic en "Register Client".

### Registro de Dispositivo

- Completa los campos "Client ID", "Device ID" y "Amperios" y haz clic en "Register Device".

### Registro de Consumo

- Completa los campos "Client ID", "Consumed Energy" y "Produced Energy" y haz clic en "Register Consumption".

### Visualización de Clientes

- Haz clic en el botón "Get Clients" para obtener la lista de clientes registrados y sus respectivos detalles.

### Eliminación de Clientes y Dispositivos

- Haz clic en los botones "Eliminar" junto a cada cliente o dispositivo para eliminarlos.

## Estructura del Proyecto


Sí, GitHub utiliza Markdown para formatear los archivos README. Aquí tienes una versión optimizada y adecuada para un README en GitHub utilizando Markdown:

markdown
Copiar código
# ICP Hello World Motoko

Este proyecto es una aplicación web que interactúa con el backend de ICP (Internet Computer Protocol) utilizando el lenguaje de programación Motoko. La aplicación permite a los usuarios registrarse e iniciar sesión mediante Internet Identity, registrar clientes, dispositivos y consumo de energía, así como visualizar y eliminar registros.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos previos antes de comenzar:

- Node.js (v14 o superior)
- DFX SDK de DFINITY
- NPM (normalmente incluido con Node.js)

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Inicia el servidor de desarrollo de DFINITY:

    ```bash
    dfx start --background
    ```

4. Despliega el backend del proyecto en el servidor de desarrollo:

    ```bash
    dfx deploy
    ```

5. Inicia la aplicación frontend:

    ```bash
    npm start
    ```

6. Abre tu navegador y navega a `http://localhost:8080` para ver la aplicación en funcionamiento.

## Uso

### Inicio de Sesión

- Haz clic en el botón "Login" para iniciar sesión utilizando Internet Identity. Una vez autenticado, verás tu principal ID en la interfaz.

### Registro de Cliente

- Completa el campo "Client ID" (prellenado con tu principal ID) y haz clic en "Register Client".

### Registro de Dispositivo

- Completa los campos "Client ID", "Device ID" y "Amperios" y haz clic en "Register Device".

### Registro de Consumo

- Completa los campos "Client ID", "Consumed Energy" y "Produced Energy" y haz clic en "Register Consumption".

### Visualización de Clientes

- Haz clic en el botón "Get Clients" para obtener la lista de clientes registrados y sus respectivos detalles.

### Eliminación de Clientes y Dispositivos

- Haz clic en los botones "Eliminar" junto a cada cliente o dispositivo para eliminarlos.

## Estructura del Proyecto

.
├── src
│ ├── icp_hello_world_motoko_backend
│ │ ├── main.mo
│ ├── frontend
│ │ ├── assets
│ │ │ ├── logo2.svg
│ │ ├── src
│ │ │ ├── index.js
│ │ │ ├── main.css
├── README.md
├── package.json
├── dfx.json
- `main.mo`: Archivo principal del backend escrito en Motoko.
- `index.js`: Lógica del frontend en JavaScript.
- `main.css`: Estilos del frontend.
- `dfx.json`: Configuración del proyecto DFINITY.
