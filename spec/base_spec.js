describe("fecha", function(){

  describe("util", function(){

    describe("#methods", function(){
      it("copies functions to the prototype of an object", function(){
        var TestObject = function(){},
        obj = new TestObject();

        fecha.util.methods(TestObject, {
          aMethod: function(){ return true; },
          bMethod: function(){ return this; }
        });

        expect(typeof obj.aMethod).toEqual('function');
        expect(obj.aMethod()).toEqual(true);
        expect(obj.bMethod()).toEqual(obj);
      });
    });

  });

});