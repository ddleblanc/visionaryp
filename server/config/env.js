var secret = ('remember remember the 5th of november');

var env = {
    webPort: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'fitauth',
    my_client_id: '251210023e7b4faeaf89510367474c41',
    my_redirect_uri: 'http://localhost:3000/spotify/spotify_redirect/',
    my_client_secret: '7036fa3b1fdf4e0184c671f975036fb4'
}

var dburl = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase

module.exports = {
    env: env,
    dburl: dburl,
    secret: secret
};


// SPOTIFY_API_ID="251210023e7b4faeaf89510367474c41"
// SPOTIFY_CLIENT_SECRET="7036fa3b1fdf4e0184c671f975036fb4" 
// CALLBACK_URL="http://localhost:3000/callback"
// REDIRECT_URL="http://localhost:4200/nowplaying-spotify"