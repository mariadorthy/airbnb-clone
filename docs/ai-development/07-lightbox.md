# 07 — Lightbox

 ## Objective

 Implement the desktop Lightbox experience for the Airbnb-style listing clone.

 The Lightbox should allow users to open any listing image from the main gallery or Photo Tour, view one image at a time, navigate between images, close the viewer, and use keyboard controls.

 Phase 7 also corrects the known Phase 6 issue where the first/main exterior image was present in the image data but was not visually displaying.

 The implementation must preserve the existing Phase 5 interactions and Phase 6 Photo Tour behavior.

---

 # AI Prompt Used

 # Phase 7 — Desktop Lightbox + Phase 6 Corrections

 You are helping me implement **Phase 7** of an Airbnb-style desktop listing clone built with React + Vite.

 ## IMPORTANT WORKFLOW RULES

 You do NOT have access to my local filesystem or terminal.

 Therefore:

 - Do not claim that you inspected my local project unless I provide the files.
- Do not claim that you modified files locally.
- Do not claim that tests passed unless I provide actual test results.
- Use the source files I provide as the source of truth.
- Generate complete code that I can manually copy into my local project.
- Clearly identify every file that must be created or modified.
- Do not fabricate browser verification.
- Do not copy source code from the Airbnb reference site.
- Do not copy implementation code from GitHub or public clone repositories.
- Use the existing project architecture.
- Make focused changes only.
- Do not introduce unrelated features.

---

 # 1\. CURRENT PROJECT CONTEXT

 The project is:

 - React
- Vite
- JavaScript
- Desktop-focused Airbnb-style listing clone
- No backend
- No React Router
- No external state-management library
- No gallery/lightbox dependency

 Phases 2–5 have already been implemented and locally verified.

 Phase 6 implemented the Photo Tour.

 The previously reported Phase 6 verification results were:

```
npm run lint
Passed

npm run build
Passed

27 modules transformed
Vite 8.3.0
Build completed successfully

npm run dev
Started successfully at http://localhost:5173/
```

 The Photo Tour is rendering.

 However, during visual inspection, one issue was discovered.

---

 # 2\. PHASE 6 KNOWN ISSUE

 The four smaller gallery images are visible.

 However, the large main/exterior image is not visually appearing.

 The same first/exterior image is also missing inside the Photo Tour.

 The rendered DOM/content still contains the first image URL, which indicates that the image data is being passed through.

 However, the actual image is not visually displaying.

 This issue must be investigated and corrected during Phase 7.

 Do not automatically assume that the existing image URL is valid.

 If the current temporary image asset is broken or inaccessible, replace it with an independently selected working image appropriate for the listing.

 Do not copy the image URL from the Airbnb reference site.

 Do not copy an image from a public Airbnb clone repository.

---

 # 3\. PHASE 7 OBJECTIVE

 Implement a desktop Lightbox / single-photo viewer.

 The Lightbox must:

 - Open when a gallery photo is activated.
- Open when a Photo Tour photo is activated.
- Display one photo at a time.
- Provide Previous and Next controls.
- Support keyboard Left Arrow navigation.
- Support keyboard Right Arrow navigation.
- Support Escape to close.
- Provide an accessible Close button.
- Move focus into the Lightbox when opened.
- Restore focus to the element that opened it when closed, where practical.
- Prevent the underlying document from scrolling while open.
- Preserve the existing Photo Tour behavior.
- Preserve Phase 5 interactions.
- Use the existing `listing.images` data.
- Use local React state.
- Add no external dependencies.
- Remain desktop-focused.

---

 # 4\. PHASE 6 CORRECTIONS

 Before or while implementing the Lightbox, correct the identified Phase 6 issues.

 ## A. Correct the broken main/exterior image

 Investigate the first image in:

```
listing.images
```

 The current first/exterior image does not visually load while the other four images do.

 Possible causes include:

 - invalid image URL;
