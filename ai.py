import sqlite3
import requests

API_KEY = "sk-2458de03176642bfae1b6a346c26ee8e"
API_URL = "https://api.deepseek.com/chat/completions"

def get_full_context():
    conn = sqlite3.connect('city.db')
    cursor = conn.cursor()

    # Собираем данные: Проект + Команда + Вакансии
    cursor.execute('''
        SELECT 
            p.title, p.full_description, p.category,
            t.name, t.culture,
            n.required_skill, n.description
        FROM team_needs n
        JOIN teams t ON n.team_id = t.id
        JOIN projects p ON t.project_id = p.id
    ''')
    data = cursor.fetchall()
    conn.close()

    context = "АКТУАЛЬНЫЕ ПРОЕКТЫ И КОМАНДЫ ТЮМЕНИ:\n\n"
    for row in data:
        context += f"ПРОЕКТ: {row[0]} ({row[2]})\n"
        context += f"О проекте: {row[1]}\n"
        context += f"КОМАНДА: {row[3]}\n"
        context += f"Культура в команде: {row[4]}\n"
        context += f"КТО НУЖЕН: {row[5]} - {row[6]}\n"
        context += "-" * 30 + "\n"
    return context

def ask_ai(question):
    context = get_full_context()
    
    system_instruction = """
    Ты — экспертный ментор портала 'Умный город Тюмень'. 
    Твоя цель: идеально сопоставить навыки пользователя с потребностями команд.
    Обращай внимание на 'мягкие' условия: если команда готова учить — предлагай её новичкам. 
    Если команда на удаленке — делай на этом акцент.
    
    ОБЯЗАТЕЛЬНО:
    1. Указывай название проекта и команды.
    2. Объясняй, ПОЧЕМУ ты это рекомендуешь (например: 'Они готовы обучать OpenCV').
    3. Используй дружелюбный тон.
    """

    payload = {
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": f"ДАННЫЕ:\n{context}\n\nВОПРОС ПОЛЬЗОВАТЕЛЯ: {question}"}
        ]
    }

    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

    try:
        response = requests.post(API_URL, json=payload, headers=headers)
        return response.json()['choices'][0]['message']['content']
    except Exception as e:
        return f"Ошибка: {e}"

# Простой цикл общения
while True:
    q = input("Вы (введите навыки или вопрос): ")
    if q.lower() in ['exit', 'quit']: break
    print("\nАссистент подбирает варианты...")
    print(ask_ai(q))
    print("\n" + "="*50 + "\n")