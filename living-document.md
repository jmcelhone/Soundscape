# Team 11 - Soundscape

## Team Information

### Team Members
- Christopher Calderon
- Tiffany Chang
- Jeremy McElhone
- Leonidas Sallos
- 
- **GitHub repository:** https://github.com/jmcelhone/SoundScape

### Communication
Discord and Text Messages

---

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

---

## Use Cases

### UC-1: Create Music Moment Post (CRUD)

**Actors:** User registered with Soundscape

**Triggers:** Selecting a post, select "Create Post", select "Edit Post", select "Delete Post"

**Preconditions:**
- User is logged in
- User can create post
- Spotify is linked to account or ability to manually song search

**Postconditions:**
- New post is created and stored in database
- Post can be viewed on map by other users or friends
- Selected song is audible

**Success Scenario Steps:**
1. User clicks "Create Post"
2. System prompts user to select song
3. User manual searches or selects song from Spotify
4. System requests location input
5. Location selected through GPS or manual input
6. User has option to add comment
7. Click "Submit" to submit post
8. System validates input
9. System stores post in database (song metadata, location coordinates, timestamp, and comment)
10. System updates feed/map markers for other users and friends
11. Users can click on post in map to view details
12. System allows original poster to click "Update" and "Delete" when viewing their post
13. Selecting "Update" allows user to update song, location, or comment
14. Selecting "Delete" allows user to delete post from system

**Extensions/Variations:**
- If GPS unavailable, allows manual pin drop
- If Spotify not linked, allows manual song entry
- If no comment written, stores with empty comment field

**Exceptions:**
- If no song is selected → Error displays requiring submission
- If no location selected → Error displays requiring submission
- Database write failure → Error displays and post is not created

### UC-2: Friend System (Add/Remove)

**Actors:** Users of Soundscape

**Triggers:** Navigating to Add a Friend page from navigation bar, entering a friends username, and selecting add friend

**Preconditions:** User logged in and is on the friend page

**Postconditions:** User is friends with another user and can see their most recent song post on their map

**Success Scenario Steps:**
1. User clicks Add a Friend
2. User is prompted to enter friends username
3. User selects clicks Add Friend
4. System stores this new relationship in the database
5. User clicks back to map page
6. If their friend has made a post, it will display on their map

**Extensions/Variations:**
- If user is logged in through Spotify, allow users to add friends from their Spotify friends if available

**Exceptions:**
- If entered username is invalid, user will be alerted and no information is written to the database

### UC-3: View Posts on Map (Location Services)

**Actors:** Soundscape User

**Triggers:** User navigates to the map page from the main navigation bar and selects different posts on map.

**Preconditions:**
- User is logged in
- User is using the application in the main menu
- Location services are enabled on the user's device and the application has permission to access the user's location.

**Postconditions:** The user is viewing the map post centered on its location with all post information available.

**Success Scenario Steps:**
1. User clicks on the Map option in the main navigation bar
2. System loads map centered on user's current location with nearby posts displayed as markers
3. User selects a post marker on the map
4. The application displays the full post details including audio content, description, and location information.

**Extensions/Variations:**
- If location services unavailable, map centers on default location with manual search option
- If user applies filters, only matching posts are displayed on map

**Exceptions:**
- If location permissions denied, error displays prompting user to enable location services

### UC-4: Link to Spotify Account

**Actors:** Users registering with soundscape.

**Triggers:** Users entering the sign in page.

**Preconditions:** User is not logged in and navigated to the site.

**Postconditions:** User is logged into the site with their Spotify account.

**Success Scenario Steps:**
1. User clicks sign in
2. User is navigated to Spotify to sign in with their account/auth
3. User is prompted to give permissions to Soundscape from their Spotify account
4. User is directed back to Soundscape and is logged in

**Extensions/Variations:**
- The user has to create a new spotify account if they do not already have one

