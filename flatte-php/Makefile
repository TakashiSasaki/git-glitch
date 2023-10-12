test: test-flatten test-unflatten
test-unflatten: unflatten-test1 unflatten-test2 unflatten-test3
test-flatten: flatten-test1 flatten-test2 flatten-test3


flatten-test1: composer
	./vendor/bin/phpunit --bootstrap vendor/autoload.php flatten-test1.php

flatten-test2: composer
	./vendor/bin/phpunit --bootstrap vendor/autoload.php flatten-test2.php

flatten-test3: composer
	./vendor/bin/phpunit --bootstrap vendor/autoload.php flatten-test3.php

unflatten-test1: composer
	./vendor/bin/phpunit --bootstrap vendor/autoload.php $@.php

unflatten-test2: composer
	./vendor/bin/phpunit --bootstrap vendor/autoload.php $@.php

unflatten-test3: composer
	./vendor/bin/phpunit --bootstrap vendor/autoload.php $@.php

/tmp/.composer:
	mkdir /tmp/.composer

/app/.composer: /tmp/.composer
	ln -s /tmp/.composer /app/.composer
  
composer: composer.json /app/.composer
	composer install
