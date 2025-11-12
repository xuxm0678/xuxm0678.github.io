const shapImg = new Proxy({"src":"/_astro/shap-summary.CLO-yMiU.png","width":1662,"height":976,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/maggiexu/xuxm0678.github.io/src/assets/images/shap-summary.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/maggiexu/xuxm0678.github.io/src/assets/images/shap-summary.png");
							return target[name];
						}
					});

export { shapImg as default };
