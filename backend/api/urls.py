from django.urls import path
from .views import WordOfTheDayView, WordView, WordListCreateView, WordCheck

urlpatterns = [
    path('words/', WordListCreateView.as_view(), name='word-list-create'),
    path('word-check/<str:word>/', WordCheck.as_view(), name='word-check'),
    path('word/<uuid:word_id>/', WordView.as_view(), name='word'),
    path('word-of-the-day/', WordOfTheDayView.as_view(), name='word-of-the-day'),
]