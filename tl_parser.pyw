import requests
import xml.etree.ElementTree as ET
import json
import logging
import sys
import time
import os
from bs4 import BeautifulSoup

# Настройка логов
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')

def download_image(session, url, news_id):
    """Скачивает картинку и возвращает путь к локальному файлу"""
    if not url:
        return ""
    
    try:
        # Папка, куда сохраняем (для React это обычно public/news_images)
        target_dir = os.path.join('public', 'news_images')
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)

        # Формируем имя файла
        extension = url.split('.')[-1].split('?')[0] # берем расширение (jpg, png)
        if len(extension) > 4: extension = 'jpg'
        filename = f"news_{news_id}.{extension}"
        filepath = os.path.join(target_dir, filename)

        # Скачиваем
        img_data = session.get(url, timeout=15, proxies={"http": None, "https": None}).content
        with open(filepath, 'wb') as handler:
            handler.write(img_data)
            
        # Возвращаем путь, который будет понятен React-у (относительно папки public)
        return f"/news_images/{filename}"
    except Exception as e:
        logging.error(f"Не удалось скачать картинку {url}: {e}")
        return ""

def get_article_details(session, url, news_id):
    """Извлекает текст и скачивает картинку"""
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    
    try:
        time.sleep(1)
        response = session.get(url, headers=headers, timeout=15, proxies={"http": None, "https": None})
        if response.status_code != 200:
            return "Ошибка доступа к странице", ""

        soup = BeautifulSoup(response.text, 'html.parser')

        # --- ПОИСК ТЕКСТА ---
        # Пробуем разные варианты контейнеров, которые бывают на t-l.ru
        content = None
        for selector in ['div.text', 'div.article-text', 'div.news-text', 'article']:
            content = soup.select_one(selector)
            if content: break
        
        if content:
            # Чистим текст от скриптов и рекламы внутри
            for s in content(['script', 'style', 'aside']): s.decompose()
            full_text = content.get_text(separator='\n', strip=True)
        else:
            # Запасной вариант: берем все P из основного блока
            paragraphs = soup.find_all('p')
            full_text = "\n".join([p.get_text() for p in paragraphs if len(p.get_text()) > 50])

        if not full_text.strip():
            full_text = "Текст статьи временно недоступен."

        # --- ПОИСК И СКАЧИВАНИЕ КАРТИНКИ ---
        image_url = ""
        og_image = soup.find("meta", property="og:image")
        if og_image:
            image_url = og_image["content"]
        
        if not image_url:
            img_tag = content.find('img') if content else None
            if img_tag: image_url = img_tag.get('src', '')

        if image_url and not image_url.startswith('http'):
            image_url = "https://t-l.ru" + image_url

        # Скачиваем картинку себе
        local_image_path = download_image(session, image_url, news_id)

        return full_text, local_image_path

    except Exception as e:
        logging.error(f"Ошибка парсинга {url}: {e}")
        return "Ошибка загрузки", ""

def parse_tl_full():
    rss_url = "https://t-l.ru/rss.xml"
    session = requests.Session()
    session.trust_env = False

    try:
        res = session.get(rss_url, timeout=20, proxies={"http": None, "https": None})
        root = ET.fromstring(res.content)
        items = root.findall('.//item')
        
        results = []
        for i, item in enumerate(items[:36], 1): # Берем 6 новостей
            title = item.find('title').text.strip()
            link = item.find('link').text.strip()
            date = item.find('pubDate').text.strip()

            logging.info(f"Парсим [{i}]: {title[:50]}...")
            text, local_img = get_article_details(session, link, i)

            results.append({
                "id": i,
                "title": title,
                "link": link,
                "date": date,
                "description": text[:200] + "...",
                "full_text": text,
                "imageUrl": local_img, # Теперь здесь путь типа /news_images/news_1.jpg
                "tag": "Город"
            })
            
        return results
    except Exception as e:
        logging.error(f"Ошибка RSS: {e}")
        return []

if __name__ == "__main__":
    data = parse_tl_full()
    if data:
        # Сохраняем JSON в папку src/data (или где он у тебя лежит)
        with open('public/news_data.json', 'w', encoding='utf-8') as j:
            json.dump(data, j, ensure_ascii=False, indent=4)
        logging.info("Готово! Картинки в public/news_images, данные в news_data.json")