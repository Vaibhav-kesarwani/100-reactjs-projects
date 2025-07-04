import os
import re

def undo_renaming(path="."):
    folders = [f for f in os.listdir(path) if os.path.isdir(os.path.join(path, f))]

    for folder in folders:
        match = re.match(r"^\d{3}_(.+)", folder)
        if match:
            new_folder_name = match.group(1)
            old_path = os.path.join(path, folder)
            new_path = os.path.join(path, new_folder_name)

            os.rename(old_path, new_path)
            print(f"Reverted: {folder} → {new_folder_name}")

undo_renaming()
