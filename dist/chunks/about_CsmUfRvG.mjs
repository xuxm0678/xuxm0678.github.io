const about = new Proxy({"src":"/_astro/about.BacGIwQu.png","width":2673,"height":4032,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/maggiexu/xuxm0678.github.io/src/assets/images/about.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/maggiexu/xuxm0678.github.io/src/assets/images/about.png");
							return target[name];
						}
					});

export { about as default };
