# Missing Content – CS_Website_Content.pdf vs. website

Checked on 2026-10-30 against `src/lib/content.ts` and every route in `src/routes/`.

## Result

**All text copy in the PDF is on the site.** This covers meta titles and descriptions, H1s, intros, cards, buttons,
the 12 solution pages, 8 industries, 12 projects, the 10 technologies, contact details, form fields and the footer.
All internal links are also in place: related solutions, the Industrial → Smart Factories link, the technology logo
links, and the 12 solutions in the contact dropdown.

The open items below are images, logos and one content question. These need input from CS.

## Open items

| # | Page | PDF says | Website now | Action needed |
|---|------|----------|-------------|---------------|
| 1 | About → Our Clients | "Content: client logo wall." | Six logos labelled **Cloudalize, Transtek, IndoorView, Scenario Advantage, Granlund, Nomitech** (`about.clients.logos` in `src/lib/content.ts`, images in `src/assets/partner/`). These names are not in the PDF. They look like technology partners, not clients. | Get the real client logos and names from CS, then replace the list and images. |
| 2 | Industries | "Sector cards (8, each with an image)" | The 8 cards show icons, not images. | Get 8 sector images from CS and add them to the cards. |
| 3 | Technology Ecosystem | "Logo grid (10, in this order)" | Done. All 10 logos are in place (`public/tech/`). | Nothing needed. |
| 4 | Projects + Home featured projects | "Each project card shows: image…" | The 12 projects share 5 generic images (`p-hospital`, `p-towers`, `p-airport`, `scan`, `hero`), picked by name or service in `src/components/ProjectCard.tsx`. | Get a real image for each project from CS. |
| 5 | Home → Hero | "hero image (no video); all images on the site will be selected together with CS." | Uses `src/assets/hero3.png`. | Confirm with CS that this hero image is approved. |

## Notes (no action needed unless CS disagrees)

- On the Masar Destination project, the scale is "–" in the PDF, so the card hides the Scale row.
- The PDF writes headings in capitals. The site stores them in sentence case and capitalises them with CSS, so they appear the same as the PDF.
- Small labels such as "Client", "Location", "Scale", "Outcome" and "Related" come from the PDF's table headers and layout notes.


