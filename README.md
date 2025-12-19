# LiberalPost

## Opis projektu
LiberalPost to satyryczny portal publikujący absurdalne newsy oparte na przesadzonych wpisach w mediach społecznościowych. Projekt stworzony w Node.js z użyciem Express i EJS.

## Funkcjonalności
- Wyświetlanie listy postów
- Widok pojedynczego posta
- Panel admina z CRUD (dodawanie, edycja, usuwanie postów)
- Filtracja i sortowanie postów
- Rejestracja i logowanie użytkowników
- Panel klienta z ostatnio czytanymi postami
- Seedowanie konta administratora i początkowych postów

## Instalacja
1. Zainstaluj Node.js
2. Sklonuj repozytorium
3. Uruchom `npm install`
4. Uruchom serwer: `npm start`
5. (Opcjonalnie) Uruchom seedAdmin, aby dodać konto administratora:  
   `node seedAdmin.js`
6. (Opcjonalnie) Uruchom seedArticles, aby dodać początkowe posty:  
   `node seedArticles.js`

## Seedowanie konta administratora
Skrypt `seedAdmin.js` tworzy konto administratora w bazie danych, jeśli jeszcze nie istnieje.  
Dane logowania do konta admina:

- **Login:** admin  
- **Hasło:** Admin123!  

Po uruchomieniu skryptu w konsoli zobaczysz komunikat:
- `Admin utworzony: admin / Admin123!`, jeśli konto zostało stworzone
- `Admin już istnieje.`, jeśli konto było już w bazie

## Seedowanie przykładowych postów
Skrypt `seedArticles.js` dodaje początkowe, satyryczne posty w stylu LiberalPost.  
Po uruchomieniu zobaczysz w konsoli komunikaty o utworzonych postach.

## Endpointy
- `GET /` – lista postów  
- `GET /posts/:slug` – pojedynczy post  
- `GET /auth/login` – formularz logowania  
- `GET /auth/register` – formularz rejestracji  
- `GET /admin/posts` – panel admina  
- `POST /admin/posts` – tworzenie posta  
- `PUT /admin/posts/:id` – edycja posta  
- `DELETE /admin/posts/:id` – usuwanie posta  

## Technologie
- Node.js
- Express
- EJS
- MongoDB
- bcrypt (hashowanie haseł)
- CSS / HTML

## Autorzy
- Daniel Sobala

## Licencja
Projekt jest udostępniony na licencji MIT. Zobacz plik LICENSE.
