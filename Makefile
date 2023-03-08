TARURL=https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-419.0.0-linux-x86_64.tar.gz

all: install

/tmp/gcloud.tar.gz:
	wget -nd -nH -O $@ $(TARURL)


/tmp/google-cloud-sdk: /tmp/gcloud.tar.gz
	cd /tmp; tar zxvf $<

install: /tmp/google-cloud-sdk
	cd /tmp/google-cloud-sdk; ./install.sh -q

