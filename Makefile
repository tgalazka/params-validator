install:
	npm install

wrap:
	npm shrinkwrap

unwrap:
	rm -f npm-shrinkwrap.json

clean:
	rm -rf node_modules

rewrap: unwrap clean install wrap

unit:
	@NODE_ENV=test ./node_modules/.bin/mocha test/unit

test: install unit
