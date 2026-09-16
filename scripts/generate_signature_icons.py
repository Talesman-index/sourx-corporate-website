import os
import math
from PIL import Image, ImageDraw

out_dir = "/Users/shalomtalesman/Projects_/Sourx projects/Sourx website/public/images/signature"
os.makedirs(out_dir, exist_ok=True)

# SOURX Brand blue
COLOR = (37, 116, 169, 255) # #2574A9
NAVY = (1, 46, 92, 255)     # #012E5C

def create_base_canvas(size=64):
    return Image.new("RGBA", (size, size), (255, 255, 255, 0))

# 1. Phone Icon
def draw_phone():
    im = create_base_canvas(128)
    draw = ImageDraw.Draw(im)
    # Draw smooth phone handset curve
    # Points for a clean classic phone handset
    # We can draw high-res 128x128 and resize to 48x48 with LANCZOS for super crisp anti-aliasing
    coords = [
        (38, 28), (48, 20), (62, 32), (54, 46),
        (58, 56), (72, 70), (82, 74), (96, 66),
        (108, 80), (100, 90), (84, 102), (64, 98),
        (46, 80), (30, 58), (26, 42)
    ]
    draw.polygon(coords, fill=COLOR)
    # Smoothen with corners
    draw.ellipse([34, 24, 52, 42], fill=COLOR)
    draw.ellipse([92, 72, 110, 96], fill=COLOR)
    # Resize to 48x48
    im_48 = im.resize((48, 48), Image.Resampling.LANCZOS)
    im_48.save(os.path.join(out_dir, "icon-phone.png"), "PNG")

# 2. Email Icon
def draw_email():
    im = create_base_canvas(128)
    draw = ImageDraw.Draw(im)
    # Envelope outer rounded rect
    draw.rounded_rectangle([18, 32, 110, 96], radius=14, outline=COLOR, width=8)
    # Envelope flap lines
    draw.line([(24, 38), (64, 68), (104, 38)], fill=COLOR, width=8, joint="curve")
    im_48 = im.resize((48, 48), Image.Resampling.LANCZOS)
    im_48.save(os.path.join(out_dir, "icon-email.png"), "PNG")

# 3. Website / Globe Icon
def draw_website():
    im = create_base_canvas(128)
    draw = ImageDraw.Draw(im)
    # Outer circle
    draw.ellipse([18, 18, 110, 110], outline=COLOR, width=8)
    # Horizontal equator
    draw.line([(18, 64), (110, 64)], fill=COLOR, width=8)
    # Vertical meridian ellipse
    draw.ellipse([42, 18, 86, 110], outline=COLOR, width=8)
    im_48 = im.resize((48, 48), Image.Resampling.LANCZOS)
    im_48.save(os.path.join(out_dir, "icon-website.png"), "PNG")

# 4. Location / Pin Icon
def draw_location():
    im = create_base_canvas(128)
    draw = ImageDraw.Draw(im)
    # Pin head
    draw.ellipse([34, 18, 94, 78], fill=COLOR)
    # Pin point triangle
    draw.polygon([(40, 60), (88, 60), (64, 112)], fill=COLOR)
    # Inner cutout circle
    draw.ellipse([50, 34, 78, 62], fill=(255, 255, 255, 0))
    im_48 = im.resize((48, 48), Image.Resampling.LANCZOS)
    im_48.save(os.path.join(out_dir, "icon-location.png"), "PNG")

# 5. LinkedIn Icon
def draw_linkedin():
    im = create_base_canvas(128)
    draw = ImageDraw.Draw(im)
    # Rounded badge
    draw.rounded_rectangle([18, 18, 110, 110], radius=24, fill=COLOR)
    # "in" text
    # "i" dot
    draw.ellipse([38, 36, 48, 46], fill=(255, 255, 255, 255))
    # "i" stem
    draw.rectangle([38, 54, 48, 92], fill=(255, 255, 255, 255))
    # "n" stem
    draw.rectangle([58, 54, 68, 92], fill=(255, 255, 255, 255))
    # "n" arch and right stem
    draw.rounded_rectangle([58, 54, 90, 76], radius=10, outline=(255, 255, 255, 255), width=10)
    draw.rectangle([80, 66, 90, 92], fill=(255, 255, 255, 255))
    im_48 = im.resize((48, 48), Image.Resampling.LANCZOS)
    im_48.save(os.path.join(out_dir, "icon-linkedin.png"), "PNG")

draw_phone()
draw_email()
draw_website()
draw_location()
draw_linkedin()
print("All signature PNG icons generated successfully!")
