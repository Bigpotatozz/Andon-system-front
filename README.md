# VERSION ESTABLE

rama version2

# Sistema ANDON - Frontend

Aplicación web con PWA integrada para la monitorización en tiempo real de líneas de producción industrial.

## Descripción

El frontend del sistema ANDON es una aplicación desarrollada con React y TypeScript que permite supervisar el estado de las estaciones de producción, gestionar turnos y objetivos, y visualizar métricas de rendimiento en tiempo real. La aplicación funciona como Progressive Web App (PWA), lo que permite su instalación y uso offline.

## Tecnologías

- **React** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de build y desarrollo
- **Socket.IO Client** - Comunicación en tiempo real con el servidor
- **React Router** - Navegación entre vistas
- **Tailwind CSS** - Estilos (si aplica)

## Estructura del Proyecto

```
├── public/ # Recursos estáticos (HTML, iconos, manifest)
├── src/ # Código fuente de la aplicación
│ ├── main.tsx # Punto de entrada del cliente
│ ├── App.tsx # Componente raíz
│ ├── components/ # Componentes reutilizables
│ ├── pages/ # Vistas principales (Home, ConfigLineas, etc.)
│ ├── hooks/ # Custom hooks
│ ├── services/ # Servicios de API y WebSocket
│ ├── types/ # Tipos de TypeScript
│ └── styles/ # Estilos globales
├── package.json # Dependencias y scripts
├── tsconfig.json # Configuración de TypeScript
└── vite.config.ts # Configuración de Vite
```

## Requisitos Previos

- Node.js >= 16.x
- npm o yarn
- Servidor backend del sistema ANDON en ejecución

## Instalación

1. Clonar el repositorio:

```
git clone https://github.com/Bigpotatozz/Andon-system-front.git
cd andonApp2
```

2. Instalar dependencias:

```
npm install
```

## Uso

### Modo desarrollo

```
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

### Preview de producción

```
npm run preview
```

## Características Principales

- **Monitorización en tiempo real**: Visualización del estado de estaciones mediante WebSocket
- **Gestión de líneas**: Configuración de líneas y estaciones de producción
- **Control de turnos**: Definición y seguimiento de turnos de trabajo
- **Objetivos de producción**: Establecimiento y tracking de metas
- **Comunicación multi-PLC**: Conexión simultánea hasta con 30 PLCs vía TCP
- **Compatibilidad multi-marca**: Scripts adaptables para Keyence, Allen-Bradley y Siemens
- **PWA**: Instalable y funcional offline
- **Responsive**: Adaptable a diferentes dispositivos

## Integración con PLCs

El sistema backend gestiona la comunicación TCP con los PLCs de planta, permitiendo:

- Conexión simultánea de hasta 30 dispositivos PLC
- Adaptabilidad mediante scripts configurables por marca (Keyence, Allen-Bradley, Siemens)
- Recepción de señales en tiempo real (producción, paros, alarmas)
- Envío de comandos y parámetros de configuración
- Operación sin dependencia de conexión Wi-Fi o internet

## Flujo de Datos

1. `main.tsx` inicializa la aplicación y monta el componente raíz
2. `App.tsx` organiza las rutas y la estructura general
3. Los componentes de página renderizan las vistas principales
4. Los servicios manejan la comunicación con el backend vía HTTP y WebSocket
5. Los hooks personalizados encapsulan lógica reutilizable
6. El backend transmite los datos de los PLCs al frontend en tiempo real

## Deployment

El proyecto está configurado para desplegarse en plataformas como Vercel, Netlify o cualquier servidor web estático:

```
npm run build
```

Subir el contenido de `dist/` al servidor de hosting.

## Mantenimiento

- Ejecutar `npm update` periódicamente para actualizar dependencias
- Revisar y actualizar tipos de TypeScript cuando cambie la API
- Validar funcionalidad PWA tras cada actualización
- Verificar compatibilidad de scripts TCP con nuevas versiones de firmware de PLCs

##

Author: Oscar MG
