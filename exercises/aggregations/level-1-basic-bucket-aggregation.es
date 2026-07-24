// Exercise 1: Which LEGO themes have the most sets?
GET lego/_search
{
    "size": 0,
    "aggs": {
        "themes_with_most_sets": {
            "terms": {
                "field": "theme"
            }
        },
        "subthemes_with_most_sets": {
            "terms": {
                "field": "subtheme"
            }
        },
        "themeGroups_with_most_sets": {
            "terms": {
                "field": "themeGroup"
            }
        }
    }
}

// Exercise 2: Find the most common categories.
GET lego/_search
{
    "size": 0,
    "aggs": {
        "most_common_categories": {
            "terms": {
                "field": "category"
            }
        }
    }
}

// Exercise 3: Find years with the highest number of released sets.
GET lego/_search
{
    "size": 0,
    "aggs": {
        "released_sets_by_year": {
            "terms": {
                "field": "year"
            }
        }
    }
}
// Or the another solution via histogram and order by _count
GET lego/_search
{
    "size": 0,
    "aggs": {
        "released_sets_by_year": {
            "histogram": {
                "field": "year",
                "interval": 1,
                "order": {
                    "_count": "desc"
                }
            }
        }
    }
}

// Exercise 4: Which age recommendations appear most often?
GET lego/_search
{
    "size": 0,
    "aggs": {
        "most_common_ages": {
            "terms": {
                "field": "agerange_min"
            }
        }
    }
}