import { c as createComponent, m as maybeRenderHead, e as renderScript, a as renderTemplate, r as renderComponent, b as addAttribute } from '../../chunks/astro/server_BCNEJCVl.mjs';
import 'kleur/colors';
import { b as $$PageLayout } from '../../chunks/PageLayout_D97eilMe.mjs';
import 'clsx';
import heroImg from '../../chunks/cvd-hero_Ddc6CCng.mjs';
import shapImg from '../../chunks/shap-summary_QZz6PlWA.mjs';
import distImg from '../../chunks/risk-distribution_4m-6dkhe.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$CVDWidget = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="cvd-widget" class="w-[360px] sm:w-[400px] lg:w-[440px] rounded-2xl bg-[#0f1115] p-6 shadow-[0_28px_80px_-18px_rgba(0,0,0,0.55)] text-white transition-transform duration-300 will-change-transform"> <h3 class="text-lg font-semibold tracking-tight">Cardiovascular Risk</h3> <p id="risk-value" class="mt-2 text-6xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-tight">
25%
</p> <div id="risk-badge" class="mt-2 inline-block text-xs font-bold px-3 py-1 rounded-full border bg-green-500/20 text-green-300 border-green-500/50">
LOW RISK
</div> <hr class="my-5 border-white/10"> <p class="text-sm text-gray-400 mb-2">Key Factors</p> <div class="flex justify-between text-sm"><span>Age</span><span id="factor-age">45</span></div> <div class="flex justify-between text-sm"><span>BMI</span><span id="factor-bmi">24</span></div> <div class="flex justify-between text-sm"><span>Sleep Efficiency</span><span id="factor-sleep">82%</span></div> <hr class="my-5 border-white/10"> <a href="/projects/cvd-risk/demo" class="text-cyan-300 font-semibold hover:underline text-sm">Open Full Demo →</a> </div> ${renderScript($$result, "/Users/maggiexu/xuxm0678.github.io/src/components/CVDWidget.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/maggiexu/xuxm0678.github.io/src/components/CVDWidget.astro", void 0);

const $$CvdRisk = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Cardiovascular Risk Prediction",
    description: "A cardiovascular risk prediction model trained on patient records from the Michigan Medicine Precision Health EHR dataset, including demographic, biometric, and behavior-related variables."
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "data-astro-cid-y2ob6vby": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section id="hero" class="relative isolate overflow-hidden min-h-[80vh] flex items-center" data-astro-cid-y2ob6vby> <!-- 背景渐变 --> <div class="absolute inset-0 bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-500 dark:from-[#0b1530] dark:via-[#0c213a] dark:to-[#103a46]" data-astro-cid-y2ob6vby></div> <div class="pointer-events-none absolute -top-40 right-1/3 h-[38rem] w-[38rem] rounded-full bg-white/10 blur-[120px]" data-astro-cid-y2ob6vby></div> <div class="relative z-10 max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-16 py-20" data-astro-cid-y2ob6vby> <div class="grid grid-cols-12 items-center gap-10" data-astro-cid-y2ob6vby> <!-- 左侧文案 --> <div class="col-span-12 lg:col-span-6" data-astro-cid-y2ob6vby> <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white" data-astro-cid-y2ob6vby>
Cardiovascular Risk<br data-astro-cid-y2ob6vby>Prediction System
</h1> <p class="mt-5 text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl" data-astro-cid-y2ob6vby>
A cardiovascular risk prediction model trained on patient records from the Michigan Medicine Precision Health EHR dataset.
</p> <div class="mt-8 flex flex-wrap gap-3" data-astro-cid-y2ob6vby> <a href="/projects/cvd-risk/demo" class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow hover:shadow-lg hover:-translate-y-0.5 transition" data-astro-cid-y2ob6vby>
Try the Demo →
</a> </div> <!-- 胶囊导航 --> <nav id="hero-pills" class="mt-10 flex flex-wrap gap-2" data-astro-cid-y2ob6vby> ${[
    ["Introduction", "#introduction"],
    ["Objective", "#objective"],
    ["Methods", "#methods"],
    ["Findings", "#findings"],
    ["Impact", "#impact"]
  ].map(([label, href]) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute(href.replace("#", ""), "data-spy")} class="px-4 py-2 rounded-full text-sm border border-white/25 bg-white/10 text-white/90 backdrop-blur-md hover:bg-white/20 transition
                     data-[active=true]:bg-white data-[active=true]:text-blue-700 data-[active=true]:border-white" data-astro-cid-y2ob6vby> ${label} </a>`)} </nav> </div> <!-- 右侧 动态 UI Widget --> <div class="col-span-12 lg:col-span-6 flex justify-center lg:justify-end" data-astro-cid-y2ob6vby> ${renderComponent($$result2, "CVDWidget", $$CVDWidget, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "~/components/CVDWidget.astro", "client:component-export": "default", "data-astro-cid-y2ob6vby": true })} </div> </div> </div> </section>  <main class="relative bg-white dark:bg-gray-950" data-astro-cid-y2ob6vby> <div class="max-w-[1600px] mx-auto px-8 sm:px-12 space-y-32 py-24" data-astro-cid-y2ob6vby> <section id="introduction" class="relative py-24 px-6 bg-gradient-to-b from-white to-[#f7fbff] dark:from-[#0a0f1a] dark:to-[#0e1828]" data-astro-cid-y2ob6vby> <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 items-center" data-astro-cid-y2ob6vby> <!-- Left Text Block --> <div class="space-y-8 text-[18px] leading-relaxed text-gray-700 dark:text-gray-300" data-astro-cid-y2ob6vby> <p class="text-2xl font-medium text-gray-900 dark:text-white" data-astro-cid-y2ob6vby>
Imagine if you could see your cardiovascular risk not once a year during a check-up, but every day.
</p> <p data-astro-cid-y2ob6vby>
Cardiovascular disease (CVD) remains the <strong data-astro-cid-y2ob6vby>#1 global cause of death</strong>, responsible for nearly one-third of annual fatalities. Traditional risk scores such as Framingham and ASCVD are calculated from a single static snapshot of clinical data. They identify who is high-risk, but not when someone is drifting toward danger in real time.
</p> <p data-astro-cid-y2ob6vby>
Meanwhile, wearable devices continuously capture heart-rate trends, sleep regularity, and physical activity patterns, revealing the subtle rhythms of physiology and behavior that shape long-term risk. In this project, I reconstruct clinical risk scores from these real-world signals, turning yearly snapshots into a <strong data-astro-cid-y2ob6vby>daily, behavior-aware estimate</strong>.
</p> <p class="font-semibold text-gray-900 dark:text-white" data-astro-cid-y2ob6vby>
Toward continuous, personalized prevention, making cardiovascular risk tracking more timely, actionable, and grounded in everyday life.
</p> </div> <!-- Right Image Block --> <div class="flex justify-center lg:justify-end" data-astro-cid-y2ob6vby> <img${addAttribute(heroImg.src, "src")} alt="Wearable AI CVD Concept" class="w-full max-w-md lg:max-w-lg rounded-xl drop-shadow-xl" loading="lazy" data-astro-cid-y2ob6vby> </div> </div> </section> <!-- Objective --> <section id="objective" class="text-center" data-astro-cid-y2ob6vby> <div class="mx-auto max-w-5xl rounded-3xl p-10 sm:p-12 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-750 shadow-[0_20px_80px_-40px_rgba(0,0,0,.4)] ring-1 ring-gray-200/60 dark:ring-gray-700/60" data-astro-cid-y2ob6vby> <h2 class="text-3xl md:text-4xl font-extrabold mb-8" data-astro-cid-y2ob6vby>Objective</h2> <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed" data-astro-cid-y2ob6vby>
Build a continuous cardiovascular risk scoring system that reconstructs validated clinical risk scores using large-scale EHR data and behavior-linked physiological markers, with model interpretability exposed through SHAP-based explanations.
</p> </div> </section> <!-- Methods --> <section id="methods" class="text-center" data-astro-cid-y2ob6vby> <h2 class="text-3xl md:text-4xl font-extrabold mb-8" data-astro-cid-y2ob6vby>Methods</h2> <!-- ✅ PIPELINE --> <div class="mb-16" data-astro-cid-y2ob6vby> <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center" data-astro-cid-y2ob6vby>
End-to-End Modeling Pipeline
</h3> <div class="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto" data-astro-cid-y2ob6vby> <div class="step-box" data-astro-cid-y2ob6vby>1. Extract EHR Data</div> <div class="arrow" data-astro-cid-y2ob6vby>→</div> <div class="step-box" data-astro-cid-y2ob6vby>2. Clean & Normalize<br data-astro-cid-y2ob6vby><span class="sub" data-astro-cid-y2ob6vby>missing, outliers, coding</span></div> <div class="arrow" data-astro-cid-y2ob6vby>→</div> <div class="step-box" data-astro-cid-y2ob6vby>3. Feature Engineering<br data-astro-cid-y2ob6vby><span class="sub" data-astro-cid-y2ob6vby>aggregation, scaling, encoding</span></div> <div class="arrow" data-astro-cid-y2ob6vby>→</div> <div class="step-box" data-astro-cid-y2ob6vby>4. Baseline Model<br data-astro-cid-y2ob6vby><span class="sub" data-astro-cid-y2ob6vby>Linear Regression</span></div> <div class="arrow" data-astro-cid-y2ob6vby>→</div> <div class="step-box" data-astro-cid-y2ob6vby>5. XGBoost + Log Transform<br data-astro-cid-y2ob6vby><span class="sub" data-astro-cid-y2ob6vby>hyperparameter tuning</span></div> <div class="arrow" data-astro-cid-y2ob6vby>→</div> <div class="step-box" data-astro-cid-y2ob6vby>6. 5×3 Repeated CV<br data-astro-cid-y2ob6vby><span class="sub" data-astro-cid-y2ob6vby>stability validation</span></div> <div class="arrow" data-astro-cid-y2ob6vby>→</div> <div class="step-box" data-astro-cid-y2ob6vby>7. SHAP Explainability<br data-astro-cid-y2ob6vby><span class="sub" data-astro-cid-y2ob6vby>individual risk drivers</span></div> </div> </div> <!-- ✅ 4 METHOD CARDS --> <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto" data-astro-cid-y2ob6vby> <div class="method-card" data-astro-cid-y2ob6vby> <h4 class="method-title" data-astro-cid-y2ob6vby>Data Inputs</h4> <p data-astro-cid-y2ob6vby>
33K+ longitudinal records combining wearable-derived metrics (resting heart rate, activity, sleep) and key clinical indicators (BMI, diabetes, hypertension, heart failure).
</p> </div> <div class="method-card" data-astro-cid-y2ob6vby> <h4 class="method-title" data-astro-cid-y2ob6vby>Modeling</h4> <p data-astro-cid-y2ob6vby>
Started with a linear regression baseline (R² ≈ 0.20). Early XGBoost runs overfit, so the outcome was log-transformed and regularized, yielding consistent performance (mean cross-validated R² ≈ 0.63).
</p> </div> <div class="method-card" data-astro-cid-y2ob6vby> <h4 class="method-title" data-astro-cid-y2ob6vby>Interpretation</h4> <p data-astro-cid-y2ob6vby>
SHAP values quantify individual-level risk drivers, exposing nonlinear effects of physiologic and lifestyle-linked predictors and enabling readable explanations.
</p> </div> <div class="method-card" data-astro-cid-y2ob6vby> <h4 class="method-title" data-astro-cid-y2ob6vby>Outcome</h4> <p data-astro-cid-y2ob6vby>
A behavior-aware risk estimate that updates more frequently than static clinic-based scores, supporting early detection and preventive digital health intervention design.
</p> </div> </div> </section>  <section id="findings" class="relative w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] py-20 px-6 sm:px-10 
  bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 
  dark:from-[#0a0f1f] dark:via-[#0c1830] dark:to-[#0b2040]" data-astro-cid-y2ob6vby> <!-- 标题区 --> <div class="max-w-5xl mx-auto text-center mb-16" data-astro-cid-y2ob6vby> <h2 class="text-3xl md:text-4xl font-extrabold mb-8" data-astro-cid-y2ob6vby>Findings</h2> <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed" data-astro-cid-y2ob6vby>
Visualizing and interpreting the model’s internal logic and output distribution.
</p> </div> <!-- 两个卡片区域 --> <div class="flex flex-col md:flex-row items-stretch justify-center gap-10 max-w-6xl mx-auto" data-astro-cid-y2ob6vby> <!-- 左：SHAP 图 --> <div class="flex-1 bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-6 flex flex-col items-center" data-astro-cid-y2ob6vby> <img${addAttribute(shapImg.src, "src")} alt="SHAP summary plot" class="rounded-xl object-contain w-full h-[320px]" data-astro-cid-y2ob6vby> <div class="mt-4 text-left text-gray-700 dark:text-gray-200 text-sm leading-relaxed" data-astro-cid-y2ob6vby> <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white text-center" data-astro-cid-y2ob6vby>Feature Contributions</h3> <ul class="list-disc list-inside space-y-1" data-astro-cid-y2ob6vby> <li data-astro-cid-y2ob6vby>Each point represents one patient; the x-axis shows SHAP value (feature impact).</li> <li data-astro-cid-y2ob6vby>Red = higher feature values (e.g., older age, higher BMI) → higher risk.</li> <li data-astro-cid-y2ob6vby>Blue = lower values → often protective.</li> <li data-astro-cid-y2ob6vby>Key drivers include <strong data-astro-cid-y2ob6vby>Age</strong>, <strong data-astro-cid-y2ob6vby>BMI</strong>, <strong data-astro-cid-y2ob6vby>Sleep Efficiency</strong>, and <strong data-astro-cid-y2ob6vby>Substance Use</strong>.</li> </ul> </div> </div> <!-- 右：分布图 --> <div class="flex-1 bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-6 flex flex-col items-center" data-astro-cid-y2ob6vby> <img${addAttribute(distImg.src, "src")} alt="Log-transformed risk distribution" class="rounded-xl object-contain w-full h-[320px]" data-astro-cid-y2ob6vby> <div class="mt-4 text-left text-gray-700 dark:text-gray-200 text-sm leading-relaxed" data-astro-cid-y2ob6vby> <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white text-center" data-astro-cid-y2ob6vby>Risk Score Distribution</h3> <ul class="list-disc list-inside space-y-1" data-astro-cid-y2ob6vby> <li data-astro-cid-y2ob6vby>Predicted cardiovascular risk scores remain right-skewed after log transformation.</li> <li data-astro-cid-y2ob6vby>30th & 70th percentiles define <strong data-astro-cid-y2ob6vby>Low</strong>, <strong data-astro-cid-y2ob6vby>Medium</strong>, and <strong data-astro-cid-y2ob6vby>High</strong> risk tiers.</li> <li data-astro-cid-y2ob6vby>Interpretability helps clinicians monitor risk trajectories over time.</li> </ul> </div> </div> </div> <!-- 底部按钮 --> <div class="mt-16 flex justify-center" data-astro-cid-y2ob6vby> <a href="/projects/cvd-risk/demo" class="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold rounded-full shadow-md transition-all" data-astro-cid-y2ob6vby>
View Interactive Demo →
</a> </div> </section> <!-- Impact --> <section id="impact" class="text-center" data-astro-cid-y2ob6vby> <div class="mx-auto max-w-5xl rounded-3xl p-12 sm:p-14 text-white bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-500 shadow-[0_20px_90px_-40px_rgba(0,0,0,.6)]" data-astro-cid-y2ob6vby> <h2 class="text-3xl md:text-4xl font-extrabold" data-astro-cid-y2ob6vby>Impact & Next Steps</h2> <p class="mt-4 text-lg text-blue-50 leading-relaxed" data-astro-cid-y2ob6vby>
The study underscores the potential of interpretable AI in preventive cardiology. Although the model was trained using single-institution data, future validation across heterogeneous populations is warranted. Further work will focus on integrating longitudinal EHR and wearable data to enable continuous, clinically actionable risk monitoring.
</p> <div class="mt-8" data-astro-cid-y2ob6vby> <a href="/consulting" class="inline-block px-7 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:scale-[1.02] transition shadow" data-astro-cid-y2ob6vby>
Collaborate or Learn More →
</a> </div> </div> </section> </div> </main> <footer class="py-10 text-center text-sm text-gray-500 dark:text-gray-400" data-astro-cid-y2ob6vby>
© ${(/* @__PURE__ */ new Date()).getFullYear()} Maggie “Xiaomeng” Xu — Cardiovascular AI
</footer> ` })}`;
}, "/Users/maggiexu/xuxm0678.github.io/src/pages/projects/cvd-risk.astro", void 0);

const $$file = "/Users/maggiexu/xuxm0678.github.io/src/pages/projects/cvd-risk.astro";
const $$url = "/projects/cvd-risk";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CvdRisk,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
