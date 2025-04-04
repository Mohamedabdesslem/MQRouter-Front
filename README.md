# MQRouterFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Page authentification (Connexion)

Pour se connecter à l’espace d’administration, il faut utiliser l’identifiant admin et le mot de passe admin123, car c’est actuellement le seul utilisateur géré côté backend.
Afin de permettre, à l’avenir, la connexion de plusieurs utilisateurs à l’application, il sera nécessaire de mettre en place une gestion des utilisateurs. Cela impliquera la création d’une table utilisateurs dans la base de données, permettant de stocker les identifiants (login) et mots de passe.
