/tmp/bin/aws: /tmp/aws/install
	cd /tmp/aws; ./install --bin-dir /tmp/bin --install-dir /tmp/aws-cli

/tmp/aws/install: /tmp/awscliv2.zip
	cd /tmp; unzip $<

/tmp/awscliv2.zip:
	curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o $@

clean:
	rm -rf /tmp/bin /tmp/aws-cli /tmp/aws /tmp/awscliv2.zip
	ls /tmp

test: /tmp/bin/aws
	$< --version

configure: /tmp/bin/aws
	$< configure

