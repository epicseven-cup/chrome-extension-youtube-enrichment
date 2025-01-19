SHELL = /bin/bash

setup:
	go install github.com/epicseven-cup/load-env-bash@latest
	load-env-bash --help

build:
	load-env-bash -i config/.env -o output.sh
	source ./output.sh && printenv &&rollup --config rollup.config.js
	cp manifest.json build/
	cp package*.json build/
	cp -r popup/ build/
	cp -r asset/ build/

	rm ./output.sh
clean:
	rm -r build/