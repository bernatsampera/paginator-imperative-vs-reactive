# Paginator

Compares Rective and Imperative apporaches in Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Approaches Detailed

### Imperative

Shows how a paginator could be done using a more imperative way, avoiding the patterns described in the following approaches.

### Reactive

Introduces the async pipe in the template and combines subjects and observables to use the differents sources of data.

### State 

Introduces the idea of a state to manage the various streams of data into a single observable containing all the information.

### Ephemeral

Takes one step forward the local state management extending the main component the class LocalState from Michael Hladky. More details here -> https://dev.to/rxjs/research-on-reactive-ephemeral-state-in-component-oriented-frameworks-38lk

### Eph-vm

Refactor of the Ephemeral approach into a more decoupled way. Using a ViewModelService to combine the different streams of the data and extend the LocalState class.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



# Angular docs to run the application

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
