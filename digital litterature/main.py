import json
from flask import Flask, render_template
import sqlite3
con = sqlite3.connect("Haikus.db")
cur = con.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS Haiku (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    theme TEXT,
    author TEXT
)
""")

with open("haikus.json", "r", encoding="utf-8") as f:
    data = json.load(f)

haikus = data.get("haikus", [])

for haiku in haikus:
    cur.execute(
        """
        INSERT INTO Haiku (content, theme, author)
        VALUES (?, ?, ?)
        """,
        (haiku['content'], haiku['theme'], haiku['author'])
    )

con.commit()
con.close()
