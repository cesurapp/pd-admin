// Get Ace Editor
let ace = require('ace-builds/src-noconflict/ace');

// Load Theme & Theme
require('ace-builds/src-noconflict/theme-monokai');
require('ace-builds/src-noconflict/mode-twig');
require('ace-builds/src-noconflict/mode-yaml');
require('ace-builds/src-noconflict/mode-css');
require('ace-builds/src-noconflict/mode-text');
require('ace-builds/src-noconflict/mode-html');

// Export
module.exports = ace;
