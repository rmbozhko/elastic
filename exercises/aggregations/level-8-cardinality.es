// Exercise 23: How many unique themes exist?

GET lego/_search
{
    "size": 0,
    "aggs": {
        "unique_themes": {
            "cardinality": {
                "field": "theme"
            }
        }
    }
}

// Exercise 24: How many unique subthemes exist?

GET lego/_search
{
    "size": 0,
    "aggs": {
        "unique_subthemes": {
            "cardinality": {
                "field": "subtheme"
            }
        }
    }
}

// Exercise 25: How many unique release years?

GET lego/_search
{
    "size": 0,
    "aggs": {
        "unique_years": {
            "cardinality": {
                "field": "year"
            }
        }
    }
}