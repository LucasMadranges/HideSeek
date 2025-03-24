# HideSeek

HideSeek est une application de jeux en temps réel réalisé par Paul Pruvost et Lucas Madranges. L'application consiste à
créer une partie avec d'autres joueurs, certains ayant l'objectif de se cacher et les autres de les trouver dans une
certaine définie à la création de la partie. Les cacheurs ont aussi la possibilité d'utiliser des taunts, ce qui les
rendra visibles un certain temps sur la carte.

## Stack

### Front

- Quasar
- VueJS

### Back

- NestJS
- Swagger
- PrismaORM

### Database

- Docker
- PostgreSQL

## Installation

### Front

```
cd front && npm i && npm run dev
```

### Back

```
cd front && npm i && npm run start:dev
```

### Database

```
docker-compose up -d
```