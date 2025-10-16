from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, TipoPokemonViewSet, PokemonUsuarioViewSet

router = DefaultRouter()

router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'tipos', TipoPokemonViewSet, basename='tipopokemon') 
router.register(r'pokemons', PokemonUsuarioViewSet, basename='pokemonusuario')

urlpatterns = [
    path('', include(router.urls)),
    path('public/pokemons/', public_pokemon_list, name='public-pokemon-list'),
]
