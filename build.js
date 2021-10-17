// Run any other pre-build compilations you need here...
const projects = require('./utils/gen-project-fragment');
projects.genFragment();

// Now, build all html pages to ./public
const render = require('./utils/render-md');
render.render('content', 'public', 'templates/base.html');