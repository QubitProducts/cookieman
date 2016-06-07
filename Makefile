BIN = ./node_modules/.bin

.PHONY: lint test

test: lint
	$(BIN)/karma start --single-run

lint:
	$(BIN)/standard
