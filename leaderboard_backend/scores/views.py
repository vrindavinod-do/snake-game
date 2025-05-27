from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Score
from .serializers import ScoreSerializer

@api_view(['GET'])
def leaderboard(request):
    scores = Score.objects.all().order_by('-score')[:10]
    serializer = ScoreSerializer(scores, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def submit_score(request):
    serializer = ScoreSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True})
    return Response(serializer.errors, status=400)
