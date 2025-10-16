from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action

from .models import Usuario, TipoPokemon, PokemonUsuario
from .serializers import UsuarioSerializer, TipoPokemonSerializer, PokemonUsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def registrar(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {"message": f"Usuário {user.username} registrado com sucesso."},
            status=status.HTTP_201_CREATED
        )
        
class TipoPokemonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TipoPokemon.objects.all()
    serializer_class = TipoPokemonSerializer
    permission_classes = [IsAuthenticated]
    
class PokemonUsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = PokemonUsuarioSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return PokemonUsuario.objects.filter(usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)