# Todo App

### About the application

This `Todo App` is an example of maintaining a todolist of an user. I've created three users `sam`, `walter`, `rachel` for this app. This is a real-time application which will update the users todo lists on real-time. Front-end of the app is built with React, Redux and for back-end I've used node.js, socket.io and mongodb

### Features

-   Check username with validation
-   Add or remove todos from the list
-   Api endpoint to check all user list

## Installation Guideline

### Install Mongodb & Start mongo

Hope that you've mongodb installed in your machine. If it is not please visit this page [MongoDB](https://docs.mongodb.com/v3.2/administration/install-community/) and install it

### Install back-end packages

Goto the back folder with terminal or cmd. Then run

```sh
npm install
```

It'll install all the packages that are required for back-end

### Run back-end project

Run this command

```sh
node index.js
```

It'll start our server at localhost:3001

### Install front-end packages

Goto the todo-app in the front folder with terminal or cmd. Then run

```sh
yarn
```

It'll install all packages that are required for front project

### Run front-end project

After installing all packages then run

```sh
yarn start
```

It'll start our client. If you've have any problem with installing the packages because of eslint error then simply update the node version of your machine. Simply run this command on your terminal

```sh
sudo n latest
```

It'll download and install the latest version of node or if you're are a windows user then download the latest version of node and install it.

If everything goes fine you can see on your back-end terminal or console a `user is connected`!

# Explanation of how it works

On the front end side I've created three users. They are `sam`, `walter` & `rachel`. I put some pre-defined todos while initializing the database. So when you use any of the `username` and hit `enter` you can see a list of pre-defined todos on the right-side. You can simply add ones from the form on the right-side. So when you add a new todo and hit enter it'll update on two or multiple windows on real-time. For this real-time implementation I've used socket.io. When the connection is established, I set some listeners on back-end. So when I emit from the front-end, I check on the back-end if something with same message emitted or not. Depending on the message I decide whether I've to add a new one or delete an old one. Then simple add or delete it from the database. If database operation is successful the I again put an emit which I listen from the from the front-end and depending on the message I dispatch action to the store. The reducer gets updated which in turn updates props and state, finally, re-renders the View.

I've also created an endpoint which will return the list of users with related information. I've created the api endpoint with `nodejs`. The endpoint is http://localhost:3001/api/users. Try to apply simple MVC concept there. In the front-end side I've add a button to retrieve the list of users. Hope this will help!

Thank you!
