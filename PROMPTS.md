# Image prompts

Two portraits drive the site. Both are currently graded crops of the source
photograph (`public/myself.jpg`), which is a close phone selfie — usable, but it
is the weakest thing on the page. Generate replacements and save them at the
**same paths**; nothing in the code needs to change.

| Path | Size | Used by | CSS treatment applied on top |
| --- | --- | --- | --- |
| `public/portrait-hero.jpg` | 1200 × 1600 (3:4) | `Hero` — full-bleed behind the headline | `mix-blend-luminosity`, a peach `mix-blend-color` wash, a flat `ink/56%` scrim, and two gradient scrims |
| `public/portrait-about.jpg` | 1000 × 1000 (1:1) | `Curious` — the portrait panel beside the toolkit | a peach `multiply` wash at 25% |

Because the site desaturates and re-tints both images, **do not** ask for a
colourful result — ask for tonal range. Contrast and silhouette are what
survive; hue does not.

---

## 1 — Hero portrait (`portrait-hero.jpg`)

Attach a clear photo of your face as the reference, then:

> Using the attached photo as the likeness reference, create an editorial
> portrait of the same man in a 3:4 vertical frame, 1200×1600.
>
> Framing: a three-quarter chest-up shot, body angled slightly away from camera,
> eyes to the lens. Place him in the **right third** of the frame and leave the
> left two-thirds as open negative space — large display type is set over that
> area. Keep the lower half of the frame visually quiet.
>
> Light: a single hard key from camera-left, deep falloff into shadow on the
> opposite side, no fill. Strong specular edge along the jaw and shoulder.
> Photographic, not rendered.
>
> Palette: near-monochrome. Warm neutral background, close to a deep taupe, with
> no separate background colour or props. Skin retains detail in both highlight
> and shadow — nothing clipped to pure white or pure black.
>
> Wardrobe: a plain dark crew-neck or overshirt. No logos, no patterns, no
> jewellery.
>
> Mood: composed and direct, the register of a design studio's founder page —
> not a corporate headshot, not a smile for the camera.
>
> No text, no watermark, no border, no vignette, no depth-of-field bokeh balls.
> Sharp throughout.

## 2 — About portrait (`portrait-about.jpg`)

> Using the attached photo as the likeness reference, create a square 1000×1000
> portrait of the same man, matching the lighting and wardrobe of the previous
> image so the two read as one shoot.
>
> Framing: closer — head and shoulders, centred, looking slightly off-camera to
> the right. Crop the top of the head slightly for an editorial feel.
>
> Light: same single hard key from camera-left, same deep shadow side.
>
> Palette: near-monochrome, warm neutral ground, no background colour.
>
> No text, no watermark, no border. Sharp throughout.

---

## Optional — a third asset

If you want the hero to carry more of the juanmora.co feel, generate a **wide**
environmental frame as well and swap it in for the hero:

> A 3:4 vertical editorial photograph, 1200×1600, of the same man seated at a
> desk in a large, mostly empty room, shot from across the space so he occupies
> roughly a fifth of the frame in the lower right. Hard directional daylight from
> a single window camera-left, deep shadow elsewhere, warm neutral concrete and
> timber surfaces, near-monochrome. Wide angle, everything sharp. No text, no
> watermark.

That one works particularly well under the headline, because the negative space
is architectural rather than a blurred backdrop.

---

## Checking a result

Drop the file in, reload, and look for three things:

1. **The headline stays readable** across the whole left side at 1440px and at
   390px. The scrim is doing a lot of work, but a bright highlight sitting under
   the first letters will still show.
2. **No face lands under the type.** The morph headline occupies the lower half
   of the hero.
3. **It survives desaturation.** Squint at it in greyscale — if the subject
   separates from the background there, the peach tint will look intentional.
