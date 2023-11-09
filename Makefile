test:
	python3 althex/determine_case_test.py
	python3 althex/to_althex_test.py
	python3 althex/from_althex_test.py
	python3 althex/roundtrip_test.py
	pip3 install httpimport
	python3 althex/http_test.py

althex.html:
	pydoc -w althex

