AWS=/tmp/bin/aws

lambda-list-functions: $(AWS)
	$< lambda list-functions


$(AWS): /tmp/aws/install
	cd /tmp/aws; ./install --bin-dir /tmp/bin --install-dir /tmp/aws-cli

/tmp/aws/install: /tmp/awscliv2.zip
	cd /tmp; unzip -n $<

/tmp/awscliv2.zip:
	curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o $@

clean:
	rm -rf /tmp/bin /tmp/aws-cli /tmp/aws /tmp/awscliv2.zip
	ls /tmp

test: $(AWS)
	$< --version

configure: $(AWS)
	$< configure

