xn.test.suite("Text Range module tests", function(s) {
    s.setUp = function(t) {
        t.el = document.getElementById("test");
    };

    s.tearDown = function(t) {
        t.el.innerHTML = "";
    };

    s.test("Next/previous node tests", function(t) {
        var div0 = document.createElement("div");
        var text1_1 = div0.appendChild(document.createTextNode("1"));
        var b1 = div0.appendChild(document.createElement("b"));
        var text2 = b1.appendChild(document.createTextNode("2"));
        var i2 = b1.appendChild(document.createElement("i"));
        var text3 = i2.appendChild(document.createTextNode("3"));
        var text1_2 = div0.appendChild(document.createTextNode("1"));

        var nexts = [], next = div0;
        while ( (next = rangy.dom.nextNode(next)) ) {
            nexts.push(next);
        }

        t.assertArraysEquivalent(nexts, [text1_1, b1, text2, i2, text3, text1_2]);

        var previouses = [], previous = text1_2;
        while ( (previous = rangy.dom.previousNode(previous)) ) {
            previouses.push(previous);
        }

        t.assertArraysEquivalent(previouses.slice(0, 6), [text3, i2, text2, b1, text1_1, div0]);
    });

    s.test("PositionIterator", function(t) {
        t.el.innerHTML = "<div>1<b>2<br><span></span>33</b>4</div>";

        var div = t.el.getElementsByTagName("div")[0];
        var text1 = div.firstChild;
        var b = text1.nextSibling;
        var t2 = b.firstChild;
        var br = t2.nextSibling;
        var span = br.nextSibling;
        var t3 = b.lastChild;
        var t4 = div.lastChild;

        var positions = [
            [div, 0],
            [text1, 0],
            [text1, 1],
            [div, 1],
            [b, 0],
            [t2, 0],
            [t2, 1],
            [b, 1],
            [b, 2],
            [span, 0],
            [b, 3],
            [t3, 0],
            [t3, 1],
            [t3, 2],
            [b, 4],
            [div, 2],
            [t4, 0],
            [t4, 1],
            [div, 3],
            [t.el, 1]
        ];

        var positionIterator = new rangy.PositionIterator(t.el, 0);

        // First forwards...
        for (var i = 0, itPos; i < positions.length; ++i) {
            t.assert(positionIterator.hasNext());
            itPos = positionIterator.next();
            t.assertEquals(itPos.node, positions[i][0]);
            t.assertEquals(itPos.offset, positions[i][1]);
        }

        // ... now backwards
        for (i = positions.length - 2; i >= 0; --i) {
            t.assert(positionIterator.hasPrevious());
            itPos = positionIterator.previous();
            t.assertEquals(itPos.node, positions[i][0]);
            t.assertEquals(itPos.offset, positions[i][1]);
        }

    });

/*
    s.test("elementText", function(t) {
        t.el.innerHTML = "One";
        t.assertEquals(rangy.elementText(t.el), "One");
    });
*/
}, false);
