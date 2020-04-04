//{ "username" : "admin", "password":"password” }

//{ "username": "admin", "password":"password", "firstname":"samakin", "lastname":"skywalker" }


App ID =
219112092764310;
app secret = 01df6667391f071a8da32b6c4bd74cf3

> db.campsites.find().pretty()
{
    "_id" : ObjectId("5e88b9a732e17643d69e95bf"),
        "name" : "React Lake Campground",
            "image" : "images/react-lake.jpg",
                "elevation" : 1233,
                    "featured" : false,
                        "cost" : 65,
                            "description" : "Nestled in the foothills of the Chrome Mountains, this campground on the shores of the pristine React Lake is a favorite for fly fishers."
}
{
    "_id" : ObjectId("5e88b9a732e17643d69e95c0"),
        "name" : "Chrome River Campground",
            "image" : "images/chrome-river.jpg",
                "elevation" : 877,
                    "featured" : false,
                        "cost" : 77,
                            "description" : "Spend a few sunny days and starry nights beneath a canopy of old-growth firs at this enchanting spot by the Chrome River."
}
{
    "_id" : ObjectId("5e88b9a732e17643d69e95c1"),
        "name" : "Breadcrumb Trail Campground",
            "image" : "images/breadcrumb-trail.jpg",
                "elevation" : 2901,
                    "featured" : false,
                        "cost" : 24,
                            "description" : "Let NuCamp be your guide to this off-the-beaten-path, hike-in-only campground."
}