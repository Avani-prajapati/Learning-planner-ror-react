function isPalindrome(str) {
  const clean = normalize_str(str);

  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  const chars = [...segmenter.segment(clean)].map(s => s.segment);
  console.log("Normalized string:", chars.join(""));
  console.log("Reversed string:", chars.reverse().join(""));

  return chars.join("") === chars.reverse().join("");

}

function normalize_str(str) {
  return str
    .normalize()
    .replace(/[\p{P}\p{White_Space}]+/gu, "")
    .toLowerCase();
}

console.log(isPalindrome("રંગરં")); // true
console.log(isPalindrome("मलयलम")); // true
console.log(isPalindrome("èaè")); // true
console.log(isPalindrome("😊aaa😊")); // true
