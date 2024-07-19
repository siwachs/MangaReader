const unsafeTags = [
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
  "textarea",
  "input",
  "button",
  "frame",
  "frameset",
  "noframes",
  "param",
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

const allowedLinkAttributes = ["rel", "href"];
const allowedImgAttributes = ["src", "alt", "title"];
const allowedSpanAttributes = ["style"];

function sanatizeAllowedTags(
  elements: NodeListOf<Element>,
  allowedAttributes: string[],
) {
  elements.forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      if (!allowedAttributes.includes(attribute.name))
        element.removeAttribute(attribute.name);
    });
  });
}

export default function sanatizeHtml(htmlString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  unsafeTags.forEach((tag) => {
    const tags = document.querySelectorAll(tag);

    tags.forEach((tag) => tag.remove());
  });

  const links = doc.querySelectorAll("a");
  sanatizeAllowedTags(links, allowedLinkAttributes);

  const images = doc.querySelectorAll("img");
  sanatizeAllowedTags(images, allowedImgAttributes);

  const spans = doc.querySelectorAll("span");
  sanatizeAllowedTags(spans, allowedSpanAttributes);

  htmlString = doc.body.innerHTML;
  htmlString = htmlString.replace(/<div\b[^>]*>/gi, "");
  htmlString = htmlString.replace(/<\/div>/gi, "<br>");

  return htmlString;
}
