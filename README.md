# Projet Groupomania

## Index

- Description
- Project tree
- Installation
- Development
- Production

### Description

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.

### Project tree

```
│   .gitignore
│   README.md
│
├───backend
│   │   package-lock.json
│   │   package.json
│   │   yarn.lock
│   │
│   ├───src
│   │   │   app.js
│   │   │   server.js
│   │   │
│   │   ├───config
│   │   │       config.js
│   │   │
│   │   ├───controllers
│   │   │       post-controller.js
│   │   │       user-controller.js
│   │   │
│   │   ├───middleware
│   │   │       auth.js
│   │   │       multer-config.js
│   │   │
│   │   ├───models
│   │   │       post-model.js
│   │   │       user-model.js
│   │   │
│   │   ├───routes
│   │   │       post-routes.js
│   │   │       user-routes.js
│   │   │
│   │   └───services
│   │           database.js
│   │
│   └───tools
│           seeddb.js
│           tables-model.js
│
└───frontend
    │   .browserslistrc
    │   .eslintrc.js
    │   babel.config.js
    │   jsconfig.json
    │   package-lock.json
    │   package.json
    │   vue.config.js
    │   yarn.lock
    │
    ├───dist
    │   │   favicon.ico
    │   │   favicon.png
    │   │   index.html
    │   │
    │   ├───css
    │   │       app.b0844bc4.css
    │   │       chunk-vendors.3a1526a5.css
    │   │
    │   ├───img
    │   │       groupomania-icon.5ed9d67f.png
    │   │       groupomania-logo.4861e929.png
    │   │
    │   └───js
    │           app-legacy.ccfcc2f8.js
    │           app-legacy.ccfcc2f8.js.map
    │           app.49b696b6.js
    │           app.49b696b6.js.map
    │           chunk-vendors-legacy.e6acd991.js
    │           chunk-vendors-legacy.e6acd991.js.map
    │           chunk-vendors.1f7124f8.js
    │           chunk-vendors.1f7124f8.js.map
    │
    ├───public
    │       favicon.ico
    │       favicon.png
    │       index.html
    │
    └───src
        │   App.vue
        │   main.js
        │
        ├───assets
        │   └───img
        │           groupomania-icon.png
        │           groupomania-logo.png
        │
        ├───components
        │       AddImage.vue
        │       AddLike.vue
        │       CreatePost.vue
        │       DeletePost.vue
        │       ListPosts.vue
        │       ModifyPost.vue
        │
        ├───plugins
        │       vuetify.js
        │
        ├───router
        │       index.js
        │
        ├───services
        │       Api.js
        │       LoginService.js
        │       PostsService.js
        │       PostsServicesApi.js
        │       SignupService.js
        │
        ├───store
        │       index.js
        │
        └───views
                LoginView.vue
                MainView.vue
                SignupView.vue
```

### Installation

1.  Dans un dossier vide, clonez le repository depuis : https://github.com/CodingWilsonA/WilsonAudoin_7_02052022. Une fois cloné, exécutez la commande **npm install** depuis le dossier backend puis **npm start** depuis un premier terminal pour démarrer le server. Attention à bien utiliser le port 8081.

2.  À la racine du dossier backend, créez un dossier nommé "env" dans lequel vous devez créer le fichier "default.env". Dans ce fichier, ajoutez les lignes suivantes à l'aide d'un éditeur de code :

        1. DB_HOST=localhost
        2. DB_NAME=groupomania
        3. DB_USER=groupoadmin
        4. DB_PASSWORD=admin1234
        5. TOKEN_SALT=MY_SECRET_TOKEN_SALT

3.  À la racine du dossier backend, créez également un dossier nommé "images".

4.  Depuis le dossier frontend, exécutez la commande **npm install** depuis un deuxième terminal.

5.  Une fois le nom de domaine avec éventuel sous-domaine récupéré de Groupomania, il faudra l'ajouter dans le fichier app.js situé dans le dossier backend. Dans ce fichier, un tableau est capturé par la variable "whitelist". Ajoutez le nom de domaine de Groupomania au tableau pour l'autoriser à échanger des ressources avec le serveur.

### Development

1. Depuis le dossier frontend, excécutez la commande **yarn serve** depuis un terminal pour lancer le serveur de développement. Veillez à bien utiliser le port 8080.

### Production

1. Depuis le dossier frontend, exécutez la commande **yarn build** depuis un terminal qui écrasera les fichiers et dossiers contenus dans le répertoire frontend/dist. Téléversez ensuite le contenu du répertoire dist vers un serveur distant.
