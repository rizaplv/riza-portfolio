"""Generate favicon.ico, apple-touch-icon.png, og-image.png for the portfolio."""
from PIL import Image, ImageDraw, ImageFont

BLUE = (0, 87, 255)       # --color-accent #0057FF
DARK = (14, 14, 17)       # --color-canvas dark #0e0e11
LIGHT = (255, 255, 255)
MUTED = (166, 166, 176)   # --color-ink-light dark #A6A6B0
FONTS = r"C:\Windows\Fonts"


def rounded_logo(size: int) -> Image.Image:
    """Brand mark: blue rounded square + bold white R."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = size * 0.22
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=BLUE)
    font = ImageFont.truetype(f"{FONTS}\\arialbd.ttf", int(size * 0.62))
    # center "R" via textbbox
    bb = d.textbbox((0, 0), "R", font=font)
    w, h = bb[2] - bb[0], bb[3] - bb[1]
    d.text(((size - w) / 2 - bb[0], (size - h) / 2 - bb[1]), "R", font=font, fill=LIGHT)
    return img


def main() -> None:
    # favicon.ico: 16/32/48
    logo = rounded_logo(64)
    logo.save("public/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    # apple touch icon 180x180 (no transparency)
    rounded_logo(180).convert("RGB").save("public/apple-touch-icon.png")

    # og-image 1200x630
    W, H = 1200, 630
    og = Image.new("RGB", (W, H), DARK)
    d = ImageDraw.Draw(og)
    # accent bar
    d.rectangle([0, H - 8, W, H], fill=BLUE)
    name_font = ImageFont.truetype(f"{FONTS}\\georgiab.ttf", 132)
    tag_font = ImageFont.truetype(f"{FONTS}\\arial.ttf", 40)
    d.text((84, 200), "Riza.", font=name_font, fill=LIGHT)
    d.text((86, 370), "Full-Stack Visual Designer \u00b7 From Pixels to 3D", font=tag_font, fill=MUTED)
    d.text((86, 430), "rizaplv.vercel.app", font=tag_font, fill=BLUE)
    og.save("public/og-image.png")


if __name__ == "__main__":
    main()
