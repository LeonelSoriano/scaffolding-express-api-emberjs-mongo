//this.get('store').find('model', the_id_of_the_record).then(function(rec){
//  rec.deleteRecord();
//  rec.save();
//});


/*App.NoteAdapter = DS.RESTAdapter.extend({
  namespace: 'other/endpoint',
  pathForType: function(type) {
   return Ember.Inflector.inflector.pluralize(type);
  }
});*/

//logger-debug ⇥
//logger-error ⇥
//logger-info ⇥
//logger-log ⇥
//logger-warn
//Ember.$.getJSON('/items.json');

















function filterEmberData(source,jsonFilter){
    var filteredList = [];

    source.forEach(function(message) {

        var filterMax = 0;
        var valuePassed = 0;

        for (var key in jsonFilter){

            var val = jsonFilter[key];
            filterMax++;

            if(typeof(val['value']) === "boolean"){

              if(message.get(key) === val['value']){
                  valuePassed++;
              }

          }//end  ypeof(val['value'])

        }

        if( filterMax == valuePassed){
            filteredList.addObject(message)
        }

    });
    return filteredList;
}




App = Ember.Application.create();
App.ApplicationAdapter= DS.JSONAPIAdapter;



App.Item = DS.Model.extend({
  text: DS.attr('string'),
  complete: DS.attr('boolean')

});



App.Router.map(function() {
        // put your routes here
});




App.IndexRoute = Ember.Route.extend({

    model: function() {
        var pushData = {
            data: [{
                  id: '1',
                  type: 'Item',
                  attributes: {
                    text: "zleonel",
                    complete : false
                  }
                },
                {
                  id: '2',
                  type: 'Item',
                  attributes: {
                    text: "pedro",
                    complete : false
                  }
                 },
                  {
                  // primary data for single record of type `Person`
                  id: '20',
                  type: 'Item',
                  attributes: {
                    text: "aRamón",
                    complete : false
                  }


                  }]
          };


         // this.get('store').pushPayload(pushData);

    }

});



App.ButtonExpanderComponent = Ember.Component.extend({
    init: function(){
        this._super();
	;},
    classNames : ['expander'],
    textToggle : "∧",
    toggleState : false,
    actions: {
        toggle: function() {

            if(this.get("toggleState")){
                this.set("toggleState",false);
                this.set("textToggle","∧");
            }else{
                this.set("toggleState",true);
                this.set("textToggle","∨");
            }

            this.sendAction('callback', this.get("toggleState"));
        }

    }
});




App.IndexController = Ember.Controller.extend({
    init: function(){


	},
    isTodo : false,
    fillColorTodo: 'rgba(0,0,155,0.2)',
    fillStyleTodo: function() {
      return Ember.String.htmlSafe('background-color:'+this.get('fillColorTodo'));
    }.property('fillColorTodo'),


    isActivos : false,
    fillColorActivos: 'rgba(0,0,0,0)',
    fillStyleActivos: function() {
      return Ember.String.htmlSafe('background-color:'+this.get('fillColorActivos'));
  }.property('fillColorActivos'),

    isCompleto : false,
    fillColorCompletos: 'rgba(0,0,0,0)',
    fillStyleCompletos: function() {
      return Ember.String.htmlSafe('background-color:'+this.get('fillColorCompletos'));
  }.property('fillColorCompletos'),

    cantidadTotalPorHacer : 0,
    nameValue : "",
    itemText :  '',
    itemsTodo: null,

    completeTodo :function(id,complete) {

        if(!complete){

            var itemDb = this.get('store').peekRecord('Item', id);
            itemDb.set("complete",true);
            itemDb.get("save");

            var datos = this.get('store').peekAll('Item');
            var filtre = filterEmberData(datos,{'complete' :{'value' : false } })
            this.set("cantidadTotalPorHacer",filtre.length);
        }

    },

    toggleAction : function(info) {

        if(info == false){
            this.set("itemsTodo","");
        }else{
            var datos = this.get('store').peekAll('Item');
            this.set("itemsTodo",  datos.sortBy("id","") );
        }
        //Ember.Logger.log(info);
    },
    enterNewValue : function(text,b) {
        //this.set('fillColor','#ffFFFF');
        Ember.Logger.log();
        if(b.keyCode == 13){
            if(this.get("itemText").length  < 3){
                alert("debe tener por lo menos tres caracteres");
            }else{

               this.get('store').createRecord('Item', {
                    text: this.get("itemText"),
                    complete : false
               });

                var datos = this.get('store').peekAll('Item');
                var filtre = filterEmberData(datos,{'complete' :{'value' : false } })
                this.set("cantidadTotalPorHacer",filtre.length);

               this.set("itemsTodo",  datos.sortBy("id","") );
               this.set("itemText","");
               //Ember.Logger.log(filtre);

            }

        }

    },//end new value

    actions: {
        clickTodos :function(info) {

            var datos = this.get('store').peekAll('Item');
            this.set("itemsTodo",  datos.sortBy("id","") );
            this.set('fillColorActivos','rgba(0,0,0,0)');
            this.set('fillColorTodo','rgba(0,0,155,0.2)');
            this.set('fillColorCompletos','rgba(0,0,0,0)');

        },
        clickActivos :function(info) {

            var datos = this.get('store').peekAll('Item');
            var filtre = filterEmberData(datos,{'complete' :{'value' : false } })
            this.set("itemsTodo",  filtre.sortBy("id","") );
            this.set('fillColorActivos','rgba(0,0,155,0.2)');
            this.set('fillColorTodo','rgba(0,0,0,0)');
            this.set('fillColorCompletos','rgba(0,0,0,0)');

        },
        clickCompletos :function(info) {

            var datos = this.get('store').peekAll('Item');
            var filtre = filterEmberData(datos,{'complete' :{'value' : true } })
            this.set("itemsTodo",  filtre.sortBy("id","") );
            this.set('fillColorActivos','rgba(0,0,0,0)');
            this.set('fillColorTodo','rgba(0,0,0,0)');
            this.set('fillColorCompletos','rgba(0,0,155,0.2)');
        }

    }

});
