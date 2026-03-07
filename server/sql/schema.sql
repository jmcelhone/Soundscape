/* Users Table */
DROP TABLE IF EXISTS userNames;
CREATE TABLE userNames (
    id UUID PRIMARY KEY,
    username VARCHAR (50) NOT NULL,

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
