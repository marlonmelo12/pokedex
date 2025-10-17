import requests
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.decorators import api_view, permission_classes

from api.mappers import map_pokemon_data


from .models import Usuario, TipoPokemon, PokemonUsuario
from .serializers import UsuarioSerializer, TipoPokemonSerializer, PokemonUsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_permissions(self):
        if self.action == 'registrar':
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
        
@api_view(['GET'])
@permission_classes([AllowAny])
def public_pokemon_list(request):
    pokeapi_url = 'https://pokeapi.co/api/v2/pokemon'
    params = {
        'limit': request.query_params.get('limit', 20),
        'offset': request.query_params.get('offset', 0)
    }
    
    try:
        list_response = requests.get(pokeapi_url, params=params)
        list_response.raise_for_status()
        list_data = list_response.json()
        
        detailed_results = []
        with requests.Session() as session:
            for pokemon_summary in list_data.get('results', []):
                detail_url = pokemon_summary.get('url')
                if detail_url:
                    detail_response = session.get(detail_url)
                    detail_response.raise_for_status()
                    clean_data = map_pokemon_data(detail_response.json())
                    detailed_results.append(clean_data)
                    
        return Response({
            'count': list_data.get('count'),
            'next': list_data.get('next'),
            'previous': list_data.get('previous'),
            'results': detailed_results
        })
    except requests.exceptions.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class PokemonUsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = PokemonUsuarioSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return PokemonUsuario.objects.filter(usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
        
    @action(detail=False, methods=['post'])
    def get_or_toggle_favorite(self, request):
        codigo = request.data.get('codigo')
        if not codigo:
            return Response({'error': 'Código do Pokémon é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)
        
        pokemon, created = PokemonUsuario.objects.get_or_create(
            usuario=request.user,
            codigo=codigo,
            defaults={
                'nome': request.data.get('aome'),
                'imagem_url': request.data.get('imageUrl'),
            }
        )
        
        if created:
            type_descriptions = [t['descricao'] for t in request.data.get('types', [])]
            for desc in type_descriptions:
                tipo, _ = TipoPokemon.objects.get_or_create(descricao=desc)
                pokemon.tipos.add(tipo)
        
        pokemon.favorito = not pokemon.favorito
        pokemon.save()
        
        serializer = self.get_serializer(pokemon)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def get_or_toggle_battle_team(self, request):
        codigo = request.data.get('codigo')
        if not codigo:
            return Response({'error': 'Código do Pokémon é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)
        
        pokemon, created = PokemonUsuario.objects.get_or_create(
            usuario=request.user,
            codigo=codigo,
            defaults={
                'nome': request.data.get('name'),
                'imagem_url': request.data.get('imageUrl'),
            }
        )
        
        if created:
            type_descriptions = [t['descricao'] for t in request.data.get('types', [])]
            for desc in type_descriptions:
                tipo, _ = TipoPokemon.objects.get_or_create(descricao=desc)
                pokemon.tipos.add(tipo)
                
        if not pokemon.grupo_batalha:
            team_count = self.get_queryset().filter(grupo_batalha=True).count()
            if team_count >= 6:
                return Response(
                    {'error': 'O grupo de batalha já está cheio (máximo 6 Pokémons).'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        pokemon.grupo_batalha = not pokemon.grupo_batalha
        pokemon.save()
        
        serializer = self.get_serializer(pokemon)
        return Response(serializer.data, status=status.HTTP_200_OK)
                