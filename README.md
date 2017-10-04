# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version: 2.4.2 

* Rails version: 5.1.4

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

## Setup Instructions: 
1. Install ruby 2.4.2
2. Install rails 5.1.4
3. Clone the directory
4. Navigate into the directory and run `rails s` to bootup the rails backend server
5. Navigate into the web-app directory and run `ng serve` to bootup the Angular app.

## Dev Notes:
* `ng new <application name>`: Creates new AngularJS 2 application
   <br/> Note that there are additional flags that you can specify

* `ng generate component <component_name>`: Generates a new Angular 2 Component 
    and inserts it into app.module.ts

* To add node_module dependencies, npm install with the --save flag and add them to angular-cli.json

* The workflow is goes like this: 
    application -> app.module.ts -> app.component.ts 

* Routing
Add your routes to app-routing.module.ts

* Authentication

* This application seems to require two servers, one to run the Angular webapp and other to run the Rails backend server. 
