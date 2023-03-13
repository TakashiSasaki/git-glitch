/tmp/aws-cli: /tmp/aws
	cd /tmp/aws; ./install --bin-dir /tmp/bin --install-dir /tmp/aws-cli

/tmp/aws/: /tmp/awscliv2.zip
	cd /tmp; unzip $<

/tmp/awscliv2.zip:
	curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o $@


clean:
	rm -rf /tmp/aws-cli /tmp/aws /tmp/awscliv2.zip

test: /tmp/bin/aws
	$< --version
