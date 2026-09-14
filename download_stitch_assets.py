import json
import os
import urllib.request

DATA = {
    "project": {
        "title": "Altan Bosgo Education Platform",
        "id": "5132873439372100045"
    },
    "screens": [
        {
            "index": 1,
            "id": "14757870287337471396",
            "title": "image.png",
            "dir_name": "01_image_logo",
            "image_filename": "image.png",
            "html_filename": None,
            "image_url": "https://lh3.googleusercontent.com/aida/AEtjO1VVWN3vSAj3ry-i0N6xtTQkRYQ_ciJOn1Nypxs-bm2e8oyYVZyPeKMWIsdL-p8uwRu1fc8aY-BDbL3mG1Q1VL3typ9S5P2RCy_YbrjttFTRm6JXades7TLgf8DaVaUIRV1W8lNozJc3XIcEjPVRqfozdVCmDKC8-dSj1un6NxBQAeM552fpDqVA1YtW3HftDKi9QctRhroyJDt3Fw1Uq8MRSB4zW952zQz2Ao_cjNRnPdbesV9N5rlf8ZGPrTQxuht6kzk-6Fu5",
            "html_url": None,
            "width": 1254,
            "height": 1254,
            "deviceType": None
        },
        {
            "index": 2,
            "id": "asset-stub-assets_c736cd18bfd941a1b2f1f64f08ef95ef",
            "title": "Design System",
            "dir_name": "02_design_system",
            "image_filename": None,
            "html_filename": None,
            "image_url": None,
            "html_url": None,
            "width": None,
            "height": None,
            "deviceType": None,
            "is_design_system": True
        },
        {
            "index": 3,
            "id": "07c1cc2c6b714029bcc1de4f6eefe438",
            "title": "АЛТАН БОСГО — Монголын Боловсролын Нэгдсэн Платформ",
            "dir_name": "03_altan_bosgo_home",
            "image_filename": "screen.png",
            "html_filename": "index.html",
            "image_url": "https://lh3.googleusercontent.com/aida/AEtjO1W-2S5Txv1DPGkxcc5Yg7bCroQRpWKvKv--5lTcYDh7R7sg7_yfFo_F7GRbadjxHED1KgAppnf1Dw4aFoEZBDrdd6virjuGXfwQwmzjb-GIlNOoW71XJij0JAzSXQuUmdRL8PYTMbueYocE0AmODLL7mz045du7ld3yafihSoLtHzteOKGZkHdq85ES5tp_sQGTB-73pRfPA6kwLBxjhQ-70NKQVx3TlMCq4DVug9767vqVHCCpSHY9BzA",
            "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YjUzY2U0MDc1MTMwNDMxMDQzMmVlMTZlMjA5EgsSBxDA45WnmAgYAZIBIwoKcHJvamVjdF9pZBIVQhM1MTMyODczNDM5MzcyMTAwMDQ1&filename=&opi=89354086",
            "width": 2560,
            "height": 10100,
            "deviceType": "DESKTOP"
        },
        {
            "index": 4,
            "id": "1cad67ea67bb4a388987958226efedbb",
            "title": "Монголын Их, Дээд Сургуулиуд — Нэгдсэн Сан",
            "dir_name": "04_universities_directory",
            "image_filename": "screen.png",
            "html_filename": "index.html",
            "image_url": "https://lh3.googleusercontent.com/aida/AEtjO1VB-8zYt0YFpFzl1HFj9QPTTSDU1fuOwQ8SxGbazhSLOEbSp4k47GrAk06TBXndFihbHW7fnPtogL1f0Ymkzbh_JkSL4Zf1glf49R7NDyxpMbYqSdBpcAvcxd_mI16jbadafhJd7TknHSFc2a0pyCzZpbAdh55izqhDCaeq6PYhg97B4W1MKzP0Io7RsbsNR8BQIrEOt-DnU0h0fObmeISnxwx8Xme8khXmIyKjGM9BPjfcTZxeERCVgg",
            "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YjUzZDAyZThkZTgwMmQzYzBhMmI2MmU4ZTE4EgsSBxDA45WnmAgYAZIBIwoKcHJvamVjdF9pZBIVQhM1MTMyODczNDM5MzcyMTAwMDQ1&filename=&opi=89354086",
            "width": 3584,
            "height": 5398,
            "deviceType": "DESKTOP"
        },
        {
            "index": 5,
            "id": "4d44d962440440adb409ed4b278b9d9a",
            "title": "АЛТАН БОСГО — Мобайл Нүүр Хуудас (Mobile App View)",
            "dir_name": "05_mobile_home",
            "image_filename": "screen.png",
            "html_filename": "index.html",
            "image_url": "https://lh3.googleusercontent.com/aida/AEtjO1WqIQoTHo0l_SK5mlfah9FZWBSsi7lmiM_4EubC377Y-UgrNNlxIEY3kL-D7Yv0f7UDZJp6rAMjbg18y5h3OGxxHoSh4FadfKvHXpi11ooTlWF-mqlM9_zrS3_JvOpUGEJvbodYFjNyZSgRKu8_NX-d9yAzLlCrYGRju8CZS6mwfgumdzJnhz2-CLHoWKiNXm0ySQ2tQhuFfQVunLZ3cOZJrC2u3vQ4M6qZGLIr24jXhPPWj2puL3M_D-A",
            "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YjUzZGI0MzZhNDAwMzkyY2FiMjk1MjZjZmQxEgsSBxDA45WnmAgYAZIBIwoKcHJvamVjdF9pZBIVQhM1MTMyODczNDM5MzcyMTAwMDQ1&filename=&opi=89354086",
            "width": 780,
            "height": 5892,
            "deviceType": "MOBILE"
        },
        {
            "index": 6,
            "id": "ffa2db98e20046bba34db0b2726ce525",
            "title": "Их, Дээд Сургуулиуд — Мобайл Лавлах & Шүүлтүүр",
            "dir_name": "06_mobile_directory_filter",
            "image_filename": "screen.png",
            "html_filename": "index.html",
            "image_url": "https://lh3.googleusercontent.com/aida/AEtjO1V8iUUn216solqGrvywLu8GFQe2M1cEc4qwpxdjjXGLG8qzy0T6BLWXleszkS_QWkZyqw9HDeDxoAFKVqpSZoddWdfiRXLqmRJmR8tiG8Ovcbmkr0dwDEzBrk9CtQpHqBMugESAgdEiqqdg3zjAg-Bx3jz9WC4Bbccb5Nc4CI1-n8V_9NeJXU9zrQm10bURXYoQhBjxYHbwJfbbf3JAPnt9jRp5Vw6Co14gg-iTdLPojyCklnMvLhbQKaU",
            "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YjUzZGE1OGU4MTYwMzkyY2JjMjQ1MDgxYWQ4EgsSBxDA45WnmAgYAZIBIwoKcHJvamVjdF9pZBIVQhM1MTMyODczNDM5MzcyMTAwMDQ1&filename=&opi=89354086",
            "width": 780,
            "height": 3286,
            "deviceType": "MOBILE"
        },
        {
            "index": 7,
            "id": "0f9c5fa3c96d4f7a943c7885e8904510",
            "title": "Их Сургууль Харьцуулалт — Мобайл Матриц",
            "dir_name": "07_mobile_comparison_matrix",
            "image_filename": "screen.png",
            "html_filename": "index.html",
            "image_url": "https://lh3.googleusercontent.com/aida/AEtjO1WBvOihLpQlWh1PXJmOBtqkXbYMRj5Kw9CInytqropOiaKQh599d45pwM4qIfbohUImjljmGdqvJRMebVBHgfJtqhHaztrNzmTn0BlEG5k_pfg6mYYqrA_199uj9YZtsjsAIA3O0OUr2JRe9EVtk7UxP2F3E54cxD0-Fw1xHbDZZMUeAo2_bK0DaJW0Kit4UCPOCfrcb25ozpmS88uBtMPlcGlSAQUfm-7A-L6nobwDFwQhpyd7n04FDv4",
            "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YjUzZDlhMzgzZGIwN2M0ZWRhOGI5MmM2N2QzEgsSBxDA45WnmAgYAZIBIwoKcHJvamVjdF9pZBIVQhM1MTMyODczNDM5MzcyMTAwMDQ1&filename=&opi=89354086",
            "width": 780,
            "height": 3328,
            "deviceType": "MOBILE"
        }
    ]
}

