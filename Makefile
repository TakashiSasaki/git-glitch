test_determine_case:
	python3 althex/test_determine_case.py


althex.html:
	pydoc -w althex

testhttp:
	pip3 install httpimport
	python3 althex/testhttp.py

test:
	python3 -m althex.test

