/app/rdfa-streaming-parser.js: /tmp/rdfa-streaming-parser.js/dist/out.js
	cp $^ $@

/tmp/rdfa-streaming-parser.js :
	cd /tmp; git clone --depth 1 https://github.com/rubensworks/rdfa-streaming-parser.js.git
	cd /tmp/rdfa-streaming-parser.js; npm install


/tmp/rdfa-streaming-parser.js/dist/out.js: /tmp/rdfa-streaming-parser.js/webpack.config.js
	npx build


