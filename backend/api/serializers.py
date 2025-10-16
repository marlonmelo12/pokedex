from rest_framework import serializers
from .models import Usuario, TipoPokemon, PokemonUsuario

class TipoPokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPokemon
        fields = ['id', 'descricao']

class PokemonUsuarioSerializer(serializers.ModelSerializer):
    tipos = TipoPokemonSerializer(many=True, read_only=True)
    
    class Meta:
        model = PokemonUsuario
        fields = ['id', 'usuario', 'codigo', 'nome', 'imagem_url', 'grupo_batalha', 'favorito', 'tipos']
        read_only_fields = ['usuario']

class UsuarioSerializer(serializers.ModelSerializer):
    pokemons = PokemonUsuarioSerializer(many=True, read_only=True)
    
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email','password', 'pokemons']
        read_only_fields = ['dt_inclusao', 'dt_alteracao']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def create(self, validated_data):
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user