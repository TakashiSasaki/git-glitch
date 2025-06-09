test:
	python3 determine_case_test.py
	python3 to_althex_test.py
	python3 from_althex_test.py
	python3 roundtrip_test.py
	PIP_CACHE_DIR=/tmp/pip_cache pip3 install httpimport
	python3 http_test.py

doc:
	PIP_CACHE_DIR=/tmp/pip_cache pip3 install sphinx
	#pydoc -w althex

