import httpimport

# Specify the full URL of the module
module_url = 'https://althex.glitch.me/althex/__init__.py'

# Load the module directly from the URL
with httpimport.load('althex', module_url):
    import althex
