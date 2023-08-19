.DEFAULT_GOAL := webpack

.PHONY: install build webpack clean

upstream:
	-git clone --depth 1 https://github.com/rubensworks/rdfa-streaming-parser.js.git $@
	-mkdir /tmp/node_modules
	-ln -sf /tmp/node_modules

install:
	-mkdir /tmp/node_modules
	-ln -s /tmp/node_modules 
	cd upstream; npm install

build: install
	-mkdir /tmp/node_modules
	-ln -s /tmp/node_modules 
	cd upstream; npm run build

webpack: build
	-mkdir /tmp/node_modules
	-ln -s /tmp/node_modules 
	cd upstream; npx webpack

rdfa-streaming-parser.webpack.js: webpack upstream/dist/rdfa-streaming-parser.webpack.js
	cp -f $^ $@

clean:
	-rm -rf upstream/node_modules
	cd upstream; git clean -d -X -f
	rm -rf /tmp/node_modules

