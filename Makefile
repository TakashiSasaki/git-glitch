.PHONY: install build webpack

/app/rdfa-streaming-parser.js: /tmp/rdfa-streaming-parser.js/dist/out.js
	cp $^ $@


/tmp/rdfa-streaming-parser.js/lib/RdfaParser.js:
	cd /tmp/rdfa-streaming-parser.js; npm install
	cd /tmp/rdfa-streaming-parser.js; npm run build

/tmp/rdfa-streaming-parser.js/webpack.config.js :
	cd /tmp; git clone --depth 1 https://github.com/rubensworks/rdfa-streaming-parser.js.git

upstream:
	git clone --depth 1 https://github.com/rubensworks/rdfa-streaming-parser.js.git $@

/tmp/rdfa-streaming-parser.js/dist/out.js: /tmp/rdfa-streaming-parser.js/webpack.config.js
	cd /tmp/rdfa-streaming-parser.js; npx webpack

install:
	cd /tmp/rdfa-streaming-parser.js; npm install

build:
	cd /tmp/rdfa-streaming-parser.js; npm run build

webpack:
	cd /tmp/rdfa-streaming-parser.js; npx webpack
	
