# Visual comparison

Screenshot-based comparison of this application against the reference listing.

## Evidence boundary

| Kind | What it covers |
| --- | --- |
| **Source verified** | Folder and file names in `screenshots/` as of this documentation pass |
| **Screenshot observed (2026-09-20)** | What is visible in the PNG files listed below; not a live browser session |
| **Existing documentation** | Informal notes previously in `docs/ai-development/README.md` |
| **Historical evidence** | Phase 12 conversation (18 Sep 2026); git commit `9ccbf93` added the screenshot files |
| **Pending** | Formal completed parity audit; live reference + local re-check |

This document does **not** claim pixel-perfect match and does **not** invent test IDs that were never run on the current build.

## Folders

```text
screenshots/
  reference/         Target listing captures
  implementation/    This app’s captures
```

Added in git `9ccbf93` (2026-09-20), message `Added files`. Capture tool, viewport, and zoom are **not** recorded in the repository.

## File inventory

### Numbered files (same names, not always the same section)

| Name | `reference/` | `implementation/` |
| --- | --- | --- |
| `01.png` | Yes | Yes |
| `02.png` | Yes | Yes |
| `03.png` | Yes | Yes |
| `04.png` | Yes | Yes |
| `05.png` | Yes | Yes |
| `06.png` | Yes | Yes |
| `07.png` | Yes | Yes |
| `08.png` | Yes | Yes |
| `09.png` | Yes | Yes |

**Important:** Matching filenames do **not** mean matching page sections. Examples from opening the PNGs on 2026-09-20:

| File | Reference (screenshot observed) | Implementation (screenshot observed) |
| --- | --- | --- |
| `01.png` | Hero gallery (property photos, search-style header) | Hero gallery (different photos; listing sticky nav visible) |
| `02.png` | Highlights + reservation card (promo banner, guest favourite) | Host/highlights + sleeping cards + reservation card |
| `03.png` | Sleeping photos + amenities list (“Show all 50 amenities”) | Amenities list + “Take a tour of this home” |
| `04.png` | Availability calendar + large 4.95 guest-favourite block | “Where you’ll be” + Google Map of Candolim |
| `08.png` | Host card, co-hosts, things to know | Things to know + nearby stays (host block not in this frame) |
| `09.png` | “More stays nearby” carousel | Nearby stays + footer |

Use named files below when comparing a specific overlay or modal.

### Named overlay / section files

| Topic | Reference | Implementation | Notes |
| --- | --- | --- | --- |
| Amenities modal | `amenities.png` | `amenities.png` | Comparable topic; layout differs (reference: narrow single column; implementation: two-column modal) |
| Lightbox | `light-box.png` | `lightbox.png` | **Different filenames** |
| Photo Tour | `photo-tour-1.png` … `photo-tour-4.png` | `photo-tour-1.png` … `photo-tour-3.png` | Reference has a fourth capture; implementation does not |

## Recommended comparison process

**Current recommendation**

1. Open reference and local app at a similar desktop width (about 1280–1440px) and 100% zoom.
2. Capture **the same section** into paired names (`listing-hero.png`, `reservation-card.png`, …). Avoid relying on `04.png` ≡ `04.png`.
3. Align overlay pairs: Photo Tour, Lightbox, amenities modal.
4. Record PASS / FAIL / NEEDS IMPROVEMENT / NOT TESTED / BLOCKED with the screenshot path as evidence.
5. If the reference returns HTTP 429 or a bot check, mark the row **BLOCKED** (this happened in the Phase 12 session).

Vite may serve the app on `http://localhost:5173/` or another port if 5173 is busy.

## Screenshot observations (2026-09-20)

These are observations from the stored PNGs only.

**Closer structural alignment (still not a parity claim)**

- Same listing title appears on both hero captures: “Romantic Jacuzzi 1BHK Candolim | Mirashya UG10”.
- Both show Share/Save, a five-image gallery, and “Show all photos”.
- Both amenity summaries include Kitchen, Wifi, workspace, parking, pool, hot tub, pets, cameras, and missing CO/smoke alarms.
- Both Photo Tour frames use a “Photo tour” title and room groupings.
- Both Lightbox frames show prev/next and a photo counter.

