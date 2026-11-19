# Prompt History

A chronological log of all user prompts used to build and iterate on this application (**Amazon.sg : `iphone duo case`**).

> **Security Note:** Credentials (such as personal access tokens) have been redacted to prevent accidental secret exposure.

---

## Prompt 1
**Timestamp:** 2026-11-18 19:26:04

```text
replicate the UI of https://www.amazon.sg/s?k=iphone+duo+case&crid=22P3GFM79UZST&sprefix=iphone+duo+case%2Caps%2C414&ref=nb_sb_noss_1
```

**Summary of Changes:** Replicated the Amazon.sg search results experience for `iphone duo case`, including primary/secondary headers, Singapore postal code selector, search autocomplete, refinement sidebar (Prime, Tomorrow delivery, Singapore vs. International Store, Department, Reviews, Brands, SGD Price, Features, Deals), Sponsored Brand banner, 16 iPhone Duo case listings with generated studio product photography, colour swatches, voucher toggles, Product Quick-View modal, and slide-over Shopping Cart drawer.

---

## Prompt 2
**Timestamp:** 2026-11-18 19:45:10

```text
git push https://<REDACTED_GITHUB_TOKEN>@https://github.com/hosooying/Amazon-Duo-Case.git
```

**Summary of Changes:** Initialized Git on branch `main`, committed the full project (`1a327c3`), and pushed it to `https://github.com/hosooying/Amazon-Duo-Case.git`.

---

## Prompt 3
**Timestamp:** 2026-11-18 20:01:38

```text
add a one-click button right below the add to cart button
```

**Summary of Changes:** Added an interactive **Buy now with 1-Click** button directly below **Add to cart** on every product card (Grid & List views) and in the Quick-View Buy Box, wired to a 1-Click order confirmation modal with instant cancel/undo support.

---

## Prompt 4
**Timestamp:** 2026-11-18 20:07:08

```text
push all changes to Github
```

**Summary of Changes:** Committed and pushed the 1-Click button and confirmation modal (`95afcc3`) to `main`.

---

## Prompt 5
**Timestamp:** 2026-11-18 20:09:29

```text
the Buy now with 1-Click with contrast font in bold and blinking every 2 sec. push all changes to Github when done
```

**Summary of Changes:** Updated the **Buy now with 1-Click** button to high-contrast bold white text on deep burnt orange (`#C2410C`), added a 2-second repeating blink animation (`oneClickBlink`) pausing on hover/focus, and pushed commit `904e3e5` to `main`.

---

## Prompt 6
**Timestamp:** 2026-11-19 00:08:57

```text
embed microsoft clarity to this webpage using  the following code: 
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "zfzv2lj25n");
</script>
```

**Summary of Changes:** Embedded the Microsoft Clarity tracking script (`zfzv2lj25n`) into `<head>` in `index.html`.

---

## Prompt 7
**Timestamp:** 2026-11-19 00:10:50

```text
yes. push all changes to Github
```

**Summary of Changes:** Committed and pushed the Microsoft Clarity embed (`b218d6b`) to `main`.

---

## Prompt 8
**Timestamp:** 2026-11-19 01:01:54

```text
collate all prompts and store it under PROMPTS.md
```

**Summary of Changes:** Collated all session prompts into `PROMPTS.md` with credentials safely redacted.
