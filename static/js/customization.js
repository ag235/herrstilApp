// app.js
new Vue({
// We want to target the div with an id of 'events'
  el: '#app',
  data: {  
    shoeimage: "./static/images/Shoe1.png",
    styles:[
    { 
      name: "Äppelviken",
      img:"./static/images/shoe1.png",
      upperToeMaterial:["appelBlackToe","appelBrownToe"],
      upperMidMaterial: ["appelBlackUM","appelBrownUM"],
      middleShoeMaterial:["appelBlackM","appelBrownM"],
      soleColor:["appelBlackSole","appelBrownSole"],
    },
    {
      name: "Skytteholm",
      img:"./static/images/shoe2.png",
      upperToeMaterial:["skyBlackToe","skyBrownToe","skySuedeToe"],
      upperMidMaterial: ["skyBlackUM","skyBrownUM","skySuedeUM"],
      middleShoeMaterial:["skyBlackM","skyBrownM","skySuedeM"],
      soleColor:["skyBlackSole","skyBrownSole","skySuedeSole"],
    }],

    // currently selected overlay 
    selectedStyle: "Äppelviken",
    selectedUpperToeMaterial: "appelBlackToe",
    selectedUpperMidMaterial: "appelBlackUM", 
    selectedMiddleShoeMaterial: "appelBlackM", 
    selectedSoleColor: "appelBlackSole", 
    //hue setup 
    hueRotation : 0 , 
    saturation : 100,

    materials : {
      "appelBrownToe" : { 
        name: "Brown Leather",
        img: "./static/images/appelBrownToe.png"
      },
      "appelBlackToe" : { 
        name: "Black Leather",
        img: null 
      },
      "appelBrownUM" : { 
        name: "Brown Leather",
        img: "./static/images/appelBrownUM.png"
      },
      "appelBlackUM" : { 
        name: "Black Leather",
        img: null 
      },
      "appelBrownM" : { 
        name: "Brown Leather",
        img: "./static/images/appelBrownM.png"
      },
      "appelBlackM" : { 
        name: "Black Leather",
        img: null 
      },
      "appelBrownSole" : { 
        name: "Brown Sole",
        img: "./static/images/brownSole.png"
      },
      "appelBlackSole" : { 
        name: "Black Sole",
        img: null
      },
///////////////////////////////////////////////////
      "skyBrownToe" : { 
        name: "Brown Leather",
        img: "./static/images/SkyBrownToe.png"
      },
      "skyBlackToe" : { 
        name: "Black Leather",
        img: null 
      },
      "skySuedeToe" : { 
        name: "Suede",
        img: "./static/images/SkySuedeToe.png"
      },
      "skyBrownUM" : { 
        name: "Brown Leather",
        img: "./static/images/SkyBrownUM.png"
      },
      "skyBlackUM" : { 
        name: "Black Leather",
        img: null 
      },
      "skySuedeUM" : { 
        name: "Suede",
        img: "./static/images/SkySuedeUM.png"
      },
      "skyBrownM" : { 
        name: "Brown Leather",
        img: "./static/images/SkyBrownM.png"
      },
      "skyBlackM" : { 
        name: "Black Leather",
        img: null 
      },
      "skySuedeM" : { 
        name: "Suede",
        img: "./static/images/SkySuedeM.png"
      },
      "skyBrownSole" : { 
        name: "Brown Sole",
        img: "./static/images/brownSole.png"
      },
      "skyBlackSole" : { 
        name: "Black Sole",
        img: null
      },
       "skySuedeSole" : { 
        name: "Suede Sole",
        img: "./static/images/suedeSole.png"
      }
    }
  },
  //MORE MATERIALS FOR NEW SHOE 

  computed: { 
    //new entry 
     selectedStyleImg : function(){ 
      var self = this;
      var image;
      this.styles.forEach(function(style){ 
        if (style.name === self.selectedStyle){
          image = style.img
        }
      })
      return image;
    },
    selectedStyleData : function(){ 
      var self = this;
      var selectedStyle;
      this.styles.forEach(function(style){ 

        if (style.name === self.selectedStyle){
          selectedStyle = style
        }
      })
      return selectedStyle;
    },
    selectedUpperToeMaterialImg : function(){ 
      return this.materials[this.selectedUpperToeMaterial].img
    },
    selectedUpperMidMaterialImg : function(){ 
      return this.materials[this.selectedUpperMidMaterial].img
    },
    //add the other ones here selectedmid material etc. 
    selectedMiddleShoeMaterialImg : function() { 
      return this.materials[this.selectedMiddleShoeMaterial].img
    },
    selectedSoleColorImg : function(){
      return this.materials[this.selectedSoleColor].img

    },
    shoeStyle : function(){ 
      var color = "-webkit-filter: hue-rotate("+this.hueRotation+"deg) saturate("+this.saturation+"%); filter: hue-rotate("+this.hueRotation+"deg) saturate("+this.saturation+"%);"
      console.log(color)
      return color 
    },
  },
  methods : { 
    changeStyle: function(styleName){ 
      this.selectedStyle = styleName
      var styleData 
      var self = this;
      this.styles.forEach(function(style){ 
        if (style.name === self.selectedStyle){
         styleData = style
        }
      })

      this.selectedUpperToeMaterial = styleData.upperToeMaterial[0];
      this.selectedUpperMidMaterial = styleData.upperMidMaterial[0];
      this.selectedMiddleShoeMaterial = styleData.middleShoeMaterial[0];
      this.selectedSoleColor = styleData.soleColor[0];
      this.hueRotation = 0; 
      this.saturation = 100; 
    },
    setHueSaturation: function(hue, saturation){ 
      this.hueRotation = hue; 
      this.saturation = saturation;
    },

    //function to send information to MongoDB collection
    sendOrder: function(){
      var self = this;
      html2canvas(document.getElementById('shoeImageContainer'), {
        onrendered: function(canvas){
         self.$http.post('/order', {
            dateTime: new Date(), 
            style:self.style, 
            upperToe:self.selectedUpperToeMaterial, 
            upperMid:self.selectedUpperMidMaterial,
            midShoe:self.selectedMiddleShoeMaterial, 
            soleColor:self.selectedSoleColor, 
            hue:self.hueRotation,
            saturation:self.saturation, 
            image : canvas.toDataURL()
          }).then(response => {
             window.location.href = "/statistics"
          }, err => {
            console.log("order not sent")
          });
        }
      });


    },
    //returns the last five orders from the collection 
    lastFive: function(){

      this.$http.get('/lastOrders').then(response =>{
        console.log(response)
      },

         response => {
        console.log("order not sent")
      });

    }
  }
});







