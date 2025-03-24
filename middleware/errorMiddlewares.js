class Errorhandle extends Error{
    constructor(message, statuscode){
        super(message);
        this.statuscode = statuscode
    }
}

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statuscode = err.statuscode || 500;

    // Handling duplicate field values in the database
    if (err.code === 11000) {
        const statuscode = 400;
        const message = "Duplicate field value entered";
        err = new Errorhandle(message, statuscode);
    }

    // Handling JWT errors
    if (err.name === "JsonWebTokenError") {
        const statuscode = 401;
        const message = "JSON Web Token is invalid! Try again.";
        err = new Errorhandle(message, statuscode);
    }

    if (err.name === "TokenExpiredError") {
        const statuscode = 401;
        const message = "JSON Web Token has expired! Try again.";
        err = new Errorhandle(message, statuscode);
    }

    // Handling invalid Mongoose ObjectId errors
    if (err.name === "CastError") {
        const statuscode = 400;
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new Errorhandle(message, statuscode);
    }

    // Handling validation errors
    const errorMessage = err.errors
        ? Object.values(err.errors).map(error => error.message).join(" ")
        : err.message;

    return res.status(err.statuscode).json({
        success: false,
        message: errorMessage
    });



}

module.exports = {Errorhandle, errorMiddleware}