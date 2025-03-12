from django.test import TestCase
from django.utils import timezone
from .models import Word
from rest_framework.test import APITestCase
from rest_framework import status

class WordModelTests(TestCase):
    def setUp(self):
        self.word = Word.objects.create(
            word="tests",
            date=timezone.now().date()
        )

    def test_word_creation(self):
        self.assertEqual(self.word.word, "tests")
        self.assertEqual(self.word.date, timezone.now().date())

class WordAPITests(APITestCase):
    def setUp(self):
        self.word = Word.objects.create(
            word="tests",
            date=timezone.now().date()
        )
        self.base_url = "/api"

    def test_list_words(self):
        response = self.client.get(f"{self.base_url}/words/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_word_check_correct(self):
        response = self.client.get(f"{self.base_url}/word-check/tests/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, ["g", "g", "g", "g", "g"])

    def test_word_check_incorrect(self):
        response = self.client.get(f"{self.base_url}/word-check/slain/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, ["y", "r", "r", "r", "r"])    

    def test_word_check_invalid_word(self):
        response = self.client.get(f"{self.base_url}/word-check/invalid/")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_word_of_the_day_view(self):    
        response = self.client.get(f"{self.base_url}/word-of-the-day/")
        self.assertEqual(response.data, self.word.word)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class WordRandomTests(APITestCase):
    def setUp(self):
        self.base_url = "/api"
    
    def test_word_check(self):
        response = self.client.get(f"{self.base_url}/word-check/tests/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5) 