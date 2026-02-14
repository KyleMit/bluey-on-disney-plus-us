const htmlmin = require("html-minifier-terser");

module.exports = function(eleventyConfig) {
  // Minify HTML output in production
  eleventyConfig.addTransform("htmlmin", function(content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      });
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
