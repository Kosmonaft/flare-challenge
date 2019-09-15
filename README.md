# FlareChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Installation
Run `npm install` for installing all packages

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Additional notes

I have decided to use Angular for the challenge.
As part of the task wanted to try [Angular Material](https://material.angular.io/) and use their autocomplete component + some othe components (the Tree) and material layout.
This was a big mistake as the documentation of it is not up to date and because of that I lost a lot of time trying to make things working.
On some point decide to add bootstap (through npm package) just to be able to style some parts quickly and be able to finish the task.

During the work I decide to ignore the 2 character code search as the requirement is saying to populate the typeahead box with minimum 3 characters.
As a result the country code search is firing only when the search text is equal to 3.

### History
For the search history I used [ngrx](https://ngrx.io/). As alternative I thought that I can save the history in the localStorage but preferred to go forward with ngrx.
I believe that for application in which the Extensibility is important a state management system/service is crusial.
Unfortunately for such a small apps it produce a lot of additional code and package size + extend the time to finish the task as I had to configure the state.

### What I wish to do differently
- replace Angular Material components with NGBoostrap 
- work a bit on the layout

### Last notes
If I had more time (if I didn't spent those time on trying to make the Angular Material components working), I would definetely add some Unit Tests.
Unfrotunately because of the Angular Material and ngrx I spent on the task approximately around 4-4.5h


### ANGULAR CLI NOTES


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