**Exceptions:**
- The user doesn't grant Soundscape with proper permissions from their Spotify account, so the user would not be able to user soundscape features
- The Spotify API breaks, and the user is unable to connect their Spotify account
- Spotify is not available in the user's region, and does not have an account with them

---

## Non-Functional Requirements

### NFR-1: Error Handling & Input Validation
Display error messages upon any error, and never crash due to user input

### NFR-2: Privacy & Security
Protect sensitive data so that only posts made public by the user are seen by all users

### NFR-3: Performance & Scalability
Soundscape shall load the map location feed in under 3 seconds for a user with up to 100 friends.
- Utilize indexing: user_id, friend_id, timestamp

### NFR-4: Reliability
To preserve functionality, if Spotify is not functioning, Soundscape will allow users to create posts through manual song search. (i.e. YouTube, Shazam)

---

## External Requirements

### ER-1: Robust Error Handling
The product must be robust against errors that can reasonably be expected to occur, such as invalid user input. The product will be robust against errors by providing the user a straightforward user experience with limited actions, invalid login attempts will be rejected and user cannot access other services

### ER-2: Accessible by User
The product must be installable by a user, or if the product is a web-based service, the server must have a public URL that others can use to access it. If the product is a stand-alone application, you are expected to provide a reasonable means for others to easily download, install, and run it. Our product will have a public URL to access our website

### ER-3: Buildable from Source
The software (all parts, including clients and servers) should be buildable from source by others. If your project is a web-based server, you will need to provide instructions for someone else setting up a new server. Your system should be well documented to enable new developers to make enhancements. We will have a public repo containing all source code and build instructions in our documentation as well as well documented code

### ER-4: Project Scope
The scope of the project must match the resources (number of team members) assigned. The scope of our project was designed for four members in mind

---

## Technical Approach

We will implement an architecture using a React/Typescript frontend, Node.js/Express backend, and Supabase for the database and authentication. The frontend will use Leaflet as a library for map interactivity. The backend will coordinate with the Spotify API for music coordination. Supabase will store users, friendships, posts, and other relevant user data.

---

## Risks

The most serious risk is integrating with a third-party music service API since external APIs can introduce complexity and unpredictable behavior. To mitigate this risk, we will have to work on authentication early in the project timeline. It will also be necessary to have a fallback plan that doesn't use third party API and allows the user to manually search and select a song to listen to.

---

## Team Roles

- **Christopher:** Designing backend for database and React frontend integration.
- **Leo:** Designing backend for user authentication and React frontend integration.
- **Tiffany:** Designing React frontend for general UX and user authentication and user posts.
- **Jeremy:** Designing React frontend for general UX and map page and user/song discoverability.

---

## Timeline

### Week 1: Planning & Repo Setup
- GitHub repo structure with included README
- Schema drafted (users, friends, posts)

### Week 2: Planning technical approach and developing team roles

### Week 3: Database design, authentication in, home page
- Register/login/logout working
- Password security implemented
- Database correctly stores user information

### Week 4: Start implementing integration with spotify, prototype map page
- Connect to Spotify works
- Track selection works
- Tokenization of song stores in server
- Map renders users with leaflet
- Markers shows most recent posts
- Clicking marker shows post details

### Week 5: Database integration, CRUD for posts
- Creating posts works for manual song entry
- Location selected by user or GPS
- Posts are stored in database and retrievable

### Week 6: Friend system working
- Search for friend request works
- Friend add/remove works
- Friend list properly stored and populated from database

### Week 7: Planning deployment and CI/CD

### Week 8: Stretch goals & product testing

### Week 9: Final testing and deployment

---

## Major Features
- User authentication and profile management
- Friend system
- Create a post
- Music provider integration (i.e. Spotify)
- View friend's most recent post on a map with clickable markers

### Stretch Goals
- Post history on timeline
- Commenting system

---

## Milestone 3

## Software Architecture

### 1.1 Architecture Pattern and Overview
Uses a Client-Server web architecture with layered separation:
- **Client (React):** user interface and map rendering
- **Server (Node.js/Express):** API, input validation, authorization
- **Data (Supabase):** Stores users, friendships and posts. Handles authentication

