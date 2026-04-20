from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from octofit_tracker.models import Team, Activity, Leaderboard, Workout

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='pass', first_name='Tony', last_name='Stark'),
            User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='pass', first_name='Steve', last_name='Rogers'),
            User.objects.create_user(username='batman', email='batman@dc.com', password='pass', first_name='Bruce', last_name='Wayne'),
            User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='pass', first_name='Diana', last_name='Prince'),
        ]

        # Activities
        Activity.objects.create(name='Run', user='ironman', team='Marvel', points=50)
        Activity.objects.create(name='Swim', user='captainamerica', team='Marvel', points=40)
        Activity.objects.create(name='Cycle', user='batman', team='DC', points=60)
        Activity.objects.create(name='Yoga', user='wonderwoman', team='DC', points=30)

        # Leaderboard
        Leaderboard.objects.create(team='Marvel', points=90)
        Leaderboard.objects.create(team='DC', points=90)

        # Workouts
        Workout.objects.create(name='Super Strength', description='Strength training for heroes', suggested_for='Marvel')
        Workout.objects.create(name='Stealth Moves', description='Agility and stealth for DC heroes', suggested_for='DC')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
