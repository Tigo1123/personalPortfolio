# Authentic project screenshots

Captured on 8 September 2026 in a fresh Chrome context at 1600 × 900 (16:9), after rendering. These are unaltered viewport captures converted to WebP at quality 85, with no browser chrome or added artwork.

| File                     | Public source                                | Visible page                              |
| ------------------------ | -------------------------------------------- | ----------------------------------------- |
| `clinic-management.webp` | https://clinic-staging-web.onrender.com/     | Public landing page                       |
| `student-planner.webp`   | https://student-planner-web-v2.onrender.com/ | Automatic redirect to public sign-in page |
| `guess-my-number.webp`   | https://guess-my-number-elg5.onrender.com/   | Default game screen                       |

No login, credentials, private dashboards, or data-entry actions were used. The screenshots contain no patient records or private account information. Academic System has no verified public deployment and retains `image: null`; no screenshot was created for it.

`ProjectVisual` adds the Vite base path, reserves a 16:9 image area, contains the entire screenshot without cropping, lazy-loads and asynchronously decodes images, and falls back to the existing text placeholder if loading fails. The existing decorative card frame is separate from the screenshot files.
