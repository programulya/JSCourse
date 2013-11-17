document.addEventListener("DOMContentLoaded", function() {
    console.log("test getObject(path, obj)");

    var o = { a: { b: "c" } };
    console.log(getObject("a.b", o)); // "c"
    console.log(getObject("a", o)); // {b: "c"}
    console.log(getObject("d", o)); // undefined

    console.log("test deepCopy(obj)");

    var a = { b: "c", d: { e: "f" } };
    b = deepCopy(a);
    a.d = 12;
    console.log(a.d);
    console.log(b.d); // {e: "f"}

    console.log("test getFriends(userId)");

    var people = [
        { id: 1, name: "Brad", friends: [2, 5, 6] },
        { id: 2, name: "John", friends: [1, 3] },
        { id: 3, name: "Tom", friends: [2, 5] },
        { id: 4, name: "Fil", friends: null },
        { id: 5, name: "John", friends: [1, 3] },
        { id: 6, name: "Jim", friends: [1] }
    ];
    console.log(getFriends(2, people)); // [{id: 1, name: 'Brad', friends: [2,5,6]}, {id: 3, name: 'Tom', friends: [2, 5]}]
    console.log(getFriends(4, people)); // []
    console.log(getFriends(100500, people)); // null

}, false);

function getObject(path, obj) {
    var pathSplited = path.split('.');

    for (var i = 0; i < pathSplited.length; ++i) {
        obj = obj[pathSplited[i]];
    }

    return obj;
}

function deepCopy(obj) {
    if (obj == null || typeof(obj) != "object")
        return obj;

    var copy = obj.constructor();

    for (var key in obj)
        copy[key] = deepCopy(obj[key]);
    return copy;
}

function getFriends(userId, people) {
    var friends = [];
    var found = false;
    for (var i = 0; i < people.length; ++i) {
        if (getObject("id", people[i]) === userId) {
            found = true;
        }

        var guys = getObject("friends", people[i]);
        if (guys != null && guys.indexOf(userId) > -1) {
            friends.push(people[i]);
        }
    }

    if (!found) {
        friends = null;
    }

    return friends;
}