### 1.2 Major Components and Responsibilities

#### React Web Client
- **Pages:** Login, Map, Create Post, Friends
- Shows posts on a map using Leaflet
- Sends API requests to backend and displays responses or errors
- UI validation

#### Node.js/Express Backend
- Contains data for posts, feed, and friends
- Validates inputs such as missing fields or coordinates
- Privacy rules (friends-only posts)
- Verify user identity (Supabase)

#### Supabase
- **Authentication:** sign up, sign in, session token
- **Postgres database:** stores profiles, friends, posts

#### Optional Spotify
- Backend uses Spotify API for track search and selection

### 1.3 Interfaces Between Components

#### Frontend to Backend
- **Protocol:** HTTPS
- **Format:** JSON
- **Authorization**

#### Backend to Supabase
- Uses Supabase server client to read/write Postgres tables
- Backend checks authorization before returning data

#### Backend to Spotify
- HTTPS requests to Spotify API
- Tokens stored server-side

### 1.4 Data Storage and High-Level Database Schema

All data will be stored in Supabase PostgresSQL database. Tables will be used to support the core features.

#### User Tables
Stores the information about each user:
- User ID
- Username
- Account creation date

#### Friends Table
Stores which users are connected as friends:
- ID of the first user
- ID of the friend user
- Date friendship was created

Each row of the table represents the connection between two users to allow the system to determine which user can see what posts.

#### Posts Table
Stores all music moment posts created by users:
- ID of the user who created the post
- Song title
- Artist name
- Comment
- Location coordinates
- Timestamp

Each post will be linked to the user who created it.

The map feed will retrieve the most recent posts from the back end and display posts from each of the user's friends to display them as markers on the map.

### 1.5 Architectural Assumptions
- Soundscape is a web app
- Posts are friends-only
- (Optional) Location permissions
- Manual song entry is MVP, Spotify is stretch goal
- Backend is source for validation and access rules

### 1.6 Architecture Decisions and Alternatives

#### Decision 1: Use backend API between frontend and Supabase
- **Chosen:** React → Node/Express → Supabase
- **Alternative:** React talks directly to Supabase
  - Pros: Faster prototype as there are fewer backend endpoints
  - Cons: More security risk

#### Decision 2: Use single Node/Express service
- **Chosen:** One backend service for all endpoints
- **Alternative:** Microservices that separates services for posts, friends, feed
  - Pros: Independent deployment per service
  - Cons: Too complex

---

## Software Design

### 2.1 React Frontend Design (TypeScript)

#### Pages
- `loginpage.tsx` – sign in/sing up UI
- `mapfeedpage.tsx` – map and markers
- `createpost.tsx` – post form, location picker, submit
- `friendspage.tsx` – add/remove friends

#### Components
- `mapview.tsx` – leaflet, renders markers
- `postmodal.tsx` – shows post details when marker is hovered or clicked
- `locationpicker.tsx` – gets current location or pin drop

#### Services
- `apiclient.ts` – handles JSON, errors
- `postapi.ts` – functions for create post and feed
- `friendapi.ts` – functions for add/remove and lists friends

#### Types
- Type definitions (posts, profile, friend)

**Responsibilities:**
- Pages manage workflows and what is seen on a screen
- Components are UI pieces
- Services for network logic

### 2.2 Node/Express Backend (TypeScript)

#### Planned Structure (source files and directories)
- `server.ts` – creates express app and registers middleware
- **Routes** – posts, friends, feed
- **Controllers** – posts, friends, feed
- **Services** – posts, friends, feed
- **Middleware** – validate Supabase JWT, and validates what is requests in required fields (i.e. post form, user login/signup)
- **db** – initializes server-side Supabase client, contains DB query helpers

**Responsibilities:**
- Routes endpoints and attach middleware
- Controllers parse requests and call services
- Services validates inputs, enforce authorization rules, and database query helpers
- Middleware handles authentication and error responses

