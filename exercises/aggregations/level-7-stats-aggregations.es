// Exercise 21: Run stats on pieces
GET lego/_search
{
    "size": 0,
    "aggs": {
        "stats_pieces": {
            "stats": {
                "field": "pieces"
            }
        }
    }
}

// Exercise 22: Run extended_stats

GET lego/_search
{
    "size": 0,
    "aggs": {
        "extended_stats_prices": {
            "extended_stats": {
                "field": "US_retailPrice"
            }
        }
    }
}