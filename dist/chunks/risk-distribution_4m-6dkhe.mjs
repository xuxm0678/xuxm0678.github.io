const distImg = new Proxy({"src":"/_astro/risk-distribution.DPAizAkj.png","width":694,"height":482,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/maggiexu/xuxm0678.github.io/src/assets/images/risk-distribution.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/maggiexu/xuxm0678.github.io/src/assets/images/risk-distribution.png");
							return target[name];
						}
					});

export { distImg as default };
