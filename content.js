function rewriteLinks() {
  // Find all anchor tags on the page
  const links = document.querySelectorAll('a[href*="twitter.com"], a[href*="x.com"]');

  links.forEach(link => {
    try {
      const url = new URL(link.href);

      // Check if the hostname matches Twitter or X
      if (url.hostname === 'twitter.com' || url.hostname === 'x.com' ||
          url.hostname === 'www.twitter.com' || url.hostname === 'www.x.com') {

        // Replace the domain with xcancel.com
        url.hostname = 'xcancel.com';
        link.href = url.toString();
      }
    } catch (e) {
      // Ignore invalid URLs
    }
  });
}

// Run once when the page loads
rewriteLinks();

// Since many sites (like Reddit or Twitter itself) load content dynamically
// as you scroll, we use a MutationObserver to catch new links.
const observer = new MutationObserver(() => {
  rewriteLinks();
});

observer.observe(document.body, { childList: true, subtree: true });
