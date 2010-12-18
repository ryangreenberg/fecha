var fecha = {};

(function(F){

    // Accepts a time in a variety of formats and returns it
    // as a Date object.
    // Invalid times return false
    F.parseTime = function(str) {
        // Adapted from John Resig's post at
        // http://stackoverflow.com/questions/141348#141504
        var d = new Date();
        if (!(time = str.match(/(\d+)(?::(\d\d))?\s*(p?)/))) {
            return false;
        } else {
            // time[1] => hour
            time[1] = parseInt(time[1], 10);
            time[2] = parseInt(time[2], 10) || 0;
            // Change 12am to 0
            if (time[1] == 12 && time[3] != 'p') {
                time[1] -= 12;
            }
            if (time[1] < 0 || time[1] > 23) {
                return false;
            }
            if (time[2] && (time[2] < 0 || time[2] > 59)) {
                return false;
            }
        }
        d.setHours( time[1] + (time[3]  && time[1] != 12 ? 12 : 0) );
        d.setMinutes( time[2] );
        d.setSeconds(0);
        return d;
    };


    F.validTime = function(str) {
      return F.parseTime !== false;
    };


    F.util = {
        methods: function(obj, fns) {
            for (var fn in fns) {
                obj.prototype[fn] = fns[fn];
            }
        }
    };
})(fecha);