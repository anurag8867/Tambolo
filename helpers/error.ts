const config = require("config");

export class ErrorHandler extends Error {
    private status: Number = 0;
    private msg: String = "";
    private location: any = null;
    constructor(status, msg, location) {
        super();
        this.status = status;
        this.msg = msg;
        this.location = location;
    }
}

export const handleError = (err, res) => {
    const { status, msg, location } = err;
    res.status(status || config.get('httpStatusCode.internalServerError')).json({
        msg, location, err
    });
};

// module.exports = {
//     error: ErrorHandler,
//     handleError
// }