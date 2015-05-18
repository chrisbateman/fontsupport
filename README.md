# fontsupport

## Usage

fontsupport is a UMD module (AMD / CommonJS / global). You'll probably be including it in the `<head>` so you can start loading the relevant fonts right away.

```javascript
fontsupport.getSupport(function(result) {
  // result.woff
  // result.woff2
  // result.ttf
});
```
## Caveat
While desktop browsers parse and update the data URI fonts within a couple milliseconds, some mobile browsers take their sweet time. So after X amount of time has passed, we're in the predicament of not knowing whether the font format isn't supported, or whether the browser just isn't done thinking about it yet. So far, 100ms has seemd to be long enough (at least back to iPhone 5 and on Android emulators). Additional testing in a variety of pages/devices is needed to confirm an appropriate timeout.

It's not a great situation, but I don't think there's really any alternative at the moment.

## File Versions
Tests for WOFF, WOFF2, and TTF are available.

- All tests: [fontsupport.min.js](dist/fontsupport.min.js)
- WOFF: [fontsupport-woff.min.js](dist/fontsupport-woff.min.js)
- WOFF2: [fontsupport-woff2.min.js](dist/fontsupport-woff2.min.js)
- WOFF & WOFF2: [fontsupport-woffs.min.js](dist/fontsupport-woffs.min.js)
- TTF: [fontsupport-ttf.min.js](dist/fontsupport-ttf.min.js)

