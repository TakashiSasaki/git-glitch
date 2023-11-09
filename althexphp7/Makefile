PHPUNIT=/tmp/composer-vendor-dir/bin/phpunit
test:
	$(PHPUNIT) determine_case_test.php 
	$(PHPUNIT) to_althex_test.php 
	$(PHPUNIT) from_althex_test.php 
	$(PHPUNIT) roundtrip_test.php 

composer:
	COMPOSER_CACHE_DIR=/tmp/composer-cache-dir/ composer require phpunit/phpunit
	COMPOSER_CACHE_DIR=/tmp/composer-cache-dir/ composer require phpdocumentor/phpdocumentor

