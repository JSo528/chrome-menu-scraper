
menu_hash = {}
menu_hash["menu_categories"] = []
$('.category').each( function() {
	mc_name =	$(this).find('.category_head h3').text()
	menu_hash["menu_categories"].push({"name":mc_name, "menu_items":[]})

	$(this).find('.menu_item').each(function() {
		mi_name = $(this).find('.name').text();
		mi_price = $(this).find('.price').text().replace(/[$.]/g, "");
		mi_description = $(this).find('.description').text();		
		last_mc_index =	menu_hash["menu_categories"].length - 1;
		menu_hash["menu_categories"][last_mc_index]["menu_items"].push({"name":mi_name, "price":mi_price, "description":mi_description});
	})

})

json_string = JSON.stringify(menu_hash);
console.log(json_string)

chrome.extension.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});

