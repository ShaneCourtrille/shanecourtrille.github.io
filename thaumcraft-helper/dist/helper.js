System.register(["./thaumcraft/aspects", "aurelia-framework"], function (_export) {
  "use strict";

  var Aspects, LogManager, _prototypeProperties, _classCallCheck, logger, Helper;
  return {
    setters: [function (_thaumcraftAspects) {
      Aspects = _thaumcraftAspects.Aspects;
    }, function (_aureliaFramework) {
      LogManager = _aureliaFramework.LogManager;
    }],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      logger = LogManager.getLogger("helper");
      Helper = _export("Helper", (function () {
        function Helper(aspects) {
          _classCallCheck(this, Helper);

          logger.debug("Constructing");

          this.heading = "Thaumcraft Helper";

          this.versionList = [aspects.versionNumber];

          this.versions = new Map();
          this.aspects = [];

          this.versions.set(aspects.versionNumber, aspects);

          this.selectedVersion = aspects.versionNumber;

          this.firstAspect = "";
          this.secondAspect = "";
          this.aspectLength = 0;

          this.refresh();
        }

        _prototypeProperties(Helper, {
          inject: {
            value: function inject() {
              return [Aspects];
            },
            writable: true,
            configurable: true
          }
        }, {
          selectedVersionAspects: {
            get: function () {
              return this.versions.get(this.selectedVersion);
            },
            configurable: true
          },
          refresh: {
            value: function refresh() {
              var selectedVersion = this.selectedVersionAspects;

              this.aspects = selectedVersion.aspectNames.sort();
              this.firstAspect = this.aspects[0];
              this.secondAspect = this.aspects[0];
            },
            writable: true,
            configurable: true
          },
          calculateAspectLinks: {
            value: function calculateAspectLinks() {
              logger.debug("calculateAspectLinks called");

              var selectedVersion = this.selectedVersionAspects;

              var aspect = selectedVersion.getAspectNamed(this.firstAspect);

              var linkDetails = aspect.calculateLinks(this.secondAspect);

              logger.debug("linkDetails=" + linkDetails.length);

              var aspectLength = this.aspectLength;

              for (var _iterator = linkDetails[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                var link = _step.value;
                var cost = link.cost - 1;

                if (cost == aspectLength || cost == aspectLength + 1) {
                  logger.debug("" + link.link + " - " + cost);
                }
              }
            },
            writable: true,
            configurable: true
          }
        });

        return Helper;
      })());
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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