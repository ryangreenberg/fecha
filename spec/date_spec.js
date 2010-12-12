describe("fecha", function() {
    describe("#clone", function(){
        it("returns a copy that does not affect the original", function(){
            var d1 = new Date(),
                d2 = fecha.clone(d1);
            expect(d1).toEqual(d2);

            d2.setSeconds(d1.getSeconds() + 1);
            expect(d2.getSeconds()).not.toEqual(d1.getSeconds());
        });
    });

    describe("#sameDate", function() {
      it("returns true when two dates are on the same day, month, and year", function() {
        var d1 = new Date(),
            d2 = fecha.clone(d1);
        expect(fecha.sameDate(d1, d2)).toEqual(true);
      });

      it("returns false when two dates are not on the same day, month, and year", function() {
        var d1 = new Date(),
            d2 = fecha.clone(d1);
        d2.setDate(d1.getDate() - 1);
        expect(fecha.sameDate(d1, d2)).toEqual(false);
      });
    });

    describe("#set", function() {
      it("sets seconds, minutes, hours, date, month, and year", function() {
        var d = new Date();

        fecha.set(d, {
          seconds: 0,
          minutes: 0,
          hours: 0,
          date: 1,
          month: 0,
          year: 2010
        });

        expect(d.getSeconds()).toEqual(0);
        expect(d.getMinutes()).toEqual(0);
        expect(d.getHours()).toEqual(0);
        expect(d.getDate()).toEqual(1);
        expect(d.getMonth()).toEqual(0);
        expect(d.getFullYear()).toEqual(2010);
      });

      it("ignores properties that do not correspond to setters", function() {
        var d = new Date();

        fecha.set(d, {
          eons: 2,
          hours: 0
        });
        expect(d.getHours()).toEqual(0);
      });
    });

    describe("#add", function() {
      it("sets property relative to current value", function() {
        var d = new Date();
        d.setSeconds(5);

        fecha.add(d, {
          seconds: 5
        });
        expect(d.getSeconds()).toEqual(10);
      });

      it("handles negative offsets from the current value", function() {
        var d = new Date();
        d.setSeconds(5);

        fecha.add(d, {
          seconds: -5
        });
        expect(d.getSeconds()).toEqual(0);

        fecha.add(d, {
          seconds: -5
        });
        expect(d.getSeconds()).toEqual(55);
      });
    });
});















