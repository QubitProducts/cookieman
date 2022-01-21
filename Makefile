.PHONY: lint test

test: lint
	@npx karma start --single-run

lint:
	@npx standard
