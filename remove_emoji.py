import glob
import os

target_files = glob.glob('*.html') + glob.glob('*.js')

for f in target_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()

    new_content = content.replace('Collectables', 'Collectibles')

    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {f}")
