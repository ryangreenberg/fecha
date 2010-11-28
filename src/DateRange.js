function DateRange(a, b) {
    // Check that a and b are dates
    if (typeof a.getYear != 'function' || typeof b.getYear != 'function') {
        console.warn("Invalid date: ", a, b);
        throw new Error("Invalid date!");
    }
    
    // Convert a range string to two dates
    // The only supported range string format is "date1 to date2"
    // where date1 and date2 are dates that can be parsed by Date.parse
    // if (typeof(a) == 'string') {
    //     var dates = a.split(' to ');
    //     a = new Date(dates[0]);
    //     b = new Date(dates[1]);
    // }
    
    this.start = a.clone();
    this.end = b.clone();

    // Indicate if the date range specified is contained by a single
    // day. This is helpful when determining how to convert a DateRange
    // to a TimeRange
    this.singleDay = (this.start.getDate() == this.end.getDate() &&
        this.start.getMonth() == this.end.getMonth() &&
        this.start.getFullYear() == this.end.getFullYear());
    
    // Returns true if this date range contains the specified date
    this.contains = function(d) {
        return this.start.getTime() <= d.getTime() &&
        this.end.getTime() >= d.getTime();
    };
    
    // Returns true if this date range contains any option of the specified date range
    this.overlaps = function(dr) {
        var start = this.start.getTime(), end = this.end.getTime(),
            start2 = dr.start.getTime(), end2 = dr.end.getTime();
        return (start <= start2 && start2 <= end) ||
               (start2 <= start && start <= end2);
    };
    
    // Combines this date range with the provided date range
    this.merge = function(dr) {
        var start = this.start.getTime() <= dr.start.getTime() ? this.start : dr.start,
            end   = this.end.getTime() >= dr.end.getTime() ? this.end : dr.end;
        return new DateRange(start, end);
    };
    
    // Returns the gap between the end of one date range and the
    // start of another. Returns 0 if the date ranges overlap
    this.gap = function(dr) {
        throw Error("Not implemented.");
    };
    
    // Return an array of dates representing days that overlap with
    // this date range
    // Like the implemented isoDates but with Date objects
    this.dates = function() {
        throw Error("Not implemented.");
    };
    
    // Returns an array of strings reprsenting days that overlap with
    // this date range
    this.isoDates = function() {
        var dates = [];
        var step = this.start.clone().set({hours: 0, minutes: 0, seconds: 0});
        while(step.sameDayAs(this.start) || this.contains(step) || step.sameDayAs(this.end)) {
            dates.push(step.ymd());
            step.setDate(step.getDate() + 1);
        }
        return dates;
    };
    
    // Returns the provided date range, minus any overlap
    // with this date range. If the provided date range
    // is contained completely by this date range, null
    // is returned.
    this.exclude = function(dr) {
        throw Error("Not implemented.");
        // Check for complete overlap
        if (this.start <= dr.start && dr.end <= this.end) {
            return null;
        }
    };
    
    this.toTimeRange = function(){
        if (this.singleDay) {
            return new TimeRange(this.start, this.end);            
        } else {
            return [
                new TimeRange(this.start, '23:59:59'),
                new TimeRange('00:00:00', this.end)
            ];
        }
    };
    
    this.toString = function() {
        return this.start + ' to ' + this.end;
    };
    
    this.duration = function(units) {
        units = units || 's';
        var d = this.end.getTime() - this.start.getTime();
        switch (units) {
            case 's':
                return d / 1000;
                break;
            case 'm':
                return d / (1000 * 60);
                break;
            case 'h':
                return d / (1000 * 60 * 60);
                break;
            case 'd':
                return d / (1000 * 60 * 60 * 24);
                break;
            default:
                return d;
        }
    };
}