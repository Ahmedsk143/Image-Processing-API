# Image Processing API

# Overview

## It is an API that can be used in two different ways.

1.  As a simple placeholder API that allows you to place images into your frontend with the size set via URL parameters
2.  As a library to serve properly scaled versions of your images to the front end to reduce the page load size

# Getting started

-   To only build Typescript into Javascript

```bash
   npm run build
```

-   To get the server up and running

```bash
   npm run start
```

-   To build the project and then get the server up and running

```bash
   npm run serve
```

-   To build the project and then run the tests

```bash
   npm run test
```

# Available endpoints

## To get a full-resolution image

```
GET /api/images?filename=wolf
```

## To get a scaled image

```
GET /api/images?filename=wolf&width=400&height=500
```

# Additional Features

1. The thumbnail filename includes the image size to allow for multiple sizes of the same image.
2. Logging into the server terminal to record when images are processed or accessed.
3. A front-end for uploading more images to the full-size directory.
4. A front-end to display the thumbnail directory.
5. A front-end to select how to process a selected image.

# Built with

-   Nodejs

-   Express.js

-   Typescript

-   Jasmine
