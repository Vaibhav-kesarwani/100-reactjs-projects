import os

def rename_folders_with_index(path="."):
    excluded = {".git", ".github", "000-Hello-World"}

    folders = [
        f for f in os.listdir(path)
        if os.path.isdir(os.path.join(path, f)) and f not in excluded
    ]
    folders.sort()  # Sort alphabetically

    for index, folder in enumerate(folders, start=1):  # starts from 1
        old_path = os.path.join(path, folder)
        new_folder_name = f"{index:03d}_{folder}"
        new_path = os.path.join(path, new_folder_name)

        # Skip if already renamed
        if folder.startswith(f"{index:03d}_"):
            continue

        os.rename(old_path, new_path)
        print(f"Renamed: {folder} → {new_folder_name}")

rename_folders_with_index()
