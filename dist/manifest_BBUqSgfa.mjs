import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { z as NOOP_MIDDLEWARE_HEADER, B as decodeKey } from './chunks/astro/server_BCNEJCVl.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/maggiexu/xuxm0678.github.io/","cacheDir":"file:///Users/maggiexu/xuxm0678.github.io/node_modules/.astro/","outDir":"file:///Users/maggiexu/xuxm0678.github.io/dist/","srcDir":"file:///Users/maggiexu/xuxm0678.github.io/src/","publicDir":"file:///Users/maggiexu/xuxm0678.github.io/public/","buildClientDir":"file:///Users/maggiexu/xuxm0678.github.io/dist/client/","buildServerDir":"file:///Users/maggiexu/xuxm0678.github.io/dist/server/","adapterName":"","routes":[{"file":"file:///Users/maggiexu/xuxm0678.github.io/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/maggiexu/xuxm0678.github.io/dist/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/maggiexu/xuxm0678.github.io/dist/consulting/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/consulting","isIndex":false,"type":"page","pattern":"^\\/consulting$","segments":[[{"content":"consulting","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/consulting.astro","pathname":"/consulting","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/maggiexu/xuxm0678.github.io/dist/contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/maggiexu/xuxm0678.github.io/dist/projects/cvd-risk/demo/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects/cvd-risk/demo","isIndex":false,"type":"page","pattern":"^\\/projects\\/cvd-risk\\/demo$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"cvd-risk","dynamic":false,"spread":false}],[{"content":"demo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/cvd-risk/demo.astro","pathname":"/projects/cvd-risk/demo","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/maggiexu/xuxm0678.github.io/dist/projects/cvd-risk/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects/cvd-risk","isIndex":false,"type":"page","pattern":"^\\/projects\\/cvd-risk$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"cvd-risk","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/cvd-risk.astro","pathname":"/projects/cvd-risk","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"file:///Users/maggiexu/xuxm0678.github.io/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}}],"site":"https://xuxm0678.github.io","base":"/","userAssetsBase":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["/Users/maggiexu/xuxm0678.github.io/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/maggiexu/xuxm0678.github.io/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/maggiexu/xuxm0678.github.io/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/maggiexu/xuxm0678.github.io/src/pages/projects/cvd-risk.astro",{"propagation":"none","containsHead":true}],["/Users/maggiexu/xuxm0678.github.io/src/pages/projects/cvd-risk/demo.astro",{"propagation":"none","containsHead":true}],["/Users/maggiexu/xuxm0678.github.io/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/maggiexu/xuxm0678.github.io/src/pages/consulting.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/consulting@_@astro":"pages/consulting.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/projects/cvd-risk/demo@_@astro":"pages/projects/cvd-risk/demo.astro.mjs","\u0000@astro-page:src/pages/projects/cvd-risk@_@astro":"pages/projects/cvd-risk.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_BBUqSgfa.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/about.png":"chunks/about_CsmUfRvG.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/app-store.png":"chunks/app-store_BB_aI2BW.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/cat-portrait.png":"chunks/cat-portrait_a5P0uBfo.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/cvd-hero.png":"chunks/cvd-hero_Ddc6CCng.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/cvd.png":"chunks/cvd_DOnnJG85.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/default.png":"chunks/default_BM4VfgXl.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/google-play.png":"chunks/google-play_B8N7SIGI.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/hero-image.png":"chunks/hero-image_CAdai5tJ.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/logo.png":"chunks/logo_5xNnS0CZ.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/maggie-portrait.png":"chunks/maggie-portrait_BNhVsKkq.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/risk-distribution.png":"chunks/risk-distribution_4m-6dkhe.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/shap-summary.png":"chunks/shap-summary_QZz6PlWA.mjs","/Users/maggiexu/xuxm0678.github.io/src/assets/images/shap-waterfall.png":"chunks/shap-waterfall_NcLraNIH.mjs","/Users/maggiexu/xuxm0678.github.io/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CyyZkIZA.mjs","/Users/maggiexu/xuxm0678.github.io/src/pages/consulting.astro?astro&type=script&index=0&lang.ts":"_astro/consulting.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","/Users/maggiexu/xuxm0678.github.io/src/components/CVDWidget.astro?astro&type=script&index=0&lang.ts":"_astro/CVDWidget.astro_astro_type_script_index_0_lang.GJCfN5mm.js","/Users/maggiexu/xuxm0678.github.io/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.DZnDNxNb.js","~/components/CVDRiskFromWearablesV2.tsx":"_astro/CVDRiskFromWearablesV2.BTcsVK2n.js","@astrojs/react/client.js":"_astro/client.tMb9eDxv.js","framer-motion":"_astro/index.C6Sch0Iu.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/maggiexu/xuxm0678.github.io/src/pages/consulting.astro?astro&type=script&index=0&lang.ts",""],["/Users/maggiexu/xuxm0678.github.io/src/components/CVDWidget.astro?astro&type=script&index=0&lang.ts","function r(t,e,o=\"\"){const n=parseInt(t.textContent),l=e-n,m=900,i=performance.now(),d=()=>{const g=performance.now(),c=Math.min((g-i)/m,1),f=Math.round(n+l*c);t.textContent=f+o,c<1&&requestAnimationFrame(d)};requestAnimationFrame(d)}function u(t){const e=document.getElementById(\"risk-badge\");t<=30?(e.textContent=\"LOW RISK\",e.className=s+\" bg-green-500/20 text-green-300 border-green-500/50\"):t<=60?(e.textContent=\"MODERATE RISK\",e.className=s+\" bg-yellow-500/20 text-yellow-300 border-yellow-500/50\"):(e.textContent=\"HIGH RISK\",e.className=s+\" bg-red-500/20 text-red-300 border-red-500/50\")}const s=\"mt-2 inline-block text-xs font-bold px-3 py-1 rounded-full border\";function b(){const t=Math.floor(Math.random()*75)+5,e=35+Math.floor(Math.random()*30),o=18+Math.floor(Math.random()*12),n=70+Math.floor(Math.random()*25);r(document.getElementById(\"risk-value\"),t,\"%\"),r(document.getElementById(\"factor-age\"),e),r(document.getElementById(\"factor-bmi\"),o),r(document.getElementById(\"factor-sleep\"),n,\"%\"),u(t)}setInterval(b,2800);const a=document.getElementById(\"cvd-widget\");a.addEventListener(\"mousemove\",t=>{const e=a.getBoundingClientRect(),o=(t.clientX-e.left)/e.width,n=(t.clientY-e.top)/e.height;a.style.transform=`rotateX(${(.5-n)*10}deg) rotateY(${(o-.5)*14}deg) scale(1.05)`});a.addEventListener(\"mouseleave\",()=>{a.style.transform=\"rotateX(0deg) rotateY(0deg) scale(1)\"});"]],"assets":["/file:///Users/maggiexu/xuxm0678.github.io/dist/404.html","/file:///Users/maggiexu/xuxm0678.github.io/dist/about/index.html","/file:///Users/maggiexu/xuxm0678.github.io/dist/consulting/index.html","/file:///Users/maggiexu/xuxm0678.github.io/dist/contact/index.html","/file:///Users/maggiexu/xuxm0678.github.io/dist/projects/cvd-risk/demo/index.html","/file:///Users/maggiexu/xuxm0678.github.io/dist/projects/cvd-risk/index.html","/file:///Users/maggiexu/xuxm0678.github.io/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"MkH9QmItKJCwsj4yg+s97BSlF+aBFeDmxtDOq7ZrwuQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
