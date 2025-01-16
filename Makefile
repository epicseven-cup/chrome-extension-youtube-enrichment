build:
	rollup --config rollup.config.js --format umd
	cp manifest.json build/
	cp package*.json build/
	cp -r popup/ build/
clean:
	rm -r build/