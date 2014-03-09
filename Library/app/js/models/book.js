BookManager.Models.Book = Backbone.Model.extend({
    defaults: {
        name: null,
        author: null,
        price: null,
        cover: "no-image.jpg"
    }
});