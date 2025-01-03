**Overview**
The Travel Heatmap project is a web application designed to visualize Google Location History into an interactive heat map making it easy for users to see patterns and analyze personal travel data over time.
This project allows users to upload their Google Location History JSON file and view a heatmap visualization of their data. 
Technologies Used
**Frontend:** React with TypeScript
**Backend:** Spring Boot
**Database:** MongoDB

**Features**
**Frontend**
**Data Upload:** 
Users can easily upload their Google Location History JSON file obtained from their Google account.
**Heatmap Visualization:** 
Displays a heatmap showcasing the user's visited locations over time.
**Interactive Map:** 
Includes zoom and pan features for exploring the map in detail.
Integration with APIs for fetching and displaying map data.

**Backend**
RESTful API for handling user data and heatmap data.
Data storage and retrieval using MongoDB.
**Backend Project Link**
https://github.com/lavanyasoundar17/Heatmap-BE

**Prerequisites**
Node.js (v16 or later)
npm or yarn

**Installation**
1. Clone the repository
2. Install dependencies:
   
npm install
or
yarn install

4. Start the development server:
   
npm start
or
yarn start

**Environment Variables**
Create a .env file in the root directory and add the following variables:
REACT_APP_MAP_API_KEY=<Your Map API Key>


