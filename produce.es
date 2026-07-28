// Create an index called produce_index with the following settings and mappings
PUT produce_index
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "botanical_name": {
                "enabled": false
            },
            "country_of_origin": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "date_purchased": {
                "type": "date"
            },
            "description": {
                "type": "text"
            },
            "name": {
                "type": "text"
            },
            "produce_type": {
                "type": "keyword"
            },
            "quantity": {
                "type": "long"
            },
            "unit_price": {
                "type": "float"
            },
            "vendor_details": {
                "enabled": false
            }
        }
    }
}

POST produce_index/_doc
{
  "name": "Pineapple",
  "botanical_name": "Ananas comosus",
  "produce_type": "Fruit",
  "country_of_origin": "New Zealand",
  "date_purchased": "2020-06-02T12:15:35",
  "quantity": 200,
  "unit_price": 3.11,
  "description": "a large juicy tropical fruit consisting of aromatic edible yellow flesh surrounded by a tough segmented skin and topped with a tuft of stiff leaves.These pineapples are sourced from New Zealand.",
  "vendor_details": {
    "vendor": "Tropical Fruit Growers of New Zealand",
    "main_contact": "Hugh Rose",
    "vendor_location": "Whangarei, New Zealand",
    "preferred_vendor": true
  }
}

GET test_index/_mappings

GET produce_index/_mappings

POST produce_index/_doc
{
    "name": "Mango",
    "botanical_name": "Harum Manis",
    "produce_type": "Fruit",
    "country_of_origin": "Indonesia",
    "organic": true,
    "date_purchased": "2020-05-02T07:15:35",
    "quantity": 500,
    "unit_price": 1.5,
    "description": "Mango Arumanis or Harum Manis is originated from East Java. Arumanis means harum dan manis or fragrant and sweet just like its taste. The ripe Mango Arumanis has dark green skin coated with thin grayish natural wax. The flesh is deep yellow, thick, and soft with little to no fiber. Mango Arumanis is best eaten when ripe.",
    "vendor_details": {
        "vendor": "Ayra Shezan Trading",
        "main_contact": "Suharto",
        "vendor_location": "Binjai, Indonesia",
        "preferred_vendor": true
    }
}

GET produce_index/_search

// Create a new index with updated mappings
PUT produce_v2
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "botanical_name": {
                "type": "text"
            },
            "country_of_origin": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "date_purchased": {
                "type": "date"
            },
            "description": {
                "type": "text"
            },
            "name": {
                "type": "text"
            },
            "produce_type": {
                "type": "keyword"
            },
            "quantity": {
                "type": "long"
            },
            "unit_price": {
                "type": "float"
            },
            "vendor_details": {
                "enabled": false
            }
        }
    }
}

GET produce_v2/_mapping

POST _reindex
{
    "source": {
        "index": "produce_index"
    },
    "dest": {
        "index": "produce_v2"
    }
}

DELETE produce_v2

PUT produce_v2/_mapping
{
    "runtime": {
        "total": {
            "type": "double",
            "script": {
                "source": "emit(doc['unit_price'].value * doc['quantity'].value)"
            }
        }
    }
}

GET produce_v2/_search
{
    "size": 0,
    "aggs": {
        "monthly_revenue": {
            "date_histogram": {
                "field": "date_purchased",
                "calendar_interval": "1M"
            },
            "aggs": {
                "monthly_total_revenue": {
                    "sum": {
                        "field": "total"
                    }
                }
            }
        }
    }
}

GET produce_v2/_search

GET produce_v2/_settings?include_defaults=true


POST produce_v2/_doc
{
  "name": "Mango",
  "botanical_name": "Harum Manis",
  "produce_type": "Fruit",
  "country_of_origin": "Indonesia",
  "organic": true,
  "date_purchased": "2020-05-02T07:15:35",
  "quantity": 500,
  "unit_price": 1.5,
  "description": "Mango Arumanis or Harum Manis is originated from East Java. Arumanis means harum dan manis or fragrant and sweet just like its taste. The ripe Mango Arumanis has dark green skin coated with thin grayish natural wax. The flesh is deep yellow, thick, and soft with little to no fiber. Mango Arumanis is best eaten when ripe.",
  "vendor_details": {
    "vendor": "Ayra Shezan Trading",
    "main_contact": "Suharto",
    "vendor_location": "Binjai, Indonesia",
    "preferred_vendor": true
  }
}

