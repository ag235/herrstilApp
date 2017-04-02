// app.js

Vue.filter('round', function(value, decimals) {
  if(!value) {
    value = 0;
  }

  if(!decimals) {
    decimals = 2;
  }

  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return value;
});

var vue = new Vue({

// We want to target the div with an id of 'events'
  el: '#app',
  data: {  

    orders : [] ,
    totalCount : 0,
    uniqueCount : 0,
    percent : 0

  },

  //MORE MATERIALS FOR NEW SHOE 
  methods : { 


    //returns the last five orders from the collection 
    lastFive: function(){

      this.$http.get('/lastOrders').then(response =>{
        this.orders = response.body.map(function(each) {
          //each.dateTime = moment(each.dateTime).fromNow()
          return each
        })
        console.log(response)
      },

      response => {
        console.log("order not sent")
      });

    },
    getPercentCount: function(){
      this.$http.get('/getTotalCount').then(response =>{
        this.totalCount = response.body.totCount
        console.log(response.body)

        this.$http.get('/getUniqueCount').then(response =>{

          this.uniqueCount = response.body.uniqueCount
          console.log(response.body)

          this.percent = (this.uniqueCount/this.totalCount)*100;
          console.log(this.percent);
        },

        response => {
          console.log("error")
        });
      },

      response => {
        console.log("error")
      });  
    }
  },
});


vue.lastFive()
vue.getPercentCount()