### 2.3 Endpoint Definitions

#### Friends
- **POST**
  - Input: Username
  - Output: friendship created
- **GET**
  - Output: list friends
- **DELETE**
  - Output: deletion success or error

#### Posts
- **POST**
  - Input: song title, artist, comment, location
  - Output: post created
- **DELETE**
  - Only authorized user can delete post

#### Feed
- **GET**
  - Lists the friends most recent posts with details

### 2.4 Key Authorization Rules
- User can create and delete their own posts
- User can only view posts of other users they are friends with
- Output error if else.

---

## Guidelines

TypeScript Style Guide: https://ts.dev/style

---

## Risk Assessment

### 1. Unforeseen circumstances limiting a team member's ability to complete work
- **Likelihood:** Medium
- **Impact:** High
- **Evidence for Estimate:** As students, every team member's schedule can be unpredictable and as a relatively small team, if one member has a situation that prevents them from completing their tasks, that can significantly delay our project timeline.
- **Steps to Mitigate:** Provide sufficient time to complete tasks accommodating for unforeseen circumstances.
- **Plan for Detection:** Communicate early with the team if something that could impact deliverables comes up.
- **Plan for Mitigation:** Redelegate tasks as soon as the risk is detected until the team member can return to working normally.

### 2. Unrealistic Scope
- **Likelihood:** Medium
- **Impact:** Medium
- **Evidence for Estimate:** Given the very limited time frame, it may be hard to complete everything we had planned for and want to accomplish
- **Steps to Mitigate:** Plan actionable tasks for every week, breaking down features into easier to manage sub tasks
- **Plan for Detection:** Continually monitor the timing features are completed and discuss as a group during sprint meetings if any specific features feel out of scope for the class
- **Plan for Mitigation:** Reduce the scope to include core features that still produce the minimum viable product we had in mind

### 3. Underestimation of task complexity
- **Likelihood:** Medium
- **Impact:** High
- **Evidence for Estimate:** We are all working with technologies that are new to us and there might be technical complications in picking up a new tool which makes the time a task takes hard to estimate.
- **Steps to Mitigate:** Provide sufficient buffer time for team members to pick up new technologies and break apart tasks into clearly defined steps.
- **Plan for Detection:** Weekly sprint meetings to identify if a team member is struggling with any specific task.
- **Plan for Mitigation:** Seek help from team members and team of instructors for help with a specific task and take time to adjust our timeline accordingly.

### 4. Unforeseen costs during development
- **Likelihood:** Low
- **Impact:** High
- **Evidence for Estimate:** For the purposes of this class, our project has been designed to utilize free resources and software over the course of development. However, there is a non-zero chance that some softwares might be paywalled or carry costs outside of our budget which can impact our development.
- **Steps to Mitigate:** Thoroughly research our tech stack before we move to the development phase and identify alternatives if needed.
- **Plan for Detection:** We can bring up any budgetary concerns faced during weekly sprint meetings.
- **Plan for Mitigation:** Switch to an alternative software/resource and update documentation

### 5. Changing requirements
- **Likelihood:** Low
- **Impact:** High
- **Evidence for Estimate:** The project's requirements were mainly defined by the developer team so the chances of changing requirements in the middle of development is low. However, the instructors of the class will be serving as a pseudo-client and there may be technical issues during development that might force us to reconsider our requirements.
- **Steps to Mitigate:** Focus on having clearly defined requirements before development and come up with comprehensive use cases that have been approved by the client.
- **Plan for Detection:** Weekly meetings with our client (the instructors) to review our progress and if requirements need to be changed.
- **Plan for Mitigation:** Collaborate with the team to restructure our timeline to integrate feedback and delegate new tasks.

---

## Project Schedule

### Weeks 2/3: Group Formation and Project Subject Brainstorming/Decision
- Establish communication
- Decide on a project idea
- Create use cases and requirements for the idea

