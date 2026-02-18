/* Users Table */
DROP TABLE IF EXISTS userSettings;
CREATE TABLE userSettings (
    id UUID PRIMARY KEY,
    username VARCHAR (50),
    locationStatus SMALLINT NOT NULL,
    nowPlayingStatus SMALLINT NOT NULL,
    defaultPostStatus SMALLINT NOT NULL,

    FOREIGN KEY (id) REFERENCES auth.users ON DELETE CASCADE
);

/* Posts Table */
DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    postID BIGSERIAL PRIMARY KEY,
    userID UUID NOT NULL,
    time TIMESTAMP NOT NULL DEFAULT now(),

    songTitle VARCHAR(200) NOT NULL,
    artistName VARCHAR(200),

    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,

    comment TEXT,

    FOREIGN KEY (userID) REFERENCES auth.users ON DELETE CASCADE
);

/* Friends Table */
DROP TABLE IF EXISTS Friends;
CREATE TABLE Friends (
    userID1 UUID NOT NULL,
    userID2 UUID NOT NULL,

    PRIMARY KEY (userID1, userID2),
    FOREIGN KEY (userID1) REFERENCES auth.users ON DELETE CASCADE,
    FOREIGN KEY (userID2) REFERENCES auth.users ON DELETE CASCADE
);

/* Activity Table */
DROP TABLE IF EXISTS UserActivity;
CREATE TABLE UserActivity (
    userID UUID NOT NULL PRIMARY KEY,
    songID INT,
    location POINT,

    FOREIGN KEY (userID) REFERENCES auth.users ON DELETE CASCADE
);
