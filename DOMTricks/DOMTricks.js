document.addEventListener("DOMContentLoaded", function() {
    console.log("test selector");
    var my$ = function(selector) {
        var items = window.document.querySelectorAll(selector);

        items.width = function(value) {
            for (var i = 0; i < items.length; ++i) {
                items[i].style.width = value + "px";
            }
        };

        items.height = function(value) {
            for (var i = 0; i < items.length; ++i) {
                items[i].style.height = value + "px";
            }
        };

        return items;
    };

    console.log("show all divs on the page");
    var $div = my$("div");
    console.dir($div);

    console.log("show all DOM elements with class .red on the page");
    var $red = my$(".red");
    console.dir($red);

    console.log("change current width to 100px for all DOM elements with class .red");
    $red.width("100");
});