**Visible differences (screenshot observed)**

- **Photography:** reference uses the actual listing photos; implementation uses other interior/stock-style photos (consistent with external URLs in `src/data/listing.js`).
- **Header / nav:** implementation `01.png` shows a listing sticky bar (Photos / Amenities / Reviews / Location / price / Reserve) under the site header; the reference `01.png` frame does not show that bar (it does appear in later reference frames such as `03.png`).
- **Reservation card:** reference shows a “Get 10% off” claim banner, dropdown guests, and “Free cancellation before 17 October”. Implementation shows +/- guests, rating on the card, and “Price updates based on the selected number of nights”.
- **Sleeping arrangements:** reference `03.png` uses room photographs; implementation `02.png` uses icon cards.
- **Amenities control:** both show “Show all 50 amenities” in the `03.png` pair; informal user notes say the implementation count felt like 44 vs 50 (see below). That note is **not** re-counted here.
- **Lightbox:** reference `light-box.png` is a light viewer (“Additional photos”, “34 of 43”); implementation `lightbox.png` is a dark viewer (“Photo 19 of 30”).
- **Map / calendar:** not paired by filename (see `04.png` table).
- **Nearby stays / footer:** present in implementation `08.png`/`09.png` and reference `09.png`; layout differs.

No hover, keyboard, or focus behavior can be claimed from still images.

## Phase 12 session (18 Sep 2026)

**Historical evidence** from conversation [Phase 12 visual fidelity audit](66146327-e57d-4ae4-b9d7-eb240c493554):

- Formal table IDs VIS-01…A11Y-01 were mostly **BLOCKED** or **NOT TESTED** because the reference was inaccessible and no browser tool was available.
- Final decision: **MORE VERIFICATION REQUIRED**.
- Some source comments from that day (map placeholder copy, Unsplash-only images) are **stale** relative to current `src/App.jsx` and `src/data/listing.js`.

Do not treat that table as a current pass/fail report.

## Informal user checklist notes

**Existing documentation.** The following text was the entire previous `docs/ai-development/README.md` (git `2bd253e`, 2026-09-20). It is preserved as user notes. Abbreviations (`app1`, `nav1`, `am2`, `fin4`, …) are not defined elsewhere in the repo. `pass` is the author’s mark, not an automated test.

