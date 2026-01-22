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
Soundscape is a music-sharing social platform that allows users to post what they are listening to along with the associated location and optional comment. Soundscape creates a map-based feed of music sharing personal moments. This enables users to discover music through friend’s real world experiences. Users will be able to link music provider apps, such as Spotify, to their Soundscape account in order to create posts with a song they are listening to, their location, and a description. Soundscape combines music-sharing, location posting, and social interaction into a personal and engaging experience.

### Goal
Our application provides an interactive way to discover what friends are listening to in order to spark conversations about music.

### Current Practice
There are some applications that allow you to share live updates of what a user is listening to to their list of friends such as Spotify’s Friend Activity feature and apps like Airbuds that allow users to share their listening activity by authenticating with an external music app. However, these approaches focus on live updates and don’t allow users to share comments, locations, or other information associated with their listening habits. As for the location functionality, existing approaches like Find my Friends and Life360 allow for users to share their live location but don’t provide the opportunity to share more information or keep a history of their location.

### Novelty
By allowing users to choose when they want to post their location alongside a song, our application combines features of two different kinds of software for a novel music-sharing social platform. Users will be able to see their friends’ posts on a map with a song they were listening to, optionally accompanied with a comment, which provides an interactive way to see where people are throughout the day and what kind of music they associate with certain locations. Users can also be more selective about what listening and location history they choose to share with their friends through a posting based system, as opposed to preexisting technologies that only show a user’s most up to date location/listening history.

### Effects
Soundscape will allow customers interested in music to share their experiences in connection to their location. This will tie a unique blend of musical discovery with urban and geographical exploration. Users can travel to different locations and enjoy the locals' tastes and trends by neighborhood, district, and city. It will even allow artists to gain insight into where their music connects with new listeners.

### Use Cases
1. Create Music Moment Post (CRUD)
    - Actors: User registered with Soundscape 
    - Triggers: Selecting a post, select “Create Post”, select “Edit Post”, select “Delete Post”
    - Preconditions:
        - User is logged in
        - User can create post
        - Spotify is linked to account or ability to manually song search
    - Postconditions:
        - New post is created and stored in database
        - Post can be viewed on map by other users or friends
        - Selected song is audible
    - Success Scenario Steps:
        - User clicks “Create Post”
        - System prompts user to select song
        - User manual searches or selects song from Spotify
        - System requests location input
        - Location selected through GPS or manual input
        - User has option to add comment
        - Click “Submit” to submit post
        - System validates input
        - System stores post in database (song metadata, location coordinates, timestamp, and comment)
        - System updates feed/map markers for other users and friends
        - Users can click on post in map to view details
        - System allows original poster to click “Update” and “Delete” when viewing their post
        - Selecting “Update” allows user to update song, location, or comment
        - Selecting “Delete” allows user to delete post from system
    - Extensions/variations:
        - If GPS unavailable, allows manual pin drop
        - If Spotify not linked, allows manual song entry
        - If no comment written, stores with empty comment field
    - Exceptions:
        - If no song is selected > Error displays requiring submission
        - If no location selected > Error displays requiring submission
        - Database write failure > Error displays and post is not created
2. Friend System (Add/Remove)
    - Actors: Users of Soundscape
    - Triggers: Navigating to Add a Friend page from navigation bar, entering a friends username, and selecting add friend
    - Preconditions: User logged in and is on the friend page
    - Postconditions: User is friends with another user and can see their most recent song post on their map
    - Success Scenario Steps:
        - User clicks Add a Friend
        - User is prompted to enter friends username
        - User selects clicks Add Friend
        - System stores this new relationship in the database
        - User clicks back to map page
        - If their friend has made a post, it will display on their map
    - Extensions/variations:
        - If user is logged in through Spotify, allow users to add friends from their Spotify friends if available
    - Exceptions:
        - If entered username is invalid, user will be alerted and no information is written to the database
3. View Posts on Map (Location Services)
    - Actors: Soundscape User
    - Triggers: User navigates to the map page from the main navigation bar and selects different posts on map.
    - Preconditions:
        - User is logged in
        - User is using the application in the main menu
        - Location services are enabled on the user's device and the application has permission to access the user's location.
    - Postconditions: The user is viewing the map post centered on its location with all post information available.
    - Success Scenario Steps:
        - User clicks on the Map option in the main navigation bar
        - System loads map centered on user's current location with nearby posts displayed as markers
        - User selects a post marker on the map
        - The application displays the full post details including audio content, description, and location information.
    - Extensions/variations:
        - If location services unavailable, map centers on default location with manual search option
        - If user applies filters, only matching posts are displayed on map
    - Exceptions:
        - If location permissions denied, error displays prompting user to enable location services
