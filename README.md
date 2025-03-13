# wordle
Implementation of wordle using React/Typescript and Python/Django

![image](https://github.com/user-attachments/assets/a750a33f-2269-4e7b-b674-98a2ce370c2f)


## Frontend

The frontend is running at port 5173.

```bash
cd ./frontend
yarn # install packages
```

### Running the frontend
```bash
yarn dev
```

### Testing the frontend
```bash
yarn test
```

## Backend

The frontend is running at port 8000.

```bash
cd ./backend
python -m venv env # or python3
source env/bin/activate
pip install -r requirements.txt # or pip3
```

### Running the backend
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Testing the backend (with coverage)
```bash
coverage run manage.py test
coverage report
```

## Additional Notes
- The GET request that checks the word you inputed has the side effect of creating a word if there is none. Typically you would create the word via a daily cron job or something along those lines, but here it's done like this for simplicity
- If you want to change the daily word, get the word id via `GET /api/words/` and then delete it via `DELETE /api/word/{id}`. A new word will be generate next time a request is made
- The word is generate server side and it's only revealed at the end