```text
app1 - pass 
app2 -pass 
app3 - pass
app4- got this error in console 
[Intervention] Images loaded lazily and replaced with placeholders. Load events are deferred. See https://go.microsoft.com/fwlink/?linkid=2048113

nav1- initial header in reference 
name logo   homeicon Anywhere   Anytime Add guests(3things a banner like with | separation and last a search icon)  Become a host   (global icon)   (a 3 line)
the below one seen only when scroll down 
    Photos      Amenities   Reviews     Location    ₹28,499 for 5   nights   4.95 · 19 reviews
Reserve

ours is different totally but working not broken one 

nav2-sticky nav seen when scroll down and not scroll
nav3 - pass
nav4 - pass 
nav5 - pass
nav6-pass
nav7-pass
nav8- pass

am1-pass
am2-44 my thing (reference is 50)
am3-pass
am4-pass
am5-marked out (not in modal) pass
am6-pass
am7-that cross ah - pass
am8-clicked tab got only cross (not backside) pass
am9-pass

desc1- pass
desc2-pass
desc3-pass
desc4-pass

res1 - pass
res2-pass
res3-pass
res4-pass
res5-pass
res6-pass
res7 - pass
res8-pass
res9-pass
res10-pass
res11-pass
res12 - Add dates to see your stay details. pass
res13- Add dates to see your stay details. pass
res14 - pass
res15 - pass
res16-pass

rev1-pass
rev2-pass
rev3-pass
rev4-pass
rev5-pass
rev6-This demo currently displays 6 of 19 reviews. pass

loc1 - pass
loc2-pass
loc3-so i clicked map link it goes to new tab opening only candolim not hotel pass
loc4-pass
loc5-pass

hos1-pass
hos2-pass
hos3-pass
hos4-pass
| HOST-05 | Check payment safety message | Safety/payment message appears | PENDING |
To help protect your payment, always use Airbnb to send money and communicate with hosts.
this ahh pass

kn1-Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund. pass but its is basic like not changing like that make it like before checkin like that ?

kn2-pass
kn3-pass
kn4-pass

ne1-pass
ne2-pass
ne3-pass
ne4-pass

ctrl1-pass
ctrl2-pass
ctrl3-pass
ctrl4-pass(but not know that is for lang)
ctrl5-acc is not like acc it should be like avatar like that 
ctrl6- pass
ctrl7-pass
ctrl8-pass

ally1-pass
ally2-pass
ally3-pass
ally4-pass
ally5-pass
ally6-pass
ally7-pass
ally8-pass

ui1-pass i think 
ui2-
this ui part idk how to do when i see i think and looks like same but when checked i dont know 


fin1-no block i think
fin2-only 1 error which i gave before 
fin3-done
fin4-not yet ready
fin5-not yet what i should put 
fin6-not yer done
fin7-not yet

ph1-pass
ph2-pass
ph3-pass
ph4-pass
ph5-pass

to1-pass
t02-pass
t03-pass
t04-pass
t05-pass
t06-pass
t07-pass
t08-pass
t09-pass
t10-pass
t11-pass
t12-pass
t13-pass
t14-pass
t15-pass

lig1-pass
lig2-pass
lig3-pass
lig4-pass
lig5-pass
lig6-pass
lig7-pass
lig8-pass
lig9-pass
lig10-pass
```

Items the author marked unfinished (`fin4`–`fin7`, `ui2`, `kn1` nuance, `ctrl5`, `nav1` difference) remain **pending** unless a later verified audit supersedes them.

## Architecture diagram (not a listing screenshot)

[`../architecture/architecture-diagram.png`](../architecture/architecture-diagram.png) is a **proposed** production-system drawing (from [`architecture-diagram-code.puml`](../architecture/architecture-diagram-code.puml)). Do not use it as a visual-QA baseline for the listing page.

## Prompt B implementation changes (2026-09-20)

The following differences noted in earlier observations were resolved by the Prompt B implementation pass:

- **`amenityCount`**: was `50` (mismatching 43 unique category items). After Prompt B: `amenityCount: 44` (44 unique items — "Cot" duplicate removed, "Exercise equipment" added to "Family" category). Button now reads "Show all 44 amenities".
- **Alt text**: 21 images had `alt: "Living room additional view"` regardless of subject. All corrected with accurate descriptions per image category (bedroom, bathroom, gym, exterior, pool, wardrobe, etc.).
- **Gym images**: `gym-1/2/3` in `listing.images` all used the same Unsplash URL. Now three distinct URLs matching the photoTourSections gym references.
- **Duplicate heading**: "Entire serviced apartment…" + counts appeared twice on the page. The redundant `<section className="property-details">` above PropertySummary was removed from `App.jsx`.
- **Review button**: "View review count" renamed to "Show all 19 reviews".
- **`defaultBooking`**: now wired as props to `ReservationCard` — no longer dead data.
- **Page title**: changed from `playpower-airbnb-clone` to `Romantic Jacuzzi 1BHK Candolim | Mirashya UG10`.

The following observation **remains accurate** after Prompt B (not changed by implementation):

- Reference uses actual listing photos; implementation uses stock CDN images.
- Reference amenities modal is single-column narrow; implementation uses two-column layout.
- Reference Lightbox is light-themed; implementation Lightbox is dark.
- Reference has guest-favourite badge and promo banner; implementation does not.
- `screenshots/implementation/photo-tour-4.png` is still missing.
- Lightbox screenshot naming mismatch: reference `light-box.png` vs implementation `lightbox.png`.


