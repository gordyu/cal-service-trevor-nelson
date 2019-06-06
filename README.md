







































# Original README BELOW - - - - - -  - - - - -  - - - - -  - - - - -  - - - - - 
# Project Name

> This service renders the calendar/booking portion of Airbnb 'homes' page. The calendar is janky (just wanted to see if I could build a calendar from scratch: spoiler alert, I cannot), and the real meat of this is really the database/schema (Bookings is nested in Listings :o).

## Related Projects
k
  - https://github.com/5uper5quad/Ja5mine-5ervice
  - https://github.com/5uper5quad/5arki5-5ervice
  - https://github.com/5uper5quad/Gloria5-5ervice
  - https://github.com/5uper5quad/Cam5-5ervice

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```
npm install
```

#### Running the Service

From within the root directory:
```
Server: npm start
```
```
Seeder: npm run seed
```
```
Webpack: npm run react-dev
```

#### Seeing Data in Postman

load up a 'GET' request to 127.0.0.1:3000/api/listings/1/reservations in Postman to see example data being returned at /:id
