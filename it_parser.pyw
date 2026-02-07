import requests
import xml.etree.ElementTree as ET
import json
import logging
import sys
import os
import time
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')

def download_it_image(session, url, news_id):
    if not url: return ""
    try:
        target_dir = os.path.join('public', 'news_images')
        if not os.path.exists(target_dir): os.makedirs(target_dir)
        ext = url.split('.')[-1].split('?')[0]
        if len(ext) > 4: ext = 'jpg'
        filename = f"it_{news_id}.{ext}"
        filepath = os.path.join(target_dir, filename)
        
        res = session.get(url, timeout=15)
        with open(filepath, 'wb') as f:
            f.write(res.content)
        return f"/news_images/{filename}"
    except: return ""

def get_full_text_from_url(session, url):
    """Попытка достать полный текст со страницы статьи"""
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'}
    try:
        time.sleep(1)
        res = session.get(url, headers=headers, timeout=10)
        if res.status_code != 200: return None
        
        soup = BeautifulSoup(res.text, 'html.parser')
        # Ищем по всем возможным тегам контента Хабра
        article = soup.find('div', {'class': ['article-formatted-body', 'tm-article-body', 'post-content-body']})
        if not article:
            article = soup.find('div', id='post-content-body')
            
        return article.get_text(separator='\n', strip=True) if article else None
    except:
        return None

def parse_habr():
    rss_url = "https://habr.com/ru/rss/articles/"
    session = requests.Session()
    session.trust_env = False 

    logging.info("--- ЗАПУСК ОБНОВЛЕННОГО IT-ПАРСЕРА ---")
    try:
        res = session.get(rss_url, timeout=20)
        root = ET.fromstring(res.content)
        items = root.findall('.//item')
        
        results = []
        for i, item in enumerate(items[:36], 1):
            title = item.find('title').text.strip()
            link = item.find('link').text.strip()
            pub_date = item.find('pubDate').text if item.find('pubDate') is not None else ""
            
            # --- РАБОТАЕМ С ОПИСАНИЕМ ИЗ RSS ---
            description_html = item.find('description').text
            rss_soup = BeautifulSoup(description_html, 'html.parser')
            
            # 1. Ищем картинку прямо в описании
            img_tag = rss_soup.find('img')
            rss_img_url = img_tag['src'] if img_tag else ""
            
            # 2. Ищем текст превью в описании
            rss_text = rss_soup.get_text(strip=True).replace('Читать далее', '')

            logging.info(f"Парсим IT [{i}]: {title[:50]}...")
            
            # 3. Пытаемся зайти на сайт за полным текстом
            full_text = get_full_text_from_url(session, link)
            
            # Если полный текст не нашли, берем текст из RSS
            final_text = full_text if full_text else rss_text
            
            # 4. Скачиваем картинку
            local_img = download_it_image(session, rss_img_url, i)

            results.append({
                "id": i + 100,
                "title": title,
                "link": link,
                "date": pub_date,
                "description": rss_text[:200] + "...",
                "full_text": final_text,
                "imageUrl": local_img,
                "tag": "Технологии"
            })
            
        return results
    except Exception as e:
        logging.error(f"Критическая ошибка: {e}")
        return []

if __name__ == "__main__":
    it_data = parse_habr()
    if it_data:
        with open('public/it_news_data.json', 'w', encoding='utf-8') as j:
            json.dump(it_data, j, ensure_ascii=False, indent=4)
        logging.info("Успех! Данные извлечены (включая fallback из RSS).")