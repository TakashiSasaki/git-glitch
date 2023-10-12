test: composer
	./vendor/bin/phpunit --bootstrap vendor/autoload.php flatten-test.php

/tmp/.composer:
	mkdir /tmp/.composer

/app/.composer: /tmp/.composer
	ln -s /tmp/.composer /app/.composer
  
composer: composer.json /app/.composer
	composer install
