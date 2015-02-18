System.register(["aurelia-framework"], function (_export) {
  "use strict";

  var LogManager, _prototypeProperties, _classCallCheck, logger, Aspects, Aspect;
  return {
    setters: [function (_aureliaFramework) {
      LogManager = _aureliaFramework.LogManager;
    }],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      logger = LogManager.getLogger("aspects");
      Aspects = _export("Aspects", (function () {
        function Aspects() {
          _classCallCheck(this, Aspects);

          this.aspectNames = [];
          this.aspects = new Map();

          var aer = this.addAspect("Aer");
          var aqua = this.addAspect("Aqua");
          var terra = this.addAspect("Terra");
          var perditio = this.addAspect("Perditio");
          var ignis = this.addAspect("Ignis");
          var ordo = this.addAspect("Ordo");

          var gelum = this.addAspect("Gelum", [ignis, perditio]);
          var vacuos = this.addAspect("Vacuos", [aer, perditio]);
          var motus = this.addAspect("Motus", [aer, ordo]);
          var iter = this.addAspect("Iter", [motus, terra]);
          var vinculum = this.addAspect("Vinculum", [motus, perditio]);
          var volatus = this.addAspect("Volatus", [aer, motus]);
          var permutatio = this.addAspect("Permutatio", [perditio, ordo]);
          var potentia = this.addAspect("Potentia", [ordo, ignis]);
          var praecantatio = this.addAspect("Praecantatio", [vacuos, potentia]);
          var arumam = this.addAspect("Auram", [aer, praecantatio]);
          var tempestas = this.addAspect("Tempestas", [aer, aqua]);
          var vitreus = this.addAspect("Vitreus", [terra, ordo]);
          var metallum = this.addAspect("Metallum", [terra, vitreus]);
          var venenum = this.addAspect("Venenum"[(aqua, perditio)]);
          var victus = this.addAspect("Victus", [aqua, terra]);
          var limus = this.addAspect("Limus", [victus, aqua]);
          var sano = this.addAspect("Sano", [victus, ordo]);
          var herba = this.addAspect("Herba", [victus, terra]);
          var fames = this.addAspect("Fames", [victus, vacuos]);
          var mortuus = this.addAspect("Mortuus", [victus, perditio]);
          var spiritus = this.addAspect("Spiritus", [victus, mortuus]);
          var sensus = this.addAspect("Sensus", [aer, spiritus]);
          var cognitio = this.addAspect("Cognitio", [ignis, spiritus]);
          var bestia = this.addAspect("Bestia", [motus, victus]);
          var humanus = this.addAspect("Humanus", [bestia, cognitio]);
          var lucrum = this.addAspect("Lucrum", [humanus, fames]);
          var instrumentum = this.addAspect("Instrumentum", [humanus, ordo]);
          var telum = this.addAspect("Telum", [instrumentum, ignis]);
          var tutamen = this.addAspect("Tutamen", [instrumentum, terra]);
          var pannus = this.addAspect("Pannus", [instrumentum, bestia]);
          var machina = this.addAspect("Machina", [motus, instrumentum]);
          var messis = this.addAspect("Messis", [herba, humanus]);
          var fabrico = this.addAspect("Fabrico", [humanus, instrumentum]);
          var corpus = this.addAspect("Corpus", [mortuus, bestia]);
          var exanimis = this.addAspect("Exanimis", [motus, mortuus]);
          var arbor = this.addAspect("Arbor", [aer, herba]);

          var lux = this.addAspect("Lux", [aer, ignis]);
          var tenebrae = this.addAspect("Tenebrae", [vacuos, lux]);

          var vitrium = this.addAspect("Vitrium", [praecantatio, perditio]);

          var alienis = this.addAspect("Alienis", [vacuos, tenebrae]);
        }

        _prototypeProperties(Aspects, null, {
          versionNumber: {
            get: function () {
              return "4.2";
            },
            configurable: true
          },
          addAspect: {
            value: function addAspect(name, madeOf) {
              logger.debug("Creating aspect " + name);
              if (madeOf === undefined) madeOf = [];

              var aspect = new Aspect(name, madeOf);

              this.aspects.set(name, aspect);
              this.aspectNames.push(name);

              return aspect;
            },
            writable: true,
            configurable: true
          },
          getAspectNamed: {
            value: function getAspectNamed(name) {
              return this.aspects.get(name);
            },
            writable: true,
            configurable: true
          }
        });

        return Aspects;
      })());
      Aspect = (function () {
        function Aspect(name, parents) {
          _classCallCheck(this, Aspect);

          this.aspectName = name;
          this.children = [];

          this.parent1 = parents[0];
          this.parent2 = parents[1];

          if (this.parent1) {
            this.parent1.addChild(this);
            this.parent2.addChild(this);
          }
        }

        _prototypeProperties(Aspect, null, {
          addChild: {
            value: function addChild(child) {
              this.children.push(child);
            },
            writable: true,
            configurable: true
          },
          calculateLinks: {
            value: function calculateLinks(aspectName) {
              var linkDetails = [];

              this.calculateLink(aspectName, linkDetails);

              linkDetails = linkDetails.filter(function (value) {
                return value.linked;
              });
              linkDetails.sort(function (a, b) {
                return b.cost - a.cost;
              });

              for (var i = 0; i < linkDetails.length; i++) {
                var value = linkDetails[i];
                logger.debug("" + value.link + " - " + value.cost + " - " + value.linked);
              }

              return linkDetails;
            },
            writable: true,
            configurable: true
          },
          calculateLink: {
            value: function calculateLink(aspectName, linkDetails, parentLinkDetail) {
              var visitedList = [];

              if (parentLinkDetail) {
                visitedList = parentLinkDetail.visited;
              }

              if (visitedList.indexOf(this.aspectName) !== -1) {
                return;
              }

              visitedList.push(this.aspectName);

              var thisLinkDetail;

              if (!parentLinkDetail) {
                thisLinkDetail = { link: this.aspectName, cost: 0, linked: this.aspectName === aspectName, aspectName: this.aspectName, visited: visitedList.slice() };
              } else {
                thisLinkDetail = { link: "" + parentLinkDetail.link + "/" + this.aspectName, cost: parentLinkDetail.cost + 1, linked: this.aspectName === aspectName, aspectName: this.aspectName, visited: visitedList.slice() };
              }

              linkDetails.push(thisLinkDetail);

              if (thisLinkDetail.linked) {
                return;
              }


              if (this.parent1) {
                this.parent1.calculateLink(aspectName, linkDetails, thisLinkDetail);
                this.parent2.calculateLink(aspectName, linkDetails, thisLinkDetail);
              }

              this.children.forEach(function (value) {
                value.calculateLink(aspectName, linkDetails, thisLinkDetail);
              });
            },
            writable: true,
            configurable: true
          }
        });

        return Aspect;
      })();
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRoYXVtY3JhZnQvYXNwZWN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFBUSxVQUFVLHlDQUVkLE1BQU0sRUFFRyxPQUFPLEVBZ0ZkLE1BQU07OztBQXBGSixnQkFBVSxxQkFBVixVQUFVOzs7Ozs7O0FBRWQsWUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBRS9CLGFBQU87QUFDUixpQkFEQyxPQUFPO2dDQUFQLE9BQU87O0FBRWxCLGNBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLGNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFekIsY0FBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxjQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLGNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMsY0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUN6QyxjQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLGNBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRWxDLGNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDdkQsY0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN2RCxjQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2pELGNBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDbEQsY0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM3RCxjQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3RELGNBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDaEUsY0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6RCxjQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLGNBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDMUQsY0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN6RCxjQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELGNBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDNUQsY0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQSxDQUFDLENBQUMsQ0FBQztBQUN6RCxjQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3JELGNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDcEQsY0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNsRCxjQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3RELGNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdEQsY0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM1RCxjQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzdELGNBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDdkQsY0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM3RCxjQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELGNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDNUQsY0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN4RCxjQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ25FLGNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDM0QsY0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM5RCxjQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQy9ELGNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDL0QsY0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN2RCxjQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLGNBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDekQsY0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM1RCxjQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDOztBQUVsRCxjQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzlDLGNBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0FBRXpELGNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7O0FBRWpFLGNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7OzZCQXZEVyxPQUFPO0FBeURmLHVCQUFhO2lCQUFBLFlBQUc7QUFDbkIscUJBQU8sS0FBSyxDQUFDO2FBQ2I7OztBQUVELG1CQUFTO21CQUFBLG1CQUFDLElBQUksRUFBRSxNQUFNLEVBQ3RCO0FBQ0Msb0JBQU0sQ0FBQyxLQUFLLHNCQUFvQixJQUFJLENBQUcsQ0FBQztBQUN4QyxrQkFBRyxNQUFNLEtBQUssU0FBUyxFQUN0QixNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUViLGtCQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRXRDLGtCQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0Isa0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUU1QixxQkFBTyxNQUFNLENBQUM7YUFDZDs7OztBQUVELHdCQUFjO21CQUFBLHdCQUFDLElBQUksRUFBQztBQUNuQixxQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5Qjs7Ozs7O2VBN0VXLE9BQU87O0FBZ0ZkLFlBQU07QUFDQSxpQkFETixNQUFNLENBQ0MsSUFBSSxFQUFFLE9BQU87Z0NBRHBCLE1BQU07O0FBRVYsY0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsY0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRW5CLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUUxQixjQUFHLElBQUksQ0FBQyxPQUFPLEVBQ2Y7QUFDQyxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQzVCO1NBRUQ7OzZCQWRJLE1BQU07QUFnQlgsa0JBQVE7bUJBQUEsa0JBQUMsS0FBSyxFQUNkO0FBQ0Msa0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCOzs7O0FBRUQsd0JBQWM7bUJBQUEsd0JBQUMsVUFBVSxFQUFFO0FBQzFCLGtCQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7O0FBRXJCLGtCQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFNUMseUJBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQUMsdUJBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQTtlQUFFLENBQUMsQ0FBQztBQUN6RSx5QkFBVyxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFBRSx1QkFBTyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7ZUFBRSxDQUFDLENBQUM7O0FBRTdELG1CQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDMUM7QUFDQyxvQkFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLHNCQUFNLENBQUMsS0FBSyxNQUFJLEtBQUssQ0FBQyxJQUFJLFdBQU0sS0FBSyxDQUFDLElBQUksV0FBTSxLQUFLLENBQUMsTUFBTSxDQUFHLENBQUM7ZUFDaEU7O0FBRUQscUJBQU8sV0FBVyxDQUFDO2FBQ25COzs7O0FBRUQsdUJBQWE7bUJBQUEsdUJBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRTtBQUN4RCxrQkFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDOztBQUVyQixrQkFBRyxnQkFBZ0IsRUFDbkI7QUFDQywyQkFBVyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztlQUN2Qzs7QUFFRCxrQkFBRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDOUM7QUFDQyx1QkFBTztlQUNQOztBQUVELHlCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFbEMsa0JBQUksY0FBYyxDQUFDOztBQUVuQixrQkFBRyxDQUFDLGdCQUFnQixFQUFFO0FBQ3JCLDhCQUFjLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7ZUFDdkosTUFBTTtBQUNOLDhCQUFjLEdBQUcsRUFBRSxJQUFJLE9BQUssZ0JBQWdCLENBQUMsSUFBSSxTQUFJLElBQUksQ0FBQyxVQUFVLEFBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2VBQzdNOztBQUVELHlCQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUVqQyxrQkFBRyxjQUFjLENBQUMsTUFBTSxFQUN4QjtBQUNDLHVCQUFPO2VBQ1A7OztBQUdELGtCQUFHLElBQUksQ0FBQyxPQUFPLEVBQ2Y7QUFDQyxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNwRSxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztlQUNwRTs7QUFFRCxrQkFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDaEMscUJBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztlQUM3RCxDQUFDLENBQUM7YUFDSDs7Ozs7O2VBOUVJLE1BQU0iLCJmaWxlIjoidGhhdW1jcmFmdC9hc3BlY3RzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=