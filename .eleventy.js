// docs: https://www.11ty.io/docs/config/
const path = require('path');
const nunjucks = require('nunjucks');
const md = require("markdown-it");
const { DateTime } = require("luxon");
const fs = require('fs');

module.exports = function(eleventyConfig) {

  let nunjucksEnv = new nunjucks.Environment(
    new nunjucks.FileSystemLoader("src/_includes")
  );
  nunjucksEnv.addFilter('truncate', (content, chars) => {
    // it's not pretty but it does the trick for now
    // TODO replace with more thoughtful approach
    return content ? content.slice(0,chars) + "</code></pre>" : '';
  });
  nunjucksEnv.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });
  nunjucksEnv.addFilter("filterTags", (tags, src) => {
    let excludeList = ["post", "posts", "blog", "certification", "resources"];
    return tags ? tags.filter(item => !excludeList.includes(item)) : [];
  });
  nunjucksEnv.addFilter("filterSelfOut", (posts, self) => {
    return posts ? posts.filter(p=>p.fileSlug != self.fileSlug) : [];
  });
  nunjucksEnv.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });
  nunjucksEnv.addFilter("nextItem", (self, array) => {
    let idx = array.findIndex(p=>p.fileSlug == self.fileSlug);
    if (idx == array.length -1) {
      return null;
    }
    else {
      idx += 1;
      return {url: array[idx].url, title: array[idx].data.title};
    }

  });
  nunjucksEnv.addFilter("prevItem", (self, array) => {
    let idx = array.findIndex(p=>p.fileSlug == self.fileSlug);
    if (idx == 0) {
      return null;
    }
    else {
      idx -= 1;
      return {url: array[idx].url, title: array[idx].data.title};
    }
  });
  nunjucksEnv.addFilter("identity", (thing, msg) => {
    console.log(msg, thing);
    return thing;
  });
  nunjucksEnv.addFilter("sortByOrder", arr => {
    return arr.sort(function(a, b) {
      return b.data.order < a.data.order;
    });
  });
  nunjucksEnv.addFilter("sectionPages", (pages, sectionName) => {
    return pages.filter(page => page.data.section === sectionName);
  });
  nunjucksEnv.addFilter("notIndex", pages => {
    console.log(pages.map(p=>p.fileSlug).join(","));
    console.log(pages.map(p=>p.url).join(","));
    return pages.filter(page => page.url != `/${page.fileSlug}/`);
  });

  eleventyConfig.setLibrary("njk", nunjucksEnv);

  eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));

  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    // permalink: true,
    // permalinkClass: "direct-link",
    // permalinkSymbol: "#"
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.setDataDeepMerge(true);


  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],
    pathPrefix: "/CAP/",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "docs"
    }
  };
};
