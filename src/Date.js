if (typeof Date.prototype.clone == 'undefined') {
    Date.prototype.clone = function() {
        return new Date(this.getTime());
    };    
}

// Predictably this is significantly faster than using strftime and
// comparing the string representation of two dates in YYYY-MM-DD format
Date.prototype.sameDayAs = function(d) {
    return this.getFullYear() == d.getFullYear() &&
           this.getMonth() == d.getMonth() &&
           this.getDate() == d.getDate();
};

Date.prototype.set = function(obj) {
    for (var key in obj) {
        method = key.charAt(0).toUpperCase() + key.slice(1); // titlecase
        if (this['set' + method]) {
            this['set' + method](obj[key]);
        }
    }
    return this;
};

Date.prototype.ymd = function(){
    return isoDate(this);
};

// Given a date returns it formatted as YYYY-MM-DD
function isoDate(date) {
    // Ensure that object is a date
    if (date.constructor != Date) {
        console.warn("Invalid date", date);
        throw "Invalid date!";
    }
    return date.getFullYear() + '-' +
        zeroPad(date.getMonth() + 1, 2) +
        '-' + zeroPad(date.getDate(), 2);
}

// Returns a given date formatted at HH:MM:SS
function hms(date) {
    return zeroPad(date.getHours(), 2) + ':' +
        zeroPad(date.getMinutes(), 2) + ':' +
        zeroPad(date.getSeconds(), 2);
}

// Pad a number with leading zeros until it is digits long
function zeroPad(n, digits) {
    n += ''; // Cast to string
    while (n.length < digits) {
        n = '0' + n;
    }
    return n;
}

// Returns a given date formatted at HH:MM:SS
Date.prototype.hms = function() {
    return hms(this);
};

// Returns a given date formatted at YYYY-MM
Date.prototype.ym = function() {
    return this.getFullYear() + '-' + zeroPad(this.getMonth() + 1, 2);
};

// Returns a given date formatted at Month Year
Date.prototype.monthYear = function() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this.getMonth()] + ' ' + this.getFullYear();
};