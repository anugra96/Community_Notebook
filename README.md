# Spatial Community Notebook

Welcome to the Spatial Community Notebook. This project is a full stack application which allows for residents of a community voice their concerns on the map interface as feature points. The application is made of three components: the map, the feed and the note form. The app can be used by local government to survey residents, collect data, respond to service requests etc. 

The map component is a map on which each note submitted by residents is visualized as a point, geolocated to the user's current location or a relevant location of their choice. The feed component lists chronologically of all the notes that are submitted by residents. Users are able to use a filtering interface to filter through the feed by tag or location. Finally the note form component is where residents are able to input their note in a form, where they can tag their note with relevant tags such as "environment", "health", "social" etc).

## Live Demo

This is a version of the app that was used in the Borderline Project ([Urban Borderlines Research Lab – Research + Creation that uses the mapping and analysis of urban sound to generate critical dialogues around equality. (borderlineproject.ca)](https://borderlineproject.ca/))

LIVE DEMO : [candid-meringue-ae7485.netlify.app](https://candid-meringue-ae7485.netlify.app/)

## Features
- Fully Responsive - will work on all device sizes (phone, tablet, desktop)
- Note Feed with Filtering Functionality

## Technologies Used

- **Frontend**
    - ReactJS, Node
    - Mapbox GL JS
    - SCSS
- **Backend**
    - ExpressJS, Node
    - MongoDB
