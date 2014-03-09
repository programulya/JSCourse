BookManager.Views.Books = Backbone.View.extend({
    template: _.template($("#tpl-books").html()),

    renderOne: function(book) {
        var itemView = new BookManager.Views.Book({model: book});
        this.$(".books-container").append(itemView.render().$el);
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);
        this.collection.each(this.renderOne, this);

        return this;
    }
});