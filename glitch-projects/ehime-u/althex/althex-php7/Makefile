PHPUNIT=/tmp/composer-vendor-dir/bin/phpunit
PHPDOC=/tmp/composer-vendor-dir/bin/phpdoc

default:
	cd ~ ; make du
	

test:
	$(PHPUNIT) determine_case_test.php 
	$(PHPUNIT) to_althex_test.php 
	$(PHPUNIT) from_althex_test.php 
	$(PHPUNIT) roundtrip_test.php 

composer:
	COMPOSER_CACHE_DIR=/tmp/composer-cache-dir/ composer require phpdocumentor/phpdocumentor
	mkdir -p /tmp/composer-vendor-dir/phpdocumentor/phpdocumentor/src/phpDocumentor
	mkdir -p /tmp/composer-vendor-dir/phpdocumentor/phpdocumentor/vendor
	ln -s /tmp/composer-vendor-dir/autoload.php /tmp/composer-vendor-dir/phpdocumentor/phpdocumentor/vendor/autoload.php
	COMPOSER_CACHE_DIR=/tmp/composer-cache-dir/ composer require phpunit/phpunit
	COMPOSER_CACHE_DIR=/tmp/composer-cache-dir/ composer install

doc:
	$(PHPDOC) -c phpdoc.xml -d . -t ../althex-php7-doc/  --cache-folder /tmp/phpdoc-cache --force --sourcecode

