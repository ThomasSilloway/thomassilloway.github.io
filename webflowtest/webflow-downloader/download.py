import requests
from bs4 import BeautifulSoup

# Make a request to the website and download the HTML file
url = 'https://test-contact-form-with-animation.webflow.io/'
response = requests.get(url)
html_content = response.text

# Parse the HTML and extract the link to the CSS file
soup = BeautifulSoup(html_content, 'html.parser')
css_link = soup.find('link', {'rel': 'stylesheet'})['href']

# Download the CSS file
css_response = requests.get(css_link)
css_content = css_response.text

# Replace the link to the CSS file in the HTML with a local link
local_css_link = './css/style.css'
soup.find('link', {'rel': 'stylesheet'})['href'] = local_css_link

# Find the javascript links
js_link = ""
local_path = f'./webflow_code.js'
found_script = None
for script in soup.find_all('script'):
    src = script.get('src')
    if src and not "jquery" in src:
        js_link = src
        found_script = script
        break

# Update the path to the new file
found_script['src'] = local_path

# Insert a couple new JS files after this one
custom_js_files = [
    "config.js",
    "custom-code.js"
]

for filename in custom_js_files:
    new_script = soup.new_tag("script")
    new_script['src'] = './' + filename
    found_script.insert_after(new_script)

# Download the JavaScript files
js_response = requests.get(js_link)
js_content = js_response.text

# Replace the links to the JavaScript files in the HTML with local links
local_js_links = []

with open('.' + local_path, 'w', encoding='utf-8') as f:
    f.write(js_content)
    local_js_link = local_path

# Create pretty html file
soup = soup.prettify()
modified_html_content = str(soup)

# Save the modified HTML file and the CSS file to your local machine
with open('../index.html', 'w') as f:
    f.write(modified_html_content)

with open('../css/style.css', 'w') as f:
    f.write(css_content)
