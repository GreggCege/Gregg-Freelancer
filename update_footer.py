import glob
import re

target_files = glob.glob('*.html')

new_social_links = """<div class="social-links">
                <a href="https://www.instagram.com/the.vault.us?igsh=OWVyNDZvZ2gxcmp3" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                <a href="https://www.tiktok.com/@the_vault_us_?_r=1&_t=ZP-96KzJc3L5bD" target="_blank" rel="noopener noreferrer"><i class="fab fa-tiktok"></i></a>
                <a href="https://www.facebook.com/share/18fn9VAkEG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
            </div>"""

for f in target_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We will use regex to find the <div class="social-links">...</div> block
    # and replace it with the new_social_links
    
    # Find the block
    pattern = re.compile(r'<div class="social-links">.*?</div>', re.DOTALL)
    
    if pattern.search(content):
        new_content = pattern.sub(new_social_links, content)
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Updated footer in {f}")
