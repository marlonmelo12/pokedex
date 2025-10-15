from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    dt_include = models.DateTimeField(auto_now_add=True)
    dt_update = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
    
class TipoPokemon(models.Model):
    descricao = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.descricao
    
class PokemonUsuario(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='pokemons')
    tipos = models.ManyToManyField(TipoPokemon)
    codigo = models.CharField(max_length=100)
    nome = models.CharField(max_length=100)
    imagem_url = models.URLField(verbose_name='URL da imagem')
    grupo_batalha = models.BooleanField(default=False, verbose_name='No grupo de Batalha')
    favorito = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('usuario', 'codigo')

    def __str__(self):
        return f'{self.nome} - {self.usuario.username}'