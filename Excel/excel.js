"use strict";

var excel = {
    init: function() {
        var self = this;

        this.table = table = document.getElementById("table");
        this.selectClass = "select";
        this.keys = {
            ENTER: 13,
            DELETE: 46, //8 in Mac
            LEFT: 37,
            RIGHT: 39,
            UP: 38,
            DOWN: 40
        };

        this.table.onclick = function(e) {
            self.onClick(e);
        };

        document.onkeyup = (function(e) {
            self.onKeyUp(e);
        }).bind(this);
    },

    onClick: function(e) {
        var target = e.target;
        this.select(target);
    },

    onKeyUp: function(e) {
        if (e.keyCode === this.keys.ENTER) {
            if (e.shiftKey) {
                this.insertColumn();
            }
            else {
                this.insertRow();
            }
        }

        if (e.keyCode === this.keys.DELETE) {
            if (e.shiftKey) {
                this.dropColumn();
            }
            else {
                this.dropRow();
            }
        }

        switch (e.keyCode) {
            case this.keys.LEFT:
                this.left();
                break;
            case this.keys.RIGHT:
                this.right();
                break;
            case this.keys.UP:
                this.up();
                break;
            case this.keys.DOWN:
                this.down();
                break;
            default:
                break;
        }
    },

    select: function(element) {
        this.removeClass(this.table, this.selectClass);

        var tableRows = this.table.getElementsByTagName("tr"),
            r = [], i, tds, j;

        for (i = 0; i < tableRows.length; ++i) {
            tds = tableRows[i].getElementsByTagName("td");
            this.removeClass(tableRows[i], this.selectClass);
            for (j = 0; j < tds.length; ++j) {
                this.removeClass(tds[j], this.selectClass);
            }
        }

        this.toggleClass(element, this.selectClass);
        this.selectedElement = element;
    },

    toggleClass: function(element, cssClass) {
        element.classList.toggle(cssClass);
    },

    removeClass: function(element, cssClass) {
        element.classList.remove(cssClass);
    },

    left: function() {
        var selected = this.selectedElement,
            previous = selected.previousElementSibling;

        if (previous !== null) {
            if (previous.tagName.toLowerCase() === "td") {
                this.select(previous);
            }
        }
        else if (selected.tagName.toLowerCase() === "tr") {
            this.select(selected.parentNode);
        }
    },

    right: function() {
        var selected = this.selectedElement,
            next = selected.nextElementSibling;

        if (selected.tagName.toLowerCase() === "tr") {
            this.select(selected.firstElementChild);

            return;
        }

        if (next !== null) {
            if (next.tagName.toLowerCase() === "td") {
                this.select(next);
            }
        }
        else {
            this.select(selected.parentNode);
        }
    },

    up: function() {
        var selected = this.selectedElement,
            parentUp = selected.parentNode.previousElementSibling;

        if (parentUp !== null) {
            if (selected.tagName.toLowerCase() === "td") {
                this.select(parentUp.children[selected.cellIndex]);
            }
        }
        else {
            this.select(this.table);
        }
    },

    down: function() {
        var selected = this.selectedElement,
            parentDown = selected.parentNode.nextElementSibling;

        if (parentDown !== null) {
            if (selected.tagName.toLowerCase() === "td") {
                this.select(parentDown.children[selected.cellIndex]);
            }
        }
        else {
            this.select(this.table.rows[0]);
        }
    },

    insertRow: function() {
        var index = this.selectedElement.parentNode.rowIndex;
        var newRow = this.table.insertRow(index + 1);

        for (var i = 0; i < this.table.rows[0].cells.length; ++i) {
            newRow.insertCell(i);
        }
    },

    insertColumn: function() {
        var index = this.selectedElement.cellIndex;

        for (var i = 0; i < this.table.rows.length; ++i) {
            this.table.rows[i].insertCell(index + 1);
        }
    },

    dropRow: function() {
        var index = this.selectedElement.parentNode.rowIndex;
        if (this.table.rows.length !== 0) {
            this.table.deleteRow(index);
        }
    },

    dropColumn: function() {
        var index = this.selectedElement.cellIndex;

        for (var i = 0; i < this.table.rows.length; ++i) {
            if (this.table.rows[i].length !== 0) {
                this.table.rows[i].deleteCell(index);
            }
        }
    }
};

excel.init();