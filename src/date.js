(function(F){
    
    // Private functions
    // Pad a number with leading zeros until it is digits long
    var zeroPad = function(n, digits) {
        n += ''; // Cast to string
        while (n.length < digits) {
            n = '0' + n;
        }
        return n;
    };
    
    
    // Public methods
    F.clone = function(date){
        return new Date(date.getTime());
    };
    
    
    F.sameDate = function(date1, date2){
        return date1.getFullYear() == date2.getFullYear() &&
               date1.getMonth() == date2.getMonth() &&
               date1.getDate() == date2.getDate();
    };
    // prototype name: sameAs, sameDateAs
    
    
    // Set multiple properties of a date object at once
    // For example:
    //   var d = new Date();
    //   d.set{hours: 8, minutes: 30, seconds: 0};
    F.set = function(date, obj) {
        for (var key in obj) {
            var method = key.charAt(0).toUpperCase() + key.slice(1); // titlecase
            if (date['set' + method]) {
                date['set' + method](obj[key]);
            }
        }
        return date;
    };
    
    
    // Given a date returns it formatted as YYYY-MM-DD
    F.isoDate = function(date) {
        return date.getFullYear() + '-' +
            zeroPad(date.getMonth() + 1, 2) +
            '-' + zeroPad(date.getDate(), 2);
    };
    
    
    // Returns the time component of a date formatted as HH:MM:SS
    F.hms = function(date) {
        return zeroPad(date.getHours(), 2) + ':' +
            zeroPad(date.getMinutes(), 2) + ':' +
            zeroPad(date.getSeconds(), 2);
    };
    
})(fecha);