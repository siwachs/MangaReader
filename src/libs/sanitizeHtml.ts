const unsafeTags = [
  "b",
  "i",
  "ul",
  "ol",
  "li",
  "article",
  "section",
  "hr",
  "footer",
  "header",
  "main",
  "script",
  "iframe",
  "object",
  "embed",
  "applet",
  "form",
  "meta",
  "base",
  "audio",
  "video",
  "source",
  "svg",
  "math",
  "label",
  "link",
  "nav",
  "textarea",
  "input",
  "button",
  "frame",
  "frameset",
  "noframes",
  "param",
  "picture",
  "select",
  "table",
  "th",
  "td",
  "tr",
  "noscript",
  "isindex",
  "bgsound",
  "marquee",
  "template",
  "track",
  "command",
  "keygen",
  "dialog",
];

const safeTags = [
  "a",
  "img",
  "span",
  "p",
  "br",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "spoiler-tag",
];

const allowedAttributes = [
  "rel",
  "href",
  "target",
  "src",
  "alt",
  "title",
  "style",
  "class",
];

function sanatizeAllowedTags(elements: NodeListOf<Element>) {
  elements.forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      if (!allowedAttributes.includes(attribute.name))
        element.removeAttribute(attribute.name);
    });
  });
}

export default function sanatizeHtml(htmlString: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    unsafeTags.forEach((tag) => {
      const tags = doc.querySelectorAll(tag);

      tags.forEach((tag) => tag.remove());
    });

    safeTags.forEach((tag) => {
      const tags = doc.querySelectorAll(tag);
      sanatizeAllowedTags(tags);
    });

    htmlString = doc.body.innerHTML;
    htmlString = htmlString.replace(/<div\b[^>]*>/gi, "");
    htmlString = htmlString.replace(/<\/div>/gi, "<br>");

    return htmlString;
  } catch (error: any) {
    return error.message;
  }
}
