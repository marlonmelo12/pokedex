import requests

def map_pokemon_data(pokeapi_data):
    
    stats = { 'hp': 0, 'attack': 0, 'defense': 0 }
    for stat_item in pokeapi_data.get('stats', []):
        stat_name = stat_item.get('stat', {}).get('name')
        if stat_name in stats:
            stats[stat_name] = stat_item.get('base_stat', 0)


    types = [{'id': 0, 'descricao': t.get('type', {}).get('name', '').capitalize()} for t in pokeapi_data.get('types', [])]
    
    description = "Nenhuma descrição encontrada."
    species_url = pokeapi_data.get('species', {}).get('url') 
    if species_url:
        try:
            species_response = requests.get(species_url)
            species_response.raise_for_status()
            species_data = species_response.json()
            for entry in species_data.get('flavor_text_entries', []):
                if entry.get('language', {}).get('name') == 'en':
                    description = entry.get('flavor_text', '').replace('\n', ' ').replace('\f', ' ')
                    break
        except requests.exceptions.RequestException as e:
            print(f"AVISO: Falha ao buscar descrição da espécie. Erro: {e}")
            
   
    abilities = [a.get('ability', {}).get('name', '').capitalize() for a in pokeapi_data.get('abilities', [])]
    
    mapped_data = {
        'id': pokeapi_data.get('id', 0),
        'codigo': str(pokeapi_data.get('id', '')).zfill(3),
        'name': pokeapi_data.get('name', 'Unknown').capitalize(),
        'imageUrl': pokeapi_data.get('sprites', {}).get('other', {}).get('official-artwork', {}).get('front_default'),
        'types': types,
        'stats': stats,
        'description': description,
        'abilities': abilities
    }
    
    return mapped_data