GET produce_v2/_search

PUT produce_v3
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "dynamic": "false",
        "properties": {
            "botanical_name": {
                "type": "text"
            },
            "country_of_origin": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "date_purchased": {
                "type": "date"
            },
            "description": {
                "type": "text"
            },
            "name": {
                "type": "text"
            },
            "produce_type": {
                "type": "keyword"
            },
            "quantity": {
                "type": "long"
            },
            "unit_price": {
                "type": "float"
            },
            "vendor_details": {
                "enabled": false
            }
        }
    }
}

POST _reindex
{
    "source": {
        "index": "produce_v2"
    },
    "dest": {
        "index": "produce_v3"
    }
}

GET produce_v3/_search
{
    // "query": {
    //     "term": {
    //         "organic": "true"
    //     }
    // }
}

GET produce_v3/_mapping

POST produce_v3/_doc
{
    "name": "Maracuja",
    "botanical_name": "Passiflora edulis",
    "country_of_origin": "Brazil",
    "poisonous": false,
    "produce_type": "Fruit",
    "date_purchased": "2020-05-02T07:15:35",
    "quantity": 500,
    "unit_price": 1.5,
    "description": "Maracuja, also known as passion fruit, is a tropical fruit native to Brazil. It has a unique sweet-tart flavor and is often used in beverages, desserts, and sauces. The fruit is round or oval, with a tough outer rind that can be yellow or purple when ripe. Inside, it contains a juicy, seed-filled pulp that is both aromatic and flavorful. Maracuja is rich in vitamins A and C, as well as dietary fiber, making it a nutritious addition to a balanced diet. It is commonly enjoyed fresh, juiced, or as an ingredient in various culinary creations.",
    "vendor_details": {
        "vendor": "Tropical Fruit Growers of Brazil",
        "main_contact": "Carlos Silva",
        "vendor_location": "São Paulo, Brazil",
        "preferred_vendor": true
    }
}

// dynamic mapping is strict
PUT produce_v4
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "dynamic": "strict",
        "properties": {
            "botanical_name": {
                "type": "text"
            },
            "country_of_origin": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "date_purchased": {
                "type": "date"
            },
            "description": {
                "type": "text"
            },
            "name": {
                "type": "text"
            },
            "produce_type": {
                "type": "keyword"
            },
            "quantity": {
                "type": "long"
            },
            "unit_price": {
                "type": "float"
            },
            "vendor_details": {
                "enabled": false
            }
        }
    }
}

POST _reindex
{
    "source": {
        "index": "produce_v3"
    },
    "dest": {
        "index": "produce_v4"
    }
}

GET produce_v4/_mappings

GET produce_v4/_search
{
    "query": {
        "term": {
            "poisonous": "false"
        }
    }
}

POST produce_v4/_doc
{
    "name": "Dragon Fruit",
    "botanical_name": "Hylocereus undatus",
    "country_of_origin": "Vietnam",
    "nutritious": false,
    "produce_type": "Fruit",
    "date_purchased": "2020-05-02T07:15:35",
    "quantity": 300,
    "unit_price": 2.5,
    "description": "Dragon fruit, also known as pitaya, is a tropical fruit native to Central and South America. It is characterized by its vibrant pink or yellow skin and unique appearance, with green scales that resemble a dragon's skin. The fruit has a mildly sweet flavor and a creamy texture, with small black seeds scattered throughout the flesh. Dragon fruit is rich in antioxidants, vitamin C, and fiber, making it a healthy addition to the diet. It is often enjoyed fresh, in smoothies, or as a decorative element in fruit salads and desserts.",
    "vendor_details": {
        "vendor": "Tropical Fruit Growers of Vietnam",
        "main_contact": "Nguyen Van A",
        "vendor_location": "Ho Chi Minh City, Vietnam",
        "preferred_vendor": true
    }
}

GET produce_v4/_doc/0ufUp58BKddVFfY8tvuL

GET produce_v3/_settings?include_defaults=true