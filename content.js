menu_hash = {}
menu_hash["menu_categories_attributes"] = []

if (window.location.host.match("allmenus") != null) {

	$('.category').each( function() {
		mc_name =	$(this).find('.category_head h3').text();
		menu_hash["menu_categories_attributes"].push({"name":mc_name, "menu_items_attributes":[]})

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
		menu_hash["menu_categories_attributes"].push({"name":mc_name, "menu_items_attributes":[]})

		$(this).next().find('.item').each(function() {
			mi_name = $(this).find('.item_name a').text();
			mi_price = $(this).find('.item_price span').text().replace(/[$.+]/g, "").trim();
			mi_description = $(this).find('.item description').text();		
			last_mc_index =	menu_hash["menu_categories_attributes"].length - 1;
			menu_hash["menu_categories_attributes"][last_mc_index]["menu_items_attributes"].push({"name":mi_name, "price":mi_price, "description":mi_description});
		})

	})

} else if (window.location.host.match("seamless") != null) {

	$('.menuItems').each( function() {
		mc_name =	$(this).find('h5 a').text();
		menu_hash["menu_categories_attributes"].push({"name":mc_name, "menu_items_attributes":[]})

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

}

if (menu_hash["menu_categories_attributes"].length > 0) {
	chrome.extension.sendMessage({hash:menu_hash});
}