4. Link to Spotify Account
    - Actors: Users registering with soundscape.
    - Triggers: Users entering the sign in page.
    - Preconditions: User is not logged in and navigated to the site.
    - Postconditions: User is logged into the site with their Spotify account.
    - Success Scenario Steps:
        - User clicks sign in
        - User is navigated to Spotify to sign in with their account/auth
        - User is prompted to give permissions to Soundscape from their Spotify account
        - User is directed back to Soundscape and is logged in
    - Extensions/variations:
        - The user has to create a new spotify account if they do not already have one
    - Exceptions:
        - The user doesn’t grant Soundscape with proper permissions from their Spotify account, so the user would not be able to user soundscape features
        - The Spotify API breaks, and the user is unable to connect their Spotify account
        - Spotify is not available in the user’s region, and does not have an account with them

### Non-Functional Requirements
1. Error Handling & Input Validation
    - Display error messages upon any error, and never crash due to user input
2. Privacy & Security
    - Protect sensitive data so that only posts made public by the user are seen by all users
3. Performance & Scalability
    - Soundscape shall load the map location feed in under 3 seconds for a user with up to 100 friends.
        - Utilize indexing: user_id, friend_id, timestamp
4. Reliability
    - To preserve functionality, if Spotify is not functioning, Soundscape will allow users to create posts through manual song search. (i.e. YouTube, Shazam)

### External Requirements

1. Robust Error Handling
    - The product must be robust against errors that can reasonably be expected to occur, such as invalid user input.
        - The product will be robust against errors by providing the user a straightforward user experience with limited actions, invalid login attempts will be rejected and user cannot access other services
2. Accessible by User
    - The product must be installable by a user, or if the product is a web-based service, the server must have a public URL that others can use to access it. If the product is a stand-alone application, you are expected to provide a reasonable means for others to easily download, install, and run it.
        - Our product will have a public URL to access our website
3. Buildable from Source
    - The software (all parts, including clients and servers) should be buildable from source by others. If your project is a web-based server, you will need to provide instructions for someone else setting up a new server. Your system should be well documented to enable new developers to make enhancements.
        - We will have a public repo containing all source code and build instructions in our documentation as well as well documented code
4. Project Scope
    - The scope of the project must match the resources (number of team members) assigned.
        - The scope of our project was designed for four members in mind

### Technical Approach
We will implement an architecture using a React/Typescript frontend, Node.js/Express backend, and Supabase for the database and authentication. The frontend will use Leaflet as a library for map interactivity. The backend will coordinate with the Spotify API for music coordination. Supabase will store users, friendships, posts, and other relevant user data.

### Risks
The most serious risk is integrating with a third-party music service API since external APIs can introduce complexity and unpredictable behavior. To mitigate this risk, we will have to work on authentication early in the project timeline. It will also be necessary to have a fallback plan that doesn’t use third party API and allows the user to manually search and select a song to listen to.

### Team Info
- Christopher: Designing backend for database and React frontend integration.
- Leo: Designing backend for user authentication and React frontend integration.
- Tiffany: Designing React frontend for general UX and user authentication and user posts.
- Jeremy: Designing React frontend for general UX and map page and user/song discoverability.

### Timeline
Week 1: Planning & Repo Setup
- GitHub repo structure with included README
- Schema drafted (users, friends, posts)
Week 2: Planning technical approach and developing team roles
Week 3: Database design, authentication in, home page
- Register/login/logout working
- Password security implemented
- Database correctly stores user information
Week 4:  Start implementing integration with spotify, prototype map page
- Connect to Spotify works
- Track selection works
- Tokenization of song stores in server
- Map renders users with leaflet
- Markers shows most recent posts
- Clicking marker shows post details
Week 5: Database integration, CRUD for posts
- Creating posts works for manual song entry
- Location selected by user or GPS
- Posts are stored in database and retrievable
Week 6: Friend system working
- Search for friend request works
- Friend add/remove works
- Friend list properly stored and populated from database
Week 7: Planning deployment and CI/CD
Week 8: Stretch goals & product testing
Week 9: Final testing and deployment

## Major Features
* User authentication and profile management
* Friend system
* Create a post with song, location
* Music provider integration 
* View friends' most recent posts on an interactive map with clickable markers

## Stretch Goals
* Post history on timeline
* Commenting system 
