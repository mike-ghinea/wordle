from datetime import date
import os
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Word
from .serializers import WordSerializer
import random

def random_word():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    words_file_path = os.path.join(current_dir, './utils/words.txt')
    try:
        with open(words_file_path, 'r') as file:
            words = file.read().splitlines()
            if not words:
                return "empty"
            return random.choice(words).strip().lower()
    except FileNotFoundError:
        return "error"

class WordListCreateView(generics.ListCreateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer

class WordView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'word_id'

class WordOfTheDayView(APIView):
    def get(self, _):
        today = date.today()
        word_of_day = Word.objects.filter(date=today).first()

        if not word_of_day:
           return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(word_of_day.word)
        
class WordCheck(APIView):
    def get(self, _, word):

        if (len(word) < 5 or len(word) > 5):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        today = date.today()
        word_of_day = Word.objects.filter(date=today).first()

        if not word_of_day:
            # If no word exists for today, create one
            # This should ordinarily be done via a cron job, 
            # but I'm doing it like this for simplicity
            word_of_day = Word.objects.create(
                word=random_word(),
                date=today
            )

        word_dict = {}
        for letter in word_of_day.word:
            if letter in word_dict:
                word_dict[letter] += 1
            else:
                word_dict[letter] = 1
      
        result = ["", "", "", "", ""]
        for index, letter in enumerate(word):
            if letter == word_of_day.word[index]:
                result[index] = 'g'
                word_dict[letter] -= 1
        for index, letter in enumerate(word):
            if result[index] == 'g':
                continue
            elif word_dict.get(letter, 0) > 0:
                result[index] = 'y'
                word_dict[letter] -= 1
            else:
                result[index] = 'r'        
        
        return Response(result)   