- inaccessible external image;
- unsuitable image asset;
- incorrect image data;
- incorrect rendering behavior;
- CSS/layout issue;
- or another implementation issue.

 Do not invent the cause.

 If the supplied files do not make the cause determinable, explicitly state that the exact cause could not be confirmed.

 If necessary, replace the first image with a working independently selected asset.

 The replacement must:

 - display in the main gallery;
- display in the Photo Tour;
- display in the Lightbox;
- have appropriate alt text;
- remain part of `listing.images`;
- not be duplicated across components.

 All gallery experiences must continue using the same centralized image array.

---

 ## B. Improve focus management

 Review the current Photo Tour focus implementation.

 The Photo Tour should explicitly remember the element that opened it.

 For example:

```
Show all photos
```

 should be able to regain focus after the Photo Tour closes where practical.

 The Lightbox should similarly remember the element that opened it.

 When the Lightbox closes, focus should return to the opening image/button where practical.

 Do not claim that a complete focus trap exists unless one is actually implemented.

---

 ## C. Keyboard accessibility

 The Lightbox must support:

```
Escape      → close
ArrowLeft   → previous image
ArrowRight  → next image
Tab         → available controls
Shift+Tab   → reverse control navigation
Enter       → activate focused button
Space       → activate focused button
```

 Buttons must remain keyboard accessible.

 Visible focus indicators must remain available.

---

 # 5\. DESKTOP SCOPE

 This assignment is desktop-focused.

 Do not spend unnecessary implementation effort creating a separate mobile gallery redesign.

 Do not introduce unrelated responsive redesign work.

 The Lightbox should work correctly in the existing desktop application.

---

 # 6\. LIGHTBOX BEHAVIOR

 The Lightbox should represent a single-photo viewing experience.

 The general structure should resemble:

```
┌──────────────────────────────────────────────┐
│ Close                         Photo 2 of 5  │
│                                              │
│                                              │
│        ←     [ LARGE PHOTO ]       →        │
│                                              │
│                                              │
└──────────────────────────────────────────────┘
```

 The exact design should fit the existing application's visual system.

 Do not blindly reproduce another site's implementation.

---

 # 7\. REQUIRED LIGHTBOX CONTROLS

 ## Close

 Use a semantic button.

 Accessible name:

```
Close photo viewer
```

 The visible control may display:

```
× Close
```

 or another visually appropriate representation.

---

 ## Previous

 Use a semantic button.

 Accessible name:

```
Previous photo
```

 The button should be disabled when the first image is active.

---

 ## Next

 Use a semantic button.

 Accessible name:

```
Next photo
```

 The button should be disabled when the final image is active.

---

 ## Photo counter

 Display the current image position.

 For example:

```
Photo 2 of 5
```

 The counter must be accessible.

---

 # 8\. LIGHTBOX NAVIGATION

 The Lightbox must use:

```
listing.images
```

 as its source of truth.

 Do not duplicate image data.

 If the active image is the first image:

```
Previous
```

 must be disabled.

 If the active image is the final image:

```
Next
```

 must be disabled.

 Do not wrap from the last image back to the first image.

 Do not wrap from the first image back to the last image.

---

 # 9\. PHOTO OPENING BEHAVIOR

 The Lightbox must be available from two locations.

 ## Main listing gallery

 Activating a gallery image should:

 1. Open the Lightbox.
2. Set the Lightbox to that image's index.
3. Move focus into the Lightbox.
4. Prevent page scrolling while the Lightbox is open.

 For example:

```
Main image → Lightbox image 1
Second gallery image → Lightbox image 2
Third gallery image → Lightbox image 3
```

 and so on.

---

 ## Photo Tour

 Activating an image inside Photo Tour should:

 1. Open the Lightbox.
2. Use the correct image index.
3. Keep the Photo Tour underneath the Lightbox.
4. Prevent the underlying document from scrolling.
5. Allow the Lightbox to be closed independently.
6. Return the user to the Photo Tour after the Lightbox closes.

 The Photo Tour must not itself be replaced by the Lightbox.

 The two experiences should remain separate.

