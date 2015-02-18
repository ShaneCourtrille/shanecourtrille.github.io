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
          this.linkDetails = [];

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
              var _this = this;
              logger.debug("calculateAspectLinks called");

              var selectedVersion = this.selectedVersionAspects;

              var aspect = selectedVersion.getAspectNamed(this.firstAspect);

              var linkDetails = aspect.calculateLinks(this.secondAspect);

              this.linkDetails = linkDetails.filter(function (link) {
                return link.cost == _this.aspectLength || link.cost == _this.aspectLength + 1;
              });
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