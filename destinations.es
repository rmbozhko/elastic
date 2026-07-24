PUT /destinations

PUT /destinations/_bulk
{ "index": { "_id": "1" } }
{ "destination_id": "D-001", "name": "Paris", "country": "France", "description": "The city of lights, known for its art, fashion, and culture.", "attractions": ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"], "average_cost": 2000.00, "is_active": true, "created_at": "2024-01-15T10:00:00Z" }
{ "index": { "_id": "2" } }
{ "destination_id": "D-002", "name": "Tokyo", "country": "Japan", "description": "A bustling metropolis blending the ultramodern and the traditional.", "attractions": ["Shibuya Crossing", "Tokyo Tower", "Meiji Shrine"], "average_cost": 2500.00, "is_active": true, "created_at": "2024-02-20T10:00:00Z" }
{ "index": { "_id": "3" } }
{ "destination_id": "D-003", "name": "New York City", "country": "USA", "description": "The city that never sleeps, famous for its skyline and cultural diversity.", "attractions": ["Statue of Liberty", "Central Park", "Times Square"], "average_cost": 2200.00, "is_active": true, "created_at": "2024-03-10T10:00:00Z" }
{ "index": { "_id": "4" } }
{ "destination_id": "D-004", "name": "Sydney", "country": "Australia","description": "Known for its stunning harbor, beaches, and the iconic Sydney Opera House.", "attractions": ["Sydney Opera House", "Bondi Beach", "Harbour Bridge"], "average_cost": 2300.00, "is_active": true,"created_at": "2024-04-05T10:00:00Z"
}
{ "index": { "_id": "5" } }
{ "destination_id": "D-005", "name": "Cape Town", "country": "South Africa", "description": "A coastal city known for its harbor, Table Mountain, and rich history.", "attractions": ["Table Mountain", "Robben Island", "Cape Point"], "average_cost": 1800.00, "is_active": true, "created_at": "2024-05-12T10:00:00Z"
}


GET /destinations/_search

POST /destinations/_update/5
{
    "doc": {
        "average_cost": 1500.00
    }
}

GET /destinations/_doc/5

DELETE /destinations/_doc/5

GET /destinations/_search