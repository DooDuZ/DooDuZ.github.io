(function () {
  "use strict";

  var chordSuffix = "(?:(?:maj|min|dim|aug|sus|add|m|M)|\\d+|[#b]\\d+|\\([#b]?\\d+\\))*[*!]?";
  var chordUnit = "[A-G](?:#|b)?" + chordSuffix + "(?:/[A-G](?:#|b)?" + chordSuffix + ")?[!~]?";
  var chordPattern = new RegExp("^(?:" + chordUnit + ")(?:[-~](?:" + chordUnit + "))*$");
  var notationPattern = /^(?:[-–—|/xX]|\d+|[-=<>]+)$/;

  function isChordToken(token) {
    if (chordPattern.test(token)) {
      return true;
    }

    return chordPattern.test(token.replace(/^[([{<]+|[)\]}>.,;:]+$/g, ""));
  }

  function isChordLine(line) {
    var trimmed = line.trim();

    if (!trimmed || /^[-=–—]{3,}$/.test(trimmed) || /^\[[^\]]+\]$/.test(trimmed)) {
      return false;
    }

    var tokens = trimmed.split(/\s+/);
    var chordCount = 0;
    var notationCount = 0;

    tokens.forEach(function (token) {
      if (isChordToken(token)) {
        chordCount += 1;
      } else if (notationPattern.test(token)) {
        notationCount += 1;
      }
    });

    return chordCount > 0 && (chordCount + notationCount) / tokens.length >= 0.6;
  }

  document.querySelectorAll(".song-sheet pre").forEach(function (sheet) {
    var fragment = document.createDocumentFragment();

    sheet.textContent.split("\n").forEach(function (line) {
      var lineElement = document.createElement("span");
      lineElement.className = isChordLine(line) ? "sheet-line sheet-line--chord" : "sheet-line";
      lineElement.textContent = line || "\u200b";
      fragment.appendChild(lineElement);
    });

    sheet.replaceChildren(fragment);
  });
})();
