# api.avanade.social

## Description

Estudo de caso para Avanade Academy

## Installation

```bash
$ git clone https://github.com/matheus-pereira/api.avanade.social.git
```

```bash
$ cd api.avanade.social
```

```bash
$ npm install
```
## Running the app

You can change the enviroment configuration at config/default.ts

```bash
$ npm run start
```

## Database

You can use the default hosted MongoDB database or change to your localhost. You'll find a dump at database/dump.

```bash
$ mongorestore -h <host> -d avanade-social -u <user> -p <password> <input db directory>
```