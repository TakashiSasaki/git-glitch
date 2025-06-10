.PHONY: composer test test-unflatten test-flatten 

test: test-flatten test-unflatten

test-unflatten: composer.lock
	./vendor/bin/phpunit --bootstrap vendor/autoload.php unflatten-test1.php
	./vendor/bin/phpunit --bootstrap vendor/autoload.php unflatten-test2.php
	./vendor/bin/phpunit --bootstrap vendor/autoload.php unflatten-test3.php

test-flatten: composer.lock
	./vendor/bin/phpunit --bootstrap vendor/autoload.php flatten-test1.php
	./vendor/bin/phpunit --bootstrap vendor/autoload.php flatten-test2.php
	./vendor/bin/phpunit --bootstrap vendor/autoload.php flatten-test3.php

/tmp/.composer:
	mkdir /tmp/.composer

/app/.composer: /tmp/.composer
	ln -s /tmp/.composer /app/.composer
  
composer.lock: composer.json /app/.composer
	composer install

clean:
	rm -rf vendor/ /app/.composer/  /tmp/.composer/
