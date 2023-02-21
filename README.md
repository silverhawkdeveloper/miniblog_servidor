# GENERACIÓN AUTOMÁTICA DE UNA APLICACIÓN

1. Instalamos de forma global (con permisos de administrador), mediante el siguiente comando:
npm install express-generator -g

2. Crear una aplicación Express.js con el nombre 'miniblog' lo haremos de la siguiente forma:
express miniblog --view=ejs --git

3. Entramos al directorio de la aplicación e instalamos las dependencias, definidas en el “package.json”, con el comando:
\cd miniblog
\miniblog>npm install

4. En el mismo mensaje nos ofrece la solución del error, ejecutar:
\miniblog>npm audit fix --force

5. Vamos a crear un fichero denominado “.env” en el directorio raíz del proyecto con el siguiente contenido:
NODE_ENV = development
PORT = 5000

6. Indicaremos que vamos a usar el puerto 5000 en el archivo WWW.

7. Instalaremos el paquete 'dotenv', para indicar a nuestra aplicación que tenemos un fichero .env que contiene los valores por defecto de las variables de entorno, desde el directorio del proyecto:
\miniblog>npm install dotenv --save

8. En el fichero app.js, añadimos esta línea de código:
require('dotenv').config();

9. Para ignorar la subira del archivo .env, añadiremos al fichero .gitignore la siguiente línea:
#misc
.env

10. Para evitar tener que reiniciar el servidor para actualizar los cambios instalamos nodemon:
\miniblog>npm install --save-dev nodemon

11. Modificamos el archivo package.json añadiendo la siguiente linea:
"scripts": {
"start": "node ./bin/www",
"start:dev": "SET DEBUG=* & nodemon start:dev"
},

12. Para iniciar el servidor especificamos el comando 'start:dev':
C:\miniblog>npm run start:dev
Con ctrl + c detenemos el proceso.

13. En el navegador escribimos:
http://localhost:5000/

Subir a nuestro gitHub, comandos:
C:\miniblog>git init
C:\miniblog>git add -A
C:\miniblog>git commit -m “creación esqueleto”
C:\miniblog>git branch -M main
C:\miniblog>git remote add origin
https://github.com/<USUARIO>/miniblog.git
C:\miniblog>git push -u origin main

14. Instalación de mongoose
npm install mongoose --save

15. Instalación encriptación
npm install --save bcryptjs