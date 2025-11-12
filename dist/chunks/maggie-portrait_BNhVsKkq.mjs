const maggiePortrait = new Proxy({"src":"/_astro/maggie-portrait.BrB2rwFQ.png","width":4160,"height":6240,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/maggiexu/xuxm0678.github.io/src/assets/images/maggie-portrait.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/maggiexu/xuxm0678.github.io/src/assets/images/maggie-portrait.png");
							return target[name];
						}
					});

export { maggiePortrait as default };
