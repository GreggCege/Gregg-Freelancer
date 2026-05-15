import glob
import os

target_files = glob.glob('*.html')

OLD = '''        <div class="menu-category">
            <a href="Favorites.html" class="menu-title" style="text-decoration: none;">
                ❤ My Favorites
            </a>
        </div>'''

NEW = '''        <div class="menu-category">
            <a href="Favorites.html" class="menu-title" style="text-decoration: none;">
                ❤ My Favorites
            </a>
        </div>
        <div class="menu-category">
            <a href="Orders.html" class="menu-title" style="text-decoration: none;">
                My Orders
            </a>
        </div>'''

for f in target_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()

    if OLD in content and 'Orders.html' not in content:
        new_content = content.replace(OLD, NEW)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {f}")
