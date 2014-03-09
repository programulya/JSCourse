BookManager.Views.BookForm = Backbone.View.extend({
    template: _.template($("#tpl-new-book").html()),

    events: {
        "submit .book-form": "onFormSubmit"
    },

    render: function() {
        var html = this.template(_.extend(this.model.toJSON(), {
            isNew: this.model.isNew()
        }));
        this.$el.append(html);
        return this;
    },

    onFormSubmit: function(e) {
        e.preventDefault();

        this.trigger("form:submitted", {
            name: this.$(".book-name-input").val(),
            author: this.$(".book-author-input").val(),
            price: this.$(".book-price-input").val()
        });
    }
});
