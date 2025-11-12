import { d as createAstro, c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate, r as renderComponent, F as Fragment, b as addAttribute } from '../chunks/astro/server_BCNEJCVl.mjs';
import 'kleur/colors';
import { a as $$Button, b as $$PageLayout } from '../chunks/PageLayout_D97eilMe.mjs';
import { $ as $$WidgetWrapper, a as $$Headline } from '../chunks/Headline_CwMfdM8a.mjs';
import { $ as $$Features2 } from '../chunks/Features2_kLskwY-I.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro("https://xuxm0678.github.io");
const $$HeroText = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$HeroText;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline,
    content = await Astro2.slots.render("content"),
    callToAction = await Astro2.slots.render("callToAction"),
    callToAction2 = await Astro2.slots.render("callToAction2")
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative md:-mt-[76px] not-prose"> <div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6"> <div class="pt-0 md:pt-[76px] pointer-events-none"></div> <div class="py-12 md:py-20 pb-8 md:pb-8"> <div class="text-center max-w-5xl mx-auto"> ${tagline && renderTemplate`<p class="text-base text-secondary dark:text-blue-200 font-bold tracking-wide uppercase intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">${unescapeHTML(tagline)}</p>`} ${title && renderTemplate`<h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200 intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">${unescapeHTML(title)}</h1>`} <div class="max-w-3xl mx-auto"> ${subtitle && renderTemplate`<p class="text-xl text-muted mb-6 dark:text-slate-300 intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">${unescapeHTML(subtitle)}</p>`} <div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade"> ${callToAction && renderTemplate`<div class="flex w-full sm:w-auto"> ${typeof callToAction === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(callToAction)}` })}` : renderTemplate`${renderComponent($$result, "Button", $$Button, { "variant": "primary", ...callToAction })}`} </div>`} ${callToAction2 && renderTemplate`<div class="flex w-full sm:w-auto"> ${typeof callToAction2 === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(callToAction2)}` })}` : renderTemplate`${renderComponent($$result, "Button", $$Button, { ...callToAction2 })}`} </div>`} </div> </div> ${content && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`} </div> </div> </div> </section>`;
}, "/Users/maggiexu/xuxm0678.github.io/src/components/widgets/HeroText.astro", void 0);

const $$Astro$1 = createAstro("https://xuxm0678.github.io");
const $$Form = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Form;
  const { inputs, textarea, disclaimer, button = "Contact us", description = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form> ${inputs && inputs.map(
    ({ type = "text", name, label = "", autocomplete = "on", placeholder = "" }) => name && renderTemplate`<div class="mb-6"> ${label && renderTemplate`<label${addAttribute(name, "for")} class="block text-sm font-medium"> ${label} </label>`} <input${addAttribute(type, "type")}${addAttribute(name, "name")}${addAttribute(name, "id")}${addAttribute(autocomplete, "autocomplete")}${addAttribute(placeholder, "placeholder")} class="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"> </div>`
  )} ${textarea && renderTemplate`<div> <label for="textarea" class="block text-sm font-medium"> ${textarea.label} </label> <textarea id="textarea"${addAttribute(textarea.name ? textarea.name : "message", "name")}${addAttribute(textarea.rows ? textarea.rows : 4, "rows")}${addAttribute(textarea.placeholder, "placeholder")} class="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"></textarea> </div>`} ${disclaimer && renderTemplate`<div class="mt-3 flex items-start"> <div class="flex mt-0.5"> <input id="disclaimer" name="disclaimer" type="checkbox" class="cursor-pointer mt-1 py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"> </div> <div class="ml-3"> <label for="disclaimer" class="cursor-pointer select-none text-sm text-gray-600 dark:text-gray-400"> ${disclaimer.label} </label> </div> </div>`} ${button && renderTemplate`<div class="mt-10 grid"> ${renderComponent($$result, "Button", $$Button, { "variant": "primary", "type": "submit" }, { "default": ($$result2) => renderTemplate`${button}` })} </div>`} ${description && renderTemplate`<div class="mt-3 text-center"> <p class="text-sm text-gray-600 dark:text-gray-400">${description}</p> </div>`} </form>`;
}, "/Users/maggiexu/xuxm0678.github.io/src/components/ui/Form.astro", void 0);

const $$Astro = createAstro("https://xuxm0678.github.io");
const $$Contact$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact$1;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline = await Astro2.slots.render("tagline"),
    inputs,
    textarea,
    disclaimer,
    button,
    description,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-7xl mx-auto ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline })} ${inputs && renderTemplate`${maybeRenderHead()}<div class="flex flex-col max-w-xl mx-auto rounded-lg backdrop-blur border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow p-4 sm:p-6 lg:p-8 w-full"> ${renderComponent($$result2, "FormContainer", $$Form, { "inputs": inputs, "textarea": textarea, "disclaimer": disclaimer, "button": button, "description": description })} </div>`}` })}`;
}, "/Users/maggiexu/xuxm0678.github.io/src/components/widgets/Contact.astro", void 0);

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Contact"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Contact", "title": "Let's Connect!" })} ${renderComponent($$result2, "ContactUs", $$Contact$1, { "id": "form", "title": "Drop us a message today!", "subtitle": "For quicker answers, explore our FAQs section. You may find the solution you're looking  for right there! If not, our support team is delighted to help you.", "inputs": [
    {
      type: "text",
      name: "name",
      label: "Name"
    },
    {
      type: "email",
      name: "email",
      label: "Email"
    }
  ], "textarea": {
    label: "Message"
  }, "disclaimer": {
    label: "By submitting this contact form, you acknowledge and agree to the collection of your personal information."
  }, "description": "Our support team typically responds within 24 business hours." })}  ${renderComponent($$result2, "Features2", $$Features2, { "title": "We are here to help!", "items": [
    {
      title: "General support",
      description: `Chat with us for inquiries related to account management, website navigation, payment issues, accessing purchased templates or general questions about the website's functionality.`
    },
    {
      title: "Contact sales",
      description: "Chat with us for questions about purchases, customization options, licensing for commercial use, inquiries about specific template, etc."
    },
    {
      title: "Technical support",
      description: "Chat with us when facing issues like template installation, problems editing difficulties, compatibility issues with software or download errors, or other technical challenges related to using the templates."
    },
    {
      title: "Phone",
      description: "+1 (234) 567-890",
      icon: "tabler:headset"
    },
    {
      title: "Email",
      description: "contact@support.com",
      icon: "tabler:mail"
    },
    {
      title: "Location",
      description: "1234 Lorem Ipsum St, 12345, Miami, EEUU",
      icon: "tabler:map-pin"
    }
  ] })} ` })}`;
}, "/Users/maggiexu/xuxm0678.github.io/src/pages/contact.astro", void 0);

const $$file = "/Users/maggiexu/xuxm0678.github.io/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
