.DEFAULT_GOAL := webpack

.PHONY: install build webpack clean

upstream:
	-git clone --depth 1 https://github.com/rubensworks/rdfa-streaming-parser.js.git $@
	-mkdir /tmp/node_modules
	-ln -sf /tmp/node_modules upstream/node_modules

install: upstream
	-mkdir /tmp/node_modules
	-ln -s /tmp/node_modules 
	cd upstream; npm install

build: install
	cd upstream; npm run build

webpack: build
	cd upstream; npx webpack

clean:
	rm -rf upstream/
	rm -rf /tmp/node_modules
