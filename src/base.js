var fecha = {};

(function(F){
    F.util = {
        methods: function(obj, fns) {
            for (var fn in fns) {
                obj.prototype[fn] = fns[fn];
            }
        }
    };
})(fecha);