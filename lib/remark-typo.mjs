// Sets the prose of every docs page through vendor/vawe/site/lib/typo.mjs (curly quotes, nonbreaking units, en dash
// ranges). Code and inline code are other node types, so they keep their straight quotes.
import { smartText } from '../vendor/vawe/site/lib/typo.mjs';

function setChildren(node) {
  let before = '';
  for (const child of node.children ?? []) {
    if (child.type === 'text') {
      child.value = smartText(child.value, before);
      before = child.value.slice(-1);
    } else {
      before = 'x';
      setChildren(child);
    }
  }
}

export default function remarkTypo() {
  return (tree) => setChildren(tree);
}
