window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

// Re-render math after Material's instant navigation swaps pages
document$.subscribe(() => {
  if (window.MathJax?.typesetPromise) {
    MathJax.typesetClear();
    MathJax.typesetPromise();
  }
});
