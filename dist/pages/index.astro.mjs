import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, u as unescapeHTML, F as Fragment } from '../chunks/astro/server_BCNEJCVl.mjs';
import 'kleur/colors';
import { a as $$Button, $ as $$Icon, b as $$PageLayout, c as $$Header } from '../chunks/PageLayout_D97eilMe.mjs';
import { b as $$ItemGrid, c as $$Image, $ as $$Hero, a as $$Features3 } from '../chunks/Hero_TOtFqCtK.mjs';
import { $ as $$WidgetWrapper, a as $$Headline } from '../chunks/Headline_CwMfdM8a.mjs';
import { twMerge } from 'tailwind-merge';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro("https://xuxm0678.github.io");
const $$Content = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Content;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline,
    content = await Astro2.slots.render("content"),
    callToAction,
    items = [],
    columns,
    image = await Astro2.slots.render("image"),
    isReversed = false,
    isAfterContent = false,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-7xl mx-auto ${isAfterContent ? "pt-0 md:pt-0 lg:pt-0" : ""} ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": {
    container: "max-w-xl sm:mx-auto lg:max-w-2xl",
    title: "text-4xl md:text-5xl font-bold tracking-tighter mb-4 font-heading",
    subtitle: "max-w-3xl mx-auto sm:text-center text-xl text-muted dark:text-slate-400"
  } })} ${maybeRenderHead()}<div class="mx-auto max-w-7xl p-4 md:px-8"> <div${addAttribute(`md:flex ${isReversed ? "md:flex-row-reverse" : ""} md:gap-16`, "class")}> <div class="md:basis-1/2 self-center"> ${content && renderTemplate`<div class="mb-12 text-lg dark:text-slate-400">${unescapeHTML(content)}</div>`} ${callToAction && renderTemplate`<div class="mt-[-40px] mb-8 text-primary"> ${renderComponent($$result2, "Button", $$Button, { "variant": "link", ...callToAction })} </div>`} ${renderComponent($$result2, "ItemGrid", $$ItemGrid, { "items": items, "columns": columns, "defaultIcon": "tabler:check", "classes": {
    container: `gap-y-4 md:gap-y-8`,
    panel: "max-w-none",
    title: "text-lg font-medium leading-6 dark:text-white ml-2 rtl:ml-0 rtl:mr-2",
    description: "text-gray-800 ml-2 rtl:ml-0 rtl:mr-2",
    icon: "flex h-7 w-7 items-center justify-center rounded-full bg-green-600 dark:bg-green-700 text-gray-50 p-1",
    action: "text-lg font-medium leading-6 dark:text-white ml-2 rtl:ml-0 rtl:mr-2"
  } })} </div> <div aria-hidden="true" class="mt-10 md:mt-0 md:basis-1/2"> ${image && renderTemplate`<div class="relative m-auto max-w-4xl"> ${typeof image === "string" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "mx-auto w-full rounded-lg bg-gray-500 shadow-lg", "width": 500, "height": 500, "widths": [400, 768], "sizes": "(max-width: 768px) 100vw, 432px", "layout": "responsive", ...image })}`} </div>`} </div> </div> </div> ` })}`;
}, "/Users/maggiexu/xuxm0678.github.io/src/components/widgets/Content.astro", void 0);

const $$Astro$1 = createAstro("https://xuxm0678.github.io");
const $$Timeline = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Timeline;
  const { items = [], classes = {}, defaultIcon } = Astro2.props;
  const {
    container: containerClass = "",
    panel: panelClass = "",
    title: titleClass = "",
    description: descriptionClass = "",
    icon: defaultIconClass = "text-primary dark:text-slate-200 border-primary dark:border-blue-700"
  } = classes;
  return renderTemplate`${items && items.length > 0 && renderTemplate`${maybeRenderHead()}<div${addAttribute(containerClass, "class")}>${items.map(({ title, description, icon, classes: itemClasses = {} }, index = 0) => renderTemplate`<div${addAttribute(twMerge(
    "flex intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade",
    panelClass,
    itemClasses?.panel
  ), "class")}><div class="flex flex-col items-center mr-4 rtl:mr-0 rtl:ml-4"><div><div class="flex items-center justify-center">${(icon || defaultIcon) && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon || defaultIcon, "class": twMerge("w-10 h-10 p-2 rounded-full border-2", defaultIconClass, itemClasses?.icon) })}`}</div></div>${index !== items.length - 1 && renderTemplate`<div class="w-px h-full bg-black/10 dark:bg-slate-400/50"></div>`}</div><div${addAttribute(`pt-1 ${index !== items.length - 1 ? "pb-8" : ""}`, "class")}>${title && renderTemplate`<p${addAttribute(twMerge("text-xl font-bold", titleClass, itemClasses?.title), "class")}>${unescapeHTML(title)}</p>`}${description && renderTemplate`<p${addAttribute(twMerge("text-muted mt-2", descriptionClass, itemClasses?.description), "class")}>${unescapeHTML(description)}</p>`}</div></div>`)}</div>`}`;
}, "/Users/maggiexu/xuxm0678.github.io/src/components/ui/Timeline.astro", void 0);

