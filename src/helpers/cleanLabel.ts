/**
 * Get clean description from id like this form "something-like-this" or "something_like_this"
 */

const cleanLabel = (stringInput: string): string => {
  const trimmed = stringInput.replace(/-/g, " ").replace(/_/g, " ");
  return trimmed.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
};

export default cleanLabel;