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
});