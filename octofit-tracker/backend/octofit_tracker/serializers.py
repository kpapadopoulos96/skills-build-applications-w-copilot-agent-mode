from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Team, Activity, Leaderboard, Workout
from bson import ObjectId

class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value) if value else None
    def to_internal_value(self, data):
        return ObjectId(data) if data else None

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    id = ObjectIdField(source='_id', required=False)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class TeamSerializer(serializers.ModelSerializer):
    id = ObjectIdField(source='_id', required=False)
    class Meta:
        model = Team
        fields = ['id', 'name']

class ActivitySerializer(serializers.ModelSerializer):
    id = ObjectIdField(source='_id', required=False)
    class Meta:
        model = Activity
        fields = ['id', 'name', 'user', 'team', 'points']

class LeaderboardSerializer(serializers.ModelSerializer):
    id = ObjectIdField(source='_id', required=False)
    class Meta:
        model = Leaderboard
        fields = ['id', 'team', 'points']

class WorkoutSerializer(serializers.ModelSerializer):
    id = ObjectIdField(source='_id', required=False)
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'suggested_for']
