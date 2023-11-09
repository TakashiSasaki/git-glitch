PHPUNIT=/tmp/composer-vendor-dir/bin/phpunit
PHPDOC=/tmp/composer-vendor-dir/bin/phpdoc

test:
	$(PHPUNIT) determine_case_test.php 
	$(PHPUNIT) to_althex_test.php 
	$(PHPUNIT) from_althex_test.php 
	$(PHPUNIT) roundtrip_test.php 

composer:
	COMPOSER_CACHE_DIR=/tmp/composer-cache-dir/ composer require phpdocumentor/phpdocumentor
	COMPOSER_CACHE_DIR=/tmp/composer-cache-dir/ composer require phpunit/phpunit
	COMPOSER_CACHE_DIR=/tmp/composer-cache-dir/ composer install

doc:
	$(PHPDOC) -d . -t .
