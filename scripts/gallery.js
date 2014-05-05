// Initial gallery function
function galleryInit() {   
    portal = new esri.arcgis.Portal(configOptions.galleryPortalUrl);
    dojo.connect(portal, 'onLoad', loadPortal);
    dojox.lang.aspect.advise(portal, "queryItems", {
        afterReturning: function (queryItemsPromise) {
            queryItemsPromise.then(function (result) {
                nextQueryParams = result.nextQueryParams;
                queryParams = result.queryParams;
            });
        }
    });
}

// Load the portal gallery
function loadPortal() {
    var params = {
        q: 'title: ' + configOptions.galleryGroup.title + ' AND owner:' + configOptions.galleryGroup.owner
    };    
    portal.queryGroups(params).then(function (groups) {
        // Get applications from group
        if (groups.results.length > 0) {
            // If more than zero, load into array
            group = groups.results[0];

            // Retrieve the web maps and applications from the group and display 
            var params = {
                q: ' type: Web Map'
            };
            group.queryItems(params).then(updateGrid);
        }
    });
}

// Setup grid for gallery
function updateGrid(queryResponse) {
    var galleryList = dojo.byId('galleryList');
    dojo.empty(galleryList);  //empty the gallery to remove existing items

    // Build the thumbnails for each item the thumbnail when clicked will display the web map in a template or the web application 
    var frag = document.createDocumentFragment();
    // For each of the web maps
    dojo.forEach(queryResponse.results, function (item) {
        if (item.id) {
            var url = (item.type === 'Web Map') ?
              configOptions.templateUrl + '?webmap=' + item.id + '&theme=' + configOptions.themeName :
              item.url;

            var li = dojo.create('li', {}, frag);
            var a = dojo.create('a', {
                href: url,
                target: '_blank',
                //innerHTML: '<div class="tooltip"><p>' + item.snippet + '</p></div><img src="' + item.thumbnailUrl + '"/><div>' + item.title + '</div>'
                innerHTML: '<img src="' + item.thumbnailUrl + '"/><div>' + item.title + '</div>'
            }, li);
        }
    });

    dojo.place(frag, galleryList);

    // Hide the progress bar for loading the app
    $("#appLoadBar").hide();
}