---

 # 10\. COMPONENT ARCHITECTURE

 Prefer a dedicated component:

```
src/components/Lightbox.jsx
```

 Suggested architecture:

```
App
 ├── Header
 ├── ListingHeader
 ├── ImageGallery
 │     └── opens Lightbox
 ├── PhotoTour
 │     └── opens Lightbox
 ├── Listing Content
 ├── ReservationCard
 ├── Lightbox
 └── Footer
```

 Use local React state.

 Do not add:

 - React Router;
- Redux;
- Zustand;
- gallery libraries;
- modal libraries;
- icon libraries;
- focus-management libraries.

---

 # 11\. FILES TO CREATE

 Prefer creating only:

```
src/components/Lightbox.jsx
```

 Additional files should only be created if genuinely necessary.

---

 # 12\. FILES THAT MAY NEED MODIFICATION

 Potential files include:

```
src/App.jsx
src/App.css
src/components/ImageGallery.jsx
src/components/PhotoTour.jsx
src/data/listing.js
```

 Do not modify files unnecessarily.

 If a file does not require changes, leave it unchanged.

---

 # 13\. PRESERVE PHASE 5 FUNCTIONALITY

 Do not break the existing Phase 5 functionality.

 The following must continue working:

 - Share;
- Save;
- Check-in date;
- Check-out date;
- Guest selector;
- Dynamic pricing;
- Description Show more / Show less;
- Amenities Show all / Show fewer;
- Existing keyboard interactions;
- Existing focus states.

 Do not rewrite unrelated components.

---

 # 14\. PRESERVE PHOTO TOUR FUNCTIONALITY

 The Photo Tour must continue to:

 - Open from Show all photos.
- Display all listing images.
- Scroll vertically.
- Close using the Close button.
- Close using Escape.
- Lock underlying document scrolling.
- Restore document scrolling when closed.
- Maintain its existing visual presentation.

 Phase 7 should only extend the Photo Tour so that an individual photo can open the Lightbox.

---

 # 15\. NESTED PHOTO TOUR + LIGHTBOX BEHAVIOR

 This is important.

 If the user opens the Lightbox from the Photo Tour:

```
Listing
   ↓
Photo Tour
   ↓
Lightbox
```

 Closing the Lightbox must return to:

```
Photo Tour
```

 It must NOT immediately close the Photo Tour.

 The Photo Tour should remain open underneath.

 The underlying page must remain locked while the Photo Tour is open.

 Therefore, closing the Lightbox must not accidentally restore normal page scrolling while the Photo Tour remains active.

---

 # 16\. ACCESSIBILITY REQUIREMENTS

 Use semantic HTML.

 The Lightbox should use:

```
role="dialog"
aria-modal="true"
```

 Provide an accessible dialog label or heading.

 Buttons must have meaningful accessible names.

 Images must have meaningful alt text.

 Keyboard requirements:

```
Escape      → close
ArrowLeft   → previous
ArrowRight  → next
Tab         → available controls
Shift+Tab   → reverse controls
Enter       → activate
Space       → activate
```

 Focus behavior:

 1. User activates an image.
2. Lightbox opens.
3. Focus moves to a meaningful Lightbox control.
4. Close is preferred.
5. User navigates using keyboard.
6. User closes Lightbox.
7. Focus returns to the opening image/control where practical.

 Do not claim a complete focus trap unless the implementation actually provides one.

---

 # 17\. DOCUMENT SCROLL LOCKING

 While the Lightbox is open, prevent background scrolling.

 An implementation such as:

```
document.body.style.overflow = "hidden";
```

 may be used.

 When closing:

 - restore the previous body overflow value;
- restore normal document scrolling where appropriate.

 The implementation must be careful with:

```
PhotoTour + Lightbox
```

 nested behavior.

 If Lightbox is opened from Photo Tour:

