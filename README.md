

# 🍴 Aplicación Web de Gestión de Pedidos para Restaurante 🍴
---
Este proyecto implementa una aplicación web para la gestión de pedidos en un restaurante, desarrollada utilizando Next.js, GraphQL, Prisma, Apollo Server, NextAuth y Auth0. La aplicación permite autenticar usuarios, crear perfiles de usuario con roles (administrador y usuario común), gestionar un inventario de platos, ver un menú interactivo, realizar pedidos, y consultar una lista de pedidos y usuarios.

**USUARIO ADMIN**: 
  - **username:** admin@admin.com
  - **password:** Admin123$%&
----

----

## 🛠️ Características Principales

- 🚀 **Autenticación de usuarios:** Los usuarios pueden registrarse e iniciar sesión con NextAuth y Auth0. Los administradores tienen acceso a funciones exclusivas como la gestión de inventario.
- 🍽️ **Gestión de inventario de platos:** Los administradores pueden agregar, editar o eliminar platos del inventario.
- 🛒 **Menú interactivo:** Los usuarios pueden visualizar los productos disponibles en el menú, agregar platos al pedido y realizar una compra.
- 📑 **Gestión de pedidos::** Los usuarios pueden ver el estado de sus pedidos y los administradores pueden gestionar todos los pedidos del sistema.
- 👥 **Gestión de usuarios:** Los administradores pueden ver una lista de usuarios registrados.
- 🔒 **Autenticación y autorización:** Los usuarios tienen acceso a funcionalidades específicas según su rol (admin o user).

---

## 🔧 Tecnologías Utilizadas

- **Framework:** NextJS 
- **Tailwind CSS:** para el diseño de la interfaz de usuario.
- **Backend:** 
  - `Apollo Server` para la API de GraphQL.
  - `NextAuth` para autenticación de usuarios.
  - `Auth0` como proveedor de identidad para autenticación externa.
  - `Prisma` para el manejo de la base de datos.
  - `Supabase` como BaaS.


## 🚀 Instalación y Uso Local

Sigue los pasos a continuación para ejecutar el proyecto en tu entorno local:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/DavidTorres-sys/IngeWebRestaurantProject.git
   cd IngeWebRestaurantProject
2. Instala las dependencias:
   ```bash
   npm install
3. Accede al aplicativo desde tu navegador en: http://localhost:3000.

## 📊 Variables de entorno
    ```bash
    DATABASE_URL="postgresql://postgres.jowhklhwmcnveabcsmup:7WjFatfz7DP9pRZo@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
    
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=mysecret
    
    EMAIL_SERVER=smtp://localhost:1025
    EMAIL_FROM=admin@example.com
    
    AUTH0_DOMAIN="dev-xarv5ryn3fxcb3yp.us.auth0.com"
    AUTH0_CLIENT_ID="uJSzLtmc5pZcaHF1HwR70EvyfWTtuqzf"
    AUTH0_CLIENT_SECRET='HXf2rlqPI9ZZ8SwZTuR_PZqX1VCsgVcCZbUaA6kfSgp-mEE38ntzi7khbixjudbE'
    
    AUTH0_DOMAIN_AUTH="dev-xarv5ryn3fxcb3yp.us.auth0.com"
    AUTH0_CLIENT_ID_AUTH="5xTDzUaYr9gX10MM6Ix06m06UFkcJuBP"
    AUTH0_CLIENT_SECRET_AUTH='nMrUYkbuzn3Qk1zOjxnlvshQSY_G-X0O0uaFUTgRRDtlMXNP5VGteZ4Nl4ieMZrm'
    
## ✨ Créditos
Desarrollado por David Torres & Ferney Montoya para Ingeniería web. 💻


