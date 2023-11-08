to_althex_test:
	python3 althex/to_althex_test.py

from_althex_test:
	python3 althex/from_althex_test.py

determine_case_test:
	python3 althex/determine_case_test.py



althex.html:
	pydoc -w althex

testhttp:
	pip3 install httpimport
	python3 althex/testhttp.py

test:
	python3 -m althex.test