def download_file(url, dest):
    print(f"Downloading {url[:60]}... -> {dest}")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    with urllib.request.urlopen(req) as resp, open(dest, "wb") as f:
        f.write(resp.read())
    size = os.path.getsize(dest)
    print(f"  Saved {dest} ({size} bytes)")

def main():
    base_dir = r"d:\altanbosgo"
    screens_dir = os.path.join(base_dir, "screens")
    os.makedirs(screens_dir, exist_ok=True)

    # Read designMd from step 16 output
    step16_path = r"C:\Users\zoplo\.gemini\antigravity\brain\61c8d10b-575a-4ea8-9a93-221ebedc4d3a\.system_generated\steps\16\output.txt"
    with open(step16_path, "r", encoding="utf-8") as f:
        proj_data = json.load(f)
    
    design_md = proj_data.get("designTheme", {}).get("designMd", "")

    # Save root DESIGN.md
    with open(os.path.join(base_dir, "DESIGN.md"), "w", encoding="utf-8") as f:
        f.write(design_md)
    print("Saved root DESIGN.md")

    for s in DATA["screens"]:
        s_dir = os.path.join(screens_dir, s["dir_name"])
        os.makedirs(s_dir, exist_ok=True)

        # Save metadata
        with open(os.path.join(s_dir, "metadata.json"), "w", encoding="utf-8") as f:
            json.dump(s, f, indent=2, ensure_ascii=False)

        # If design system
        if s.get("is_design_system"):
            with open(os.path.join(s_dir, "DESIGN.md"), "w", encoding="utf-8") as f:
                f.write(design_md)
            with open(os.path.join(s_dir, "design_theme.json"), "w", encoding="utf-8") as f:
                json.dump(proj_data.get("designTheme", {}), f, indent=2, ensure_ascii=False)
            print(f"Saved Design System files in {s_dir}")
            continue

        # Download image
        if s.get("image_url") and s.get("image_filename"):
            dest = os.path.join(s_dir, s["image_filename"])
            download_file(s["image_url"], dest)

        # Download html
        if s.get("html_url") and s.get("html_filename"):
            dest = os.path.join(s_dir, s["html_filename"])
            download_file(s["html_url"], dest)

    # Write a summary README.md
    readme_content = f"""# Altan Bosgo Education Platform (АЛТАН БОСГО)

Stitch Project ID: `{DATA['project']['id']}`  
Title: **{DATA['project']['title']}**

---

## Downloaded Screens & Assets

| # | Screen / Asset Title | ID | Type | Dimensions | Files |
|---|---|---|---|---|---|
| 1 | `image.png` | `14757870287337471396` | Asset / Image | 1254x1254 | [`image.png`](screens/01_image_logo/image.png) |
| 2 | `Design System` | `asset-stub-assets_c736cd18bfd941a1b2f1f64f08ef95ef` | Design System | - | [`DESIGN.md`](screens/02_design_system/DESIGN.md), [`design_theme.json`](screens/02_design_system/design_theme.json) |
| 3 | `АЛТАН БОСГО — Монголын Боловсролын Нэгдсэн Платформ` | `07c1cc2c6b714029bcc1de4f6eefe438` | Desktop Screen | 2560x10100 | [`screen.png`](screens/03_altan_bosgo_home/screen.png), [`index.html`](screens/03_altan_bosgo_home/index.html) |
| 4 | `Монголын Их, Дээд Сургуулиуд — Нэгдсэн Сан` | `1cad67ea67bb4a388987958226efedbb` | Desktop Screen | 3584x5398 | [`screen.png`](screens/04_universities_directory/screen.png), [`index.html`](screens/04_universities_directory/index.html) |
| 5 | `АЛТАН БОСГО — Мобайл Нүүр Хуудас (Mobile App View)` | `4d44d962440440adb409ed4b278b9d9a` | Mobile Screen | 780x5892 | [`screen.png`](screens/05_mobile_home/screen.png), [`index.html`](screens/05_mobile_home/index.html) |
| 6 | `Их, Дээд Сургуулиуд — Мобайл Лавлах & Шүүлтүүр` | `ffa2db98e20046bba34db0b2726ce525` | Mobile Screen | 780x3286 | [`screen.png`](screens/06_mobile_directory_filter/screen.png), [`index.html`](screens/06_mobile_directory_filter/index.html) |
| 7 | `Их Сургууль Харьцуулалт — Мобайл Матриц` | `0f9c5fa3c96d4f7a943c7885e8904510` | Mobile Screen | 780x3328 | [`screen.png`](screens/07_mobile_comparison_matrix/screen.png), [`index.html`](screens/07_mobile_comparison_matrix/index.html) |

---
"""
    with open(os.path.join(base_dir, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme_content)
    print("Saved README.md")

if __name__ == "__main__":
    main()
