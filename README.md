# README

Welcome to Housecall! The following is how to set up the project locally.

## Rails Setup: 
* Install ruby 2.4.2
* Install rails 5.1.4
* Clone the directory
* Install mysql and check the mysql socket  
```console
$ mysqladmin -u root -p variables | grep socket
```
* Then update `config/database.yml` to use that socket (change SOCKET_VARIABLE):

```
default: &default
    adapter: mysql2
    encoding: utf8
    pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
    username: root
    password: root
    socket: {{SOCKET_VARIABLE}}
```
* In the root directory run

```console
$ bundle install
```
* To set up the database schema, run the following:
```console 
$ rake db:create
$ rake db:migrate
$ rake db:seed
```
* Navigate into the root directory and run the following to bootup the rails backend server:
```console
$ rails s
```  

## Angular Setup

* Inside of `/web-app` run `npm install` then the following should give the output:
```console
$ ng -v
    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/
@angular/cli: 1.4.5
node: 6.11.3
os: darwin x64
@angular/common: 2.4.10
@angular/compiler: 2.4.10
@angular/core: 2.4.10
@angular/forms: 2.4.10
@angular/http: 2.4.10
@angular/platform-browser: 2.4.10
@angular/platform-browser-dynamic: 2.4.10
@angular/router: 3.4.10
@angular/cli: 1.4.5
@angular/compiler-cli: 2.4.10
typescript: 2.0.10
```
* Navigate into the web-app directory and run `npm install` followed by `ng serve` to bootup the Angular app.

* Visit `localhost:4200` and play around in the app!

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
TODO...

* This application seems to require two servers, one to run the Angular webapp and other to run the Rails backend server. 
