def map_pokemon_data(pokeapi_data):
    stats = {}
    for stat_item in pokeapi_data.get('stats', []):
        stat_name = stat_item.get('stat', {}).get('name')
        if stat_name in ['hp', 'attack', 'defense']:
            stats[stat_name] = stat_item.get('base_stat', 0)
    
    types = []
    for type_item in pokeapi_data.get('types', []):
        type_name = type_item.get('type', {}).get('name')
        types.append({'id': 0, 'descricao': type_name.capitalize()})
        
    mapped_data = {
        'id': pokeapi_data.get('id', 0),
        'codigo': str(pokeapi_data.get('id', '')).zfill(3),
        'name': pokeapi_data.get('name', 'Unknow').capitalize(),
        'imageUrl': pokeapi_data.get('sprites', {}).get('other', {}).get('official-artwork', {}).get('front_default') or pokeapi_data.get('sprites', {}).get('front_default'),
        'types': types,
        'stats':{
            'hp': stats.get('hp', 0),
            'attack': stats.get('attack', 0),
            'defense': stats.get('defense', 0)
        }
    }
    return mapped_data