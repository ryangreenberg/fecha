(function(F){

  // Like DateRange, but ignores actual date values
  F.TimeRange = function(a, b) {
      // Accepted format for time:
      // HH:MM:SS
      //
      // Accepted formats for ranges:
      // HH:MM:SS-HH:MM:SS
      // HH:MM:SS - HH:MM:SS
      // HH:MM:SS to HH:MM:SS

      // Individual times specified by string
      var hms = /^\d{2}:\d{2}:\d{2}$/;
      if (typeof a == 'string' && a.match(hms)) {
          a = new Date('1970/01/01 ' + a);
      }
      if (typeof b == 'string' && b.match(hms)) {
          b = new Date('1970/01/01 ' + b);
      }

      // Ranges specified by string
      if (typeof a == 'string') {
          if (typeof b == 'string') {
              a = this.formatTime(a);
              b = this.formatTime(b);
          } else {
              a = a.replace(/ - | to /, '-');
              var times = a.split('-');
              if (times.length != 2) {
                  throw new Error("TimeRange requires two times");
              }
              a = times[0].match(/^\d{2}:\d{2}:\d{2}$/) ? times[0] : this.formatTime(times[0]);
              b = times[1].match(/^\d{2}:\d{2}:\d{2}$/) ? times[1] : this.formatTime(times[1]);        
          }
          try {
              a = new Date('1970/01/01 ' + a);
              b = new Date('1970/01/01 ' + b);
          } catch(e) {
              throw Error("Invalid time format");
          }
      }

      // Check that a and b are dates
      if (a.constructor != Date || b.constructor != Date) {
          console.warn("Invalid date: ", a, b);
          throw new Error("Invalid date");
      }

      this.start = a.clone();
          this.start.setYear(new Date().getFullYear());
          this.start.setMonth(0);
          this.start.setDate(1);
      this.end = b.clone();
          this.end.setYear(new Date().getFullYear());
          this.end.setMonth(0);
          this.end.setDate(1);

      // If the specified end time is midnight, shift the end time back by
      // one second because times must be on the same day
      if (this.end.getHours() == 0 && this.end.getMinutes() == 0 && this.end.getSeconds() == 0) {
          this.end.setHours(23);
          this.end.setMinutes(59);
          this.end.setSeconds(59);
      }
    
      // Check validity of endpoints.
      // The end time should not be before the start time
      if (this.end < this.start) {
          throw new Error("Start time must be before end time");
      }

      this.toString = function() {
          return this.start.hms() + ' to ' + this.end.hms();
      };
  };
  
  
  // Returns true if the given time falls within this time range
  F.TimeRange.contains = function(time) {
      var t = time.clone();
          t.setYear(this.start.getFullYear());
          t.setMonth(this.start.getMonth());
          t.setDate(this.start.getDate());
       return this.start.getTime() <= t.getTime() &&
       this.end.getTime() >= t.getTime();
  };


  // Returns true if the given date range overlaps with this
  // time range. A date range overlaps with a time range if any
  // time on any of the days falls between the bounds of this
  // time range
  F.TimeRange.overlaps = function(dateRange) {
      // Shortcut: any date range that lasts for a full day will
      // overlap all possible time ranges (assuming that time ranges
      // cannot spill into a following day)
      // TODO There should be a better check for duration of a
      // complete day. This will be inaccurate when days are 
      // more than 86400 seconds (e.g. daylight sayings days)
      if (dateRange.duration() > 86400) {
          return true;
      }

      // Date ranges that are contained by a single day have a simpler
      // comparison because we can just check if the corresponding
      // time range overlaps with the 
      if (dateRange.singleDay === true) {
          var tr = dateRange.toTimeRange();
          var start = this.start.getTime(),
              end = this.end.getTime(),
              cmpStart = tr.start.getTime(),
              cmpEnd = tr.end.getTime();

          return ((start <= cmpStart && cmpStart <= end) ||
                  (start <= cmpStart && cmpStart <= end) ||
                  (cmpStart <= start && start <= cmpEnd));
      }

      if (dateRange.singleDay === false) {
          throw Error("Multi-day date ranges are not supported.");
      }
  };


  TimeRange.prototype.formatTime = function(time) {
      time = this.validTime(time);
      return time ? time.hms() : false;
  };


  // Static method aliases
  TimeRange.validTime = function(time) {
      return TimeRange.prototype.validTime(time);
  };


  // Static method aliases
  TimeRange.formatTime = function(time) {
      return TimeRange.prototype.formatTime(time);
  };

})(fecha);
