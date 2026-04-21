/**
 * Remark plugin: adds target="_blank" and rel="noopener noreferrer"
 * to external (http/https) markdown links.
 */

function walk(node, visitor) {
  visitor(node);
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => walk(child, visitor));
  }
}

function isExternal(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url);
}

function plugin() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type === 'link' && isExternal(node.url)) {
        node.data = node.data || {};
        const props = node.data.hProperties || {};
        node.data.hProperties = {
          ...props,
          target: '_blank',
          rel: 'noopener noreferrer',
        };
      }
    });
  };
}

module.exports = plugin;
