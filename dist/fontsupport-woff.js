(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.fontsupport = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });
    exports.getSupport = getSupport;

    var fontTests = {};

    fontTests.woff = {
        name: 'ftest-woff',
        cssText: '@font-face{font-family:"ftest-woff";src:url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQ4AA8AAAAABfQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABWAAAABwAAAAcYfHtkUdERUYAAAF0AAAAGAAAAB4ADwAeT1MvMgAAAYwAAABDAAAAVoT3QetjbWFwAAAB0AAAAE4AAAFSBUYHmGN2dCAAAAIgAAAABAAAAAQAIgKIZ2FzcAAAAiQAAAAIAAAACP//AANnbHlmAAACLAAAAHIAAACA2P2182hlYWQAAAKgAAAALAAAADYD1GaHaGhlYQAAAswAAAAdAAAAJATHAgdobXR4AAAC7AAAABgAAAAYB0sAImxvY2EAAAMEAAAADgAAAA4AlACUbWF4cAAAAxQAAAAfAAAAIABKAEFuYW1lAAADNAAAANMAAAGeW6tXiXBvc3QAAAQIAAAAJwAAADawJzfqd2ViZgAABDAAAAAGAAAABmPhVVUAAAABAAAAAMf+sN8AAAAAyHgrQQAAAADRexFweNpjYGSAAD4GMSDJAsRMQMwIwQADXwAueNpjYGRsYPzCwMrAwDST6QwDA0M/hGZ8zWDMyAkUZWBjZoABBAsIjEpK0hgcGBQYFjAz/GdgiGFaBRZmBBEABicKoAB42mNgYGBmgGAZBkYGEPAB8hjBfBYGAyDNAYRMQFqBQZdhwf//CNb/x/+v/0+F6gIDRjYGOJcRpIeJARUwQqyCAxaGQQxYydIFAB/ZC+MAAAAiAogAAAAB//8AAnjaY2BiUGJgYDRiWsXAzMDOoLeRkUHfZhM7C8Nbo41srHdsNjEzAZkMG5lBwqwg4U3sbIx/bDYxgsSNBRUF1Y0FlZUYBd6dOcO06m+YElMa0DgQYjzA6MDAD2QZi2qzmVqzMDY4IANGIGZgYAAACa8bbQAAeNpjYGRgYABiL0WJjHh+m68M3CwMIHCxWrAAmWY8wLQKSHEwMIF4ANdkB6142mNgZGBgWsXAwBDDxAACjAcYGBlQARsALXAB1AAAAAF2ACIAAAAAAVUAAAFAAAACAAAAAUAAAAAAACoAKgAqACoAQABAAAB42mNgZGBgYGMQYGBiAAEQycgAEnNg0AMJAAAFfwCMAHjahZAxasNAEEWfZFnGYEySKqVwbcy6SeE6XUirXqAFbaE1WBKufQjXvoHvkCvkEDmHf5wpEgj2Drvz5jPzd1lgzpmEnzXhwThhytI4JefVeMQjW+NMPUfjsSY/jHPpX+pMsinf/hgnPPFsnDLjxXjEgjfjTD0H4zEFJ+Nc+icDUVHR4qlhiLFqvWBPUN3TaHs6nexD3Te974Tv1+6g6VaFr8Og/Ndq85+F2W9+Wd2+qJS2kxr0RVGPd4o1q2t2qin9rgvbWDi3XjnnijuGF8aBQLYAeNpjYGIAg/8NDMYM2AAbEDMyMDEwMwgwMrGX5mUaGDgaAABZMQP4AAABVVVj4AAA)format("woff");}'
    };var initialWidth;
    var widths = [];
    var head = document.getElementsByTagName('head')[0];
    var testContainer;
    var style;
    var remainingTests = [];
    var finalResult = {};
    var styleTime;
    var bodyTime;
    var complete = false;
    var callbackFn;

    function immediateSetup() {
        testContainer = document.createElement('div');
        testContainer.className = 'fontSupport-testContainer';
        testContainer.innerHTML = '<span>-</span>';

        var fontsCssText = '\n        .fontSupport-testContainer {\n            position: absolute;\n            visibility: hidden;\n            pointer-events: none;\n            font-size: 50px;\n        }\n        .fontSupport-testContainer span {\n            float: left;\n            clear: both;\n        }';

        for (var i in fontTests) {
            fontsCssText += fontTests[i].cssText;

            var testSpan = document.createElement('span');
            testSpan.style.fontFamily = fontTests[i].name;
            testSpan.innerHTML = '-';
            testContainer.appendChild(testSpan);

            remainingTests.push({
                name: i,
                el: testSpan
            });
        }

        style = addCssToPage(fontsCssText);

        styleTime = new Date().getTime();
    }

    function addCssToPage(text) {
        var style = document.createElement('style');
        style.type = 'text/css';

        if (style.styleSheet) {
            style.styleSheet.cssText = text;
        } else {
            style.innerHTML = text;
        }
        head.appendChild(style);

        return style;
    }

    function bodySetup() {
        //document.body.appendChild(testContainer);
        document.documentElement.appendChild(testContainer);
        initialWidth = testContainer.children[0].offsetWidth;

        bodyTime = new Date().getTime();

        testFonts();
    }

    function testFonts() {
        var totalTime = new Date().getTime() - bodyTime;

        var i = remainingTests.length;
        while (i--) {
            var test = remainingTests[i];
            var testWidth = test.el.offsetWidth;

            var thisResult;
            if (testWidth - initialWidth > 2) {
                thisResult = true;
            } else if (totalTime > 100) {
                thisResult = false;
            }

            if (thisResult !== undefined) {
                finalResult[test.name] = thisResult;
                remainingTests.splice(i, 1);
            }
        }

        if (remainingTests.length === 0) {
            complete = true;

            //document.body.removeChild(testContainer);
            document.documentElement.removeChild(testContainer);
            head.removeChild(style);

            var time = new Date().getTime();
            finalResult.timeFromBody = time - bodyTime;
            finalResult.timeFromStyle = time - styleTime;

            if (callbackFn) {
                callbackFn(finalResult);
            }
        } else {
            setTimeout(testFonts, 8);
        }
    }

    /*function checkBody() {
        if (document.body) {
            bodySetup();
        } else {
            setTimeout(checkBody, 4);
        }
    }*/

    immediateSetup();
    //checkBody();
    bodySetup();

    function getSupport(callback) {
        if (complete) {
            callback(finalResult);
        } else {
            callbackFn = callback;
        }
    }

    ;
});