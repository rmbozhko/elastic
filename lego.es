// EDA of Lego dataset
GET lego/_mappings

GET lego/_count

GET lego/_search
{
    "size": 0,
    "aggs": {
        "US_retailPrice_stats": {
            "stats": {
                "field": "US_retailPrice"
            }
        },
        "agerange_stats": {
            "stats": {
                "field": "agerange_min"
            }
        },
        "categories": {
            "terms": {
                "field": "category"
            }
        },
        "minifigs_stats": {
            "stats": {
                "field": "minifigs"
            }
        }
    }
}

GET lego/_search