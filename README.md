# Invia Assignment
This is test automation framework for testing the following applications:

 - ab-in-den-urlaub.de 
 - ab-in-den-urlaub.at
 - ab-in-den-urlaub.ch

## Setup

- Install [Node.js](https://nodejs.org/en/download/) v20 or newer

## Install dependencies

```
  npm install
  npx playwright install
```

## Setup local Environment variable
Create  .prod.de.env, .prod.at.env, .prod.ch.env using .example.env as rederence.
Set Values all required environmental variables.  

## Run tests

-   Run all tests for .de:

```
  npm run e2e:prod:de
```

-   Run specific tests:

```
  npm run e2e:prod:de {fileName1} {fileName2}
```
   where {fileName1} is a name of the file in ./tests folder

## The last test run report

Test report are saved in playwright-report-de, playwright-report-at and playwright-report-ch folders

-   To open specific last HTML report run:

```
npx playwright show-report playwright-report-at
```
