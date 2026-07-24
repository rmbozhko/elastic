// Exercise 18: Create a histogram on release year with 5 years interval

GET lego/_search
{
    "size": 0,
    "aggs": {
        "5_years_releases": {
            "histogram": {
                "field": "year",
                "interval": 5
            }
        }
    }
}

// Exercise 19: Create a histogram of prices with 25 dollars interval

GET lego/_search
{
    "size": 0,
    "aggs": {
        "25_dollars_prices_split": {
            "histogram": {
                "field": "US_retailPrice",
                "interval": 25
            }
        }
    }
}

// Exercise 20: Create a histogram of pieces with 250 pieces interval

GET lego/_search
{
    "size": 0,
    "aggs": {
        "250_pieces_split": {
            "histogram": {
                "field": "pieces",
                "interval": 250
            }
        }
    }
}