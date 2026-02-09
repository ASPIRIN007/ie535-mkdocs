window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

// Material for MkDocs: typeset after each page load/navigation
document$.subscribe(() => {
  if (window.MathJax?.typesetPromise) {
    MathJax.typesetClear();
    MathJax.typesetPromise();
  }
});
