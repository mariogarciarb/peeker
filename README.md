# Peeker

## ANÁLISIS DEL SISTEMA DE INFORMACIÓN

## DEFINICIÓN DEL SISTEMA

### Alcance del sistema

En este apartado se refleja la definición del alcance del sistema, es decir, se plantea el problema y los objetivos a alcanzar en el desarrollo de este proyecto.

El problema planteado es el siguiente. Se desea desarrollar una aplicación que consista en la comunicación de los usuarios mediante la videoconferencia, la funcionalidad principal es la siguiente:

- Establecer comunicación entre usuarios mediante videoconferencias
- Establecer comunicación entre usuarios mediante llamadas de audio
- Establecer comunicación entre usuarios mediante mensajes instantáneos de texto
- Altas y bajas de usuarios
- Proporcionar una lista de contactos del usuario que ha iniciado sesión con los que comunicarse.

Los objetivos a destacar son:

- Conocer las tecnologías citadas en el siguiente listado.
- Realizar un proyecto web multiplataforma desde cero realizando una combinación de tecnologías poco habitual e intentar sacar el máximo rendimiento y partido de ello.

En este proyecto se van a emplear las siguientes tecnologías

- Angular (angular 4) – Google ( [https://angular.io/](https://angular.io/))
- Node JS – Node JS Foundation ( [https://nodejs.org/es/](https://nodejs.org/es/))
- Ionic Framework – Ionic ( [https://ionicframework.com/](https://ionicframework.com/))
- WebRTC – WebRTC ( [https://webrtc.org/](https://webrtc.org/))
- MongoDB – MongoDB (https://www. [mongodb](https://www.mongodb.com/).com/).

El software empleado para la realización de este prototipo es el siguiente:

- Microsoft Office 2016 (Word y Power Point): Para la redacción de este documento y la elaboración de la presentación.
- Para la instalación del paquete que incluye PHP y MySQL.
- Visual Studio Code. Para la codificación de la página y la gestión de los ficheros de la misma.
- Para facilitar el uso del desarrollo en el lado del servidor.
- Google Chrome, Mozilla Firefox, Microsoft Edge y Opera para la visualización del contenido web y para la resolución de errores mediante el debugging.
- Windows 10 como sistema operativo en el que se ha desarrollado el prototipo.

## ESTABLECIMIENTO DE REQUISITOS

### Obtención de requisitos

En esta tarea se procede a analizar los requisitos del sistema. Para se definen los siguientes tipos de requisitos:

1. **1.** Funcionales (RF): aquellos requisitos dedicados exclusivamente a definir funcionales del sistema, es decir, cómo va a funcionar nuestro programa
2. **2.** Técnicos (RT): aquellos requisitos que no definen como funciona el programa sino cómo ha de estar hecho.
3. **3.** De interfaz (RI): aquellos requisitos que especifican como ha de ser la interfaz de usuario.

El catálogo de requisitos obtenido es el siguiente, siendo de color verde y subrayados los resueltos en el protitipo presentado:

- **Requisitos funcionales (RF)**
  1. a)Gestión de pedidos
    - **RF1.** Se deben poder dar de alta, dar de baja, modificar y eliminar los pedidos realizados o por realizar.
    - **RF2.** Se deben almacenar en un log todos los pedidos que se hayan creado nuevos, aunque no hayan sido efectivos.
    - **RF3.** Se debe poder consultar el log en cualquier momento.
    - **RF4.** Se debe poder consultar los pedidos abiertos (sin cobrar) en cualquier momento.
    - **RF5.** El trabajador de la caja podrá saber en todo momento cuáles son los pedidos en camino y cuáles son los que se están preparando.
  2. b)Manejo de las tareas a realizar por los trabajadores
    - **RF6**. Las tareas realizadas por los trabajadores deben de tener reflejo en una base de datos, por lo que se deben poder dar de alta.
    - **RF7**. Se deben poder eliminar.
    - **RF8**. Deben ser susceptibles de sufrir modificaciones, en los requisitos técnicos **RT2** y **RT3** se explica con mayor detalle.
    - **RF9**. Se deben poder asignar empleados existentes a las tareas.
  3. c)Localización de proveedores y repartidores
    - **RF9**. Se deben poder localizar en un mapa de google maps las sucursales proveedoras de productos al restaurante.
    - **RF10**. Se debe poder visualizar información de cada proveedor haciendo clic en  su marcador situado en el mapa.
    - **RF11**. El seguimiento de los repartidores de comida a domicilio se deberá hacer en vivo, trazando una ruta desde el punto de inicio hasta la posición actual de los mismos. Será necesario reflejar las paradas de 10 minutos en adelante del vehículo del repartidor.
- **Requisitos técnicos (RT)**
  1. a)Gestión de pedidos
    - **RT1.** El log de pedido incluirá:
      - El trabajador que lo realizó
      - El trabajador que lo entregó (en caso de ser un pedido a domicilio)
      - La fecha y hora en la que se tomó nota
      - La fecha y hora en la que se entregó
      - La dirección de entrega (en caso de ser pedido a domicilio)
  2. b)Manejo de las tareas a realizar por los trabajadores
    - **RT2**. Una tarea podrá tener cinco estados, sólo uno en una misma unidad de tiempo: abierta, empezada, interrumpida, completada y cancelada.
    - **RT3**. Las tareas deben poder filtrarse según su estado.

- **Requisitos de interfaz (RI)**

-
  - **RI1****.** La aplicación debe ser &quot;responsive&quot;, flexible al tamaño del dispositivo en el que se va a mostrar.

-
  1. a)Gestión de pedidos
    - **RI2.** La información a mostrar, citada en el requisito funcional **RF5** , deberá permanecer visible mientras el trabajador permanezca en el apartado de gestión de pedidos. Mediante un panel situado en el lado derecho, podrá ver tanto la lista de pedidos en camino, como los pendientes de preparar. Éstos aparecerán y se mostrarán de forma instantánea sin tener que refrescar la vista – en directo.

## DEFINICIÓN DE INTERFACES DE USUARIO

### Especificación de principios generales de la interfaz

## ESPECIFICACIÓN TÉCNICA DEL PLAN DE PRUEBAS

En esta actividad se desea realizar un análisis de las pruebas a las que se va a someter el software una vez esté finalizado el periodo de desarrollo del mismo. Puesto a que son varias las partes en las que se divide el proyecto

| **Nº prueba** | **Pruebas sobre la videoconferencia** |
| --- | --- |
| 1 |   |
| **Pruebas sobre la autenticación** |
| 2 |   |

## WEBGRAFÍA

