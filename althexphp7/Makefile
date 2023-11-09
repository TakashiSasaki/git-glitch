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
	php -d auto_prepend_file='/tmp/composer-vendor-dir/autoload.php' $(PHPDOC) -d . -t .
