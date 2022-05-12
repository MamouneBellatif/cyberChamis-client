# Groupe 5

## "Version stable sans home/avec buttons à l'accueil qui fonctionne et qui peut constituer la version à présenter en démo : cette version est déjà au-delà de la MVP"

## Routes

Toute l'application est sur une page racine (composant AppComponent), à part la phase de jeu, qui s'exécute sur une page `/play` (composant PlayComponent)

## Requêtes HTTP

### Chamis

#### Lecture

GET `/api/chamis/` - Retourne la liste de tous les Chamis

GET `/api/chamis/mail/?email=<email>` - Retourne une liste contenant le Chami ayant l'email donné s'il existe, sinon une liste vide.

GET `/api/chamis/<id>` - Retourne le Chami ayant l'id donné

#### Ajout

POST `/api/chamis/<id>` - Ajout de Chami avec l'id donné

#### Modification

DELETE `/api/chamis/<id>` - Suppression du Chami d'id donné

### Defis

#### Lecture

GET `/api/defis/` - Retourne la liste des Defis

GET `/api/defis/<id>` - Lecture de Defi par id

#### Ajout

POST `/api/defis/create/` - Ajout de Defi

#### Modification

PUT `/api/defis/<id>` - Mise à jour d'un Defi

#### Suppression

DELETE `/api/defis/<id>` - Suppression d'un Defi

### Visites

#### Lecture

GET `/api/visite/play/<id>` - Lecture d'une Visite

GET `/api/visite/<idChami>` - Lecture des Visites d'un Chami

#### Ajout

POST `/api/visite/` - Ajout d'une Visite

POST `/api/visite/complet/` -  Ajout d'une Visite (avec plusieurs Chamis)

#### Modification

PUT `/api/<idVisite>/ajouterJoueur/<idChami>` - Ajout de Chami dans une Visite

PUT `/api/visite/<idVisite>/reponse/` - Ajout d'une Reponse dans la Visite d'id donné

PUT `/api/visite/fin/<id>` - Fin de Visite (mise à jour de visite avec une date de fin)

## Services web externes

Les services web externes utilisés sont :
- Firebase pour l'authentification via Google, et le stockage de media (images JPG et PNG)
- Leaflet pour afficher la carte et en retirer des coordonnées en pointant dessus, ainsi que pour localiser l'utilisateur.


_____________________

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7711869&assignment_repo_type=AssignmentRepo)
# L3mPi2022Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
