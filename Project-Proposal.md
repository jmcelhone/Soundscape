# Soundscape

## Team Info
* **Team Members:**
  * Christopher Calderon
  * Tiffany Chang
  * Jeremy McElhone
  * Leonidas Sallos
* **Project Repository:** https://github.com/jmcelhone/Soundscape
* **Communication Channels:** Discord, text messages 

## Product Description

### Abstract
Soundscape is a music-sharing social platform that allows users to post what they are listening to along with the associated location and optional comment. Soundscape creates a map-based feed of music sharing personal moments. This enables users to discover music through friend's real world experiences. Users will be able to link music provider apps, such as Spotify, to their Soundscape account in order to create posts with a song they are listening to, their location, and a description. Soundscape combines music-sharing, location posting, and social interaction into a personal and engaging experience.

### Goal
Our application provides an interactive way to discover what friends are listening to in order to spark conversations about music.

### Current Practice
There are some applications that allow you to share live updates of what a user is listening to to their list of friends such as Spotify's Friend Activity feature and apps like Airbuds that allow users to share their listening activity by authenticating with an external music app. However, these approaches focus on live updates and don't allow users to share comments, locations, or other information associated with their listening habits. As for the location functionality, existing approaches like Find my Friends and Life360 allow for users to share their live location but don't provide the opportunity to share more information or keep a history of their location.

### Novelty
By allowing users to choose when they want to post their location alongside a song, our application combines features of two different kinds of software for a novel music-sharing social platform. Users will be able to see their friends' posts on a map with a song they were listening to, optionally accompanied with a comment, which provides an interactive way to see where people are throughout the day and what kind of music they associate with certain locations. Users can also be more selective about what listening and location history they choose to share with their friends through a posting based system, as opposed to preexisting technologies that only show a user's most up to date location/listening history.

### Effects
Soundscape will allow customers interested in music to share their experiences in connection to their location. This will tie a unique blend of musical discovery with urban and geographical exploration. Users can travel to different locations and enjoy the locals' tastes and trends by neighborhood, district, and city. It will even allow artists to gain insight into where their music connects with new listeners.

### Technical Approach
We will implement an architecture using a React/Typescript frontend, Node.js/Express backend, and a MySQL database. The frontend will use Leaflet as a library for map interactivity. The backend will coordinate with the Spotify API for music coordination. MySQL will store users, friendships, posts, and other relevant metadata.

### Risks
The most serious risk is integrating with a third-party music service API since external APIs can introduce complexity and unpredictable behavior. To mitigate this risk, we will have to work on authentication early in the project timeline. It will also be necessary to have a fallback plan that doesn't use third party API and allows the user to manually search and select a song to listen to.

## Major Features
* User authentication and profile management
* Friend system
* Create a post with song, location
* Music provider integration 
* View friends' most recent posts on an interactive map with clickable markers

## Stretch Goals
* Post history on timeline
* Commenting system 
