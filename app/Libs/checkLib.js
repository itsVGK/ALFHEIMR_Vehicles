'use strict'

let isEmpty = (value) => {
    if (value == null || value == undefined || value == '' || value == []) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isEmpty: isEmpty
}