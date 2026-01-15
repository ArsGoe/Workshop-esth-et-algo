import sqlite3
from bs4 import BeautifulSoup
import requests


def get_synonyms(word):
    """Get real French synonyms from Synonymo.fr"""
    url = f"https://www.synonymo.fr/synonyme/{word}"
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error fetching synonyms for {word}: {response.status_code}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")

    synonym_ul = soup.find("ul", class_="synos")
    if not synonym_ul:
        return []

    synonyms = [a.text.strip() for a in synonym_ul.find_all("a", class_="word")]
    return synonyms

def get_antonyms(word):
    """Get real French synonyms from Synonymo.fr"""
    url = f"https://www.antonyme.org/antonyme/{word}"
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error fetching synonyms for {word}: {response.status_code}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")

    antonym_exist = soup.find("ul", class_="main_content")
    antonym_ul = soup.find("ul", class_="synos")
    if not antonym_ul:
        return []

    antonyms = [a.text.strip() for a in antonym_ul.find_all("a", class_="word")]
    return antonyms


def fetch_haikus():
    conn = sqlite3.connect("Haikus.db")
    conn.row_factory = sqlite3.Row 
    cur = conn.cursor()
    
    cur.execute("SELECT content, theme, author FROM Haiku")
    haikus = cur.fetchall()
    
    conn.close()
    return haikus

def get_haikus(column, value):
    conn = sqlite3.connect("Haikus.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    value = str(value)

    match column:
        case 'author':
            cur.execute("SELECT content, theme, author FROM Haiku WHERE author LIKE ?", (f"%{value}%",))
        case 'theme':
            cur.execute("SELECT content, theme, author FROM Haiku WHERE theme LIKE ?", (f"%{value}%",))
        case 'content':
            cur.execute("SELECT content, theme, author FROM Haiku WHERE content LIKE ?", (f"%{value}%",))
    
    haikus = cur.fetchall()
    conn.close()
    return haikus

def get_synonyms_haikus(column, value):
    conn = sqlite3.connect("Haikus.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    haikus_list = []

    synonims = get_synonyms(value)
    value = str(value)

    if len(synonims) > 0:
        for synonim in synonims:
            match column:
                case 'author':
                    cur.execute("SELECT content, theme, author FROM Haiku WHERE author LIKE ?", (f"%{synonim}%",))
                case 'theme':
                    cur.execute("SELECT content, theme, author FROM Haiku WHERE theme LIKE ?", (f"%{synonim}%",))
                case 'content':
                    cur.execute("SELECT content, theme, author FROM Haiku WHERE content LIKE ?", (f"%{synonim}%",))
    
            haikus = cur.fetchall()
            if len(haikus) > 0 :
                for haiku in haikus:
                    if haiku not in haikus_list:
                        haikus_list.append(haiku)
    conn.close()
    
    return haikus_list

def get_antonyms_haikus(column, value):
    conn = sqlite3.connect("Haikus.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    haikus_list = []

    antonyms = get_antonyms(value)
    value = str(value)

    if len(antonyms) > 0:
        for antonym in antonyms:
            match column:
                case 'author':
                    cur.execute("SELECT content, theme, author FROM Haiku WHERE author LIKE ?", (f"%{antonym}%",))
                case 'theme':
                    cur.execute("SELECT content, theme, author FROM Haiku WHERE theme LIKE ?", (f"%{antonym}%",))
                case 'content':
                    cur.execute("SELECT content, theme, author FROM Haiku WHERE content LIKE ?", (f"%{antonym}%",))
    
            haikus = cur.fetchall()
            if len(haikus) > 0 :
                for haiku in haikus:
                    if haiku not in haikus_list:
                        haikus_list.append(haiku)
    conn.close()
    
    return haikus_list
