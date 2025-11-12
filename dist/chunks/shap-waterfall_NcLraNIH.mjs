const shapWaterfall = new Proxy({"src":"/_astro/shap-waterfall.DxvLxyCc.png","width":818,"height":436,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/maggiexu/xuxm0678.github.io/src/assets/images/shap-waterfall.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/maggiexu/xuxm0678.github.io/src/assets/images/shap-waterfall.png");
							return target[name];
						}
					});

export { shapWaterfall as default };
