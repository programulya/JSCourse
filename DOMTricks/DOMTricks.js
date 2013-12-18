document.addEventListener("DOMContentLoaded", function() {
    console.log("test selector");
    var My$ = function(selector) {
        var items = window.document.querySelectorAll(selector);

        items.width = function(value) {
            for (var i = 0; i < items.length; ++i) {
                items[i].style.width = value + "px";
            }

            return items;
        };

        items.height = function(value) {
            for (var i = 0; i < items.length; ++i) {
                items[i].style.height = value + "px";
            }

            return items;
        };

        items.css = function() {
            var property = arguments[0];

            if (typeof property === "object") {
                var delay = arguments[1] || 0;
                for (var p in property) {
                    if (property.hasOwnProperty(p)) {
                        items.css(p, property[p], delay);
                    }
                }
            }
            else {
                var value = arguments[1];
                var delay = arguments[2] || 0;
                setTimeout(function() {
                    for (var i = 0; i < items.length; ++i) {
                        items[i].style[property] = value;
                    }
                }, delay);
            }

            return items;
        }

        return items;
    };

    console.log("show all divs on the page");
    var $div = My$("div");
    console.dir($div);

    console.log("show all DOM elements with class .red on the page");
    var $red = My$(".red");
    console.dir($red);

    console.log("change current width to 100px for all DOM elements with class .red");
    $red.width("100");

    console.log("test css");
    $red.width("300").height("300").css("border", "5px").css({"background": "red"}, 3000);
    $red.css({"background": "white"}, 3000);
});
