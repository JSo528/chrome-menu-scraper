menu_hash = {};
menu_hash["menu_categories_attributes"] = [];

if (window.location.host.match("allmenus") != null) {

	$('.category').each( function() {
		mc_name =	$(this).find('.category_head h3').text();
		menu_hash["menu_categories_attributes"].push({"name":mc_name, "menu_items_attributes":[]});

		$(this).find('.menu_item').each(function() {
			mi_name = $(this).find('.name').text();
			mi_price = $(this).find('.price').text().replace(/[$.]/g, "");
			mi_description = $(this).find('.description').text();		
			last_mc_index =	menu_hash["menu_categories_attributes"].length - 1;
			menu_hash["menu_categories_attributes"][last_mc_index]["menu_items_attributes"].push({"name":mi_name, "price":mi_price, "description":mi_description});
		})

	})

} else if (window.location.host.match("eat24hours") != null) {

	$('.section2').each( function() {
		mc_name =	$($(this).find('div')[0]).text();
		menu_hash["menu_categories_attributes"].push({"name":mc_name, "menu_items_attributes":[]});

		$(this).next().find('.item').each(function() {
			mi_name = $(this).find('.item_name a').text();
			mi_price = $(this).find('.item_price span').text().replace(/[$.+]/g, "").trim();
			mi_description = $(this).find('.item_description').text();		
			last_mc_index =	menu_hash["menu_categories_attributes"].length - 1;
			menu_hash["menu_categories_attributes"][last_mc_index]["menu_items_attributes"].push({"name":mi_name, "price":mi_price, "description":mi_description});
		})

	})

} else if (window.location.host.match("seamless") != null) {

	$('.menuItems').each( function() {
		mc_name =	$(this).find('h5 a').text();
		menu_hash["menu_categories_attributes"].push({"name":mc_name, "menu_items_attributes":[]});

		$(this).find('.menuItem').each(function() {
			mi_name = $(this).find('a.productFancyBox').text().trim();
			mi_price = $(this).find('.price').text().replace(/[$.+-]/g, "");
			if (mi_price == "") {
				mi_price = 0;
			}
			mi_description = $(this).find('a.productFancyBox').attr('title').split('|')[1].split('<br')[0];		
			last_mc_index =	menu_hash["menu_categories_attributes"].length - 1;
			menu_hash["menu_categories_attributes"][last_mc_index]["menu_items_attributes"].push({"name":mi_name, "price":mi_price, "description":mi_description});
		})
	})

} else if (window.location.host.match("menupages") != null){

	$('#restaurant-menu h3').each( function() {
		mc_name =	$(this).text();
		menu_hash["menu_categories_attributes"].push({"name":mc_name, "menu_items_attributes":[]});

		domEl = $(this).next();
		if (domEl.hasClass('prices-three') == false) {
			domEl = $(this).next().next();
		}

		domEl.find('tr').each(function() {
			string = $(this).find('cite').text().replace('*', '');
			first_letter = string.match(/[a-zA-Z]/);
    	index = string.indexOf(first_letter);
    	mi_name = string.slice(index);

    	// if there is a price in the 3rd column then there are two sizes for this menu item
  		string1 = $($(this).children()[2]).text().replace(/[$.+-]/g, "");
  		index = string1.indexOf(')') + 1;
			if (index > 0 ) {
				mi_price1 = string1.slice(index);
			} else {
				mi_price1 = string1.trim();
			}
    	
			string2 = $($(this).children()[3]).text().replace(/[$.+-]/g, "");
			index = string2.indexOf(')') + 1;
			if (index > 0 ) {
				mi_price2 = string2.slice(index);
			} else {
				mi_price2 = string2.trim();
			}

			if (mi_price2 == "") {
				mi_price2 = 0;
			}

	    // filter away option sets
	    if ($(this).find('th')[0].childNodes[1] != undefined) {
	    	mi_name2 = mi_name
   			mi_description = $(this).find('th')[0].childNodes[1].wholeText;
   			last_mc_index =	menu_hash["menu_categories_attributes"].length - 1;
   			if (mi_price1.trim().length > 0) {
   				mi_name2 = mi_name + " (((copy)))";
   				menu_hash["menu_categories_attributes"][last_mc_index]["menu_items_attributes"].push({"name":mi_name, "price":mi_price1, "description":mi_description});
   			}
				menu_hash["menu_categories_attributes"][last_mc_index]["menu_items_attributes"].push({"name":mi_name2, "price":mi_price2, "description":mi_description});

   		}
			
		})
	})

} else if (window.location.host.match("grubhub") != null){

	ii = 0;

	$('body').append('<div class="temp"></div>');

	$('h5.site_h2').each( function() {
		if (!$(this).hasClass('popularItems')) {

			mc_name =	$(this).text();
			menu_hash["menu_categories_attributes"].push({"name":mc_name, "menu_items_attributes":[]});

			$(this).next().next().find('li').each(function() {

				ii++;

				mi_name = $(this).attr('order-item-title');
				mi_price = $(this).attr('order-item-price').split(' ')[0].replace(/[$.+]/g, "");
				mi_description = $(this).attr('order-item-details');	
				last_mc_index =	menu_hash["menu_categories_attributes"].length - 1;

				menu_hash["menu_categories_attributes"][last_mc_index]["menu_items_attributes"].push({"name":mi_name, "price":mi_price, "description":mi_description});

			});

		}
	})

	jj = 0;

	$('h5.site_h2').each(function() {
		if (!$(this).hasClass('popularItems')) {
			$(this).next().next().find('li').each(function() {
				link = $(this).find('a').attr('href');
				$.get(link,function(response) { 

					jj++;

					$('.temp').html($(response).find('#standalone-item'));

					mi_name = $('.temp #item').text().trim();
					mi_price = $('.temp #itemPrice .rest_type').text().split(' ')[0].replace(/[$.+]/g, "");
					mi_description = $('.temp p.rest_type').text().trim();	

			    if (response.match('class="itemOptionGroup"')) {
			    	for (i=0;i<menu_hash["menu_categories_attributes"].length;i++) {
			    		for (j=0;j<menu_hash["menu_categories_attributes"][i]["menu_items_attributes"].length;j++) {

			    			if (menu_hash["menu_categories_attributes"][i]["menu_items_attributes"][j]["name"] == mi_name &&
			    				menu_hash["menu_categories_attributes"][i]["menu_items_attributes"][j]["description"] == mi_description) {
			    				menu_hash["menu_categories_attributes"][i]["menu_items_attributes"][j]["description"] = mi_description + " OPTION SETS!!!.";
			    			}

			    		}
			    	}
			    }

    		  if (ii == jj) {
    				chrome.extension.sendMessage({hash:menu_hash});
    			}

			  })
			})
		}
	})
}




if (menu_hash["menu_categories_attributes"].length > 0 && window.location.host.match("grubhub") == null) {
	chrome.extension.sendMessage({hash:menu_hash});
}