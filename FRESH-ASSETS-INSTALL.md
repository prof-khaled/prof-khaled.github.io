# Fresh Assets Pack

The fresh files are:

- `assets/final-site-fix.css`
- `assets/final-menu.js`

They are already linked in every HTML page in the full-site package.

For an existing deployment, upload the two files to `/assets/` and add these lines:

```html
<link href="assets/final-site-fix.css?v=6.0.0" rel="stylesheet">
<script src="assets/final-menu.js?v=6.0.0" defer></script>
```

The stylesheet must be the final CSS file in `<head>`. After uploading, use `Ctrl + Shift + R` to clear cached CSS.

Desktop behavior:
- Full one-line menu above 1350 px.
- Compact menu at 1350 px and below.
- Body text remains 16 px or larger.
