# ContactBook API

This is my API test exam.
As testing the started pack didn't work and I am more used to work with Nest.js now I decided to work with it as I am aiming to progress with this framework too. Apologies if it doesn't fit your requirements.

## Requirements

- Mamp
- Node
- @nest/cli

## How to set-up project ?

1. Install and launch Wamp (or Mamp or Xamp).
2. Open your phpMyAdmin and create a MySQL database running with InnoDB for this project.
3. Copy the .env.structure file and fill it with your own information.
4. Run:

```
npm i
npm run dev
```

## How to launch project ?

1. Start Wamp (or Mamp or Xamp).
2. Run:

```
npm run dev
```

3. You can test the API with an API software such as Postman or Insomnia. Send JSON formatted data.

## Documentation

[Orkhan Books for TypeOrm]()
[Mocodo to generate MCD](https://www.mocodo.net/)

## Réponses

### Explication du principe d'absence d'état dans une API Rest

Avec les principes REST, le code de l'application sépare a minima une couche client (ce qui se passe sur le navigateur de l'utilisateurice) et une couche serveur (ce qui se passe sur le serveur hébergeant le site).
Une application sans état est une application dans laquelle le serveur ne connaît pas l'état de ses clients: les connexions http entre client et serveur sont brèves. Le client demande une ressource ou demande à modifier l'état d'une ressource hébergée par le serveur, le serveur reçoit cette demande et renvoie au client la réponse à sa demande (si la demande est autorisée).

### Données nécessaires au service

Voire dictionnaire des données en pièce-jointe.

### Liste des ressources et relations

1. users

username
password

2. visit_cards

first_name
last_name
gender
phone
address

3. groups

group_name

**_ Relations _**

- user OWNS 0 to many visit_cards
- visit_card BELONGS to one and only user
- visit_card BELONGS to one or many groups
- group INCLUDES 0 to many visit_cards

### Lise des URI et libellés pour chaque ressource

- /users _collection of users_
- /users/:userId _singleton user_
- /visit-cards _collection of visit cards_
- /visit-cards/:cardId _singleton visitcard_
- /visit-cards/:lastName _singleton visitcard_
- /groups _collection of groups_
- /groups/:groupId _singleton group_

### Sous-ensembles de l'interface uniforme pour les ressources identifiées

Voire Tableau sous-ensembles en pièce-jointe.

### Représentations acceptées par les clients REST et exemple de données JSON au format _application/hal+json_ pour chaque représentation + code de retour HTTP.

_Mes excuses pour cette partie: l'indentation est modifiée par mon linter, je n'ai pas le temps de le reconfigurer._
_NB: dans mon application les ressources imbriquées sont retournées directement par l'API. J'ai bien compris ce qu'est le HAL et consulté la documentation: https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-08#section-4.1_

1. users

GET /users/5231751b7af-ef08-4548-baac-22bd9f726c7f HTTP/1.1
Host: example.org
Accept: application/hal+json
HTTP/1.1 200 OK
Content-Type: application/hal+json
{
"id": "5231751b7af-ef08-4548-baac-22bd9f726c7f",
"username": "foo",
"password": "foobar",
"role": "admin",
"\_embedded": {
"self": { "href": "/users/5231751b7af-ef08-4548-baac-22bd9f726c7f" },
"visit_cards": [
{ "href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c801" },
{ "href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c801" },
{ "href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c801" },
],
"groups": [
{
"href": "/groups/bfb220c0-3ffa-11ee-a44c-5903ad09c802"
}
]
}
}

2. visit_cards

GET /visit-cards/5231751b7af-ef08-4548-baac-22bd9f726c7f HTTP/1.1
Host: example.org
Accept: application/hal+json
HTTP/1.1 200 OK
Content-Type: application/hal+json
{
"id": "5231751b7af-ef08-4548-baac-22bd9f726c7f",
"first_name": "toto",
"last_name": "titi",
"gender": "M",
"phone": "0708090102",
"address": "4 chemin de scolaire",
"\_embedded": {
"self": { "href": "/visit-cards/5231751b7af-ef08-4548-baac-22bd9f726c7f" }
},
"\_links": {
"owner": { "href": "/users/bfb220c0-3ffa-11ee-a44c-5903ad09c801"},
"visit-cards": [
{"href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c802"},
{"href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c802"},
]
}
}

3. groups

GET /groups/5231751b7af-ef08-4548-baac-22bd9f726c7f HTTP/1.1
Host: example.org
Accept: application/hal+json
HTTP/1.1 200 OK
Content-Type: application/hal+json
{
"id": "5231751b7af-ef08-4548-baac-22bd9f726c7f",
"group_name": "professionnel"
"\_embedded": {
"self": { "href": "/groups/5231751b7af-ef08-4548-baac-22bd9f726c7f" },
"visit_cards": [
{"href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c801"},
{"href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c801"},
{"href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c801"},
{"href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c801"},
{"href": "/visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c801"},
]
},
"\_links": {
"owner": { "href": "/users/bfb220c0-3ffa-11ee-a44c-5903ad09c801"},
"groups": [
{"href": "/groups/bfb220c0-3ffa-11ee-a44c-5903ad09c802"},
{"href": "/groups/bfb220c0-3ffa-11ee-a44c-5903ad09c802"},
]
}
}

### Représentations acceptées par le serveur pour modifier les ressources et pseudo-requête HTTP pour chaque représentation.

1. users
   PUT /users/5231751b7af-ef08-4548-baac-22bd9f726c7f HTTP/1.1

'username'='foo'
'password'='foobar'
'role'='member'
'visit_cards_ids': []
'groups_ids': \['bfb220c0-3ffa-11ee-a44c-5903ad09c802']

2. visit_cards
   PUT /visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c801 HTTP/1.1

'first_name'='foo'
'last_name'='bar'
'gender'='neutral'
'phone'=0605040302
'address'='chemin scolaire'
'userId'='5231751b7af-ef08-4548-baac-22bd9f726c7f'

3. groups
   PUT /visit-cards/bfb220c0-3ffa-11ee-a44c-5903ad09c802 HTTP/1.1

'group_name': 'famille'
visit_cards_ids: \['bfb220c0-3ffa-11ee-a44c-5903ad09c801']

### MCD, relations et associations.

Voire MCD en pièce-jointe.
