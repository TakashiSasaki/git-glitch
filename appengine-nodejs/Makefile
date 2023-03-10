TARURL=https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-419.0.0-linux-x86_64.tar.gz

all: install

/tmp/gcloud.tar.gz:
	wget -nd -nH -O $@ $(TARURL)


/tmp/google-cloud-sdk: /tmp/gcloud.tar.gz
	cd /tmp; tar zxvf $<

install: /tmp/google-cloud-sdk
	cd /tmp/google-cloud-sdk; ./install.sh --command-completion true --bash-completion true --path-update true --usage-reporting true --rc-path /app/.bashrc

uninstall:
	rm -rf /tmp/google-cloud-sdk

deploy:
	/tmp/google-cloud-sdk/bin/gcloud app deploy
