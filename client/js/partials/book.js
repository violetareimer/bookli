(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["book.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"book ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "detail")?"book--full":""), env.opts.autoescape);
output += "\">\n    <div class=\"book__cover\" >\n        <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"cover"), env.opts.autoescape);
output += "\" alt=\"book cover\">\n    </div>\n\n    <div class=\"book__header\">\n        <p class=\"book__title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"title"), env.opts.autoescape);
output += "</p>\n        <p class=\"book__author\">por ";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"authors"),", "), env.opts.autoescape);
output += "</p>\n    </div>\n    <div class=\"book__body\">\n        <p class=\"book__synopsis\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"synopsis"), env.opts.autoescape);
output += "</p>\n        <div class=\"book__extra-info\">\n            <p>Se publicó en el año <span class=\"highlight\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"year"), env.opts.autoescape);
output += "</span> por la editorial <span class=\"highlight\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"publisher"), env.opts.autoescape);
output += "</span>.</p>\n            <p>Es un libro perteneciente a los géneros <span class=\"highlight\">";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"genres"),", "), env.opts.autoescape);
output += "</span>.</p>\n        </div>\n    </div>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
