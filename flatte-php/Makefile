test: test1 test2

test1: composer
	./vendor/bin/phpunit --bootstrap vendor/autoload.php flatten-test.php

test2: composer
	./vendor/bin/phpunit --bootstrap vendor/autoload.php flatten-test2.php

/tmp/.composer:
	mkdir /tmp/.composer

/app/.composer: /tmp/.composer
	ln -s /tmp/.composer /app/.composer
  
composer: composer.json /app/.composer
	composer install
