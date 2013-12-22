$(function() {
    $("#accordion").accordion();
    $("#slider").slider();

    $("#button").on("mouseover", function() {
        $(this).switchClass("normal", "highlight", 1000, "easeInOutQuad");
    });

    $("#button").on("mouseleave", function() {
        $(this).switchClass("highlight", "normal", 1000, "easeInOutQuad");
    });

    $("#button").button().click(function(event) {
        event.preventDefault();
    });
});