.DEFAULT_GOAL := microdata-rdf-streaming-parser.webpack.js

.PHONY: install build webpack clean

upstream:
	-git clone --depth 1 https://github.com/rubensworks/microdata-rdf-streaming-parser.js.git $@
	-mkdir /tmp/node_modules
	-cd $@; ln -sf /tmp/node_modules

install:
	-mkdir /tmp/node_modules
	-cd upstream; ln -s /tmp/node_modules 
	cd upstream; npm install

build: 
	-mkdir /tmp/node_modules
	-cd upstream; ln -s /tmp/node_modules 
	cd upstream; npm run build

webpack: 
	-mkdir /tmp/node_modules
	-cd upstream; ln -s /tmp/node_modules 
	cd upstream; npx webpack

copy: microdata-rdf-streaming-parser.webpack.js
	

microdata-rdf-streaming-parser.webpack.js: upstream/dist/microdata-rdf-streaming-parser.webpack.js
	cp -f $< $@

clean:
	-rm -rf upstream/node_modules
	cd upstream; git clean -d -X -f
	-rm -rf /tmp/node_modules
	-mkdir /tmp/node_modules
	-cd upstream; ln -s /tmp/node_modules 

