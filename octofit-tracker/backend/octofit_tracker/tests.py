from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Team, Activity, Leaderboard, Workout

User = get_user_model()

class BasicModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')
    def test_activity_creation(self):
        activity = Activity.objects.create(name='Test', user='user', team='team', points=10)
        self.assertEqual(activity.points, 10)
    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(team='team', points=100)
        self.assertEqual(lb.points, 100)
    def test_workout_creation(self):
        workout = Workout.objects.create(name='W', description='desc', suggested_for='team')
        self.assertEqual(workout.name, 'W')
    def test_user_creation(self):
        user = User.objects.create_user(username='test', email='test@test.com', password='pass')
        self.assertEqual(user.username, 'test')
