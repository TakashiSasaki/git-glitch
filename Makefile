TARURL=https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-419.0.0-linux-x86_64.tar.gz

all: /tmp/google-cloud-sdk

/tmp/gcloud.tar.gz:
	wget -nd -nH -O $@ $(TARURL)


/tmp/google-cloud-sdk: /tmp/gcloud.tar.gz
	cd /tmp; tar zxvf $<

