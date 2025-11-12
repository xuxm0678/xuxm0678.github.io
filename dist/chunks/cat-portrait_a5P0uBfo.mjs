const catPortrait = new Proxy({"src":"/_astro/cat-portrait.C_rKXntP.png","width":1367,"height":1823,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/maggiexu/xuxm0678.github.io/src/assets/images/cat-portrait.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/maggiexu/xuxm0678.github.io/src/assets/images/cat-portrait.png");
							return target[name];
						}
					});

export { catPortrait as default };
