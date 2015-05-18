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

    fontTests.ttf = {
        name: 'ftest-ttf',
        cssText: '@font-face{font-family:"ftest-ttf";src:url(data:font/truetype;charset=utf-8;base64,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)format("truetype");}'
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