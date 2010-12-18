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

    
    F.isDate = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Date]";
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
    //   fecha.set(d, {hours: 8, minutes: 30, seconds: 0});
    F.set = function(date, obj) {
        for (var key in obj) {
            var methodName = key.charAt(0).toUpperCase() + key.slice(1), // titlecase
                setter = 'set' + methodName;

            if (date[setter]) {
                date[setter](obj[key]);
            }
        }
        return date;
    };

    // Add relative values to properties of a date object at once
    // For example:
    //  var d = new date();
    //  fecha.add(d, {hours: -1, minutes: -30});
    F.add = function(date, obj) {
        for (var key in obj) {
            var methodName = key.charAt(0).toUpperCase() + key.slice(1), // titlecase
                setter = 'set' + methodName,
                getter = 'get' + methodName;

            if (date[setter]) {
                date[setter](date[getter]() + (obj[key] * 1));
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