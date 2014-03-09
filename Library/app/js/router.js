BookManager.Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "books": "showBooks",
        "books/new": "newBook",
        "books/edit/:id": "editBook"
    }
});