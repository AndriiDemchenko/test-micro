# Test Project

## How to start

1. Install docker
2. For each service that contains `.env.example` - copy it into `.env` and update it
3. Run `npm run docker:up` to start project
4. Connect to DB and create database (sorry)

## Usage

See postman example how to use it (./docs/)

## Overall Improvements

1. Add migrations
2. Add tests
3. Configure SSL certificates for gRCP (locally it is working fine but for docker need to change hosts URL)

## api-gateway

API gateway for microservices

#### Improvements

1. Can be replaced with `ngnix` to boost performance
2. Can be optimized to boost performance
3. Can be refactored
4. Can be switched to TS (small project so I picked JS instead of TS)
5. Add ability to use load balancer

## auth-service

Microservice to handle auth requests using API (login, register) and JWT validation (gRCP)

#### Improvements

1. Add tests
2. Remove unused files

## survey-service

Microservice to handle survey API calls.
Can be used to create/find/delete surveys, get questions and save answers

#### Improvements

1. Add tests
2. Remove unused files


## conflict-service

Microservice to save conflicts via gRCP and get conflicts using API

#### Improvements

1. Add pagination
2. Add tests
3. Remove unused files

## Docker

#### Improvements

1. Improve docker scripts to optimize developing and CI/CD performance
2. Use npm ci instead of npm install for production
