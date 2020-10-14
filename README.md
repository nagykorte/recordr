# recordR

Esta es una app de node hecha rápidamente como ejemplo de un crud simple de grabación de audio en react con un backend en node con mongodb.

## Instalación

Para correr el proyecto, andá a la carpeta donde lo quieras guardar, y copiá

    git clone https://github.com/nagykorte/recordr.git

    cd recordr

    yarn install

## Correr un servidor

El servidor usa mongodb, así que será necesaria una instancia de *mongod* .

Para levantar un servidor, alcanza con correr con node (v.12.19.0) desde /recordr/

    yarn start

y desde /recordr/backend/

    node app.js

### Información adicional

El backend corre por defecto en localhost:3001, y la app de react por localhost:3000.
La base de datos funciona en 127.0.0.1:27017, en la db recordr.


