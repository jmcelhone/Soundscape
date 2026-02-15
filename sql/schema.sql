/* Users Table */
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id SERIAL NOT NULL,
    username VARCHAR(36) NOT NULL,
    password VARCHAR(40) NOT NULL,
    creationDate TIMESTAMP NOT NULL,

    PRIMARY KEY (id)
);

/* Posts Table */
DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts (
    userID INT NOT NULL,
    time TIMESTAMP NOT NULL,
    songID INT,
    location POINT,
    comment JSON,

    PRIMARY KEY (userID, time),
    FOREIGN KEY (userID) REFERENCES Users ON DELETE CASCADE
);

/* Friends Table */
DROP TABLE IF EXISTS Friends;
CREATE TABLE Friends (
    userID1 INT NOT NULL,
    userID2 INT NOT NULL,

    PRIMARY KEY (userID1, userID2),
    FOREIGN KEY (userID1) REFERENCES Users ON DELETE CASCADE,
    FOREIGN KEY (userID2) REFERENCES Users ON DELETE CASCADE
);

/* Activity Table */
DROP TABLE IF EXISTS UserActivity;
CREATE TABLE UserActivity (
    userID INT NOT NULL,
    songID INT,
    location POINT,
    PrivacyStatus VARCHAR(16) NOT NULL,

    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES Users ON DELETE CASCADE
);
