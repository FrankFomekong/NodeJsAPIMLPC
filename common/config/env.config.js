module.exports = {
    "port": 3600,
    imgBucket: "photos",
    "url":"mongodb+srv://Borel:bonjour5gi@cluster0.msz0w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "db":"mongodb+srv://Borel:bonjour5gi@cluster0.msz0w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "appEndpoint": "http://localhost:3600",
    "apiEndpoint": "http://localhost:3600",
    "jwt_secret": "myS33!!creeeT",
    database: "myFirstDatabase",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    }
};
