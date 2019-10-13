
let generate = (err, message, status, data) => {
    let resp = {
        error: err,
        message: message,
        status: status,
        data: data
    }
    return resp;
}

module.exports = {
    generate: generate
}