# Reddit Clone

Welcome to the repository for my Reddit clone.

## Overview

As part of my on-going training for Codecademy's full stack engineering program, this is my solution to the portfolio project focussing on React and Redux state management.

The suggested project was to work with the Reddit API to create a fully functional frontend PWA using Redux and Redux Toolkit to manage the fetching and serving of Reddit data using the undocumented API which does not require user authentication. 

### Features

On loading the Home page begins by making a fetch request to the store for the current posts feed which is then served to the display in the JSX.
A list of subReddits is retreived from the stroe and populates the subreddits sidebar.
On smaller screen sizes, the sidebar is hidden and accessible via a burger menu that appears next the logo.

* Users can search for topics using the search bar in the header.
* Posts can be up or down voted.
* Comments for each post can be viewed by clicking the comments button, which calls the store and fetches the comments associated with that post. 
* The light/dark theme can be changed by clicking the toggle button in the header and in the mobile menu at smaller screens.
* User and author Avatars are automatically generated to avoid reliance on third party avatar api. 
* A logo click resets the app. 

### Tech Stack

* React
* Redux
* Redux Toolkit
* React Icons
* Styled Components
* Framer Motion

### Future Enhancements

I plan to expand on this project in the future to make it full-stack with an express server handling the api and implementing user sign in and authentication using oauth2 with the standard access_token flow provided by the official Reddit API. This would provide an excellent opportunity to further practice building full-stack application using best practices.
