window.BookManager = {
    Models: {},
    Collections: {},
    Views: {},

    start: function(data) {
        var books = new BookManager.Collections.Books(data.books),
            router = new BookManager.Router();

        router.on("route:home", function() {
            router.navigate("books", {
                trigger: true,
                replace: true
            });
        });

        router.on("route:showBooks", function() {
            var booksView = new BookManager.Views.Books({
                collection: books
            });

            $(".main-container").html(booksView.render().$el);
        });

        router.on("route:newBook", function() {
            var newBookForm = new BookManager.Views.BookForm({
                model: new BookManager.Models.Book()
            });

            newBookForm.on("form:submitted", function(attrs) {
                attrs.id = books.isEmpty() ? 1 : (_.max(books.pluck("id")) + 1);
                attrs.cover = "no-image.jpg";
                books.add(attrs);
                router.navigate("books", true);
            });

            $(".main-container").html(newBookForm.render().$el);
        });

        router.on("route:editBook", function(id) {
            var book = books.get(id),
                editBookForm;

            if (book) {
                editBookForm = new BookManager.Views.BookForm({
                    model: book
                });

                editBookForm.on("form:submitted", function(attrs) {
                    book.set(attrs);
                    router.navigate("books", true);
                });

                $(".main-container").html(editBookForm.render().$el);
            } else {
                router.navigate("books", true);
            }
        });

        Backbone.history.start();
    }
};
