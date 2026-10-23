// Sign-up form markup, shared by build-blog.mjs (inside posts) and build-newsletter.mjs (the /newsletter/ pages).
// Provider-neutral: any provider whose embed form is a plain HTML POST works. Set the URL in config.json.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// variant: "inline" (after a post's TL;DR), "end" (end-of-post call to action), "page" (the /newsletter/ landing page)
export function signupForm(cfg, variant) {
  const id = `nl-${variant}`;
  const hidden = Object.entries(cfg.hiddenFields || {})
    .map(([k, v]) => `<input type="hidden" name="${esc(k)}" value="${esc(v)}">`)
    .join('');
  // the landing page already has its own heading, so its form drops the title
  const head = variant === 'page' ? ''
    : `\n  <p class="nl-title" id="${id}-title">Get new posts by email</p>${variant === 'end' ? '\n  <p class="nl-sub">One short email when a new post goes up.</p>' : ''}`;
  return `<aside class="nl nl-${variant}" ${variant === 'page' ? 'aria-label="Subscribe by email"' : `aria-labelledby="${id}-title"`}>${head}
  <form class="nl-form" action="${esc(cfg.formAction)}" method="post" data-newsletter-source="${variant}">
    <label class="nl-label" for="${id}-email">Email address</label>
    <input id="${id}-email" name="${esc(cfg.emailField || 'email')}" type="email" required autocomplete="email" placeholder="you@example.com">
    ${hidden}
    <button class="btn" type="submit">Subscribe</button>
  </form>
  <p class="nl-fine">${esc(cfg.consentText)}</p>
</aside>`;
}
