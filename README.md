coolamber
=========
Introduction
------------
coolamber is an Multi-Micro Application container that enables rapid development and deployment of loosely coupled web applications.  
It is based on Inversion Of Control (IoC) principles but does not intentionally follow any previous implementation dogmatically. 

It is implemented in javascript and runs on [node.js](http://nodejs.org/) and a large portion of the lower level code is provided by [flatiron from nodejitsu](https://github.com/nodejitsu/)

A coolamber container is a reference implementation of how to integrate the new breed of single page applications (SPA) into a cohesive orchestration of application services.  

We believe the design maintains the flexibility and managability inherent in SPAs while providing the benefit of sharing certain cross cutting concerns to improve the development and deployment story. 

Application Layout
------------------
From a general application architecture perspective coolamber provides the following infrastructure: 

- Remote, Managed and Static Application Hosting
- Application Partitioning For Managability
- Authentication
- Authorisation 
- Logging
- Restful Service Hosting 
- Persistance Strategy

These pieces are designed to be swappable and none are mandated. 
We see them laid out in the following manor:

![System Design](http://i.imgur.com/RW6Ol.jpg)

Get Started
-----------
###Check out the project
```
$ git clone git@github.com:No9/coolamber.git
$ cd coolamber 
```
###Run
```
$ node app.js
```
###Browse 
In the your favourite web browser go to [localhost:8080](http://localhost:8080)
You will find a tutorial on that page. 