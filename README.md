# README
Welcome to Housecall! The following is how to set up the project locally. 
Otherwise, you can navigate to our production application: `https://housecall.herokuapp.com/`.


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


## Features
Doctor:
* A doctor can register as a user and then will be redirected to the login page 
* Once logged in, the doctor will be brought to their Home Page with a list of all of their patient contacts on the top 
* The doctor can press button to add a new patient as their client. A form will appear on the top of the page and a login key will be emailed to the user to finish registration. 
    * For the Alpha release, our servers are in local development mode so they don't support emailing. This means that a doctor can add new patients to their contact list, but those patients can't log in yet. You can still create a new user as a patient to see the application from the patient side but they won't be associated to a doctor yet. 
* The doctor can select a patient from the contact list to view the Patient Dashboard page on the lower half of the screen. If no patient is selected from the list, the components below the list will not populate. The notes list, Skype contact, and patient description will update based on the selected user.
* If the doctor clicks to a new patient, the notes, skype, and patient description components will update to reflect the information from the selected user. 
* The doctor can create and save a new note, click the yellow pencil to edit a note and the green checkmark to save it, or delete a note using the red garbage icon.
* The doctor can Skype chat the patient or Skype call the patient using the Skype bubble in the lower right hand side of the screen.
* The doctor can update and save the Patient Description box 
* The doctor can navigate to their Account Profile page using the gear in the upper right corner of the nav bar. They can then edit their name and skype account and view their other information.
* There is a grid icon in the nav bar that brings them back to the Dashboard page
* The doctor can press the Logout button to be logged out and navigate back to the login page
* The doctor can press the information i icon to be navigated to the About page. It will later hold a site tutorial and helping information.

Patient/Caretaker:
* A patient/caretaker will be emailed a key to finish registering to associate them with their doctor. 
    * We don't currently have our site hosted so it is not in production mode so the email functionality is turned off
* After regiserting, a user will be redirected to the login page to log in
* Once logged in, the user will be brought to their Dashboard Home Page that currenty contains a notes component where they can create, save, edit, and delete notes
* They also have a Skype bubble that can be used to chat or video call their doctor.
    * Currently, the default is Remington's Skype until we get the patient/doctor association from the patient side built.
* The user can update and save the Patient Description box 
* The user can navigate to their Account Profile page using the gear in the upper right corner of the nav bar. They can then edit their name and skype account and view their other information.
* There is a grid icon in the nav bar that brings them back to the Dashboard page
* The user can press the Logout button to be logged out and navigate back to the login page
* The user can press the information i icon to be navigated to the About page. It will later hold a site tutorial and helping information.

Additional:
* We have basic error checks for user registration input with feedback for the user.
* The login page also has error checks for email and password formatting with feedback for the user.
* The login page will send the user an alert if their login information is incorrect.
* There are validation checks that the doctor inputs the required information when registering a new patient.
* We have tooltips for the Navigation bar icons to help the user navigate the site easily.
* The user will be navigated to the About page if they try to access something they aren't authorized to view.
* The About page has useful site tips and feature descriptions to help users use the site easily.


## To push to production:
* Go into /client directory and run:`ng build --prod --aot=false --env=prod`.
* Wait for build to succeed
* navigate to: `https://housecall.herokuapp.com/`