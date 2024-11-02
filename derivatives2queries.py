from pathlib import Path

from unidecode import unidecode

filein = Path("derivatives.txt")
fileout = filein.with_stem(f"{filein.stem}_queries")
wordlinks = {"thu vien": "thu-vien", "cua hang": "cua-hang"}


text = filein.read_text("utf-8")
normalized_text = unidecode(text)
print(normalized_text)
striped_text = normalized_text.strip()
print(striped_text)
nodots_text = striped_text.replace(".", "")
print(nodots_text)
lowercased_text = nodots_text.lower()
print(lowercased_text)
wordlinked_text = lowercased_text
for word, hyphenated_word in wordlinks.items():
    wordlinked_text.replace(word, hyphenated_word)
print(wordlinked_text)
lines = wordlinked_text.split("\n")
print(lines)
words_bylines = [line.split() for line in lines]
print(words_bylines)
query_lines = [f"s(Tree,[{", ".join(line)}],[])." for line in words_bylines]
print(query_lines)
query_text = "\n".join(query_lines)
print(query_text)
fileout.write_text(query_text, "utf-8")