### Weeks 4/5: Planning and Design
- Decide system architecture of the project
- Create the software design for the project
- Create documentation plan
- Plan schedule and assess possible risks for the project

### Week 6: Database and Page Design, Spotify Authentication Implementation
- Create database schema for all scheduled features (including stretch goals)
- Make visual mockups of the website pages
- Create authentication with the Spotify API

### Week 7: Map API/Database CRUD Implementation, Authentication Testing/Patching
- Create user-facing system for doing CRUD operations with the database
- Add the map API to the website
- Test for and patch flaws in the Spotify API authentication system

### Week 8: Friends System Implementation and Testing, Map/CRUD Testing/Patching, Beta Release
- Create user-facing friends system, and test/patch for flaws
- Test for and patch flaws with the map API implementation
- Test for and patch flaws with the database CRUD interactions
- Create beta release
- Implement post timeline and commenting stretch goals if time allows

### Week 9: Finalize Website Styling, Final Testing/Patching
- Add any additional finishing touches with the website styling
- Patch any bugs found in the beta release
- Further improve testing suite, and patch any new found bugs
- Test for and patch flaws in stretch goal features is applicable

### Week 10: Final Release
- Prepare for final presentation and Final Release

---

## Team Structure

- **Christopher:** Designing backend for database and React frontend integration.
- **Leo:** Designing backend for user authentication and React frontend integration.
- **Tiffany:** Designing React frontend for general UX and user authentication and user posts.
- **Jeremy:** Designing React frontend for general UX and map page and user/song discoverability.

---

## Test Plan & Bug Tracking

### Unit Testing

**What we're testing:**
- Authentication functions
- Post Creation validation
- Database query
- Pulling song data with Spotify API wrapper function

**How we're testing:**
- **Testing framework:** Jest and React Testing Library for frontend, Jest for backend. Mock API calls. Edge cases for validation (empty fields, invalid GPS, long text, rate limits).
- **Approach:** Isolated tests
- **Coverage goals:** 80% code coverage on frontend and backend minimum.
- **Why:** Testing authorization makes sure only the right people can access the system. Testing posts stops malicious or invalid data from being saved. Testing the Spotify wrapper functions reduce risk from our biggest potential problem point. 80% code coverage is a reasonable threshold that balances time with certainty.

### Integration/System Testing

**What we're testing:**
- Frontend to Backend API calls
- Backend to Supabase database
- Spotify API integration
- **[End-to-end scenario 1]** User creates post from song selection through database storage and map display
- **[End-to-end scenario 2]** User sees other's posts appear on map

**How we're testing:**
- **Tools:** Cypress
- **Approach:** Automated browser tests simulate user interactions and test correct outcomes.
- **Test environment:** Separate testing database in Supabase, test Spotify API credentials, local development servers
- **Why:** These integration tests cover our main use cases. Testing the Spotify integration addresses our biggest identified risk. Testing post creation and map-view ensures the main user experience works end-to-end.

### Usability Testing

**What we're testing:**
- Ease of creating first post
- Map navigation
- Error message clarity

**How we're testing:**
- **Approach:** Ask participants to complete specific tasks and measure time and success rate.
- **Participants:** Family, and classmates
- **Metrics:** Task completion rate and time to complete tasks
- **Why:** These cover the features users will interact with most frequently and might cause confusion. Creating posts, navigating the map, and error messaging is critical since we rely on GPS and APIs that can fail.

### Bug Tracking

We use GitHub Issues to track all bugs discovered during development and testing.

**Process:**
- **When a bug is found:** Create GitHub issue with steps to reproduce, expected vs actual behavior, and screenshots when relevant.
- **Issue labels:** bug, enhancement, documentation
- **Assignment:** Team member who finds the bug can fix the bug or assign it to a relevant team member.
- **Resolution:** After fixing, the original reporter verifies the bug is resolved through relevant testing and closes the issue.

**Issue Tracker:** https://github.com/jmcelhone/Soundscape/issues
