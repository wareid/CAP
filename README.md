# CAP
Canadian Accessible Publishing - Home for all of our work!

## Getting these files

Clone this repository locally. Then open a terminal program and go to the directory where you put the files:

`$ cd ~/Downloads/CAP`

Install the required libraries:
`$ npm install`

## Adding content

Edit the home page: `src/index.md`

Edit the style: `src/css/base.css`.

Add content (in markdown or other formats) to any of these folders:

- `src/blog/posts`
- `src/resources`
- `src/certification`

Follow the examples.

## Building the site

Build with `$ npm run build`

Commit your build. Github pages will pick up what's in the `docs` folder.

## More things you can do

* Serve the files locally with `$ npm run serve`. Browse to [localhost:8080](http://localhost:8080).
* Lint your CSS with `$ gulp lint-css`
* Pretty-format the HTML output with `$ gulp pretty-html`

## TODOs

Related to the site code/tooling:
* continuous integration setup
* better 'truncate' function for displaying blog post snippets
* responsive design for mobile

For the group:
* Review and refine workflow
* Write UX wishlist
* Start creating and editing

## Architecture and design

This is a static site built with [11ty](http://11ty.io). It has been configured with some specific types of content behavior:

- blog 
  - post snippets are aggregated on the front page
  - tags are displayed
- section
  - good for documentation
  - local toc auto-generated for index page, one level deep
- regular page
  - standalone content

What we might need:

- samples library
- search function
- generate nested toc