```
Lightbox closes
↓
Photo Tour remains open
↓
Page remains scroll-locked
```

 Only when Photo Tour itself closes should normal document scrolling be restored.

---

 # 18\. VISUAL DESIGN

 The Lightbox should feel consistent with the existing project.

 Reuse existing:

 - typography;
- spacing;
- border-radius conventions;
- shadows;
- colors;
- CSS variables;
- focus styles.

 Do not copy exact CSS from Airbnb.

 Do not copy CSS from public clone repositories.

 Do not intentionally make the design different just to appear innovative.

 The implementation should prioritize:

 - fidelity;
- accessibility;
- clean architecture;
- maintainability;
- original implementation.

---

 # 19\. IMAGE ASSET ORIGINALITY

 The project currently uses temporary external image assets.

 For Phase 7:

 - Do not copy images from Airbnb.
- Do not copy URLs from Airbnb.
- Do not copy images from public Airbnb clone repositories.
- Do not copy source code from public clone repositories.
- If replacing the broken exterior image, use an independently selected working asset.
- Keep image data centralized in `listing.js`.
- Do not duplicate image URLs across components.

 Document the replacement decision.

---

 # 20\. NO UNRELATED FEATURES

 Do NOT implement:

 - authentication;
- backend;
- payment;
- booking submission;
- API integration;
- search;
- routing;
- mobile redesign;
- image zoom;
- image editing;
- image downloading;
- favorites persistence;
- database;
- URL/history Lightbox state.

 These are outside Phase 7 scope.

---

 # 21\. OUTPUT FORMAT

 The response must contain the following sections in exactly this order.

 ## 1\. Implementation Summary

 Explain:

 - what was implemented;
- how the Lightbox works;
- how Photo Tour integration works;
- how focus is handled;
- how scroll locking is handled.

---

 ## 2\. Phase 6 Corrections

 Explicitly explain:

 - the main/exterior image issue;
- whether the exact cause was determinable;
- what was changed;
- how focus management was improved;
- what was intentionally left unchanged.

 Do not invent the cause of the image issue.

---

 ## 3\. Files Created

 List every new file.

---

 ## 4\. Files Modified

 List every modified file and explain why.

---

 ## 5\. Files Not Modified

 List important Phase 5/6 files that were intentionally left unchanged.

---

 ## 6\. Dependencies

 State whether package.json changes.

 Expected:

```
No dependency changes.
```

 unless a dependency is genuinely required.

---

 ## 7\. Complete Code

 Provide the complete contents of every new or modified file.

 Do not provide partial snippets.

 Do not say:

```
rest of the CSS remains unchanged
```

 Instead, provide the complete file.

 I need to be able to copy each file directly into my project.

---

 ## 8\. Copy Instructions

 Tell me exactly:

 - which files to create;
- which files to replace;
- which files to edit;
- whether an image/data value needs changing.

---

 ## 9\. Local Test Commands

 Provide:

```
npm run lint
npm run build
npm run dev
```

 Do not claim that they passed.

---

 ## 10\. Manual Browser Verification

 Provide a detailed checklist.

 ### Lightbox opening

 - Main gallery image opens Lightbox.
- Second gallery image opens correct Lightbox image.
- Other gallery images open correct Lightbox image.
- Photo Tour image opens Lightbox.
- Correct image index is displayed.

 ### Navigation

 - Previous works.
- Next works.
- Previous is disabled on first image.
- Next is disabled on last image.
- Left Arrow works.
- Right Arrow works.
- Navigation does not wrap.

 ### Closing

 - Close button works.
- Escape works.
- Lightbox closes without closing Photo Tour when opened from Photo Tour.
- Photo Tour remains visible underneath.
- Scroll remains locked while Photo Tour is open.
- Photo Tour can still be closed normally.
- Focus restoration works where practical.

 ### Image assets

 - Main/exterior image visually displays.
- All five gallery images display.
- All Photo Tour images display.
- All Lightbox images display.
- Alt text is present.

 ### Phase 5 regression

 Verify:

 - Share;
