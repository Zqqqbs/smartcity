import os

# Что ищем и на что меняем
OLD_LINK = 'https://i.postimg.cc/Vk3Smcdc/icons8-zcina-60.png'
NEW_LINK = 'https://i.postimg.cc/Vk3Smcdc/icons8-zcina-60.png'

# Расширения файлов, в которых будем делать замену
EXTENSIONS = ('.tsx', '.ts', '.js', '.json', '.html', '.css', '.py')

def replace_in_files():
    count = 0
    # Проходим по всем папкам и подпапкам
    for root, dirs, files in os.walk("."):
        # Пропускаем папку node_modules и .git, чтобы не тратить время
        if 'node_modules' in root or '.git' in root:
            continue
            
        for file in files:
            if file.endswith(EXTENSIONS):
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if OLD_LINK in content:
                        new_content = content.replace(OLD_LINK, NEW_LINK)
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"✅ Изменено: {file_path}")
                        count += 1
                except Exception as e:
                    print(f"❌ Ошибка в файле {file_path}: {e}")

    print(f"\nГотово! Ссылка заменена в {count} файлах.")

if __name__ == "__main__":
    replace_in_files()