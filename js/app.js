$(function(undefined) {

    function addPizza() {
        var thisID = ++data.lastID;

        data.pizzas.push({
            id: thisID
        });
        view.render();
    }

    function removePizza(pizza) {
        data.pizzas = data.pizzas.filter(function(thisPizza) {
            return thisPizza.id !== pizza.id;
        });

        view.render();
    }

    var data = {
            lastID: 0,
            pizzas: []
        },

        view = {
            init: function() {
                var addPizzaBtn = $('.add-pizza');
                addPizzaBtn.click(function() {
                    addPizza();
                });

                this.pizzaList = $('.pizza-list');
                this.pizzaTemplate = $('script[data-template="pizza"]').html();

                // Delegated event to listen for removal clicks
                this.pizzaList.on('click', '.remove-pizza', function(e) {
                    var pizza = $(this).parents('.pizza').data();
                    removePizza(pizza);
                    return false;
                });


                this.render();
            },

            render: function() {
                // Cache vars for use in forEach() callback
                var pizzaList = this.pizzaList,
                    pizzaTemplate = this.pizzaTemplate;

                // Clear and render
                pizzaList.html('');
                data.pizzas.forEach(function(pizza) {
                    // Replace template markers with data
                    var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);
                    pizzaList.append(thisTemplate);
                });
            }
        };

    view.init();
}());