- Save;
- Check-in;
- Check-out;
- Guest selector;
- Dynamic pricing;
- Description Show more / Show less;
- Amenities Show all / Show fewer.

---

 ## 11\. Accessibility Verification

 Check:

 - Semantic buttons.
- Accessible button names.
- Dialog semantics.
- Accessible dialog label.
- Focus moves into Lightbox.
- Escape works.
- Arrow keys work.
- Tab works.
- Shift+Tab works.
- Enter/Space activate buttons.
- Visible focus indicators remain visible.
- Focus returns to opening trigger where practical.
- Disabled navigation buttons are correctly exposed.
- Images have useful alt text.
- No unnecessary ARIA is used.
- No claim of a complete focus trap unless one is actually implemented.

---

 ## 12\. Known Limitations

 Only list real limitations.

 Possible limitations may include:

 - temporary external image assets;
- desktop-focused implementation;
- no zoom;
- no download;
- no URL/history state;
- no mobile redesign.

 Do not claim something is implemented if it was not actually implemented.

---

 ## 13\. AI Development Log

 Record:

 ### Objective

 Implement desktop Lightbox behavior and correct Phase 6 image/focus issues.

 ### Implementation approach

 Describe the dedicated Lightbox component, React state, trigger refs, image index handling, keyboard handling, and Photo Tour integration.

 ### Phase 6 corrections

 Describe the first-image replacement and focus-management improvements.

 ### Image asset decision

 Explain why the first image was replaced and confirm that the replacement is independently selected.

 ### Accessibility approach

 Describe:

 - semantic buttons;
- dialog semantics;
- keyboard navigation;
- focus behavior;
- accessible labels;
- visible focus styles.

 ### State management

 Document the local React state used for:

```
Photo Tour open/closed
Lightbox active image
```

 ### Files changed

 Record every created and modified file.

 ### Dependencies

 Record:

```
No dependency changes.
```

 unless otherwise required.

 ### Testing status

 Do not claim testing unless actual results are supplied.

---

 ## 14\. Final Status

 Use exactly:

```
PHASE: 7
OBJECTIVE: Implement desktop Lightbox behavior and correct identified Phase 6 issues.
COMPLETED: [describe implementation actually prepared]
TESTED: Not tested by AI; local verification required.
REMAINING: [specific local verification items]
STATUS: IMPLEMENTED — LOCAL VERIFICATION REQUIRED
```

 Do not mark Phase 7 as fully verified unless I provide actual local verification results separately.

---

 # 22\. SOURCE FILES TO BE PROVIDED

 I will provide the current versions of these files from my local project:

```
src/App.jsx
src/App.css
src/index.css
src/components/Header.jsx
src/components/ListingHeader.jsx
src/components/ImageGallery.jsx
src/components/PhotoTour.jsx
src/components/PropertySummary.jsx
src/components/Amenities.jsx
src/components/Description.jsx
src/components/ReservationCard.jsx
src/components/Footer.jsx
src/data/listing.js
package.json
```

 Use these files as the source of truth.

 Do not assume that their contents are identical to an earlier phase.

---

 # 23\. FINAL IMPORTANT RULE

 This is an AI-assisted development workflow.

 The AI development record must remain transparent.

 Therefore:

 - Do not fabricate tests.
- Do not fabricate browser results.
- Do not say "verified" unless actual verification was provided.
- Do not claim local file changes.
- Do not copy source code from the reference website.
- Do not copy source code from public clone repositories.
- Do not copy image assets from public clones.
- Do not intentionally alter required UI just to make it look innovative.
- Do not invent the cause of an unresolved bug.
- Focus on faithful implementation.
- Focus on clean architecture.
- Focus on accessibility.
- Focus on originality of implementation and assets.
- Preserve existing functionality.
- Clearly document every change.

 Now analyze the supplied source files and generate the complete Phase 7 implementation according to all requirements above.
