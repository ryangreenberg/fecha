// A collection of time ranges
function TimeRanges(args) {
    this.ranges = [];
    args = args || arguments;

    for (var i=0; i < args.length; i++) {
        if (args[i].constructor == TimeRange) {
            this.ranges.push(args[i]);
        } else {
            this.ranges.push(new TimeRange(args[i]));
        }
    }
    
    this.length = this.ranges.length;
    
    // Given a single date or date range returns which of
    // the time ranges within this collection it overlaps with
    // The return value is the index of the time range in the
    // collection (which can be accessed at .ranges)
    this.overlap = function(d) {
        var overlaps = [];
        for (var i=0; i < this.ranges.length; i++) {
            // Dates are single points
            // Check if the slices contains the date
            if (d.constructor == Date) {
                if (this.ranges[i].contains(d)) {
                    overlaps.push(i);
                }
            } else if (d.constructor == DateRange) {
                if (this.ranges[i].overlaps(d)) {
                    overlaps.push(i);
                }
            }
        }
        return overlaps;
    };
    
    this.toString = function() {
        return 'TimeRanges';
    };
}