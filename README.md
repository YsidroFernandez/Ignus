[![Angular Logo](./logo-angular.jpg)](https://angular.io/) [![Electron Logo](./logo-electron.jpg)](https://electron.atom.io/)



# Introduccion

Tenemos el enpaquetado del proyecto con Angular 6 (+) y Electron (Typescript + SASS + Hot Reload) para crear aplicaciones de escritorio.

Actualmente se ejecuta con:

-Angular v6.1.2
-Electron v2.0.7
-Generador de electrones v20.28.1

Con esto podemos:
-
-Ejecutar la aplicación en un entorno de desarrollo local con Electron & Hot Reload
-Ejecutar la aplicación en un entorno de producción
-Empaquetar la  aplicación en un archivo ejecutable para Linux, Windows y Mac

## Comenzando

Requisitos previos:
``` bash
instalar git, node js y yarn 
```
Clone el repositorio:

``` bash
git clone https://gitlab.com/Ethereum-Ignus/ignus-intranet.git
```

Instale  las dependencias con yarn o npm :


``` bash
yarn install

si el comando anterior falla utilize:

npm install
```




Si desea generar componentes angulares con Angular-cli, DEBE instalarlo `@angular/cli` en el contexto global de npm. 
Siga la [Angular-cli documentation](https://github.com/angular/angular-cli) si ha instalado una versión anterior de `angular-cli`.

``` bash
npm install -g @angular/cli
```

## Construir para desarrollo

- **En la ventana del terminal** -> npm start  

Listo tenemos la aplicación Angular + Electron en un entorno de desarrollo local con recarga instantanea

El código de la aplicación es administrado por main.ts. En esta muestra, la aplicación se ejecuta con una simple aplicación angular ( http: // localhost: 4200 ) y una ventana electrónica. 
El componente angular contiene un ejemplo de importación lib nativa de Electron y NodeJS. 
Puede desactivar "Herramientas de desarrollador" haciendo un comentario win.webContents.openDevTools();en main.ts.

## Comandos Incluidos 

|Comando|Descripcion|
|--|--|
|`npm run ng:serve:web`| Ejecuta la aplicación en el navegador |
|`npm run build`| Crea la aplicación. Sus archivos creados están en la carpeta / dist. |
|`npm run build:prod`| Crea la aplicación con Angular aot. Sus archivos creados están en la carpeta / dist. |
|`npm run electron:local`| Crea tu aplicación e inicia el electrón
|`npm run electron:linux`| Crea su aplicación y crea un consumible de aplicación en el sistema Linux |
|`npm run electron:windows`| En un sistema operativo Windows, crea su aplicación y crea un consumible de aplicación en sistemas Windows 32/64 bit |
|`npm run electron:mac`|  En un sistema operativo MAC, crea su aplicación y genera un .apparchivo de su aplicación que se puede ejecutar en Mac |

**La aplicación está optimizada. La carpeta solo / dist y las dependencias de nodo se incluyen en el ejecutable.**