const $$Astro = createAstro("https://xuxm0678.github.io");
const $$Steps = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Steps;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline = await Astro2.slots.render("tagline"),
    items = [],
    image = await Astro2.slots.render("image"),
    isReversed = false,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-5xl ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div${addAttribute(["flex flex-col gap-8 md:gap-12", { "md:flex-row-reverse": isReversed }, { "md:flex-row": image }], "class:list")}> <div${addAttribute(["md:py-4 md:self-center", { "md:basis-1/2": image }, { "w-full": !image }], "class:list")}> ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": {
    container: "text-left rtl:text-right",
    title: "text-3xl lg:text-4xl",
    ...classes?.headline ?? {}
  } })} ${renderComponent($$result2, "Timeline", $$Timeline, { "items": items, "classes": classes?.items })} </div> ${image && renderTemplate`<div class="relative md:basis-1/2"> ${typeof image === "string" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "inset-0 object-cover object-top w-full rounded-md shadow-lg md:absolute md:h-full bg-gray-400 dark:bg-slate-700", "widths": [400, 768], "sizes": "(max-width: 768px) 100vw, 432px", "width": 432, "height": 768, "layout": "cover", "src": image?.src, "alt": image?.alt || "" })}`} </div>`} </div> ` })}`;
}, "/Users/maggiexu/xuxm0678.github.io/src/components/widgets/Steps.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Maggie (Xiaomeng) Xu | Data & AI Portfolio"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "announcement": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "announcement" })}`, "default": ($$result2) => renderTemplate`    ${renderComponent($$result2, "Hero", $$Hero, { "id": "hero", "title": "Maggie 'Xiaomeng' Xu", "tagline": "AI & Health Data Scientist", "actions": [
    { variant: "primary", text: "View Projects", href: "#projects" },
    { variant: "secondary", text: "AI & Statistical Consulting", href: "#consulting" }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
I’m passionate about exploring the potential of AI to make everyday life smarter, healthier, and more human-centered.  
Through data science, statistical modeling, and creativity, I aim to turn complex data into meaningful change for people and communities. ` })}` })}  ${renderComponent($$result2, "Content", $$Content, { "id": "about", "columns": 3, "items": [
    {
      icon: "tabler:mail",
      callToAction: {
        target: "_blank",
        text: "Email",
        href: "xuxm0678@gmail.com"
      }
    },
    {
      icon: "tabler:link",
      callToAction: {
        target: "_blank",
        text: "Linkedin",
        href: "https://www.linkedin.com/in/xiaomeng-xu-563423257/"
      }
    }
  ], "image": {
    src: "~/assets/images/about.png",
    alt: "Xiaomeng Xu portrait",
    class: "w-[280px] md:w-[340px] lg:w-[380px] rounded-2xl shadow-md object-cover object-top"
  } }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0 bg-blue-50 dark:bg-[#0e1625]"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h2 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">About me</h2> <p>
Welcome to my data-driven journey. I’m fascinated by how artificial intelligence and statistics can reveal hidden patterns in the world around us, from the pulse of human health to the rhythm of everyday life.
</p> <br> <p>
To me, every dataset is a story waiting to be understood. Each model, each graph, is a step toward connecting insight with impact, turning numbers into knowledge that helps people live better.
</p> <br> <p>If you’re curious about how AI and data science can make a real difference, let’s explore together.</p> ` })}` })}  ${renderComponent($$result2, "Steps", $$Steps, { "id": "resume", "title": "Work experience", "items": [
    {
      title: 'Assistant Statistician <br /> <span class="font-normal">Bauer Research Group, University of Michigan, Ann arbor, MI</span> <br /> <span class="text-sm font-normal">May 2025 - Present</span>',
      description: `Collaborated with PI to define research objectives and translate scientific questions into appropriate statistical analyses.<br />Designed and executed statistical analyses using logistic regression, ANOVA, andcorrelation methods to assess health outcomes and demographic associations.<br />Produced statistical summaries and figures (TLFs) in SAS and ensured reproducibility of results across analyses.<br />Delivered statistical tables and figures supporting a manuscript on self-regulation and family feeding behaviors. `,
      icon: "tabler:briefcase"
    },
    {
      title: 'Data Analyst <br /> <span class="font-normal">Center for Academic Innovation, Ann arbor, MI</span> <br /> <span class="text-sm font-normal">Sep 2024 - Aug 2025</span>',
      description: `Analyzed large-scale educational datasets using R and SQL to identify equity gaps in student performance across demographic groups, generating actionable insights for institutional policy. <br />Built interactive R dashboards to visualize performance trends, improving data accessibility and evidence-based decision-making for non-technical stakeholders.<br />Automated SQL and R-based ETL pipelines for 1M+ student records, cutting dashboard refresh time by 45% and improving workflow scalability.<br />Utilized Git-based version control and collaborative workflows to maintain analytical integrity and support cross-functional research teams.`,
      icon: "tabler:briefcase"
    }
  ], "classes": { container: "max-w-3xl" } })}  ${renderComponent($$result2, "Steps", $$Steps, { "id": "resume", "title": "Education", "items": [
    {
      title: `Master of Science in Health Data Science <br /> <span class="font-normal">University of Michigan's School of Public Health</span> <br /> <span class="text-sm font-normal">2023 - 2025</span>`,
      icon: "tabler:school"
    },
    {
      title: `Bachelor of Science in Food Science<br /> <span class="font-normal">Southwest University, Chongqing, China</span> <br /> <span class="text-sm font-normal">2018 - 2022</span>`,
      icon: "tabler:school"
    },
    {
      title: `Bachelor of Science in Finance <br /> <span class="font-normal">Southwest University, Chongqing, China</span> <br /> <span class="text-sm font-normal">2019 - 2021</span>`,
      icon: "tabler:school"
    }
  ], "classes": { container: "max-w-3xl" } })}  ${renderComponent($$result2, "Features3", $$Features3, { "title": "Skills", "subtitle": "Core technical and analytical skills that empower my research and data-driven work.", "columns": 3, "defaultIcon": "tabler:point-filled", "items": [
    {
      title: "Statistical Modeling",
      description: "Regression, ANOVA, survival analysis, mixed models, and hypothesis testing."
    },
    {
      title: "Machine Learning",
      description: "Supervised and unsupervised learning, feature selection, model evaluation, and explainability."
    },
    {
      title: "Deep Learning",
      description: "Neural networks for image and tabular data; transfer learning and model tuning."
    },
    {
      title: "Programming",
      description: "R, Python, SQL, and SAS for data cleaning, wrangling, automation, and reproducible research workflows."
    },
    {
      title: "Data Visualization",
      description: "Creating clear, interpretable dashboards and figures using ggplot2, Plotly, Power BI, and RShiny."
    },
    {
      title: "Data Engineering",
      description: "Experience with data pipelines, EHR and wearable data integration, and relational database management."
    },
    {
      title: "Communication and Collaboration",
      description: "Translating analytical results into actionable insights; effective teamwork across multidisciplinary teams."
    },
    {
      title: "Attention to detail",
      description: "Diligent in maintaining precision and quality in all analytic and research work."
    },
    {
      title: "Adaptability",
      description: "Quick to learn new methods, technologies, and analytical frameworks in evolving data environments."
    }
  ] })}  ${renderComponent($$result2, "Content", $$Content, { "id": "projects", "title": "Bridging Data and Humanity", "subtitle": "Projects that combine analytics, design, and empathy to turn complex health data into stories that inspire understanding and action.", "isReversed": true, "items": [
    {
      title: "Project Summary:",
      description: "Developed a personalized cardiovascular risk scoring system that integrates electronic health record (EHR) data from Michigan Medicine to create an interactive, interpretable health analytics experience. Using machine-learning models such as XGBoost and SHAP, the project transforms complex medical data into meaningful insights, helping individuals understand how their daily choices and physiological factors influence heart health."
    },
    {
      title: "Role:",
      description: `
         <ul class="text-gray-800 list-disc pl-6 m-0">
      <li>Developed the end-to-end system, from EHR data preprocessing and feature engineering to model optimization and front-end implementation.</li>
      <li>Built the XGBoost-based predictive model with SHAP interpretability.</li>
      <li>Designed an intuitive dashboard that visualizes personalized cardiovascular risk, contributing factors, and actionable insights for preventive decision-making.</li>
    </ul>
  `
    }
  ], "image": {
    src: "~/assets/images/cvd.png",
    alt: "CVD Risk Image"
  }, "callToAction": {
    target: "_self",
    text: "Go to the project",
    icon: "tabler:chevron-right",
    href: "/projects/cvd-risk"
  } }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-[#0e1625]"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">
Project 1: <br><span class="text-2xl">Personalized Cardiovascular Risk Scoring System</span> </h3> ` })}` })}        <section id="consulting" class="py-20 px-6 max-w-5xl mx-auto text-center bg-transparent dark:bg-transparent"> <h2 class="text-3xl sm:text-4xl font-bold mb-4">AI & Statistical Consulting</h2> <p class="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
I offer free 30-minute consultations for researchers, students, and organizations
    exploring AI and data analytics solutions. Together, we can turn data into insight,
    and insight into impact.
</p> <a href="/consulting" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
Learn More & Book Free Consultation
</a> </section> `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Header", $$Header, { "links": [
    { text: "Home", href: "#" },
    { text: "About", href: "#about" },
    { text: "Resume", href: "#resume" },
    { text: "Projects", href: "#projects" },
    { text: "AI&Statistical Consulting", href: "#consulting" }
  ], "isSticky": true })} ` })}` })}`;
}, "/Users/maggiexu/xuxm0678.github.io/src/pages/index.astro", void 0);

const $$file = "/Users/maggiexu/xuxm0678.github.io/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
