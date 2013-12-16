(function jsTricks() {
    console.log("test myBind");
    var App = function() {
        return {
            init: function() {
                this.nodes = document.querySelectorAll(".node");
                this.setListeners();
            },
            setListeners: function() {
                [].slice.call(this.nodes).forEach(function(n) {
                    n.onclick = this.onClick.myBind(this);
                }, this);
            },
            onClick: function(e) {
                e = e || window.event;
                var node = e.target || e.srcElement;
                // this - should be the main context - instance of App
                // node - should be the node, that fires event
            }
        };
    };

    if (typeof Function.prototype.myBind === "undefined") {
        Function.prototype.myBind = function(context) {
            var self = this;

            return function() {
                self.apply(context, arguments);
            }
        };
    }

    (new App()).init();

    console.log("test first person constructor");

    var Person = function(args) {
        for (key in args) {
            if (args.hasOwnProperty(key)) {
                this[key] = args[key];
            }
        }
    };

    var p = new Person({
        name: "Jack",
        age: "10",
        jump: function() {
            return "My name is " + this.name + " and I can jump.";
        }
    });

    console.assert("Jack" === p.name);
    console.assert("10" === p.age);
    console.assert("My name is Jack and I can jump." === p.jump());

    console.log("test modified person constructor");

    var ModifiedPerson = function(args) {
        var self = this;

        for (key in args) {
            if (args.hasOwnProperty(key)) {
                if (typeof args[key] === "function") {
                    this[key] = args[key];
                } else {
                    var getter = "get" + key.charAt(0).toUpperCase() + key.substr(1);
                    var setter = "set" + key.charAt(0).toUpperCase() + key.substr(1);

                    (function(key) {
                        self[getter] = function() {
                            return args[key];
                        };

                        self[setter] = function(value) {
                            return args[key] = value;
                        };
                    })(key);
                }
            }
        }
    };

    var p2 = new ModifiedPerson({
        name: "Jack",
        age: "10",
        jump: function() {
            return "My name is " + this.getName() + " and I can jump.";
        }
    });

    console.assert("Jack" === p2.getName());
    console.assert(undefined === p2.name);
    console.assert("10" === p2.getAge());
    console.assert(undefined === p2.age);
    console.assert("My name is Jack and I can jump." === p2.jump());
    console.assert(undefined === p2.getJump);
})();