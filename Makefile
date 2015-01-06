cov:
	@./node_modules/.bin/jscoverage lib lib-cov

test: cov
	@./node_modules/.bin/mocha -u tdd -t 5000

.PHONY: test
