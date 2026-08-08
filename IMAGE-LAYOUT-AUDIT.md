# Image Layout Audit — V17

| Area | Previous risk | V17 treatment | Cropping |
|---|---|---|---|
| Infographics/scientific figures | Fixed or contained canvases could create blank bands | Natural intrinsic ratio; height auto; transparent background | No |
| Course figures | Course-local CSS could impose fixed boxes | Global course override removes fixed height/aspect ratio from ordinary content images | No |
| Photo/card thumbnails | Need consistent cards | cover permitted only for explicit photo/thumbnail classes | Yes, presentation only |
| Logos | Potential distortion | natural height / contain | No |
